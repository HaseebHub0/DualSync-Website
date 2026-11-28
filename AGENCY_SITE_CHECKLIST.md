# DualSync Agency Website — Launch & Quality Gate (`AGENCY_SITE_CHECKLIST.md`)

> **INSTRUCTION FOR AI AGENT (CLAUDE / CLAUDE CODE):**
> Use this checklist as a **pre-launch gate** for the agency website (`dualsyncagency.com`).
> 1. Audit the codebase, pages, metadata, forms, headers, and build output against every item below.
> 2. Mark an item `[x]` **only** after verifying it in code, build output, or live staging headers.
> 3. Do not declare the site ready for launch while any `BLOCKER` item remains unchecked.

## Site Metadata
- **Website:** `dualsyncagency.com`
- **Owner:** Muhammad Haseeb
- **Current Status:** `BLOCKED FOR LAUNCH`. Every code-side item is verified. The items still open need the owner (DNS records, account 2FA, a WhatsApp/calendar link, and a confirmed GitHub uptime run). They are listed under [What only the owner can do](#what-only-the-owner-can-do).
- **Audited:** 28 November 2026, branch `feat/mobile-pk-seo` (PR #5), staging `https://deploy-preview-5--dualsyncagency.netlify.app`, production `https://dualsyncagency.com`.

Evidence tags: **[code]** a file in this repo · **[build]** `npm run build` output in `dist/` · **[staging]** live request to the deploy preview · **[prod]** live request to dualsyncagency.com · **[lab]** headless Chrome / Lighthouse 13.6 run.

---

## 1. Design, UX & Conversion (`BLOCKER`)
- [x] **Clear Above-the-Fold Positioning:** The home `<h1>` reads "Software that runs your business while you sleep." The line under it covers what we build (AI agents, SaaS platforms, ERP systems) and who builds them. Primary CTAs are "Book a call" and "See the work". **[build]** `dist/index.html`
- [x] **Proof & Credibility:** A PaFood case study for Pak Asian Foods, Multan (`/pafood-case-study`, with an `Article` schema). A projects page with real screenshots of Pakasian ERP, PaFood, FilingKeeper and HiTasky (live on Google Play). An ERP-in-Pakistan page linking to that client work. No invented figures. **[code]** `pages/v3/PafoodCaseStudy.tsx`, `pages/v3/Projects.tsx`, `pages/v3/ErpPakistan.tsx`
- [x] **Mobile-First & Cross-Browser Responsiveness:** The audit covered 10 routes at 360/430 px and 11 routes at 360/430/768/1024 px. Horizontal overflow was 0 px on every route. Every visible control is hittable: 323 checked at 360 px and 378 at 1024 px. The only flag is the skip link, which is off-screen until focused by design. The menu, FAQ, video and form were all exercised. All tap targets are at least 24 px (WCAG 2.2 AA 2.5.8). **[lab]** Chrome only; not checked in Safari or Firefox.
- [x] **Accessibility (a11y) Basics:** Lighthouse accessibility 100 on mobile and desktop **[lab]**
  - [x] Proper color contrast ratios on text and buttons. Muted text was darkened to `#7d837f`; the Lighthouse contrast audit passes. **[code]** `styles/v3-premium.css`
  - [x] All meaningful images and icons have `alt` or `aria-label`. All 10 `<img>` in the built pages have `alt`; decorative duplicates are `aria-hidden`. **[build]**
  - [x] Full keyboard navigation works: a skip link to `<main>`, visible `:focus-visible` rings (white on blue sections), and a menu focus trap with Tab/Shift+Tab and Escape to close. **[code]** `components/v3/MobileMenu.tsx`, `App.tsx`
- [ ] **Frictionless Lead Capture:**
  - [x] The contact form works end to end. Required fields block an empty submit (4 required). The API returns clear errors (`400 "A valid email is required."`) and the page shows a confirmation state. A live test message was received earlier. **[staging]** **[lab]**
  - [ ] Direct fallback contact options. A `mailto:contact@dualsyncagency.com` link exists on the contact page and footer, but **there is no WhatsApp or calendar link yet**: it needs the owner's number or booking URL. Also, **the domain has no MX records**, so mail to contact@ cannot be delivered today (see section 2, DNS).
- [x] **Legal & Trust Pages:** `/privacy` and `/terms` are linked from every footer and describe what the site actually does: form data, rate-limit IPs, error reports, cookie-free counts, Netlify and Zoho as processors, deletion on request, Pakistani law. The footer shows the Rawalpindi, Pakistan address and the email. **[code]** `pages/v3/Legal.tsx` · **[staging]** both return 200. *A lawyer has not reviewed them.*

---

## 2. Security & Infrastructure (`BLOCKER`)
- [x] **HTTPS & SSL Enforcement:** `http://` and `www.` both 301 to `https://dualsyncagency.com/`. The certificate is Let's Encrypt and valid to 11 January 2027. CSP `upgrade-insecure-requests` is set, and the console shows no mixed-content warnings. **[prod]**
- [x] **HTTP Security Headers Configured** (`netlify.toml`, verified on **[staging]** with `curl -I`):
  - [x] `Content-Security-Policy`: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests`. There were zero CSP violations from the site on 15 routes. The only block was Netlify's own preview toolbar iframe, which production doesn't load.
  - [x] `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - [x] `X-Frame-Options: DENY` and `frame-ancestors 'none'`
  - [x] `X-Content-Type-Options: nosniff`
  - [x] `Referrer-Policy: strict-origin-when-cross-origin`
  - [x] `Permissions-Policy`: camera, microphone, geolocation, payment, usb, sensors and `interest-cohort` are all disabled. Also `Cross-Origin-Opener-Policy: same-origin`.
- [x] **Form & API Abuse Protection** (`netlify/functions/messages.mts`):
  - [x] Server-side validation and sanitisation: 20 KB body cap, email regex, length caps (name 120, email 254, type 80, message 5000) and control characters stripped. **[staging]** A bad email returns `400`.
  - [x] Rate limiting: 5 submissions per IP per 10 min, 10 logins per IP per 15 min, plus event and log buckets. **[staging]** Request 6 returned `429` with `Retry-After: 367`.
  - [x] Bot protection: a hidden honeypot field is checked first and gets a fake `200` without storing. **[staging]**
- [ ] **Secrets & Dependency Hygiene:**
  - [x] There are no keys, SMTP passwords or webhook URLs in the client bundle; secrets live only in Netlify env vars read by the function. No `.env` has ever been committed. *Git history does contain the old public Google Apps Script URL (in the deleted `AUTO_REPLY_SETUP.md`). It is not a secret, but the owner should archive that Apps Script deployment so it stops accepting requests.*
  - [x] `npm audit`: **0 critical, 0 high**. There are 2 moderate issues in `react-router` 6.x, fixable only with the v7 major upgrade; they are recorded as accepted risk.
  - [x] The admin inbox (`/admin`) has its password only on the server (timing-safe compare, HMAC session tokens with a 12 h expiry) and is login rate limited. **TOTP MFA is built in** and turns on when `ADMIN_TOTP_SECRET` is set (setup in `ADMIN_SETUP.md`). It is `noindex` and `no-store`. *The owner should set that variable to enforce MFA.*
- [ ] **Domain & Email Security (DNS):**
  - [ ] Registrar and Netlify accounts secured with 2FA. **Owner action:** this can't be verified from code.
  - [ ] `SPF`, `DKIM` and `DMARC`. **Missing.** Checked via dns.google on 28 Nov 2026: **no MX, no SPF, no DMARC, no `zmail._domainkey`**. DNS is on Netlify DNS (nsone.net). Records to add are listed at the end of this file.

---

## 3. Technical & On-Page SEO (`BLOCKER`)
- [x] **Unique Page Metadata:** All 18 public routes have unique titles of 50–60 characters and descriptions of 140–160 characters, checked by script on the built HTML (for example a journal post at 59/146). **[build]** The source is `data/seo.ts` (`META`).
- [x] **Heading & Semantic Structure:** Every page has exactly one `<h1>` and contains `<header>`, `<nav aria-label="Main">`, `<main id="main">`, `<section>` and `<footer>`. Section labels that were styled as headings are now real `<h2>`. **[build]**
- [x] **Crawlability & Indexing:**
  - [x] `/robots.txt` allows `/`, disallows `/admin` and `/api/`, explicitly allows AI crawlers and points to the sitemap. **[staging]** 200
  - [x] `/sitemap.xml` is generated on every build with all 18 canonical URLs. **[build]**
  - [x] `<link rel="canonical">` on every page. Trailing-slash variants 301 to the canonical (`/services/` → `/services`), and old `/work` and `/blog/*` URLs 301 to the new pages. **[staging]**
- [x] **Social & Open Graph Previews:** `og:title`, `og:description`, `og:image` (`/og-image.png`, **1200×630**), `og:url`, `twitter:card`, `twitter:title` and `twitter:image` are on every page. **[build]** *Not yet pasted into a live link-preview tool (LinkedIn Post Inspector, opengraph.xyz); do this once after merge.*
- [x] **Structured Data (JSON-LD):** 24 blocks on the top-level pages plus one per journal post; all parse. Types include `Organization`/`ProfessionalService`, `WebSite`, `Service`, `FAQPage`, `Article`, `BlogPosting`, `BreadcrumbList`, `Person`, `ContactPage`, `AboutPage` and `CollectionPage`. **[build]** *Run Google's Rich Results Test on the production URLs once after merge.*
- [x] **Clean URLs & Zero Broken Links:** All URLs are readable slugs. A script checked every internal `href` and `img src` across 18 pages: 0 broken. On staging, none of the 15 routes loaded a resource that failed or returned 4xx. Unknown URLs get a styled, helpful 404 page **with a real `404` status** (no soft 404). **[build]** **[staging]**

---

## 4. Performance & Core Web Vitals (`BLOCKER`)
- [x] **Image & Media Optimization:** All 10 `<img>` in the pages are WebP, with `width`/`height` and `loading="lazy"`. The founders' photos were cut from 700 KB+ JPEG to 7–54 KB WebP. About 118 MB of unused media moved out of `public/` into `archive/` (`public/` is now 7.4 MB). **[build]**
- [x] **Bundle & Asset Efficiency:** Old pages, components and 4 dependencies were removed (framer-motion, emailjs, shadcn, netlify). The main chunk is down to 58 KB (16 KB gzip), with React and GSAP in their own cacheable chunks and journal bodies split out. Fonts are self-hosted through @fontsource with `font-display: swap`, and all five above-the-fold faces are preloaded. **[build]**
- [x] **Caching & CDN:** Hashed assets under `/_app/*` are served `public,max-age=31536000,immutable` from Netlify's edge, `/assets/*` for one week, HTML revalidates, and `/admin` and `/api/*` are `no-store`. **[staging]**
- [ ] **Lighthouse / Core Web Vitals Targets** (Lighthouse 13.6, production build):
  - [x] Performance `>= 90`: **mobile 100, desktop 100** on the home page; `/services` and `/erp-software-pakistan` score 100 on mobile. **[lab]**
  - [ ] LCP `< 2.5s`, CLS `< 0.1`, INP `< 200ms`. Lab results: **LCP 0.8 s mobile and 0.4 s desktop, CLS 0, TBT 0–30 ms.** The fix was hydrating the prerendered HTML instead of re-rendering it, which took mobile LCP from 2.7 s to 0.8 s and desktop CLS from 0.10 to 0. INP can only be measured on real visits; the TBT proxy is very low. *Tick this after 28 days of field data in Search Console (Core Web Vitals) or PageSpeed Insights.*
  - [x] SEO and Best Practices `>= 95`: **100 and 100** on mobile and desktop. **[lab]**

---

## 5. Analytics, Lead Delivery & Operations (`BLOCKER`)
- [x] **Reliable Lead Notification & Storage:** Each submission is **stored first** in Netlify Blobs (`messages`) and then emailed as an alert over Zoho SMTP to `NOTIFY_TO`, with Reply-To set to the lead. A mail failure can't lose the lead, and the inbox at `/admin` shows every message. **[code]** *Alerts only arrive once the mailbox can receive mail: see the MX records under DNS.*
- [x] **Analytics & Conversion Tracking:** First-party and cookie-free. The site counts page views, CTA clicks (contact links and mailto), form submissions and outbound clicks into daily totals, with no IP or identifier. Do Not Track and Global Privacy Control are respected. The `/admin` stats panel shows the last 7 and 30 days and top pages. **[code]** `lib/analytics.ts` · **[staging]** `?a=event` returns 204 and `?a=stats` returns 401 without a token.
- [ ] **Uptime & Error Monitoring:**
  - [x] Runtime error logging: browser errors and unhandled rejections are beaconed to the function and appear as `[client-error]` in Netlify function logs (at most 5 per page, deduplicated). **[code]** `lib/errorReporter.ts`
  - [ ] External uptime monitor. `.github/workflows/uptime.yml` checks the home page and the API every 5 minutes from GitHub's servers and opens an `uptime` issue, which GitHub emails, when either fails. It **starts running once merged to `main`**; tick this after the first green scheduled run. For SMS or phone alerts, add UptimeRobot or Better Stack as well.
- [ ] **Google Search Console Ready:** A `google-site-verification` TXT record is present on the domain and the sitemap is generated. **Owner action:** confirm the property shows "Verified", then submit `https://dualsyncagency.com/sitemap.xml` after merge.

---

## What only the owner can do

1. **Email DNS (urgent: contact@ cannot receive mail today).** In Netlify → Domains → dualsyncagency.com → DNS records, add the values from Zoho Mail Admin → Domains → Email configuration:
   - MX `@` → `mx.zoho.com` (10), `mx2.zoho.com` (20), `mx3.zoho.com` (50). Use the `.eu`/`.in` hosts if your Zoho account is in that region.
   - SPF TXT `@` → `v=spf1 include:zohomail.com ~all`
   - DKIM TXT: the selector and key Zoho generates (for example `zmail._domainkey`).
   - DMARC TXT `_dmarc` → `v=DMARC1; p=none; rua=mailto:contact@dualsyncagency.com`. Raise it to `p=quarantine` after two clean weeks.
2. Turn on **2FA** at the domain registrar, Netlify, GitHub and Zoho.
3. In Netlify env vars, set **`ADMIN_TOTP_SECRET`** (enforces MFA on `/admin`) and **`NOTIFY_TO`**.
4. Send a **WhatsApp number or calendar link** (Calendly / Cal.com) to add as a contact fallback.
5. Archive the old **Google Apps Script** deployment and delete `VITE_GOOGLE_SCRIPT_URL` from Netlify.
6. After merge: submit the sitemap in Search Console, run the Rich Results Test and a link-preview check, and confirm the first green **Uptime** workflow run.
7. Confirm the social links (Instagram, Behance, LinkedIn company page), confirm client consent to show the ERP and PaFood screenshots, and have the Privacy Policy and Terms reviewed.

---

## Final Launch Sign-Off

| Audit Area | Status (`PASS` / `FAIL`) | Evidence / Notes | Checked By | Date |
| :--- | :--- | :--- | :--- | :--- |
| 1. Design, UX & Conversion | `FAIL` | Code side passes (a11y 100, 0 overflow at 360–1024 px, legal pages). Needs a WhatsApp/calendar fallback, and MX records so the email fallback works. | Claude Code | 28 Nov 2026 |
| 2. Security & Infrastructure | `FAIL` | Headers, HTTPS, rate limits, validation, honeypot, MFA-ready admin and npm audit all verified on staging. **SPF/DKIM/DMARC/MX missing**; account 2FA unverified. | Claude Code | 28 Nov 2026 |
| 3. Technical & On-Page SEO | `PASS` | 18 routes with unique titles and descriptions in range, one h1 each, canonical, OG and JSON-LD, real 404, 0 broken links, sitemap and robots. | Claude Code | 28 Nov 2026 |
| 4. Performance & Web Vitals | `FAIL` (pending field data) | Lighthouse 100/100/100/100 on mobile and desktop; lab LCP 0.8 s, CLS 0. INP needs real-user data. | Claude Code | 28 Nov 2026 |
| 5. Analytics & Lead Ops | `FAIL` | Store-then-alert, cookie-free analytics and error logging verified. Uptime workflow and Search Console sitemap go live after merge. | Claude Code | 28 Nov 2026 |

### Final Verdict
- [ ] **ALL `BLOCKER` ITEMS VERIFIED — APPROVED FOR PUBLIC LAUNCH**: not yet. Remaining: the owner items above (DNS email records, 2FA, WhatsApp/calendar link), plus post-merge confirmation of uptime, Search Console and field INP.
