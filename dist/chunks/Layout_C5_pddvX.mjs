import { e as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, g as renderHead, r as renderComponent, h as renderSlot } from './astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import 'clsx';
/* empty css                        */

const siteTitle = "The Gutman Lab";
const siteTagline = "Studying large data sets to advance biological research";
const siteDescription = "Dr. David Gutman is an assistant professor of Biomedical Informatics at Emory University focused on understanding genomic bases of biological imaging.";
const contact = {
  department: "Department of Biomedical Informatics",
  school: "Emory University School of Medicine",
  building: "PAIS Building",
  address: "36 Eagle Row, 5th Floor South",
  city: "Atlanta, GA 30322",
  phone: "(404) 712-9206",
  emailDisplay: "DGutman [at] emory [dot] edu"
};
const googleScholar = {
  profileUrl: "https://scholar.google.com/citations?user=N6uWd_8AAAAJ&hl=en"};
const nav = [
  { href: "/", label: "Home" },
  { href: "/people/about/", label: "People" },
  { href: "/research/", label: "Research" },
  { href: "/publications/", label: "Publications" },
  { href: "/resources/", label: "Resources" },
  { href: "/blog/", label: "Lab Blog" }
];
const researchAreas = [
  { slug: "cancer-informatics", title: "Cancer Informatics" },
  { slug: "clinical-informatics-2", title: "Clinical Informatics" },
  { slug: "computational-neuroscience", title: "Computational Neuroscience" },
  { slug: "digital-pathology", title: "Digital Pathology" },
  { slug: "neurogenomics", title: "NeuroGenomics" },
  { slug: "non-human-mri-analysis", title: "Non-human MRI Analysis" },
  { slug: "clinical-informatics", title: "Pathology image analysis" },
  { slug: "redcap", title: "REDCap" }
];
const homeHighlights = [
  {
    title: "Cancer Informatics",
    href: "/research/cancer-informatics/",
    blurb: "The goal of cancer informatics is to obtain and organize large amounts of data (histology, radiology, etc.) to formulate hypotheses about cancer development and guide diagnostic and prognostic decisions.",
    image: "https://web.archive.org/web/20200224105019im_/http://drgutman.org/dglab_wordpress/wp-content/uploads/2013/12/3.png"
  },
  {
    title: "Non-human MRI Analysis",
    href: "/research/non-human-mri-analysis/",
    blurb: "MRI from non-human models offers a unique perspective into neural functioning and complements experimental techniques not available in human specimens.",
    image: "https://web.archive.org/web/20200224105019im_/http://drgutman.org/dglab_wordpress/wp-content/uploads/2013/12/1.png"
  },
  {
    title: "NeuroGenomics",
    href: "/research/neurogenomics/",
    blurb: "In-silico methods to identify and measure brain features using radiological imaging to study pathological development.",
    image: "https://web.archive.org/web/20200224105019im_/http://drgutman.org/dglab_wordpress/wp-content/uploads/2013/12/2.png"
  }
];
const publicationSections = [
  {
    slug: "papers",
    title: "Peer reviewed journal articles",
    fragment: "publications__papers"
  },
  {
    slug: "presentations",
    title: "Presentations",
    fragment: "publications__presentations"
  },
  {
    slug: "chapters",
    title: "Book chapters",
    fragment: "publications__chapters"
  },
  {
    slug: "posters-abstracts",
    title: "Posters and abstracts",
    fragment: "publications__posters-abstracts"
  }
];

const $$Astro$1 = createAstro("https://dgutman.github.io/GutmanLabDocumentation");
const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Nav;
  const BASE = "/GutmanLabDocumentation/"?.replace(/\/$/, "") || "";
  function link(href) {
    if (href === "/") return BASE;
    return BASE + href;
  }
  const siteVersion = "v0.6.0";
  Astro2.url.pathname.replace(/\/$/, "") || "/";
  return renderTemplate`${maybeRenderHead()}<header class="site-header"> <div class="site-header__inner"> <h1 class="site-title"> <a${addAttribute(link("/"), "href")}>${siteTitle}</a> </h1> <nav aria-label="Primary"> <ul class="site-nav"> ${nav.map(({ href, label }) => renderTemplate`<li> <a${addAttribute(link(href), "href")}>${label}</a> </li>`)} </ul> </nav> </div> <div class="site-version">${siteVersion}</div> </header>`;
}, "/tmp/GutmanLabDocumentation/src/components/Nav.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer"> <p>© ${year} The Gutman Lab. Content recovered from archived drgutman.org pages.</p> </footer>`;
}, "/tmp/GutmanLabDocumentation/src/components/Footer.astro", void 0);

const $$Astro = createAstro("https://dgutman.github.io/GutmanLabDocumentation");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = siteTitle, description = siteDescription, noIndex = false } = Astro2.props;
  const pageTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description, "content")}>${noIndex ? renderTemplate`<meta name="robots" content="noindex, nofollow">` : null}<title>${pageTitle}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Nav", $$Nav, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/tmp/GutmanLabDocumentation/src/layouts/Layout.astro", void 0);

export { $$Layout as $, siteTagline as a, siteDescription as b, contact as c, googleScholar as g, homeHighlights as h, publicationSections as p, researchAreas as r, siteTitle as s };
