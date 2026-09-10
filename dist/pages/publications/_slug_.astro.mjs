import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { $ as $$Layout, p as publicationSections } from '../../chunks/Layout_C5_pddvX.mjs';
import { l as loadFragment } from '../../chunks/fragments_kKytKUEU.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://dgutman.github.io/GutmanLabDocumentation");
function getStaticPaths() {
  return publicationSections.map(({ slug, title, fragment }) => ({
    params: { slug },
    props: { title, fragment }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const BASE = "/GutmanLabDocumentation/"?.replace(/\/$/, "") || "";
  function link(href) {
    return BASE + href;
  }
  const { slug } = Astro2.params;
  const { title, fragment } = Astro2.props;
  const html = loadFragment(fragment);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a${addAttribute(link("/publications/"), "href")}>&larr; Back to Publications</a> <h1 class="page-title">${title}</h1> ${html ? renderTemplate`<div class="content-recovered">${unescapeHTML(html)}</div>` : renderTemplate`<p class="placeholder">
No recovered content for this topic yet. This is a holding page.
</p>`}` })}`;
}, "/tmp/GutmanLabDocumentation/src/pages/publications/[slug].astro", void 0);
const $$file = "/tmp/GutmanLabDocumentation/src/pages/publications/[slug].astro";
const $$url = "/GutmanLabDocumentation/publications/[slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
