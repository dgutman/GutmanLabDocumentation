/**
 * Parse Google Scholar BibTeX exports and match titles to PubMed cache entries
 * (same heuristics as scripts/sanity_check_scholar_export.py).
 */

export type ScholarBibEntry = {
  key: string;
  entryType: string;
  title: string;
  year: number | null;
  /** First author segment (for display / sorting). */
  authorsShort: string;
  /** Full `author` field from BibTeX (for tooltips / matching). */
  authorsFull: string;
  /** First PMID found in entry text (e.g. PubMed URL in url/note). */
  pmidFromUrl: string | null;
};

function braceInner(text: string, openIdx: number): string | null {
  let depth = 0;
  for (let j = openIdx; j < text.length; j++) {
    if (text[j] === "{") depth++;
    else if (text[j] === "}") {
      depth--;
      if (depth === 0) return text.slice(openIdx + 1, j);
    }
  }
  return null;
}

export function extractBibField(entry: string, field: string): string | null {
  const re = new RegExp(`${field}\\s*=\\s*`, "i");
  const m = re.exec(entry);
  if (!m) return null;
  let rest = entry.slice(m.index + m[0].length).trimStart();
  if (!rest) return null;
  if (rest[0] === "{") {
    const inner = braceInner(rest, 0);
    return inner ? inner.replace(/\{/g, "").replace(/\}/g, "") : null;
  }
  if (rest[0] === '"') {
    const end = rest.indexOf('"', 1);
    return end > 0 ? rest.slice(1, end) : null;
  }
  const comma = rest.indexOf(",");
  return comma >= 0 ? rest.slice(0, comma).trim() : rest.trim();
}

export function splitBibtexEntries(text: string): string[] {
  const t = text.trim();
  if (!t) return [];
  const parts = t.split(/(?=@)/);
  const out: string[] = [];
  for (let p of parts) {
    p = p.trim();
    if (!p) continue;
    if (!p.startsWith("@")) p = `@${p}`;
    out.push(p);
  }
  return out;
}

/** Citation key and entry type from the opening line of a BibTeX entry. */
export function parseBibMeta(entry: string): { entryType: string; key: string } | null {
  const m = entry.match(/^@(\w+)\s*\{\s*([^,\s]+)\s*,/);
  if (!m) return null;
  return { entryType: m[1], key: m[2] };
}

/** Fragment `id` for scholar-bibtex anchors; keep in sync with unified publications links. */
export function bibEntryAnchorId(key: string): string {
  return "bib-" + String(key).replace(/[^a-zA-Z0-9_-]/g, "_");
}

function parseYear(entry: string): number | null {
  const y = extractBibField(entry, "year");
  if (!y) return null;
  const d = parseInt(/^\d{4}/.exec(y)?.[0] ?? "", 10);
  return Number.isFinite(d) ? d : null;
}

/** Same URL patterns as scripts/sanity_check_scholar_export.py `pmids_from_urls`. Earliest PMID in the entry (by position). */
export function firstPmidFromBibtexEntry(entry: string): string | null {
  const patterns = [
    /pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/gi,
    /ncbi\.nlm\.nih\.gov\/pubmed\/(\d+)/gi,
    /doi\.org\/[^\s\}]*pubmed[^\d]*(\d+)/gi,
  ];
  let bestIdx = Infinity;
  let bestId: string | null = null;
  for (const re of patterns) {
    const r = new RegExp(re.source, re.flags);
    let m: RegExpExecArray | null;
    while ((m = r.exec(entry)) !== null) {
      if (m.index < bestIdx) {
        bestIdx = m.index;
        bestId = String(m[1]);
      }
    }
  }
  return bestId;
}

/** First author before " and " in BibTeX author field; truncated for display. */
export function shortenAuthorFirst(raw: string): string {
  if (!raw) return "";
  const first = raw.split(/\s+and\s+/i)[0] ?? raw;
  const t = first.replace(/\s+/g, " ").trim();
  return t.length > 72 ? `${t.slice(0, 69)}…` : t;
}

export function normalizeTitle(s: string): string {
  let x = s.toLowerCase();
  x = x.replace(/[\s{}]+/g, " ");
  x = x.replace(/[^a-z0-9\s]/g, "");
  return x.trim();
}

export function parseScholarBibFile(text: string): ScholarBibEntry[] {
  const entries = splitBibtexEntries(text);
  const out: ScholarBibEntry[] = [];
  for (const ent of entries) {
    const meta = parseBibMeta(ent);
    if (!meta) continue;
    const title = extractBibField(ent, "title") ?? "";
    const authorRaw = extractBibField(ent, "author") ?? "";
    const authorsFull = authorRaw.replace(/\s+/g, " ").trim();
    out.push({
      key: meta.key,
      entryType: meta.entryType,
      title,
      year: parseYear(ent),
      authorsShort: shortenAuthorFirst(authorRaw),
      authorsFull,
      pmidFromUrl: firstPmidFromBibtexEntry(ent),
    });
  }
  return out;
}

export function buildTitleToPmid(
  articles: Array<{ pmid: string; title: string }>,
): Map<string, string> {
  const titleToPmid = new Map<string, string>();
  for (const a of articles) {
    const t = normalizeTitle(a.title || "");
    if (t && !titleToPmid.has(t)) titleToPmid.set(t, String(a.pmid));
  }
  return titleToPmid;
}

/** Heuristic PMID for a Scholar title (exact normalized match, then long-prefix overlap). */
export function heuristicMatchPmid(
  scholarTitle: string,
  titleToPmid: Map<string, string>,
): string | null {
  const norm = normalizeTitle(scholarTitle);
  if (!norm) return null;
  if (titleToPmid.has(norm)) return titleToPmid.get(norm)!;
  for (const [ct, pm] of titleToPmid) {
    if (norm.length > 20 && ct.length > 20 && (norm.includes(ct) || ct.includes(norm))) {
      return pm;
    }
  }
  return null;
}
