#!/usr/bin/env python3
"""
Sanity-check a manual Google Scholar export against content/publications/pubmed-cache.json.

Google Scholar: open your profile → select publications → Export → BibTeX.
Save the file as:

  content/publications/scholar-export.bib

Or pass a path:

  python3 scripts/sanity_check_scholar_export.py ~/Downloads/scholar.bib

Or pipe BibTeX on stdin:

  python3 scripts/sanity_check_scholar_export.py -
  pbpaste | python3 scripts/sanity_check_scholar_export.py -

This script:
  - Extracts PubMed IDs from URLs in the file
  - Splits BibTeX entries and parses title fields (best-effort brace matching)
  - Compares to non-excluded articles in pubmed-cache.json

Output: prints a summary and writes content/publications/scholar-sanity-check.json

Requires: Python 3.9+, stdlib only.
"""
from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_BIB = ROOT / "content" / "publications" / "scholar-export.bib"
CACHE_PATH = ROOT / "content" / "publications" / "pubmed-cache.json"
CONFIG_PATH = ROOT / "content" / "publications" / "pubmed-config.json"
OUT_PATH = ROOT / "content" / "publications" / "scholar-sanity-check.json"


def normalize_title(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[\s\{\}]+", " ", s)
    s = re.sub(r"[^a-z0-9\s]", "", s)
    return s.strip()


def brace_inner(text: str, open_idx: int) -> str | None:
    """Return content of {...} starting at open_idx (char is '{')."""
    depth = 0
    for j in range(open_idx, len(text)):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                return text[open_idx + 1 : j]
    return None


def extract_field(entry: str, field: str) -> str | None:
    m = re.search(rf"{field}\s*=\s*", entry, re.I | re.DOTALL)
    if not m:
        return None
    rest = entry[m.end() :].lstrip()
    if not rest:
        return None
    if rest[0] == "{":
        inner = brace_inner(rest, 0)
        return inner.replace("{", "").replace("}", "") if inner else None
    if rest[0] == '"':
        end = rest.find('"', 1)
        return rest[1:end] if end > 0 else None
    # unquoted until comma
    end = rest.find(",")
    return rest[:end].strip() if end >= 0 else rest.strip()


def split_bibtex_entries(text: str) -> list[str]:
    """Split on each new @-entry. re.split(?=@) drops the leading @, so restore it."""
    text = text.strip()
    if not text:
        return []
    parts = re.split(r"(?=@)", text)
    out = []
    for p in parts:
        p = p.strip()
        if not p:
            continue
        if not p.startswith("@"):
            p = "@" + p
        out.append(p)
    return out


def pmids_from_urls(text: str) -> set[str]:
    out = set()
    for pat in (
        r"pubmed\.ncbi\.nlm\.nih\.gov/(\d+)",
        r"ncbi\.nlm\.nih\.gov/pubmed/(\d+)",
        r"doi\.org/[^\s\}]*pubmed[^\d]*(\d+)",
    ):
        out.update(re.findall(pat, text, re.I))
    return {str(x) for x in out}


def main() -> int:
    use_stdin = len(sys.argv) > 1 and sys.argv[1] == "-"
    if use_stdin:
        bib_path = Path("-")
        bib_text = sys.stdin.read()
        if not bib_text.strip():
            print(
                "No BibTeX on stdin. Paste your export or redirect a .bib file, e.g.\n"
                "  pbpaste | python3 scripts/sanity_check_scholar_export.py -\n",
                file=sys.stderr,
            )
            return 1
    else:
        bib_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_BIB
        if not bib_path.is_file():
            print(
                f"Missing Scholar export: {bib_path}\n"
                "Export BibTeX from Google Scholar and save it there, or pass the path.\n"
                "Stdin: python3 scripts/sanity_check_scholar_export.py -\n",
                file=sys.stderr,
            )
            return 1
        if bib_path.stat().st_size == 0:
            print(
                f"Scholar export file is empty (0 bytes): {bib_path}\n"
                "Save the file in your editor (Cmd+S), or pipe BibTeX:\n"
                "  pbpaste | python3 scripts/sanity_check_scholar_export.py -\n",
                file=sys.stderr,
            )
            return 1
        bib_text = bib_path.read_text(encoding="utf-8", errors="replace")

    if not CACHE_PATH.is_file():
        print(f"Missing {CACHE_PATH}; run npm run sync:pubmed first.", file=sys.stderr)
        return 1
    cfg = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    excluded = {str(x) for x in cfg.get("excludedPmids", [])}

    cache = json.loads(CACHE_PATH.read_text(encoding="utf-8"))
    articles = [a for a in (cache.get("articles") or []) if str(a.get("pmid")) not in excluded]

    cache_pmids = {str(a["pmid"]) for a in articles}
    title_to_pmid: dict[str, str] = {}
    for a in articles:
        t = normalize_title(a.get("title") or "")
        if t and t not in title_to_pmid:
            title_to_pmid[t] = str(a["pmid"])

    # PMIDs appearing anywhere in the BibTeX file (URLs)
    pmids_in_file = pmids_from_urls(bib_text)

    entries = split_bibtex_entries(bib_text)
    scholar_titles: list[str] = []
    entry_pmids: set[str] = set()

    for ent in entries:
        entry_pmids |= pmids_from_urls(ent)
        tit = extract_field(ent, "title")
        if tit:
            scholar_titles.append(tit)

    # Title match: Scholar title -> cache pmid
    title_matched_pmids: set[str] = set()
    scholar_titles_norm = [normalize_title(t) for t in scholar_titles]
    unmatched_scholar_titles: list[str] = []
    for raw, norm in zip(scholar_titles, scholar_titles_norm):
        if not norm:
            continue
        if norm in title_to_pmid:
            title_matched_pmids.add(title_to_pmid[norm])
        else:
            # allow prefix match for minor differences
            found = False
            for ct, pm in title_to_pmid.items():
                if norm in ct or ct in norm:
                    if len(norm) > 20 and len(ct) > 20:
                        title_matched_pmids.add(pm)
                        found = True
                        break
            if not found:
                unmatched_scholar_titles.append(raw[:120])

    # Union of PMID evidence from Scholar file
    scholar_pmids_union = entry_pmids | pmids_in_file

    in_scholar_not_cache = sorted(scholar_pmids_union - cache_pmids, key=lambda x: int(x))
    in_cache_not_scholar_pmid = sorted(cache_pmids - scholar_pmids_union, key=lambda x: int(x))

    # Cache PMIDs not matched by PMID in file nor by title
    cache_matched = scholar_pmids_union | title_matched_pmids
    in_cache_unmatched = sorted(cache_pmids - cache_matched, key=lambda x: int(x))

    try:
        scholar_rel = str(bib_path.relative_to(ROOT))
    except ValueError:
        scholar_rel = str(bib_path)

    payload = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "scholarExportPath": scholar_rel,
        "scholarBibtexEntryCount": len(entries),
        "scholarTitlesParsed": len(scholar_titles),
        "pubmedCacheArticleCount": len(articles),
        "pmidsFoundInScholarFileUrls": sorted(pmids_in_file, key=lambda x: int(x)),
        "pmidsInScholarFileNotInPubMedCache": in_scholar_not_cache,
        "pmidsInPubMedCacheNotInScholarFileUrls": in_cache_not_scholar_pmid,
        "titleMatchToCachePmidCount": len(title_matched_pmids),
        "pmidsInCacheStillUnmatchedAfterTitleMatch": in_cache_unmatched[:200],
        "scholarTitlesNotMatchedToCacheSample": unmatched_scholar_titles[:40],
        "note": "Scholar BibTeX often omits PubMed URLs; use title overlap and manual review. "
        "False positives possible on title matching.",
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUT_PATH}\n", flush=True)

    print("--- Scholar vs PubMed cache (non-excluded) ---", flush=True)
    print(f"Scholar BibTeX entries: {len(entries)}", flush=True)
    print(f"PubMed cache articles: {len(articles)}", flush=True)
    print(f"PMIDs found in Scholar file (URLs): {len(pmids_in_file)}", flush=True)
    print(
        f"In Scholar file but NOT in cache: {len(in_scholar_not_cache)}",
        flush=True,
    )
    if in_scholar_not_cache[:20]:
        print("  ", ", ".join(in_scholar_not_cache[:20]), flush=True)
    print(
        f"In cache but no PMID URL in Scholar file: {len(in_cache_not_scholar_pmid)}",
        flush=True,
    )
    if in_cache_not_scholar_pmid[:15]:
        print("  ", ", ".join(in_cache_not_scholar_pmid[:15]), "...", flush=True)
    print(
        f"Title-based matches to cache: {len(title_matched_pmids)}",
        flush=True,
    )
    print(
        f"Cache PMIDs still without Scholar PMID URL or title match: {len(in_cache_unmatched)}",
        flush=True,
    )
    if in_cache_unmatched[:15]:
        print("  ", ", ".join(in_cache_unmatched[:15]), flush=True)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
