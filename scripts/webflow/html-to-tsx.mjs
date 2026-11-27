// Converter used to create pages/v3/*.tsx from dualsync-export.json.
// Usage: node scripts/webflow/html-to-tsx.mjs . <outDirForNavFooterDump>
// NOTE: the pages were hand-edited after generation (Contact form wiring,
// Home mobile menu), so re-running overwrites those edits. Diff before keeping.
import fs from 'fs';
import path from 'path';

const root = process.argv[2];
const exp = JSON.parse(fs.readFileSync(path.join(root, 'dualsync-export.json'), 'utf8'));

const VOID = new Set(['input', 'br', 'img', 'hr', 'meta', 'link', 'source']);
const DROP_CLASSES = new Set(['w-inline-block', 'w--current', 'w-form', 'w-input', 'w-select', 'w-button']);
const ATTR_MAP = { class: 'className', for: 'htmlFor', maxlength: 'maxLength', tabindex: 'tabIndex', readonly: 'readOnly', autocomplete: 'autoComplete' };
const BOOL = new Set(['required', 'disabled', 'checked', 'selected', 'readonly']);

function parse(html) {
  const rootNode = { tag: '#root', attrs: [], children: [] };
  const stack = [rootNode];
  const re = /<\/?([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g;
  let m;
  while ((m = re.exec(html))) {
    const top = stack[stack.length - 1];
    if (m[3] !== undefined) { top.children.push({ text: m[3] }); continue; }
    const full = m[0];
    const tag = m[1].toLowerCase();
    if (full.startsWith('</')) {
      while (stack.length > 1 && stack.pop().tag !== tag) { /* auto-close */ }
      continue;
    }
    const attrs = [];
    const are = /([^\s=/]+)(?:="([^"]*)")?/g;
    let a;
    while ((a = are.exec(m[2]))) attrs.push([a[1], a[2]]);
    const node = { tag, attrs, children: [] };
    top.children.push(node);
    if (!VOID.has(tag) && !full.endsWith('/>')) stack.push(node);
  }
  return rootNode;
}

const escText = (t) => t.replace(/[{}]/g, (c) => `{'${c}'}`);
const escAttr = (v) => v.replace(/"/g, '&quot;');

function attrsToJsx(node) {
  const out = [];
  let isLink = false;
  for (let [k, v] of node.attrs) {
    if (k === 'aria-current' || k.startsWith('data-wf') || k === 'data-name') continue;
    if (k === 'class') {
      v = v.split(/\s+/).filter((c) => c && !DROP_CLASSES.has(c)).join(' ');
      if (!v) continue;
    }
    if (node.tag === 'a' && k === 'href' && v && v.startsWith('/')) { isLink = true; out.push(`to="${escAttr(v)}"`); continue; }
    const name = ATTR_MAP[k] || k;
    if (BOOL.has(k) && (v === '' || v === undefined || v === k)) { out.push(name); continue; }
    if (v === undefined) { out.push(name); continue; }
    if (name === 'maxLength' || name === 'tabIndex') { out.push(`${name}={${Number(v)}}`); continue; }
    out.push(`${name}="${escAttr(v)}"`);
  }
  return { attrs: out, isLink };
}

const hasText = (n) => n.children.some((c) => c.text !== undefined && c.text.trim() !== '');

function renderInline(n) {
  if (n.text !== undefined) return escText(n.text);
  const { attrs, isLink } = attrsToJsx(n);
  const tag = isLink ? 'Link' : n.tag;
  const open = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
  if (VOID.has(n.tag) || n.children.length === 0) return `${open} />`;
  return `${open}>${n.children.map(renderInline).join('')}</${tag}>`;
}

function render(n, ind) {
  const pad = '  '.repeat(ind);
  if (n.text !== undefined) return n.text.trim() ? pad + escText(n.text.trim()) : '';
  if (hasText(n) || n.children.length === 0 || n.tag === 'textarea') return pad + renderInline(n);
  const { attrs, isLink } = attrsToJsx(n);
  const tag = isLink ? 'Link' : n.tag;
  const kids = n.children.map((c) => render(c, ind + 1)).filter(Boolean).join('\n');
  return `${pad}<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>\n${kids}\n${pad}</${tag}>`;
}

const PAGES = {
  '/': 'Home', '/services': 'Services', '/projects': 'Projects', '/pafood-case-study': 'PafoodCaseStudy',
  '/process': 'Process', '/about': 'About', '/journal': 'Journal', '/careers': 'Careers', '/contact': 'Contact',
};

const outDir = path.join(root, 'pages', 'v3');
fs.mkdirSync(outDir, { recursive: true });
const meta = {};

for (const [p, name] of Object.entries(PAGES)) {
  const page = exp.pages[p];
  meta[p] = { title: page.title, description: page.desc };
  const tree = parse(page.html);
  const inner = p !== '/';
  // Replace the shared inner-page chrome with component markers.
  const swap = (node) => {
    node.children = node.children.map((c) => {
      if (inner && c.tag === 'header' && c.attrs.some(([k, v]) => k === 'class' && /\bsx-nav\b/.test(v))) return { marker: '<Nav />' };
      if (inner && c.tag === 'footer' && c.attrs.some(([k, v]) => k === 'class' && /\bsx-foot\b/.test(v))) return { marker: '<Footer />' };
      if (c.children) swap(c);
      return c;
    });
  };
  swap(tree);
  const body = tree.children
    .map((c) => {
      const walk = (n, ind) => {
        if (n.marker) return '  '.repeat(ind) + n.marker;
        if (n.text !== undefined || hasText(n) || !n.children || n.children.length === 0 || n.tag === 'textarea') return render(n, ind);
        const { attrs, isLink } = attrsToJsx(n);
        const tag = isLink ? 'Link' : n.tag;
        const kids = n.children.map((k) => walk(k, ind + 1)).filter(Boolean).join('\n');
        return `${'  '.repeat(ind)}<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>\n${kids}\n${'  '.repeat(ind)}</${tag}>`;
      };
      return walk(c, 3);
    })
    .filter(Boolean)
    .join('\n');

  const usesLink = /<Link\b/.test(body);
  const imports = [
    `import React, { useRef } from 'react';`,
    usesLink ? `import { Link } from 'react-router-dom';` : null,
    inner && body.includes('<Nav />') ? `import Nav from '../../components/v3/Nav';` : null,
    inner && body.includes('<Footer />') ? `import Footer from '../../components/v3/Footer';` : null,
    `import { useSEO } from '../../hooks/useSEO';`,
    `import { useV3Motion } from '../../hooks/useV3Motion';`,
  ].filter(Boolean).join('\n');

  const src = `${imports}

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["${p}"]). */
const ${name}: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({
    title: ${JSON.stringify(page.title)},
    description: ${JSON.stringify(page.desc)},
    canonical: ${JSON.stringify(p)},
  });
  useV3Motion(root);

  return (
    <div ref={root} className="${inner ? 'sx-page' : 'ds-page'}">
${body}
    </div>
  );
};

export default ${name};
`;
  fs.writeFileSync(path.join(outDir, `${name}.tsx`), src);
  console.log('wrote', name, src.length);
}

// Dump one inner nav + footer as JSX for the shared components.
const svc = parse(exp.pages['/contact'].html);
const find = (n, pred) => { if (pred(n)) return n; for (const c of n.children || []) { const r = find(c, pred); if (r) return r; } return null; };
const nav = find(svc, (n) => n.tag === 'header');
const foot = find(svc, (n) => n.tag === 'footer');
fs.writeFileSync(path.join(process.argv[3] || '.', 'nav.jsx.txt'), render(nav, 2));
fs.writeFileSync(path.join(process.argv[3] || '.', 'footer.jsx.txt'), render(foot, 2));
