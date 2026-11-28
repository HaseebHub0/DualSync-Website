# DualSync Agency website

Source for [dualsyncagency.com](https://dualsyncagency.com): React 18 + Vite +
TypeScript, GSAP motion, hosted on Netlify with one Netlify Function for the
contact form and admin inbox.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | install dependencies |
| `npm run dev` | local dev server (no functions; the form cannot submit) |
| `npx netlify dev` | dev server with the form API and `/admin` working |
| `npm run typecheck` | TypeScript check |
| `npm run build` | client build, SSR build, then prerender every route to static HTML |
| `npm run preview` | serve the built `dist/` |

## How it fits together

- `pages/v3/` are the pages, `components/v3/` the shared nav, menu and footer.
- `data/seo.ts` is the single source for titles, descriptions, canonical URLs
  and JSON-LD. `scripts/prerender.mjs` writes them into each route's HTML,
  plus `404.html`, `sitemap.xml`, `llms.txt` and `_redirects`.
- `netlify.toml` holds the security headers (CSP, HSTS and others), caching
  and redirects.
- `netlify/functions/messages.mts` is the form API, admin inbox, error log and
  analytics. Setup and environment variables: [ADMIN_SETUP.md](ADMIN_SETUP.md).
- Launch audit and evidence: [AGENCY_SITE_CHECKLIST.md](AGENCY_SITE_CHECKLIST.md).

Deploys go out from `main`; every pull request gets a Netlify deploy preview.
