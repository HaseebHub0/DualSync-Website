import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string;
  schema?: object;
}

const BASE_URL = 'https://dualsyncagency.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/og-image.jpg`;

export function useSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  schema,
}: SEOOptions) {
  useEffect(() => {
    // Title
    document.title = title;

    // Helpers
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const attr = selector.includes('[property') ? 'property' : 'name';
        const val = selector.match(/"([^"]+)"/)?.[1] ?? '';
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard meta
    setMeta('meta[name="description"]', description);
    if (keywords) setMeta('meta[name="keywords"]', keywords);

    // Canonical
    const canonicalUrl = `${BASE_URL}${canonical ?? ''}`;
    setLink('canonical', canonicalUrl);

    // OG
    setMeta('meta[property="og:title"]', ogTitle ?? title);
    setMeta('meta[property="og:description"]', ogDescription ?? description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:image"]', ogImage);

    // Twitter
    setMeta('meta[property="twitter:title"]', ogTitle ?? title);
    setMeta('meta[property="twitter:description"]', ogDescription ?? description);
    setMeta('meta[property="twitter:url"]', canonicalUrl);
    setMeta('meta[property="twitter:image"]', ogImage);

    // JSON-LD page schema
    if (schema) {
      const id = 'page-schema-ld';
      let scriptEl = document.getElementById(id) as HTMLScriptElement | null;
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = id;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, keywords, schema]);
}
