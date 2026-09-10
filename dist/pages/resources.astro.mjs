import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C5_pddvX.mjs';
import { l as loadFragment } from '../chunks/fragments_kKytKUEU.mjs';
export { renderers } from '../renderers.mjs';

const $$Resources = createComponent(($$result, $$props, $$slots) => {
  const html = loadFragment("resources");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Resources" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title">Resources</h1> ${html ? renderTemplate`<div class="content-recovered">${unescapeHTML(html)}</div>` : renderTemplate`<p class="placeholder">
No recovered content for this page yet. Run${" "} <code>npm run recover</code> to pull the archived Resources page from the
        Wayback Machine, or add content manually under${" "} <code>content/recovered/resources.html.fragment</code>.
</p>`}` })}`;
}, "/tmp/GutmanLabDocumentation/src/pages/resources.astro", void 0);

const $$file = "/tmp/GutmanLabDocumentation/src/pages/resources.astro";
const $$url = "/GutmanLabDocumentation/resources/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resources,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
