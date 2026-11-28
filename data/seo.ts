/**
 * Single source of truth for every route's <head>: title, description and
 * JSON-LD. Used at runtime by useSEO and at build time by the prerender
 * script, so what a crawler or AI engine reads matches what a visitor sees.
 *
 * Every fact here is already stated on the site. Do not add claims here that
 * the pages do not make.
 */
import { POSTS, POST_AUTHORS, getPost, type Post } from './journal';

export const SITE = 'https://dualsyncagency.com';
export const OG_IMAGE = `${SITE}/og-image.png`;
const ORG_ID = `${SITE}/#organization`;

export type Seo = {
  path: string;
  title: string;
  description: string;
  schema: object[];
  ogType?: 'website' | 'article';
};

const crumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...items].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE}${path}`,
  })),
});

const webPage = (path: string, name: string, description: string, type = 'WebPage') => ({
  '@context': 'https://schema.org',
  '@type': type,
  '@id': `${SITE}${path}#webpage`,
  url: `${SITE}${path}`,
  name,
  description,
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': ORG_ID },
  inLanguage: 'en',
});

/** Questions answered on /process (visible on the page, mirrored here). */
/** Questions answered on /erp-software-pakistan (visible there, mirrored as FAQPage). */
export const PK_FAQ: { q: string; a: string }[] = [
  { q: 'Who builds custom ERP software for companies in Pakistan?', a: 'DualSync, a two-founder software studio in Rawalpindi, builds custom ERP systems, field sales apps and AI automation for Pakistani companies. Its ERP and sales systems have run in production at Pak Asian Foods in Multan since 2022.' },
  { q: 'Have you built an ERP for a Pakistani company before?', a: 'Yes. For Pak Asian Foods, an FMCG company in Multan, we built Pakasian ERP (procurement, inventory, warehouse, sales, manufacturing and finance) and the PaFood sales system: an Android order app for order bookers and salesmen, a web admin and a KPO desk that verifies every order before dispatch. Three systems are in production and the partnership has run for four years.' },
  { q: 'Can the app work where mobile signal is weak?', a: 'Yes. The PaFood order app is offline-first: orders, visits and payments are saved on the phone and sent when the network returns, and each record reaches the server exactly once.' },
  { q: 'Do you work with companies outside Rawalpindi and Islamabad?', a: 'Yes. We work remotely with companies across Pakistan and worldwide. Our longest-running client is in Multan.' },
  { q: 'Is it an off-the-shelf ERP?', a: 'No. Each system is designed around how your business already runs, and you own the source code, infrastructure, accounts and data from day one.' },
  { q: 'How do we start?', a: 'Send two questions and your email through the contact page. A founder replies within one business day. In the first week we map how your business runs and give you a written scope and a fixed quote.' },
];

export const FAQ: { q: string; a: string }[] = [
  { q: 'Who will I actually work with?', a: 'The two founders, Muhammad Haseeb and Muhammad Siddique. There are no account managers: you talk to the people writing the code, from the first call to launch day and after.' },
  { q: 'How soon will I see working software?', a: 'In week one we map how your business runs and give you a written scope and a fixed quote. In week two you get clickable screens and a build plan. From week three you get a working build you can try every Friday.' },
  { q: 'How is the price decided?', a: 'After the first week. Once the scope is written down you get a fixed quote, so you know the cost before the build starts.' },
  { q: 'Who owns the code and the data?', a: 'You do. Source code, infrastructure, accounts and data are yours from day one.' },
  { q: 'What happens after launch?', a: 'We host, monitor and improve the system as your team grows, so it keeps up with the business.' },
  { q: 'How quickly do you reply?', a: 'A founder replies to every message within one business day.' },
  { q: 'Where are you based?', a: 'In Rawalpindi, Pakistan, working with clients worldwide since 2022.' },
];

/** Questions answered on the home page (visible there, mirrored as FAQPage). */
export const HOME_FAQ: { q: string; a: string }[] = [
  { q: 'What does DualSync build?', a: 'Custom ERP systems, AI agents and Voice AI, SaaS platforms, and mobile apps for businesses. Each system is designed and engineered end to end by the two founders, Muhammad Haseeb and Muhammad Siddique.' },
  PK_FAQ[1],
  FAQ[0],
  FAQ[1],
  FAQ[2],
  FAQ[3],
  FAQ[4],
  { q: 'Can I message you on WhatsApp?', a: 'Yes. Message us on WhatsApp at +92 310 7951063, use the contact form, or email contact@dualsyncagency.com. A founder replies within one business day.' },
];

export const SERVICES: [string, string][] = [
  ['AI agents', 'Agents that handle support, lead routing and back-office work, with a human in the loop where it matters.'],
  ['Voice AI', 'Phone agents that answer every call, qualify, book and write it all back to your systems.'],
  ['Custom SaaS', 'Multi-tenant platforms with billing, roles and dashboards, built to scale from day one.'],
  ['ERP and enterprise systems', 'Inventory, production, sales and finance in one system your whole team actually uses.'],
  ['Mobile apps', 'React Native and Flutter apps that work offline and sync when the signal comes back.'],
  ['n8n automation', 'Custom nodes, lead routing, invoices and reports, self-hosted on AWS or Hetzner.'],
  ['WhatsApp systems', 'Order and shipping updates, routing, a shared inbox and broadcasts on the official Cloud API.'],
  ['Product design', 'Prototypes, dashboards and mobile-first user journeys in Figma.'],
  ['3D and motion', 'Product renders, character animation and Unreal environments.'],
];

const person = (name: string, jobTitle: string, image: string) => ({
  '@type': 'Person',
  name,
  jobTitle,
  image: `${SITE}${image}`,
  worksFor: { '@id': ORG_ID },
});

const postSchema = (p: Post) => [
  {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE}/journal/${p.slug}#article`,
    headline: p.title,
    description: p.description,
    abstract: p.answer,
    datePublished: p.published,
    dateModified: p.updated,
    articleSection: p.category,
    keywords: p.topic,
    image: OG_IMAGE,
    inLanguage: 'en',
    mainEntityOfPage: `${SITE}/journal/${p.slug}`,
    author: POST_AUTHORS.map((name) => ({ '@type': 'Person', name, worksFor: { '@id': ORG_ID } })),
    publisher: { '@id': ORG_ID },
  },
  crumbs([['Journal', '/journal'], [p.title, `/journal/${p.slug}`]]),
];

const STATIC: Seo[] = [
  {
    path: '/',
    title: 'DualSync | Custom ERP, AI agents and SaaS, built by two founders in Pakistan',
    description: 'AI agents, SaaS platforms and ERP systems, designed and engineered end to end by the two founders you actually talk to.',
    schema: [
      webPage('/', 'DualSync — AI & SaaS engineering studio', 'AI agents, SaaS platforms and ERP systems, designed and engineered end to end by the two founders you actually talk to.'),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: HOME_FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  },
  {
    path: '/services',
    title: 'Services: AI agents, Voice AI, custom SaaS and ERP | DualSync',
    description: 'AI agents, Voice AI, custom SaaS, enterprise systems and mobile apps, built by the two founders you talk to.',
    schema: [
      webPage('/services', 'Services', 'AI agents, Voice AI, custom SaaS, enterprise systems and mobile apps, built by the two founders you talk to.'),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'DualSync services',
        itemListElement: SERVICES.map(([name, description], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'Service', name, description, provider: { '@id': ORG_ID }, areaServed: 'Worldwide' },
        })),
      },
      crumbs([['Services', '/services']]),
    ],
  },
  {
    path: '/projects',
    title: 'Work: ERP, field apps, AI and SaaS in production | DualSync',
    description: 'Systems that run real businesses: ERP, storefronts, mobile apps and AI.',
    schema: [webPage('/projects', 'Work', 'Systems that run real businesses: ERP, storefronts, mobile apps and AI.', 'CollectionPage'), crumbs([['Work', '/projects']])],
  },
  {
    path: '/pafood-case-study',
    title: 'PaFood case study: replacing paper and WhatsApp orders | DualSync',
    description: 'How DualSync replaced paper and WhatsApp orders with one system for Pak Asian Foods in Multan, Pakistan.',
    schema: [
      {
        ...webPage('/pafood-case-study', 'PaFood case study', 'How DualSync replaced paper and WhatsApp orders with one system for Pak Asian Foods in Multan, Pakistan.'),
        about: { '@type': 'Organization', name: 'Pak Asian Foods', address: { '@type': 'PostalAddress', addressLocality: 'Multan', addressCountry: 'PK' } },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${SITE}/pafood-case-study#article`,
        headline: 'PaFood: from paper and WhatsApp orders to one system',
        description: 'How DualSync replaced paper and WhatsApp orders at Pak Asian Foods in Multan with an offline-first order app, a web admin and a KPO desk.',
        articleSection: 'Case study',
        datePublished: '2026-11-27',
        dateModified: '2026-11-28',
        image: [`${SITE}/assets/work/pafood-overview.webp`, `${SITE}/assets/work/pafood-analytics.webp`],
        inLanguage: 'en',
        mainEntityOfPage: `${SITE}/pafood-case-study`,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        about: { '@type': 'Organization', name: 'Pak Asian Foods', address: { '@type': 'PostalAddress', addressLocality: 'Multan', addressCountry: 'PK' } },
      },
      crumbs([['Work', '/projects'], ['PaFood case study', '/pafood-case-study']]),
    ],
  },
  {
    path: '/process',
    title: 'Process: Listen, Architect, Build, Run | DualSync',
    description: 'Listen, Architect, Build, Run. How the work actually happens, and the answers to the questions people ask before starting.',
    schema: [
      webPage('/process', 'Process', 'Listen, Architect, Build, Run. How the work actually happens.'),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
      crumbs([['Process', '/process']]),
    ],
  },
  {
    path: '/about',
    title: 'Team: two founders, zero handoffs | DualSync',
    description: 'Two founders, zero handoffs. Meet the DualSync team.',
    schema: [
      {
        ...webPage('/about', 'Team', 'Two founders, zero handoffs. Meet the DualSync team.', 'AboutPage'),
        mainEntity: {
          '@id': ORG_ID,
          '@type': 'Organization',
          employee: [
            person('Muhammad Haseeb', 'Founder', '/assets/haseeb-720.webp'),
            person('Muhammad Siddique', 'Co-founder', '/assets/siddique-720.webp'),
            person('Kiran Haroon', 'Video and social', '/assets/kiran-400.webp'),
            person('Sajid Rahim', '3D artist and animator', '/assets/sajid-400.webp'),
          ],
        },
      },
      crumbs([['Team', '/about']]),
    ],
  },
  {
    path: '/journal',
    title: 'Journal: engineering notes on AI agents, SaaS and ERP | DualSync',
    description: 'Engineering notes on AI agents, SaaS and enterprise systems, and what broke.',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE}/journal#blog`,
        url: `${SITE}/journal`,
        name: 'DualSync Journal',
        description: 'Engineering notes on AI agents, SaaS and enterprise systems, and what broke.',
        publisher: { '@id': ORG_ID },
        blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}/journal/${p.slug}`, datePublished: p.published })),
      },
      crumbs([['Journal', '/journal']]),
    ],
  },
  {
    path: '/careers',
    title: 'Careers: we hire rarely | DualSync',
    description: 'We hire rarely. Show us something you built.',
    schema: [webPage('/careers', 'Careers', 'We hire rarely. Show us something you built.'), crumbs([['Careers', '/careers']])],
  },
  {
    path: '/erp-software-pakistan',
    title: 'Custom ERP software company in Pakistan | DualSync',
    description: 'DualSync builds custom ERP, field sales apps and AI automation for businesses in Pakistan. In production at Pak Asian Foods, Multan, since 2022.',
    schema: [
      webPage('/erp-software-pakistan', 'Custom ERP software in Pakistan', 'DualSync builds custom ERP, field sales apps and AI automation for businesses in Pakistan. In production at Pak Asian Foods, Multan, since 2022.'),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Custom ERP software development in Pakistan',
        serviceType: 'Custom ERP and business software development',
        description: 'ERP systems, offline-first field sales apps and AI automation designed around how Pakistani businesses run, built and run by the two founders.',
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Country', name: 'Pakistan' },
        audience: { '@type': 'BusinessAudience', audienceType: 'FMCG, distribution, manufacturing and retail companies' },
        subjectOf: { '@type': 'CreativeWork', name: 'PaFood case study', url: 'https://dualsyncagency.com/pafood-case-study' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: PK_FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
      crumbs([['ERP software in Pakistan', '/erp-software-pakistan']]),
    ],
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | DualSync',
    description: 'What DualSync collects when you use this website, why, who processes it and how to have it deleted. No tracking cookies and no third-party scripts.',
    schema: [webPage('/privacy', 'Privacy Policy', 'What DualSync collects when you use this website and how to have it deleted.'), crumbs([['Privacy Policy', '/privacy']])],
  },
  {
    path: '/terms',
    title: 'Terms of Use | DualSync',
    description: 'The terms for using dualsyncagency.com: using the site, our content, links to other sites and liability. Client work is covered by a separate agreement.',
    schema: [webPage('/terms', 'Terms of Use', 'The terms for using dualsyncagency.com.'), crumbs([['Terms of Use', '/terms']])],
  },
  {
    path: '/contact',
    title: 'Contact DualSync: a founder replies within one business day',
    description: 'Two questions and your email. A founder replies within one business day.',
    schema: [webPage('/contact', 'Contact', 'Two questions and your email. A founder replies within one business day.', 'ContactPage'), crumbs([['Contact', '/contact']])],
  },
];

export const POST_SEO: Seo[] = POSTS.map((p) => ({
  path: `/journal/${p.slug}`,
  title: `${p.title} | DualSync Journal`,
  description: p.description,
  schema: postSchema(p),
  ogType: 'article',
}));

/**
 * Search titles (50-60 chars) and meta descriptions (140-160 chars), tuned per
 * route. On-page headings stay as designed; these only feed <head>.
 */
const META: Record<string, [string, string]> = {
  '/': [
    'DualSync | Custom ERP, AI Agents & SaaS Studio in Pakistan',
    'DualSync builds custom ERP, AI agents and SaaS platforms, designed and run by the two founders you talk to. Based in Rawalpindi, Pakistan, working worldwide.'
  ],
  '/services': [
    'Services: AI Agents, Voice AI, SaaS and ERP | DualSync',
    'AI agents, Voice AI, custom SaaS, ERP and offline-first mobile apps, plus n8n and WhatsApp automation, all built and run by the two founders you talk to.'
  ],
  '/projects': [
    'Work: ERP, Field Apps, AI and SaaS in Production | DualSync',
    'Systems in production: Pakasian ERP and the PaFood sales system for Pak Asian Foods in Multan, plus HiTasky, FilingKeeper and our creative production work.'
  ],
  '/pafood-case-study': [
    'PaFood Case Study: Paper Orders to One System | DualSync',
    'How DualSync replaced paper and WhatsApp orders at Pak Asian Foods in Multan with an offline-first order app, a web admin and a KPO desk that checks orders.'
  ],
  '/process': [
    'Our Process: Listen, Architect, Build and Run | DualSync',
    'How a DualSync project runs: a written scope and fixed quote in week one, clickable screens in week two, then a working build you can try every Friday.'
  ],
  '/about': [
    'Team: Two Founders, Zero Handoffs | DualSync, Pakistan',
    'Meet DualSync: founders Muhammad Haseeb and Muhammad Siddique, with Kiran Haroon and Sajid Rahim. A remote software studio in Rawalpindi, Pakistan, since 2022.'
  ],
  '/journal': [
    'Journal: Engineering Notes on AI, SaaS and ERP | DualSync',
    'Engineering notes from DualSync on AI agents, Voice AI, SaaS architecture, offline-first apps and ERP systems, written by the founders who built them.'
  ],
  '/careers': [
    'Careers at DualSync: Join a Small Remote Software Studio',
    'DualSync hires rarely. We look for people who finish things, write clearly and own the outcome. Show us something you built and a founder will reply to you.'
  ],
  '/contact': [
    'Contact DualSync: a founder replies within one business day',
    'Tell us what is breaking: two questions and your email. A founder at DualSync replies within one business day. Based in Rawalpindi, Pakistan, working worldwide.'
  ],
  '/erp-software-pakistan': [
    'Custom ERP software company in Pakistan | DualSync',
    'DualSync builds custom ERP, field sales apps and AI automation for businesses in Pakistan. In production at Pak Asian Foods, Multan, since 2022.'
  ],
  '/privacy': [
    'Privacy Policy: What We Collect and Why | DualSync',
    'What DualSync collects when you use this website, why, who processes it and how to have it deleted. No tracking cookies and no third-party scripts.'
  ],
  '/terms': [
    'Terms of Use for dualsyncagency.com | DualSync Studio',
    'The terms for using dualsyncagency.com: using the site, our content, links to other sites and liability. Client work is covered by a separate agreement.'
  ],
  '/journal/ai-agent-human-in-the-loop': [
    'When an AI Agent Should Stop and Ask a Human | DualSync',
    'How we design AI agents for back-office work so they act on their own where mistakes are cheap and hand over to a person, with context, where they are not.'
  ],
  '/journal/ai-receptionist-retell-n8n': [
    'Building an AI Receptionist with Retell AI and n8n',
    'How we built a phone receptionist that answers calls, books appointments and logs every call, using Retell AI for the voice and n8n webhooks for the logic.'
  ],
  '/journal/offline-first-field-app-no-signal': [
    'How We Made PaFood Work With No Signal | DualSync Journal',
    'How the PaFood order app keeps every visit, order and payment safe on the phone when the network drops, and delivers each one to the server exactly once.'
  ],
  '/journal/postgresql-schema-orders-routes-targets': [
    'PostgreSQL Schema for Orders, Routes and Targets | DualSync',
    'How we model orders, routes and targets in PostgreSQL for a distributor: plan versus reality, history instead of overwrites, and idempotency keys.'
  ],
  '/journal/weekly-friday-builds': [
    'Why We Ship a Working Build Every Friday | DualSync',
    'Why every DualSync project ships a working build every Friday instead of status reports, and what that weekly rhythm changes for the client and the team.'
  ],
  '/journal/whatsapp-cloud-api-order-updates': [
    'WhatsApp Order Updates on the Official Cloud API | DualSync',
    'Send order and delivery updates on WhatsApp the reliable way: Meta’s official Cloud API, approved templates, the 24-hour window and delivery webhooks.'
  ]
};

export const ALL_SEO: Seo[] = [...STATIC, ...POST_SEO].map((s) =>
  META[s.path] ? { ...s, title: META[s.path][0], description: META[s.path][1] } : s,
);

export function seoFor(path: string): Seo {
  const hit = ALL_SEO.find((s) => s.path === path);
  if (hit) return hit;
  const slug = path.startsWith('/journal/') ? path.slice('/journal/'.length) : '';
  const post = slug ? getPost(slug) : undefined;
  if (post) return POST_SEO.find((s) => s.path === `/journal/${post.slug}`)!;
  return { path, title: 'Page not found | DualSync', description: 'This page does not exist.', schema: [] };
}

/** Props for useSEO on a given route. */
export function seoProps(path: string) {
  const s = seoFor(path);
  return { title: s.title, description: s.description, canonical: s.path, schema: s.schema, ogType: s.ogType ?? 'website' };
}
