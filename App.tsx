import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// Home is eager: it is the landing route. Everything else is split out.
import Home from './pages/v3/Home';
import { track } from './lib/analytics';

const Services = React.lazy(() => import('./pages/v3/Services'));
const Projects = React.lazy(() => import('./pages/v3/Projects'));
const PafoodCaseStudy = React.lazy(() => import('./pages/v3/PafoodCaseStudy'));
const Process = React.lazy(() => import('./pages/v3/Process'));
const About = React.lazy(() => import('./pages/v3/About'));
const Journal = React.lazy(() => import('./pages/v3/Journal'));
const JournalPost = React.lazy(() => import('./pages/v3/JournalPost'));
const Careers = React.lazy(() => import('./pages/v3/Careers'));
const ErpPakistan = React.lazy(() => import('./pages/v3/ErpPakistan'));
const Contact = React.lazy(() => import('./pages/v3/Contact'));
const Privacy = React.lazy(() => import('./pages/v3/Legal').then((m) => ({ default: m.Privacy })));
const Terms = React.lazy(() => import('./pages/v3/Legal').then((m) => ({ default: m.Terms })));
const NotFound = React.lazy(() => import('./pages/v3/NotFound'));
// Private message inbox (not linked anywhere public; noindex via netlify.toml).
const AdminRoute = React.lazy(() => import('./pages/v3/AdminRoute'));

/** Start every route at the top, like a normal page load. */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    track('pageview');
  }, [pathname]);
  return null;
};

/** Height-stable fallback so lazy routes cannot shift layout. */
const RouteFallback: React.FC = () => <div style={{ minHeight: '100vh' }} role="status" aria-label="Loading page" />;

// BrowserRouter: real paths are crawlable; netlify.toml has the SPA fallback.
const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <a href="#main" className="v3-skip">Skip to content</a>
    <main id="main" tabIndex={-1}>
      <React.Suspense fallback={<RouteFallback />}>
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
          <Route path="/erp-software-pakistan" element={<ErpPakistan />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<AdminRoute />} />
          {/* Old URLs from the previous site (also 301'd in netlify.toml). */}
          <Route path="/work" element={<Navigate to="/projects" replace />} />
          <Route path="/blog" element={<Navigate to="/journal" replace />} />
          <Route path="/blog/*" element={<Navigate to="/journal" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </main>
  </BrowserRouter>
);

export default App;
