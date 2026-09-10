import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C5_pddvX.mjs';
import { l as loadPubMedCache } from '../../chunks/pubmed_BEMHzYvi.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dgutman.github.io/GutmanLabDocumentation");
const $$Unified = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Unified;
  const BASE = "/GutmanLabDocumentation/";
  function link(href) {
    return BASE + href.replace(/^\//, "");
  }
  const { title, description, noIndex = false } = Astro2.props;
  const cache = loadPubMedCache();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "noIndex": noIndex, "data-astro-cid-6fobda64": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title" data-astro-cid-6fobda64>Unified publications</h1> <p class="unified-lede" data-astro-cid-6fobda64>
Compare <strong data-astro-cid-6fobda64>PubMed</strong> (synced cache) and <strong data-astro-cid-6fobda64>Scholar BibTeX</strong>${" "}
in <strong data-astro-cid-6fobda64>one table</strong> sorted by year (newest first), then author. The${" "} <strong data-astro-cid-6fobda64>Source</strong> column shows whether each row is from PubMed, Scholar, or
    both. The <strong data-astro-cid-6fobda64>PubMed PMID</strong> is the
    canonical id when the same paper appears twice. Duplicate links and Scholar
    exclusions live in this browser only—use <strong data-astro-cid-6fobda64>Export browser state</strong>${" "}
to save a JSON snapshot. PubMed "Exclude" uses the same storage as${" "} <a${addAttribute(link("/publications/pubmed-review/"), "href")} data-astro-cid-6fobda64>PubMed bibliography</a>.
</p> ${!cache ? renderTemplate`<p class="placeholder" data-astro-cid-6fobda64>
No PubMed cache. Set email in${" "} <code data-astro-cid-6fobda64>content/publications/pubmed-config.json</code> and run${" "} <code data-astro-cid-6fobda64>npm run sync:pubmed</code>. Optional: add${" "} <code data-astro-cid-6fobda64>scholar-export.bib</code> and rebuild.
</p>` : renderTemplate`<div class="unified-content" data-astro-cid-6fobda64>Loading...</div>`}` })} `;
}, "/tmp/GutmanLabDocumentation/src/pages/publications/unified.astro", void 0);
const $$file = "/tmp/GutmanLabDocumentation/src/pages/publications/unified.astro";
const $$url = "/GutmanLabDocumentation/publications/unified/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Unified,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
