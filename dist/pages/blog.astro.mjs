import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C5_pddvX.mjs';
import { l as loadFragment } from '../chunks/fragments_kKytKUEU.mjs';
export { renderers } from '../renderers.mjs';

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  const html = loadFragment("the-blog-page");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lab blog" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title">Lab blog</h1> ${html ? renderTemplate`<div class="content-recovered">${unescapeHTML(html)}</div>` : renderTemplate`<p class="placeholder">
The original site linked to a WordPress blog. Recover archived posts with${" "} <code>npm run recover</code> (adds${" "} <code>the-blog-page.html.fragment</code> when available), or replace
        this page with your current blog platform.
</p>`}` })}`;
}, "/tmp/GutmanLabDocumentation/src/pages/blog.astro", void 0);

const $$file = "/tmp/GutmanLabDocumentation/src/pages/blog.astro";
const $$url = "/GutmanLabDocumentation/blog/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
