#!/usr/bin/env python3
"""
Download archived drgutman.org pages from the Internet Archive and extract
main article HTML for reuse in a static site.

Usage:
  python3 scripts/recover_wayback.py

Requires: urllib (stdlib)
"""
from __future__ import annotations

import json
import re
import ssl
import urllib.request
from pathlib import Path

# Snapshot from user link (Feb 24, 2020). Some child pages may redirect to nearby snapshots.
WAYBACK_PREFIX = "https://web.archive.org/web/20200224105019/http://drgutman.org"

PATHS = [
    "/",
    "/people/about/",
    "/research-areas/",
    "/research-areas/cancer-informatics/",
    "/research-areas/clinical-informatics-2/",
    "/research-areas/computational-neuroscience/",
    "/research-areas/digital-pathology/",
    "/research-areas/neurogenomics/",
    "/research-areas/non-human-mri-analysis/",
    "/research-areas/clinical-informatics/",
    "/research-areas/redcap/",
    "/publications/",
    "/publications/papers/",
    "/publications/presentations/",
    "/publications/chapters/",
    "/publications/posters-abstracts/",
    "/resources/",
    "/the-blog-page/",
]

UA = "Mozilla/5.0 (compatible; GutmanLabRecovery/1.0; +https://github.com/)"
OUT_DIR = Path(__file__).resolve().parent.parent / "content" / "recovered"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=25) as r:
        return r.read().decode("utf-8", errors="replace")


def extract_entry_content(html: str) -> str | None:
    m = re.search(
        r'<div class="entry-content"[^>]*>(.*?)</div>\s*<!-- \.entry-content -->',
        html,
        re.DOTALL | re.IGNORECASE,
    )
    if m:
        return m.group(1).strip()
    m = re.search(
        r'<div class="entry-content"[^>]*>(.*?)</div>\s*</div><!-- \.entry-container -->',
        html,
        re.DOTALL | re.IGNORECASE,
    )
    if m:
        return m.group(1).strip()
    m = re.search(r'<div class="entry-content"[^>]*>(.*?)</div>', html, re.DOTALL)
    return m.group(1).strip() if m else None


def extract_title(html: str) -> str | None:
    m = re.search(r"<title>([^<]+)</title>", html, re.IGNORECASE)
    if not m:
        return None
    t = m.group(1).strip()
    if " | " in t:
        t = t.split(" | ", 1)[0].strip()
    return t


def strip_wayback_urls(html: str) -> str:
    """Rewrite Wayback-wrapped drgutman.org links to site-relative paths."""
    html = re.sub(
        r'href="https://web\.archive\.org/web/\d+/https?://drgutman\.org(:\d+)?([^"]*)"',
        r'href="\2"',
        html,
    )
    html = re.sub(
        r'href="https://web\.archive\.org/web/\d+/http://www\.drgutman\.org(:\d+)?([^"]*)"',
        r'href="\2"',
        html,
    )
    html = re.sub(
        r'https://web\.archive\.org/web/\d+im_/http://drgutman\.org',
        "https://web.archive.org/web/20200224105019im_/http://drgutman.org",
        html,
    )
    return html


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    raw_dir = OUT_DIR / "raw_html"
    raw_dir.mkdir(exist_ok=True)
    index: list[dict] = []

    for path in PATHS:
        url = WAYBACK_PREFIX.rstrip("/") + path
        slug = path.strip("/").replace("/", "__") or "home"
        print(f"Fetching {url} ...", flush=True)
        try:
            html = fetch(url)
        except Exception as e:
            print(f"  FAIL: {e}", flush=True)
            index.append({"path": path, "slug": slug, "error": str(e)})
            continue

        (raw_dir / f"{slug}.html").write_text(html, encoding="utf-8")
        title = extract_title(html)
        body = extract_entry_content(html)
        if body:
            body = strip_wayback_urls(body)
        row = {
            "path": path,
            "slug": slug,
            "title": title,
            "wayback_url": url,
            "html": body,
        }
        index.append(row)
        if body:
            (OUT_DIR / f"{slug}.html.fragment").write_text(body, encoding="utf-8")
        print(f"  ok title={title!r} body={'yes' if body else 'no'}", flush=True)

    (OUT_DIR / "index.json").write_text(
        json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"Wrote {OUT_DIR / 'index.json'}", flush=True)


if __name__ == "__main__":
    main()
