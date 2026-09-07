#!/usr/bin/env python3
"""
Fetch PubMed records via NCBI E-utilities (official API) and write a JSON cache
for the lab website. Google Scholar has no public API; PubMed is the reliable
source for biomedical articles.

Usage:
  python3 scripts/sync_pubmed.py

Edit content/publications/pubmed-config.json:
  - pubmedQuery: narrow your name + affiliation/topic terms
  - excludedPmids: PMIDs that match the query but are not you

Requires: Python 3.9+, stdlib only.
"""
from __future__ import annotations

import json
import os
import ssl
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "content" / "publications" / "pubmed-config.json"
OUT_PATH = ROOT / "content" / "publications" / "pubmed-cache.json"

EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
BATCH = 200


def local_name(tag: str) -> str:
    if "}" in tag:
        return tag.rsplit("}", 1)[-1]
    return tag


def text_or_empty(el: ET.Element | None) -> str:
    if el is None or el.text is None:
        return ""
    return el.text.strip()


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "GutmanLabSite/1.0 (PubMed sync)"})
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=90) as r:
        return r.read()


def esearch_ids(
    term: str, retmax: int, email: str, tool: str, api_key: str | None
) -> list[str]:
    params = {
        "db": "pubmed",
        "term": term,
        "retmax": str(retmax),
        "retmode": "json",
        "email": email,
        "tool": tool,
    }
    if api_key:
        params["api_key"] = api_key
    url = f"{EUTILS}/esearch.fcgi?{urllib.parse.urlencode(params)}"
    raw = fetch(url)
    data = json.loads(raw.decode("utf-8"))
    idlist = data.get("esearchresult", {}).get("idlist", [])
    return [str(x) for x in idlist]


def efetch_xml(pmids: list[str], email: str, tool: str, api_key: str | None) -> str:
    params = {
        "db": "pubmed",
        "id": ",".join(pmids),
        "retmode": "xml",
        "email": email,
        "tool": tool,
    }
    if api_key:
        params["api_key"] = api_key
    url = f"{EUTILS}/efetch.fcgi?{urllib.parse.urlencode(params)}"
    return fetch(url).decode("utf-8", errors="replace")


def parse_medline_citation(mc: ET.Element) -> dict | None:
    """Parse MedlineCitation (journal article)."""
    pmid = ""
    for child in mc:
        if local_name(child.tag) == "PMID":
            pmid = text_or_empty(child)
            break
    if not pmid:
        return None

    article = None
    for child in mc:
        if local_name(child.tag) == "Article":
            article = child
            break
    if article is None:
        return None

    title = ""
    for el in article.iter():
        if local_name(el.tag) == "ArticleTitle":
            title = "".join(el.itertext()).strip()
            break

    abstract_parts: list[str] = []
    for el in article.iter():
        if local_name(el.tag) == "AbstractText":
            label = el.get("Label", "")
            chunk = "".join(el.itertext()).strip()
            if label:
                abstract_parts.append(f"{label}: {chunk}")
            else:
                abstract_parts.append(chunk)
    abstract = "\n\n".join(abstract_parts).strip()
    if len(abstract) > 1200:
        abstract = abstract[:1197] + "..."

    authors: list[str] = []
    for el in article.iter():
        if local_name(el.tag) != "Author":
            continue
        ln = ""
        fn = ""
        collective = ""
        for sub in el:
            t = local_name(sub.tag)
            if t == "LastName":
                ln = "".join(sub.itertext()).strip()
            elif t == "ForeName":
                fn = "".join(sub.itertext()).strip()
            elif t == "Initials" and not fn:
                fn = "".join(sub.itertext()).strip()
            elif t == "CollectiveName":
                collective = "".join(sub.itertext()).strip()
        if collective:
            authors.append(collective)
        elif ln:
            authors.append(f"{ln} {fn}".strip() if fn else ln)

    journal = ""
    year = ""
    month = ""
    for el in article.iter():
        if local_name(el.tag) != "Journal":
            continue
        for jch in el:
            jt = local_name(jch.tag)
            if jt == "ISOAbbreviation":
                journal = "".join(jch.itertext()).strip()
            elif jt == "Title" and not journal:
                journal = "".join(jch.itertext()).strip()
            elif jt == "JournalIssue":
                for jiss in jch:
                    if local_name(jiss.tag) != "PubDate":
                        continue
                    for pd in jiss:
                        pt = local_name(pd.tag)
                        if pt == "Year":
                            year = "".join(pd.itertext()).strip()[:4]
                        elif pt == "Month":
                            month = "".join(pd.itertext()).strip()
        if journal and year:
            break

    if not year:
        for el in mc.iter():
            if local_name(el.tag) == "Year":
                y = "".join(el.itertext()).strip()
                if len(y) >= 4 and y[:4].isdigit():
                    year = y[:4]
                    break

    pub_types: list[str] = []
    for el in article.iter():
        if local_name(el.tag) != "PublicationTypeList":
            continue
        for pt in el:
            if local_name(pt.tag) == "PublicationType":
                t = "".join(pt.itertext()).strip()
                if t:
                    pub_types.append(t)

    author_str = ", ".join(authors[:30])
    if len(authors) > 30:
        author_str += ", et al."

    y_int = int(year) if year and year[:4].isdigit() else 0

    return {
        "pmid": pmid,
        "title": title,
        "authors": author_str,
        "journal": journal,
        "year": y_int,
        "pubMonth": month,
        "abstract": abstract,
        "publicationTypes": list(dict.fromkeys(pub_types)),
        "pubmedUrl": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
    }


def parse_pubmed_xml(xml_str: str) -> list[dict]:
    root = ET.fromstring(xml_str)
    out: list[dict] = []
    for pub in root.iter():
        if local_name(pub.tag) != "PubmedArticle":
            continue
        mc = None
        for child in pub:
            if local_name(child.tag) == "MedlineCitation":
                mc = child
                break
        if mc is None:
            continue
        rec = parse_medline_citation(mc)
        if rec:
            out.append(rec)
    return out


def main() -> int:
    if not CONFIG_PATH.is_file():
        print(f"Missing config: {CONFIG_PATH}", file=sys.stderr)
        return 1

    cfg = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    query = cfg.get("pubmedQuery", "").strip()
    excluded = {str(x).strip() for x in cfg.get("excludedPmids", []) if str(x).strip()}
    max_results = int(cfg.get("maxResults", 400))
    email = (os.environ.get("PUBMED_SYNC_EMAIL") or cfg.get("email") or "").strip()
    api_key = (cfg.get("apiKey") or cfg.get("ncbiApiKey") or "").strip() or None
    tool = (cfg.get("toolName") or "gutman-lab-website").strip() or "gutman-lab-website"

    if not query:
        print("pubmedQuery is empty in pubmed-config.json", file=sys.stderr)
        return 1
    if "REPLACE_WITH_YOUR_EMAIL" in email or not email or "@" not in email:
        print(
            "Set a real contact email in pubmed-config.json (required by NCBI E-utilities).",
            file=sys.stderr,
        )
        return 1

    print(f"Searching PubMed: {query!r} ...", flush=True)
    ids = esearch_ids(query, max_results, email, tool, api_key)
    print(f"Found {len(ids)} PMIDs.", flush=True)
    if not ids:
        print("No results. Broaden pubmedQuery in pubmed-config.json.", flush=True)

    all_articles: list[dict] = []
    for i in range(0, len(ids), BATCH):
        batch = ids[i : i + BATCH]
        print(f"Fetching batch {i // BATCH + 1} ({len(batch)} articles) ...", flush=True)
        xml_str = efetch_xml(batch, email, tool, api_key)
        all_articles.extend(parse_pubmed_xml(xml_str))
        time.sleep(0.35 if not api_key else 0.12)

    by_pmid = {a["pmid"]: a for a in all_articles}
    all_sorted = sorted(
        by_pmid.values(), key=lambda a: (-a.get("year", 0), a.get("title", ""))
    )
    excluded_in_fetch = {i for i in ids if i in excluded}
    included_count = sum(1 for a in all_sorted if a["pmid"] not in excluded)

    payload = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "query": query,
        "pmidCount": len(ids),
        "includedCount": included_count,
        "excludedCount": len(excluded_in_fetch),
        "excludedPmids": sorted(excluded),
        "articles": all_sorted,
    }
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUT_PATH}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
