import { e as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate } from './astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import 'clsx';
import { g as googleScholar } from './Layout_C5_pddvX.mjs';
/* empty css                         */

const $$Astro = createAstro("https://dgutman.github.io/GutmanLabDocumentation");
const $$GoogleScholarLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GoogleScholarLinks;
  const BASE = "/GutmanLabDocumentation/"?.replace(/\/$/, "") || "";
  function link(href) {
    if (href === "/") return BASE;
    return BASE + href;
  }
  const { variant = "default" } = Astro2.props;
  return renderTemplate`${variant === "compact" ? renderTemplate`${maybeRenderHead()}<div class="gs-links" data-astro-cid-dqwc7hfa><a${addAttribute(link("/publications/coverage/"), "href")} data-astro-cid-dqwc7hfa>OpenAlex vs PubMed gaps</a> — we cannot
    pull from Google Scholar directly.
<a${addAttribute(link("/publications/scholar-bibtex/"), "href")} data-astro-cid-dqwc7hfa>View BibTeX in the site</a> (after
    running \`\`npm run sync:scholar\`\` or adding the export).
</div>` : renderTemplate`<section class="gs-panel" aria-labelledby="gs-heading" data-astro-cid-dqwc7hfa><h2 id="gs-heading" class="gs-panel__title" data-astro-cid-dqwc7hfa>Google Scholar</h2><p class="gs-panel__note" data-astro-cid-dqwc7hfa>The site does not pull from Google Scholar (no public API). Links below go directly to Google.</p><div class="gs-links" data-astro-cid-dqwc7hfa><a${addAttribute(googleScholar.profileUrl, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-dqwc7hfa>${googleScholar.profileUrl}</a></div></section>`}`;
}, "/tmp/GutmanLabDocumentation/src/components/GoogleScholarLinks.astro", void 0);

export { $$GoogleScholarLinks as $ };
