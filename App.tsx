import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import SmoothScroll from './components/anim/SmoothScroll';
import { ScrollSmoother, ScrollTrigger } from './lib/gsap';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Work from './pages/Work';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

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
          <Route path="/work" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// BrowserRouter, not HashRouter: fragment URLs (/#/about) are not part of the
// indexed URL, so every route collapsed into a single page for crawlers. The
// SPA fallback that BrowserRouter needs is already set in netlify.toml.
const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Fixed chrome — must stay OUTSIDE the smooth-scroll wrapper */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="bg-noise"></div>
      </div>

      <SmoothScroll>
        <div className="relative z-10 flex min-h-screen flex-col">
          <main className="flex flex-col flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
};

export default App;
