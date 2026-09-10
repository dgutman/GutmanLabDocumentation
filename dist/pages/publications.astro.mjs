import { e as createAstro, c as createComponent, a as renderTemplate, r as renderComponent, m as maybeRenderHead, b as addAttribute, f as renderScript, u as unescapeHTML } from '../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C5_pddvX.mjs';
import { $ as $$GoogleScholarLinks } from '../chunks/GoogleScholarLinks_4kPTlRoL.mjs';
import { l as loadFragment } from '../chunks/fragments_kKytKUEU.mjs';
import { readFileSync } from 'node:fs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://dgutman.github.io/GutmanLabDocumentation");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const BASE = "/GutmanLabDocumentation/"?.replace(/\/$/, "") || "";
  function link(href) {
    if (href === "/") return BASE;
    return BASE + href;
  }
  const sections = [
    { key: "presentations", title: "Presentations", fragment: loadFragment("publications__presentations") },
    { key: "chapters", title: "Book chapters", fragment: loadFragment("publications__chapters") },
    { key: "posters-abstracts", title: "Posters and abstracts", fragment: loadFragment("publications__posters-abstracts") }
  ];
  function countNumbered(html) {
    if (!html) return 0;
    return (html.match(/<p>\d+\.?/g) || []).length;
  }
  function countPresentations(html) {
    if (!html) return 0;
    return (html.match(/<h4>/g) || []).length;
  }
  function getSectionCount(key, content) {
    switch (key) {
      case "presentations":
        return countPresentations(content);
      case "chapters":
        return countNumbered(content);
      case "posters-abstracts":
        return countNumbered(content);
      default:
        return 0;
    }
  }
  const mergedJson = readFileSync(
    new URL("../../data/merged-papers.json", import.meta.url),
    "utf-8"
  );
  const parsed = JSON.parse(mergedJson);
  const papers = parsed.papers;
  const paperCount = papers.length;
  const papersStr = JSON.stringify(papers);
  return renderTemplate(_a || (_a = __template(["", ' <!-- Inline render for the papers list to avoid esbuild AST issues --> <script>\n  document.addEventListener("DOMContentLoaded", () => {\n    const el = document.getElementById("papers-list");\n    if (!el) return;\n    const papers = JSON.parse(el.dataset.papers || "[]");\n    el.innerHTML = "";\n    el.className = "papers-list";\n\n    // Group by year\n    const byYear: Record<string, typeof papers> = {};\n    for (const p of papers) {\n      const y = String(p.year || "unknown");\n      if (!byYear[y]) byYear[y] = [];\n      byYear[y].push(p);\n    }\n\n    for (const [year, yearPapers] of Object.entries(byYear).sort(([a], [b]) => b.localeCompare(a))) {\n      const yearDiv = document.createElement("div");\n      yearDiv.className = "paper-year";\n\n      const h3 = document.createElement("h3");\n      h3.className = "paper-year-label";\n      h3.textContent = year;\n      yearDiv.appendChild(h3);\n\n      const ol = document.createElement("ol");\n      ol.className = "paper-items";\n\n      for (const paper of yearPapers) {\n        const li = document.createElement("li");\n        li.className = "paper-item";\n\n        const span = document.createElement("span");\n        span.className = "paper-citation";\n        span.textContent = paper.citation;\n        li.appendChild(span);\n\n        if (paper.link) {\n          const a = document.createElement("a");\n          a.href = paper.link;\n          a.target = "_blank";\n          a.rel = "noopener";\n          a.className = "paper-link";\n          a.textContent = paper.type === "pubmed" ? `PubMed ${paper.pmid}` : "Link";\n          li.appendChild(a);\n        }\n\n        ol.appendChild(li);\n      }\n\n      yearDiv.appendChild(ol);\n      el.appendChild(yearDiv);\n    }\n  });\n</script> '], ["", ' <!-- Inline render for the papers list to avoid esbuild AST issues --> <script>\n  document.addEventListener("DOMContentLoaded", () => {\n    const el = document.getElementById("papers-list");\n    if (!el) return;\n    const papers = JSON.parse(el.dataset.papers || "[]");\n    el.innerHTML = "";\n    el.className = "papers-list";\n\n    // Group by year\n    const byYear: Record<string, typeof papers> = {};\n    for (const p of papers) {\n      const y = String(p.year || "unknown");\n      if (!byYear[y]) byYear[y] = [];\n      byYear[y].push(p);\n    }\n\n    for (const [year, yearPapers] of Object.entries(byYear).sort(([a], [b]) => b.localeCompare(a))) {\n      const yearDiv = document.createElement("div");\n      yearDiv.className = "paper-year";\n\n      const h3 = document.createElement("h3");\n      h3.className = "paper-year-label";\n      h3.textContent = year;\n      yearDiv.appendChild(h3);\n\n      const ol = document.createElement("ol");\n      ol.className = "paper-items";\n\n      for (const paper of yearPapers) {\n        const li = document.createElement("li");\n        li.className = "paper-item";\n\n        const span = document.createElement("span");\n        span.className = "paper-citation";\n        span.textContent = paper.citation;\n        li.appendChild(span);\n\n        if (paper.link) {\n          const a = document.createElement("a");\n          a.href = paper.link;\n          a.target = "_blank";\n          a.rel = "noopener";\n          a.className = "paper-link";\n          a.textContent = paper.type === "pubmed" ? \\`PubMed \\${paper.pmid}\\` : "Link";\n          li.appendChild(a);\n        }\n\n        ol.appendChild(li);\n      }\n\n      yearDiv.appendChild(ol);\n      el.appendChild(yearDiv);\n    }\n  });\n</script> '])), renderComponent($$result, "Layout", $$Layout, { "title": "Publications", "data-astro-cid-5mquyiyq": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "GoogleScholarLinks", $$GoogleScholarLinks, { "variant": "compact", "data-astro-cid-5mquyiyq": true })} ${maybeRenderHead()}<p class="pub-index-note" data-astro-cid-5mquyiyq> ${[
    { href: "/publications/coverage/", title: "OpenAlex vs PubMed coverage" },
    { href: "/publications/pubmed-review/", title: "PubMed bibliography" },
    { href: "/publications/unified/", title: "PubMed + Scholar (unified)" },
    { href: "/publications/scholar-bibtex/", title: "Scholar BibTeX export" }
  ].map((s) => renderTemplate`<a${addAttribute(link(s.href), "href")} data-astro-cid-5mquyiyq>${s.title}</a>`)} </p> <details class="pub-section" open data-astro-cid-5mquyiyq> <summary data-astro-cid-5mquyiyq> <h2 class="pub-section-title" data-astro-cid-5mquyiyq>Peer reviewed journal articles <span class="pub-count" data-astro-cid-5mquyiyq>(${paperCount})</span></h2> </summary> <div class="pub-section-content" data-astro-cid-5mquyiyq> ${renderScript($$result2, "/tmp/GutmanLabDocumentation/src/pages/publications/index.astro?astro&type=script&index=0&lang.ts")} <div id="papers-list"${addAttribute(papersStr, "data-papers")} data-astro-cid-5mquyiyq></div> </div> </details> ${sections.map((section) => {
    const content = section.fragment || "";
    const count = getSectionCount(section.key, content);
    return renderTemplate`<details class="pub-section" open data-astro-cid-5mquyiyq> <summary data-astro-cid-5mquyiyq> <h2 class="pub-section-title" data-astro-cid-5mquyiyq>${section.title} <span class="pub-count" data-astro-cid-5mquyiyq>(${count})</span></h2> </summary> <div class="pub-section-content" data-astro-cid-5mquyiyq>${unescapeHTML(content)}</div> </details>`;
  })}` }));
}, "/tmp/GutmanLabDocumentation/src/pages/publications/index.astro", void 0);
const $$file = "/tmp/GutmanLabDocumentation/src/pages/publications/index.astro";
const $$url = "/GutmanLabDocumentation/publications/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
