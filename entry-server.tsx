/**
 * Build-time renderer used by scripts/prerender.mjs.
 *
 * Every public route is rendered to static HTML so crawlers and AI answer
 * engines that do not run JavaScript still get the full page. Pages are
 * imported eagerly here (the browser bundle lazy-loads them).
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/v3/Home';
import Services from './pages/v3/Services';
import Projects from './pages/v3/Projects';
import PafoodCaseStudy from './pages/v3/PafoodCaseStudy';
import Process from './pages/v3/Process';
import About from './pages/v3/About';
import Journal from './pages/v3/Journal';
import JournalPost from './pages/v3/JournalPost';
import Careers from './pages/v3/Careers';
import Contact from './pages/v3/Contact';
import { ALL_SEO, SITE, OG_IMAGE, FAQ, SERVICES } from './data/seo';
import { POSTS } from './data/journal';

export { ALL_SEO, SITE, OG_IMAGE, FAQ, SERVICES, POSTS };

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/pafood-case-study" element={<PafoodCaseStudy />} />
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </StaticRouter>,
  );
}
