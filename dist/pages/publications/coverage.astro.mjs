import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment, b as addAttribute } from '../../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { $ as $$Layout } from '../../chunks/Layout_C5_pddvX.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Coverage = createComponent(($$result, $$props, $$slots) => {
  const diffPath = join(
    process.cwd(),
    "content/publications/openalex-diff.json"
  );
  let diff = null;
  if (existsSync(diffPath)) {
    try {
      diff = JSON.parse(readFileSync(diffPath, "utf-8"));
    } catch {
      diff = null;
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Coverage: OpenAlex vs PubMed cache", "description": "Compare OpenAlex author works to the local PubMed sync (Google Scholar cannot be queried automatically).", "noIndex": true, "data-astro-cid-uaqj5l3d": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title" data-astro-cid-uaqj5l3d>Coverage: OpenAlex vs PubMed</h1> <p class="coverage-lede" data-astro-cid-uaqj5l3d> <strong data-astro-cid-uaqj5l3d>Google Scholar</strong> has no public API and blocks scraping, so
    this site does not query it. For a manual check against Scholar, use your
    profile’s export or “My library,” then compare lists by hand or in a
    spreadsheet. Automatically, we compare your local PubMed cache to${" "} <a href="https://openalex.org/" data-astro-cid-uaqj5l3d>OpenAlex</a> (open index; often overlaps
    Scholar but not the same). Confirm <code data-astro-cid-uaqj5l3d>openalexAuthorId</code> in${" "} <code data-astro-cid-uaqj5l3d>pubmed-config.json</code> is your OpenAlex author record.
</p> ${!diff?.generatedAt ? renderTemplate`<p class="placeholder" data-astro-cid-uaqj5l3d>
No report yet. Run <code data-astro-cid-uaqj5l3d>npm run compare:openalex</code> after${" "} <code data-astro-cid-uaqj5l3d>npm run sync:pubmed</code> to generate${" "} <code data-astro-cid-uaqj5l3d>content/publications/openalex-diff.json</code>.
</p>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uaqj5l3d": true }, { "default": ($$result3) => renderTemplate` <p class="coverage-meta" data-astro-cid-uaqj5l3d>
Generated: ${diff.generatedAt} ${diff.openalexAuthorUrl ? renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "data-astro-cid-uaqj5l3d": true }, { "default": ($$result4) => renderTemplate`${" "}
·${" "}<a${addAttribute(diff.openalexAuthorUrl, "href")} data-astro-cid-uaqj5l3d>OpenAlex author</a> ` })}` : null} </p> <section class="coverage-section" aria-labelledby="gap-h" data-astro-cid-uaqj5l3d> <h2 id="gap-h" data-astro-cid-uaqj5l3d>
In OpenAlex but not in your PubMed cache (
${diff.pmidsInOpenAlexNotInPubMedCache?.length ?? 0})
</h2> <p class="coverage-hint" data-astro-cid-uaqj5l3d>
Worth checking in PubMed or Scholar — may be missing from your
            query, or indexing lag.
</p> ${(diff.pmidsInOpenAlexNotInPubMedCache?.length ?? 0) === 0 ? renderTemplate`<p class="coverage-empty" data-astro-cid-uaqj5l3d>None — lists align on PMIDs.</p>` : renderTemplate`<ul class="coverage-list" data-astro-cid-uaqj5l3d> ${diff.pmidsInOpenAlexNotInPubMedCache.map((row) => renderTemplate`<li data-astro-cid-uaqj5l3d> <a${addAttribute(row.pubmedUrl, "href")} data-astro-cid-uaqj5l3d>PMID ${row.pmid}</a> ${row.title ? renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "data-astro-cid-uaqj5l3d": true }, { "default": ($$result4) => renderTemplate` — ${row.title}` })}` : null} </li>`)} </ul>`} </section> <section class="coverage-section" aria-labelledby="lag-h" data-astro-cid-uaqj5l3d> <h2 id="lag-h" data-astro-cid-uaqj5l3d>
In PubMed cache but not on this OpenAlex author (
${diff.pmidsInPubMedCacheNotInOpenAlex?.length ?? 0})
</h2> <p class="coverage-hint" data-astro-cid-uaqj5l3d>
Common for very new articles, different author disambiguation, or
            works not yet linked in OpenAlex.
</p> ${(diff.pmidsInPubMedCacheNotInOpenAlex?.length ?? 0) === 0 ? renderTemplate`<p class="coverage-empty" data-astro-cid-uaqj5l3d>None.</p>` : renderTemplate`<ul class="coverage-list" data-astro-cid-uaqj5l3d> ${diff.pmidsInPubMedCacheNotInOpenAlex.map((row) => renderTemplate`<li data-astro-cid-uaqj5l3d> <a${addAttribute(row.pubmedUrl, "href")} data-astro-cid-uaqj5l3d>PMID ${row.pmid}</a> </li>`)} </ul>`} </section> <section class="coverage-section" aria-labelledby="nopmid-h" data-astro-cid-uaqj5l3d> <h2 id="nopmid-h" data-astro-cid-uaqj5l3d>
OpenAlex works without a PMID (sample)
</h2> <p class="coverage-hint" data-astro-cid-uaqj5l3d>
Preprints, books, abstracts, or records not in PubMed — compare
            manually with Scholar.
</p> <ul class="coverage-list" data-astro-cid-uaqj5l3d> ${(diff.openalexWorksWithoutPmidSample ?? []).slice(0, 25).map((w) => renderTemplate`<li data-astro-cid-uaqj5l3d> ${w.openalexWorkUrl ? renderTemplate`<a${addAttribute(w.openalexWorkUrl, "href")} data-astro-cid-uaqj5l3d>${w.title || "Untitled"}</a>` : w.title} ${w.year ? renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "data-astro-cid-uaqj5l3d": true }, { "default": ($$result4) => renderTemplate` (${w.year})` })}` : null} </li>`)} </ul> </section> ` })}`}` })} `;
}, "/tmp/GutmanLabDocumentation/src/pages/publications/coverage.astro", void 0);

const $$file = "/tmp/GutmanLabDocumentation/src/pages/publications/coverage.astro";
const $$url = "/GutmanLabDocumentation/publications/coverage/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Coverage,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
