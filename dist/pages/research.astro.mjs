import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { $ as $$Layout, r as researchAreas } from '../chunks/Layout_C5_pddvX.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const BASE = "/GutmanLabDocumentation/"?.replace(/\/$/, "") || "";
  function link(href) {
    if (href === "/") return BASE;
    return BASE + href;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Research" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title">Research</h1> <div class="card-grid"> ${researchAreas.map((a) => renderTemplate`<article class="card"> <div class="card__body"> <h2> <a${addAttribute(link("/research/" + a.slug + "/"), "href")}>${a.title}</a> </h2> </div> </article>`)} </div> <p class="placeholder">Detailed content for each research area is being updated.</p> ` })}`;
}, "/tmp/GutmanLabDocumentation/src/pages/research/index.astro", void 0);
const $$file = "/tmp/GutmanLabDocumentation/src/pages/research/index.astro";
const $$url = "/GutmanLabDocumentation/research/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
