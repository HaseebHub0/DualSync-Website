import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ClickSpark from './components/reactbits/ClickSpark';
import SmoothScroll from './components/anim/SmoothScroll';
import Ambient from './components/v2/Ambient';
import { ScrollSmoother, ScrollTrigger } from './lib/gsap';
// Home is eager — it is the landing route and lazy-loading it would only add a
// round trip before first paint. Every other route is split out.
import Home from './pages/Home';

const About = React.lazy(() => import('./pages/About'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const Process = React.lazy(() => import('./pages/Process'));
const Careers = React.lazy(() => import('./pages/Careers'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Work = React.lazy(() => import('./pages/Work'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPostDetail = React.lazy(() => import('./pages/BlogPostDetail'));
const Contact = React.lazy(() => import('./pages/Contact'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const Terms = React.lazy(() => import('./pages/Terms'));

/** Minimal route fallback — height-stable so lazy loading cannot shift layout. */
const RouteFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center" role="status" aria-live="polite">
    <span className="sr-only">Loading page</span>
    <span aria-hidden="true" className="size-8 rounded-full border-2 border-white/10 border-t-primary animate-spin" />
  </div>
);

const pageVariants: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Reset to top through the smoother (falls back to native scroll).
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
    // New page content changes layout — recalc all trigger positions once it's
    // painted (and again after the enter transition settles).
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 650);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [location.pathname]);

  return (
    // Suspense must sit OUTSIDE AnimatePresence. With it inside, a lazy route
    // suspends while `mode="wait"` is still holding the outgoing page, the swap
    // never commits, and the router changes the URL while the previous page
    // stays on screen indefinitely.
    <React.Suspense fallback={<RouteFallback />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-grow z-10 relative"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/process" element={<Process />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/work" element={<Work />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </React.Suspense>
  );
};

// BrowserRouter, not HashRouter: fragment URLs (/#/about) are not part of the
// indexed URL, so every route collapsed into a single page for crawlers. The
// SPA fallback that BrowserRouter needs is already set in netlify.toml.
/**
 * The admin inbox is a private tool, not a page of the marketing site — it
 * gets no navbar, footer, smooth-scroll or decorative chrome, so it stays
 * fast and cannot be navigated into from the public nav.
 */
const Shell: React.FC = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) {
    return (
      <React.Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </React.Suspense>
    );
  }

  return (
    <>
      {/* Fixed chrome — must stay OUTSIDE the smooth-scroll wrapper */}
      <CustomCursor />
      <ClickSpark />
      <ScrollProgress />
      <Navbar />
      {/* Replaces the old flat noise sheet — mesh, grid, beam and grain, all
          tuned per theme (see --amb-* tokens). */}
      <Ambient />

      <SmoothScroll>
        <div className="relative z-10 flex min-h-screen flex-col">
          <main className="flex flex-col flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
};

// BrowserRouter, not HashRouter: fragment URLs (/#/about) are not part of the
// indexed URL, so every route collapsed into a single page for crawlers. The
// SPA fallback that BrowserRouter needs is already set in netlify.toml.
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
};

export default App;
