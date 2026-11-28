// Writes a static HTML file per public route into dist/, after `vite build`
// (client) and `vite build --ssr entry-server.tsx --outDir dist-ssr`.
//
//   /                 -> dist/index.html
//   /services         -> dist/services.html          (Netlify serves /services from it)
//   /journal/<slug>   -> dist/journal/<slug>.html
//
// Each file gets that route's <title>, description, canonical, Open Graph and
// JSON-LD, plus the rendered page inside #root.
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

// React warns that useLayoutEffect does nothing on the server; that is
// expected here (all motion runs in the browser), so keep the build log clean.
const origError = console.error;
console.error = (msg, ...rest) => {
  if (typeof msg === 'string' && msg.includes('useLayoutEffect does nothing on the server')) return;
  origError(msg, ...rest);
};

const { render, ALL_SEO, SITE, OG_IMAGE, FAQ, PK_FAQ, POSTS, SERVICES } = await import(pathToFileURL(ssrEntry).href);
let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// Preload the two body/heading font files (hashed names change per build), so
// text renders in the final font straight away and LCP is not held back.
const appDir = path.join(dist, '_app');
const preloadFonts = fs
  .readdirSync(appDir)
  .filter((f) => /^inter-tight-latin-(400|500)-normal-.*\.woff2$/.test(f))
  .map((f) => `    <link rel="preload" href="/_app/${f}" as="font" type="font/woff2" crossorigin />`);
if (preloadFonts.length) template = template.replace('</head>', `${preloadFonts.join('\n')}\n</head>`);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n</head>`);
}

let count = 0;
for (const seo of ALL_SEO) {
  const url = `${SITE}${seo.path === '/' ? '/' : seo.path}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(seo.title)}</title>`);
  html = setMeta(html, 'name', 'description', seo.description);
  html = setMeta(html, 'property', 'og:title', seo.title);
  html = setMeta(html, 'property', 'og:description', seo.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:type', seo.ogType ?? 'website');
  html = setMeta(html, 'property', 'og:image', OG_IMAGE);
  html = setMeta(html, 'property', 'twitter:title', seo.title);
  html = setMeta(html, 'property', 'twitter:description', seo.description);
  html = setMeta(html, 'property', 'twitter:url', url);
  html = setMeta(html, 'property', 'twitter:image', OG_IMAGE);

  const canonical = `<link rel="canonical" href="${url}" />`;
  html = /<link\s+rel="canonical"[^>]*>/i.test(html)
    ? html.replace(/<link\s+rel="canonical"[^>]*>/i, canonical)
    : html.replace('</head>', `    ${canonical}\n</head>`);

  if (seo.schema?.length) {
    const json = JSON.stringify(seo.schema).replace(/</g, '\\u003c');
    html = html.replace('</head>', `    <script type="application/ld+json" id="page-schema-ld">${json}</script>\n</head>`);
  }

  const body = render(seo.path);
  if (!body || body.length < 200) throw new Error(`Empty render for ${seo.path}`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const file = seo.path === '/' ? 'index.html' : `${seo.path.slice(1)}.html`;
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  count++;
}

// ── 404.html: Netlify serves it with a real 404 status for unknown URLs ─────
{
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>Page not found | DualSync</title>');
  html = setMeta(html, 'name', 'description', 'This page does not exist.');
  html = setMeta(html, 'name', 'robots', 'noindex, nofollow');
  html = html.replace('<div id="root"></div>', `<div id="root">${render('/this-page-does-not-exist')}</div>`);
  fs.writeFileSync(path.join(dist, '404.html'), html);
}

// ── Trailing-slash variants 301 to the canonical URL ─────────────────────────
fs.writeFileSync(
  path.join(dist, '_redirects'),
  ALL_SEO.filter((s) => s.path !== '/').map((s) => `${s.path}/  ${s.path}  301`).join('\n') + '\n',
);

// ── sitemap.xml (generated from the same route list) ─────────────────────────
const today = new Date().toISOString().slice(0, 10);
const prio = (p) => (p === '/' ? '1.0' : p.startsWith('/journal/') ? '0.6' : ['/services', '/projects'].includes(p) ? '0.9' : '0.7');
const lastmodFor = (p) => (p.startsWith('/journal/') ? POSTS.find((x) => `/journal/${x.slug}` === p)?.updated ?? today : today);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ALL_SEO.map((s) => `  <url>
    <loc>${SITE}${s.path}</loc>
    <lastmod>${lastmodFor(s.path)}</lastmod>
    <priority>${prio(s.path)}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// ── llms.txt (https://llmstxt.org): a plain summary for AI assistants ────────
const page = (p) => ALL_SEO.find((s) => s.path === p);
const llms = `# DualSync

> DualSync is a two-founder AI and SaaS engineering studio based in Rawalpindi, Pakistan, working with clients worldwide since 2022. Muhammad Haseeb (founder) and Muhammad Siddique (co-founder) design, build and run AI agents, Voice AI, custom SaaS platforms, ERP systems and offline-first mobile apps. Clients talk directly to the people writing the code, and a founder replies to every message within one business day.

Contact: contact@dualsyncagency.com · ${SITE}/contact

## For businesses in Pakistan

DualSync is a software house in Rawalpindi, Pakistan that builds custom ERP software, field sales and order booking apps, and AI automation for Pakistani companies, especially FMCG, distribution, manufacturing and retail. Its systems have been in production at Pak Asian Foods, an FMCG company in Multan, since 2022: Pakasian ERP (procurement, inventory, warehouse, sales, manufacturing and finance) and the PaFood sales system (an offline-first Android order app for order bookers and salesmen, a web admin, and a KPO desk that verifies every order). It works remotely with companies across Pakistan and worldwide.

Details: ${SITE}/erp-software-pakistan

${PK_FAQ.map(({ q, a }) => `### ${q}\n${a}`).join('\n\n')}

## Services

${SERVICES.map(([n, d]) => `- ${n}: ${d}`).join('\n')}

## Key pages

${['/', '/services', '/erp-software-pakistan', '/projects', '/pafood-case-study', '/process', '/about', '/journal', '/contact']
  .map((p) => `- [${page(p).title}](${SITE}${p === '/' ? '/' : p}): ${page(p).description}`)
  .join('\n')}

## Selected work

- PaFood (Pak Asian Foods, Multan): an Android order app for order bookers and salesmen that works offline and syncs when signal returns, a web admin for orders, routes, targets and team performance, and a KPO desk that verifies every order before dispatch. Case study: ${SITE}/pafood-case-study
- Pakasian ERP: procurement, inventory, warehouse, sales, manufacturing and finance for Pak Asian Foods, Multan.
- AI dental receptionist: a phone agent that answers, books appointments and syncs every call through n8n.
- HiTasky: a task manager you buy once, on Google Play.
- FilingKeeper: statutory deadline tracking for UK accounting practices (early access).

## How an engagement works

1. Listen (week 1): a written scope and a fixed quote.
2. Architect (week 2): clickable screens and a build plan.
3. Build (week 3 onward): a working build to try every Friday.
4. Run (ongoing): hosting, monitoring and improvements.

## Frequently asked questions

${FAQ.map(({ q, a }) => `### ${q}\n${a}`).join('\n\n')}

## Journal

${POSTS.map((p) => `- [${p.title}](${SITE}/journal/${p.slug}): ${p.answer}`).join('\n')}
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerendered ${count} routes, wrote sitemap.xml (${ALL_SEO.length} urls) and llms.txt`);
