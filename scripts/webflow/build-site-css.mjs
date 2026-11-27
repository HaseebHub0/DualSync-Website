// Regenerates styles/site.css from dualsync-export.json.
// Usage: node scripts/webflow/build-site-css.mjs .
import fs from 'fs';
import path from 'path';
const root = process.argv[2];
const exp = JSON.parse(fs.readFileSync(path.join(root, 'dualsync-export.json'), 'utf8'));

const IMG = {
  'dualsync-logo.png': '/logo-mark.webp',
  'haseeb.jpeg': '/assets/haseeb.jpeg',
  'siddique.jpeg': '/assets/siddique.jpeg',
  'founders-together.jpeg': '/assets/founder_and_cofounder_together.jpeg',
  'kiran.jpeg': '/assets/kiran-400.webp',
  'sajid-rahim.jpeg': '/assets/sajid-400.webp',
};
let css = exp.css.replace(/https:\/\/cdn\.prod\.website-files\.com\/[^)"' ]*?_([\w.-]+)/g, (m, file) => {
  if (!IMG[file]) throw new Error('unmapped image ' + file);
  return IMG[file];
});
if (/website-files/.test(css)) throw new Error('cdn url left');
css = css.replace(/\.sx-form,\s*\.sx-form\._w-form/g, '.sx-form');
css = css.replace(/\}\s*(?=[.@])/g, '}\n');

const head = `/*
 * DualSync v3 — generated from the Webflow export (dualsync-export.json → css).
 * Only the .ds- (home) and .sx- (inner pages) rules are kept; Webflow's own
 * base CSS is not shipped. Image URLs point at local files in /public.
 */

/* ---- Reset (replaces Webflow's normalize) ---- */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background-color: #fff;
  color: #1a1b1f;
  font-family: "Inter Tight", sans-serif;
  font-size: 16px;
  line-height: 28px;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
img { max-width: 100%; vertical-align: middle; display: block; border: 0; }
a { color: inherit; display: block; text-decoration: underline; transition: opacity 0.2s; }
button, input, select, textarea { font: inherit; color: inherit; margin: 0; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

/* Element defaults the Webflow design was built on top of (Webflow base +
   site-level type settings), so unclassed margins/sizes match the reference. */
h1 { margin: 20px 0 15px; font-size: 44px; line-height: 62px; font-weight: 400; }
h2 { margin: 10px 0; font-size: 36px; line-height: 50px; font-weight: 400; }
h3 { margin: 10px 0; font-size: 30px; line-height: 46px; font-weight: 400; }
h4 { margin: 10px 0; font-size: 24px; line-height: 38px; font-weight: 400; }
h5 { margin: 10px 0; font-size: 20px; line-height: 34px; font-weight: 500; }
h6 { margin: 10px 0; font-size: 16px; line-height: 28px; font-weight: 500; }
p { margin: 0 0 10px; }
ul { margin: 20px 0 10px; padding-left: 40px; list-style-type: disc; }
li { margin-bottom: 10px; }
label { display: block; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; font-size: 12px; font-weight: 500; line-height: 20px; }
blockquote { border-left: 5px solid #e2e2e2; margin: 25px 0; padding: 15px 30px; font-size: 20px; line-height: 34px; }
figure { margin: 0 0 10px; }

/* Form-control defaults (stand-ins for .w-input / .w-select / .w-button). */
.sx-input { margin-bottom: 10px; line-height: 1.42857; vertical-align: middle; }
.sx-submit { display: inline-block; border: 0; padding: 9px 15px; line-height: inherit; text-decoration: none; -webkit-appearance: button; appearance: button; }

/* ---- Export ---- */
`;

const tail = `

/* ---- Additions (not in the export) ---- */

/* Form result blocks (Webflow's .w-form-done / .w-form-fail). */
.sx-form-done { padding: 20px; text-align: center; background-color: #ddd; }
.sx-form-fail { margin-top: 10px; padding: 10px; background-color: #ffdede; }
.sx-submit:disabled { cursor: progress; opacity: 0.7; }

/* Clip decorative overflow (clouds, rings, wordmark) so nothing scrolls sideways. */
.ds-hero, .ds-cta-wrap, .ds-cta, .sx-ph, .sx-foot { overflow: hidden; }
.sx-page, .ds-page { overflow-x: clip; }

/* Mobile menu */
.v3-burger { display: none; position: relative; z-index: 11; flex: none; width: 36px; height: 36px; margin-left: 12px; padding: 0; border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 999px; background: rgba(14, 21, 17, 0.22); backdrop-filter: blur(10px); cursor: pointer; }
.v3-burger span { position: absolute; left: 10px; right: 10px; height: 2px; border-radius: 2px; background: #fff; transition: transform 0.3s, opacity 0.3s; }
.v3-burger span:nth-child(1) { top: calc(50% - 6px); }
.v3-burger span:nth-child(2) { top: calc(50% - 1px); }
.v3-burger span:nth-child(3) { top: calc(50% + 4px); }
.ds-nav > .v3-burger { width: 40px; height: 40px; }
.v3-burger[aria-expanded="true"] span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
.v3-burger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.v3-burger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }
.v3-menu { position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 96px 28px 40px; color: #fff; font-family: "Inter Tight", sans-serif; background-image: linear-gradient(rgb(43, 123, 214) 0%, rgb(87, 163, 232) 55%, rgb(168, 213, 240) 100%); }
.v3-menu[hidden] { display: none; }
.v3-menu-close { position: absolute; top: 18px; right: 20px; }
.v3-menu-link { color: #fff; text-decoration: none; font-size: 40px; font-weight: 500; letter-spacing: -0.04em; line-height: 1.15; }
.v3-menu-link[aria-current="page"] { color: rgb(56, 224, 123); }
.v3-menu-cta { margin-top: 28px; align-self: flex-start; color: rgb(8, 20, 13); background: rgb(56, 224, 123); text-decoration: none; border-radius: 999px; padding: 14px 26px; font-weight: 600; }
.v3-lock { overflow: hidden; }
.v3-skip { position: absolute; left: 12px; top: -60px; z-index: 200; padding: 10px 16px; background: #08140d; color: #fff; border-radius: 8px; text-decoration: none; }
.v3-skip:focus { top: 12px; }

@media screen and (max-width: 991px) {
  .v3-burger { display: block; }
  .ds-nav > .ds-btn-green, .sx-nav > .sx-cta { margin-left: auto; }
}
@media screen and (max-width: 479px) {
  /* Logo + CTA + burger don't fit on small phones; the CTA lives in the menu panel.
     (The card arc needs no fix: the export's own breakpoints drop cards
     until only the centre card is left, so it never overflows.) */
  .ds-nav > .ds-btn-green, .sx-nav > .sx-cta { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; }
}

/* 404 */
.v3-404 { min-height: 70vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }

/* Accessibility: the tech strip's #9aa09c on white is 2.66:1. Nearest grey
   that clears WCAG AA (4.5:1) at this size. Only colour changed from the export. */
.ds-logo-txt { color: #6f7571; }

/* Performance: the blurred clouds drift continuously; give them their own
   compositor layer so the 18px blur is rasterised once, not every frame. */
.ds-cloud { will-change: transform; }

/* Footer wordmark: .sx-green is a soft white (made for the blue heroes), so
   "Sync" vanished on the white footer. Pale green, same weight as "Dual". */
.sx-wordmark .sx-green { color: #b9eccc; }

/* Creative production cards with real media. */
.sx-cr-video, .sx-cr-link { width: 100%; padding: 0; border: 0; cursor: pointer; font: inherit; color: inherit; text-decoration: none; }
.sx-cr-video { background-color: rgb(8, 20, 13); }
.sx-cr-video video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.sx-cr-video .sx-play { position: relative; z-index: 1; box-shadow: 0 10px 30px -10px rgba(8, 20, 13, 0.5); }
.sx-cr-video:focus-visible, .sx-cr-link:focus-visible { outline: 3px solid rgb(13, 122, 63); outline-offset: 4px; }
.sx-cr-badge { position: absolute; left: 20px; bottom: 18px; padding: 6px 12px; border-radius: 999px; background: rgba(244, 247, 242, 0.85); color: rgb(8, 20, 13); font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
`;

fs.writeFileSync(path.join(root, 'styles', 'site.css'), head + css + tail);
console.log('site.css', (head + css + tail).length);
