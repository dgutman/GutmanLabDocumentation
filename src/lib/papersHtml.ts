// Generate papers list HTML from merged-papers data
// This keeps esbuild away from large data in Astro frontmatter

export interface PaperEntry {
  pmid: string;
  type: string;
  citation: string;
  link: string;
  year: number;
}

function safe(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildPapersListHtml(papers: PaperEntry[]): string {
  const byYear: Record<string, PaperEntry[]> = {};
  for (const p of papers) {
    const y = String(p.year || 'unknown');
    if (!byYear[y]) byYear[y] = [];
    byYear[y].push(p);
  }
  const sorted = Object.entries(byYear).sort(([a], [b]) => b.localeCompare(a));
  let html = '<div class="papers-list">';
  for (const [year, yrPapers] of sorted) {
    html += '<div class="paper-year">';
    html += '<h3 class="paper-year-label">' + safe(year) + '</h3>';
    html += '<ol class="paper-items">';
    for (const paper of yrPapers) {
      html += '<li class="paper-item">';
      html += '<span class="paper-citation">' + safe(paper.citation) + '</span>';
      if (paper.link) {
        const label = paper.type === 'pubmed' ? 'PubMed ' + safe(paper.pmid) : 'Link';
        html += '<a href="' + safe(paper.link) + '" target="_blank" rel="noopener" class="paper-link">' + label + '</a>';
      }
      html += '</li>';
    }
    html += '</ol></div>';
  }
  html += '</div>';
  return html;
}
