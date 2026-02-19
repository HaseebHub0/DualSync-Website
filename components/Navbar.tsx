import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${isActive(path) ? 'text-primary' : 'text-white/70 hover:text-white'}`;

  const mobileLinkClass = (path: string) =>
    `block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive(path) ? 'bg-primary/10 text-primary' : 'text-white/80 hover:bg-white/5 hover:text-white'}`;

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center p-4 md:p-6 pointer-events-none"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled ? 'rgba(10, 25, 15, 0.85)' : 'rgba(255,255,255,0.03)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(20px)',
          boxShadow: scrolled ? '0 8px 48px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.2)',
        }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-full px-6 py-3 flex items-center justify-between gap-8 max-w-4xl w-full pointer-events-auto relative z-50"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative shadow-lg group-hover:border-primary/30 transition-all overflow-hidden">
            <div className="absolute w-3.5 h-3.5 border-[2px] border-white/90 rounded-[4px] transform -translate-x-1 -translate-y-1 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 z-10"></div>
            <div className="absolute w-3.5 h-3.5 bg-primary rounded-[4px] transform translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-500"></div>
            <div className="absolute w-[1px] h-6 bg-white/50 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Dual<span className="text-primary">Sync</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[['/', 'Home'], ['/services', 'Services'], ['/work', 'Work'], ['/blog', 'Blog'], ['/about', 'About']].map(([path, label]) => (
            <Link key={path} className={linkClass(path)} to={path}>
              {label}
              {isActive(path) && (
                <motion.div layoutId="nav-indicator" className="h-px bg-primary mt-0.5" />
              )}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden sm:block bg-white/10 hover:bg-primary/20 hover:border-primary/30 text-white border border-white/10 text-sm font-bold px-5 py-2.5 rounded-full transition-all"
        >
          Let's Talk
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute top-full left-0 right-0 px-4 pt-2 md:hidden pointer-events-auto"
          >
            <div className="glass-panel rounded-3xl p-4 flex flex-col gap-2 shadow-2xl max-w-4xl mx-auto">
              {[['/', 'Home'], ['/services', 'Services'], ['/work', 'Work'], ['/blog', 'Blog'], ['/about', 'About']].map(([path, label]) => (
                <Link key={path} className={mobileLinkClass(path)} to={path}>{label}</Link>
              ))}
              <div className="h-px bg-white/10 my-2"></div>
              <Link className={mobileLinkClass('/contact')} to="/contact">Let's Talk</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;