import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, i as decodeKey } from './chunks/astro/server_Dpy5uBJK.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///tmp/GutmanLabDocumentation/","cacheDir":"file:///tmp/GutmanLabDocumentation/node_modules/.astro/","outDir":"file:///tmp/GutmanLabDocumentation/dist/","srcDir":"file:///tmp/GutmanLabDocumentation/src/","publicDir":"file:///tmp/GutmanLabDocumentation/public/","buildClientDir":"file:///tmp/GutmanLabDocumentation/dist/client/","buildServerDir":"file:///tmp/GutmanLabDocumentation/dist/server/","adapterName":"","routes":[{"file":"file:///tmp/GutmanLabDocumentation/dist/blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/people/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/people/about","isIndex":false,"type":"page","pattern":"^\\/people\\/about\\/$","segments":[[{"content":"people","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/people/about.astro","pathname":"/people/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/publications/coverage/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/publications/coverage","isIndex":false,"type":"page","pattern":"^\\/publications\\/coverage\\/$","segments":[[{"content":"publications","dynamic":false,"spread":false}],[{"content":"coverage","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/publications/coverage.astro","pathname":"/publications/coverage","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/publications/pubmed-review/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/publications/pubmed-review","isIndex":false,"type":"page","pattern":"^\\/publications\\/pubmed-review\\/$","segments":[[{"content":"publications","dynamic":false,"spread":false}],[{"content":"pubmed-review","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/publications/pubmed-review.astro","pathname":"/publications/pubmed-review","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/publications/scholar-bibtex/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/publications/scholar-bibtex","isIndex":false,"type":"page","pattern":"^\\/publications\\/scholar-bibtex\\/$","segments":[[{"content":"publications","dynamic":false,"spread":false}],[{"content":"scholar-bibtex","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/publications/scholar-bibtex.astro","pathname":"/publications/scholar-bibtex","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/publications/unified/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/publications/unified","isIndex":false,"type":"page","pattern":"^\\/publications\\/unified\\/$","segments":[[{"content":"publications","dynamic":false,"spread":false}],[{"content":"unified","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/publications/unified.astro","pathname":"/publications/unified","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/publications/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/publications","isIndex":true,"type":"page","pattern":"^\\/publications\\/$","segments":[[{"content":"publications","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/publications/index.astro","pathname":"/publications","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/research/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/research","isIndex":true,"type":"page","pattern":"^\\/research\\/$","segments":[[{"content":"research","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/research/index.astro","pathname":"/research","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/resources/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/resources","isIndex":false,"type":"page","pattern":"^\\/resources\\/$","segments":[[{"content":"resources","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/resources.astro","pathname":"/resources","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///tmp/GutmanLabDocumentation/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}}],"site":"https://dgutman.github.io/GutmanLabDocumentation","base":"/GutmanLabDocumentation/","trailingSlash":"always","compressHTML":true,"componentMetadata":[["/tmp/GutmanLabDocumentation/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/people/about.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/publications/[slug].astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/publications/coverage.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/publications/index.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/publications/pubmed-review.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/publications/scholar-bibtex.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/publications/unified.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/research/[slug].astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/research/index.astro",{"propagation":"none","containsHead":true}],["/tmp/GutmanLabDocumentation/src/pages/resources.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/people/about@_@astro":"pages/people/about.astro.mjs","\u0000@astro-page:src/pages/publications/coverage@_@astro":"pages/publications/coverage.astro.mjs","\u0000@astro-page:src/pages/publications/pubmed-review@_@astro":"pages/publications/pubmed-review.astro.mjs","\u0000@astro-page:src/pages/publications/scholar-bibtex@_@astro":"pages/publications/scholar-bibtex.astro.mjs","\u0000@astro-page:src/pages/publications/unified@_@astro":"pages/publications/unified.astro.mjs","\u0000@astro-page:src/pages/publications/[slug]@_@astro":"pages/publications/_slug_.astro.mjs","\u0000@astro-page:src/pages/publications/index@_@astro":"pages/publications.astro.mjs","\u0000@astro-page:src/pages/research/[slug]@_@astro":"pages/research/_slug_.astro.mjs","\u0000@astro-page:src/pages/research/index@_@astro":"pages/research.astro.mjs","\u0000@astro-page:src/pages/resources@_@astro":"pages/resources.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_LIg13SpD.mjs","/tmp/GutmanLabDocumentation/src/pages/publications/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.l0sNRNKZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/tmp/GutmanLabDocumentation/src/pages/publications/index.astro?astro&type=script&index=0&lang.ts",""]],"assets":["/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/blog/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/people/about/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/publications/coverage/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/publications/pubmed-review/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/publications/scholar-bibtex/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/publications/unified/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/publications/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/research/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/resources/index.html","/GutmanLabDocumentation/file:///tmp/GutmanLabDocumentation/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"1EansZi5o/Ilpoqqeb4yqaFfbiJeX9wm8MlbEckQELE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
