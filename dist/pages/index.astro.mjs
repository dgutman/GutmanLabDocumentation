import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { $ as $$Layout, s as siteTitle, a as siteTagline, b as siteDescription, h as homeHighlights, c as contact } from '../chunks/Layout_C5_pddvX.mjs';
import { $ as $$GoogleScholarLinks } from '../chunks/GoogleScholarLinks_4kPTlRoL.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const BASE = "/GutmanLabDocumentation/"?.replace(/\/$/, "") || "";
  function link(href) {
    return href === "/" ? BASE : BASE + href;
  }
  const contactText = [
    contact.department,
    contact.school,
    contact.building,
    contact.address,
    contact.city,
    "",
    `Phone: ${contact.phone}`,
    `Email: ${contact.emailDisplay}`
  ].join("\n");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": siteTitle, "description": siteDescription }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero"> <h1>${siteTitle}</h1> <p class="tagline">${siteTagline}</p> <p class="lede">${siteDescription}</p> </section> <div class="card-grid"> ${homeHighlights.map((h) => renderTemplate`<article class="card"> <img${addAttribute(h.image, "src")} alt="" width="400" height="250" loading="lazy"> <div class="card__body"> <h2> <a${addAttribute(link(h.href), "href")}>${h.title}</a> </h2> <p>${h.blurb}</p> </div> </article>`)} </div> ${renderComponent($$result2, "GoogleScholarLinks", $$GoogleScholarLinks, {})} <section class="contact-block" aria-labelledby="contact-heading"> <h2 id="contact-heading">Contact</h2> <p>${contactText}</p> </section> ` })}`;
}, "/tmp/GutmanLabDocumentation/src/pages/index.astro", void 0);
const $$file = "/tmp/GutmanLabDocumentation/src/pages/index.astro";
const $$url = "/GutmanLabDocumentation/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
