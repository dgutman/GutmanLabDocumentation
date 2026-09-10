import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C5_pddvX.mjs';
import { $ as $$GoogleScholarLinks } from '../../chunks/GoogleScholarLinks_4kPTlRoL.mjs';
import { l as loadFragment } from '../../chunks/fragments_kKytKUEU.mjs';
export { renderers } from '../../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  const html = loadFragment("people__about");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "David Gutman, M.D., Ph.D." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title">David Gutman, M.D., Ph.D.</h1> ${renderComponent($$result2, "GoogleScholarLinks", $$GoogleScholarLinks, { "variant": "compact" })} ${html ? renderTemplate`<div class="content-recovered">${unescapeHTML(html)}</div>` : renderTemplate`<p class="placeholder">
Biography content not found. Run${" "} <code>npm run recover</code> to download fragments from the Internet
        Archive.
</p>`}` })}`;
}, "/tmp/GutmanLabDocumentation/src/pages/people/about.astro", void 0);

const $$file = "/tmp/GutmanLabDocumentation/src/pages/people/about.astro";
const $$url = "/GutmanLabDocumentation/people/about/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
