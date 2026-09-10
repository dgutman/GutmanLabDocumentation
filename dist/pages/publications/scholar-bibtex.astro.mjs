import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, F as Fragment } from '../../chunks/astro/server_Dpy5uBJK.mjs';
import 'piccolore';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { $ as $$Layout } from '../../chunks/Layout_C5_pddvX.mjs';
/* empty css                                             */
export { renderers } from '../../renderers.mjs';

function splitBibtexEntries(text) {
  const t = text.trim();
  if (!t) return [];
  const parts = t.split(/(?=@)/);
  const out = [];
  for (let p of parts) {
    p = p.trim();
    if (!p) continue;
    if (!p.startsWith("@")) p = `@${p}`;
    out.push(p);
  }
  return out;
}
function parseBibMeta(entry) {
  const m = entry.match(/^@(\w+)\s*\{\s*([^,\s]+)\s*,/);
  if (!m) return null;
  return { entryType: m[1], key: m[2] };
}
function bibEntryAnchorId(key) {
  return "bib-" + String(key).replace(/[^a-zA-Z0-9_-]/g, "_");
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ScholarBibtex = createComponent(($$result, $$props, $$slots) => {
  const BASE = "/GutmanLabDocumentation/";
  function link(href) {
    return BASE + href.replace(/^\//, "");
  }
  const bibPath = join(process.cwd(), "content/publications/scholar-export.bib");
  let bibText = "";
  if (existsSync(bibPath)) {
    try {
      bibText = readFileSync(bibPath, "utf8");
    } catch {
      bibText = "";
    }
  }
  const hasBib = bibText.trim().length > 0;
  const bibEntries = hasBib ? splitBibtexEntries(bibText) : [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Scholar BibTeX export", "description": "Local copy of the Google Scholar BibTeX export (scholar-export.bib) for reference and copying.", "noIndex": true, "data-astro-cid-yxus3mc4": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="page-title" data-astro-cid-yxus3mc4>Scholar BibTeX export</h1> <p class="bib-lede" data-astro-cid-yxus3mc4>
This is the same file as <code data-astro-cid-yxus3mc4>content/publications/scholar-export.bib</code>${" "}
(saved from Google Scholar → Export → BibTeX). The text below is embedded when
    the site is built or when the dev server renders this page—after you add or
    change the .bib file, run <code data-astro-cid-yxus3mc4>npm run build</code> (or save the file and
    refresh while <code data-astro-cid-yxus3mc4>npm run dev</code> is running). Run${" "} <code data-astro-cid-yxus3mc4>npm run sanity:scholar</code> to compare against the PubMed cache. Each
    entry has an <code data-astro-cid-yxus3mc4>id</code> so links from${" "} <a${addAttribute(link("/publications/unified/"), "href")} data-astro-cid-yxus3mc4>Unified publications</a> jump here.
</p> ${hasBib ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-yxus3mc4": true }, { "default": ($$result3) => renderTemplate` <div class="bib-toolbar" data-astro-cid-yxus3mc4> <button type="button" class="bib-copy" id="bib-copy" data-astro-cid-yxus3mc4>
Copy all
</button> <span class="bib-meta" id="bib-meta" aria-live="polite" data-astro-cid-yxus3mc4></span> </div> <div class="bib-entries-wrap" id="bib-entries" data-astro-cid-yxus3mc4> ${bibEntries.map((ent, i) => {
    const meta = parseBibMeta(ent);
    const anchor = meta ? bibEntryAnchorId(meta.key) : `bib-entry-${i}`;
    return renderTemplate`<pre class="bib-entry"${addAttribute(anchor, "id")} data-astro-cid-yxus3mc4>

                ${ent}
              </pre>`;
  })} </div> <p class="bib-hint" id="bib-hint" hidden data-astro-cid-yxus3mc4>
Copied to clipboard.
</p> ` })}` : renderTemplate`<p class="bib-empty" data-astro-cid-yxus3mc4>
No BibTeX file yet, or it is empty. Save your Scholar export as${" "} <code data-astro-cid-yxus3mc4>content/publications/scholar-export.bib</code>. If you already
        saved a non-empty file but still see this, run${" "} <code data-astro-cid-yxus3mc4>npm run build</code> (or hard-refresh the page while${" "} <code data-astro-cid-yxus3mc4>npm run dev</code> is running). An old preview or${" "} <code data-astro-cid-yxus3mc4>dist/</code> folder can still show the empty state until you
        rebuild.
</p>`}` })} ${hasBib && renderTemplate(_a || (_a = __template(['<script>\n      (function () {\n        var btn = document.getElementById("bib-copy");\n        var wrap = document.getElementById("bib-entries");\n        var meta = document.getElementById("bib-meta");\n        var hint = document.getElementById("bib-hint");\n        if (wrap && meta) {\n          var blocks = wrap.querySelectorAll(".bib-entry");\n          var t = "";\n          var i;\n          for (i = 0; i < blocks.length; i++) {\n            t += (blocks[i].textContent || "") + (i < blocks.length - 1 ? "\n\n" : "");\n          }\n          meta.textContent =\n            t.length.toLocaleString() +\n            " characters · " +\n            blocks.length +\n            " entries";\n        }\n        btn?.addEventListener("click", function () {\n          var wrap = document.getElementById("bib-entries");\n          if (!wrap) return;\n          var blocks = wrap.querySelectorAll(".bib-entry");\n          var parts = [];\n          for (var j = 0; j < blocks.length; j++) {\n            parts.push(blocks[j].textContent || "");\n          }\n          var full = parts.join("\n\n");\n          if (!full) return;\n          navigator.clipboard.writeText(full).then(function () {\n            if (hint) {\n              hint.hidden = false;\n              setTimeout(function () {\n                hint.hidden = true;\n              }, 2000);\n            }\n          });\n        });\n      })();\n    </script>'])))} `;
}, "/tmp/GutmanLabDocumentation/src/pages/publications/scholar-bibtex.astro", void 0);
const $$file = "/tmp/GutmanLabDocumentation/src/pages/publications/scholar-bibtex.astro";
const $$url = "/GutmanLabDocumentation/publications/scholar-bibtex/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ScholarBibtex,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
