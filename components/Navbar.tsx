import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import Button from './v2/Button';

const links: [string, string, string][] = [
  ['/', 'Index', '00'],
  ['/services', 'Services', '01'],
  ['/work', 'Work', '02'],
  ['/process', 'Process', '03'],
  ['/about', 'Team', '04'],
  ['/careers', 'Careers', '05'],
  ['/blog', 'Journal', '06'],
];

/**
 * Navbar v2 — an editorial rail rather than a floating pill. Transparent
 * over the hero, then a hairline rule and blur once scrolled. Mobile opens
 * a full-screen overlay with display-scale links.
 *
 * Colours come from the semantic tokens (ink / rule / canvas), so there is
 * no per-theme class branching here — the tokens flip and the bar follows.
 */
const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The overlay owns the viewport while open — lock the page behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          scrolled ? 'border-rule/10 backdrop-blur-xl bg-canvas/75' : 'border-transparent'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between gap-8">
          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <span className="relative size-7 shrink-0" aria-hidden="true">
              <span className="absolute inset-0 size-3.5 border-2 border-ink group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-500" />
              <span className="absolute bottom-0 right-0 size-3.5 bg-primary group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
            </span>
            <span className="font-display font-black text-lg tracking-tighter text-ink">
              Dual<span className="text-accent">Sync</span>
            </span>
          </Link>

          {/* Desktop index */}
          <nav className="hidden md:flex items-center gap-9">
            {links.map(([path, label, num]) => (
              <Link key={path} to={path} className="group/link relative flex items-baseline gap-1.5">
                <span
                  className={`mono-label transition-colors ${
                    isActive(path) ? 'text-accent' : 'text-ink/60 group-hover/link:text-accent'
                  }`}
                >
                  {num}
                </span>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive(path) ? 'text-accent' : 'text-ink/70 group-hover/link:text-ink'
                  }`}
                >
                  {label}
                </span>
                {isActive(path) && (
                  <motion.span layoutId="nav-rule" className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="size-10 flex items-center justify-center border border-rule/15 text-ink hover:border-primary/50 hover:text-accent transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              <span className="material-symbols-outlined text-lg">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <Button as={Link} to="/contact" size="sm" arrow={false} className="hidden sm:inline-flex">
              Start a project
            </Button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden size-10 flex items-center justify-center border border-rule/15 text-ink"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[99] bg-canvas md:hidden flex flex-col justify-center px-6"
          >
            <nav className="flex flex-col border-t border-rule/10">
              {links.map(([path, label, num], i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={path} className="flex items-baseline gap-4 py-5 border-b border-rule/10">
                    <span className="mono-label text-ink/60">{num}</span>
                    <span
                      className={`font-display font-black tracking-tighter text-4xl ${
                        isActive(path) ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10"
            >
              <Button as={Link} to="/contact">
                Start a project
              </Button>
              <p className="mono-label text-ink/60 mt-8">Remote → Worldwide</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
