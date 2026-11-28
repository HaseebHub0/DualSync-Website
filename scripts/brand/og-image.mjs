// Generates public/og-image.png (1200x630) for link previews.
// Usage: node scripts/brand/og-image.mjs   (sharp is a devDependency)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sharp = require('sharp');

const W = 1200, H = 630;
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b7bd6"/><stop offset="0.45" stop-color="#57a3e8"/>
      <stop offset="0.8" stop-color="#a8d5f0"/><stop offset="1" stop-color="#eef8f2"/>
    </linearGradient>
    <radialGradient id="cloud" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff" stop-opacity="0.95"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <ellipse cx="220" cy="600" rx="520" ry="120" fill="url(#cloud)"/>
  <ellipse cx="1020" cy="640" rx="600" ry="140" fill="url(#cloud)"/>
  <text x="148" y="122" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="700" fill="#fff" letter-spacing="-1">DualSync</text>
  <text x="80" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="600" fill="#fff" letter-spacing="-3">Software that runs</text>
  <text x="80" y="394" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="600" fill="#fff" letter-spacing="-3">your business <tspan font-family="Georgia, serif" font-style="italic" font-weight="400" fill="#eaf4ff">while you sleep.</tspan></text>
  <text x="80" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#ffffff" fill-opacity="0.92">AI agents · Custom SaaS · ERP systems · Mobile apps</text>
  <rect x="80" y="514" width="330" height="54" rx="27" fill="#0e1511"/>
  <text x="245" y="549" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#38e07b">dualsyncagency.com</text>
</svg>`;

const logo = await sharp('public/apple-touch-icon.png').resize(52, 52).png().toBuffer();
const mask = Buffer.from('<svg width="52" height="52"><rect width="52" height="52" rx="13" fill="#fff"/></svg>');
const roundLogo = await sharp(logo).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: roundLogo, left: 80, top: 82 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png');
console.log('wrote public/og-image.png');
