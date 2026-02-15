import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const linkClass = (path: string) =>
    `text-sm font-medium transition-colors ${isActive(path) ? 'text-primary' : 'text-white/80 hover:text-primary'}`;

  const mobileLinkClass = (path: string) =>
    `block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive(path) ? 'bg-primary/10 text-primary' : 'text-white/80 hover:bg-white/5 hover:text-white'}`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center p-4 md:p-6 pointer-events-none">
      <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between gap-8 max-w-4xl w-full shadow-2xl backdrop-blur-xl pointer-events-auto relative z-50">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Custom Logo: Dual Interlocking Squares */}
          <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative shadow-lg group-hover:border-primary/30 transition-all overflow-hidden">
            {/* Square 1: Vision (White Outline) - Represents the 'Dual' structure */}
            <div className="absolute w-3.5 h-3.5 border-[2px] border-white/90 rounded-[4px] transform -translate-x-1 -translate-y-1 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 z-10"></div>

            {/* Square 2: Reality (Primary Fill) - Represents the 'Sync' action */}
            <div className="absolute w-3.5 h-3.5 bg-primary rounded-[4px] transform translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-500"></div>

            {/* Connecting Spark - Hidden by default, appears on hover to show 'Sync' */}
            <div className="absolute w-[1px] h-6 bg-white/50 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
          </div>

          <span className="text-white font-bold text-xl tracking-tight">Dual<span className="text-primary">Sync</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link className={linkClass('/')} to="/">Home</Link>
          <Link className={linkClass('/services')} to="/services">Services</Link>
          <Link className={linkClass('/work')} to="/work">Work</Link>
          <Link className={linkClass('/blog')} to="/blog">Blog</Link>
          <Link className={linkClass('/about')} to="/about">About</Link>
        </div>

        <Link to="/contact" className="hidden sm:block bg-white/10 hover:bg-white/20 text-white border border-white/10 text-sm font-bold px-5 py-2.5 rounded-full transition-all transform hover:scale-105">
          Let's Talk
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`absolute top-full left-0 right-0 px-4 pt-2 transition-all duration-300 transform origin-top md:hidden ${isMobileMenuOpen
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-95 -translate-y-4 pointer-events-none invisible'
        }`}>
        <div className="glass-panel rounded-3xl p-4 flex flex-col gap-2 shadow-2xl max-w-4xl mx-auto">
          <Link className={mobileLinkClass('/')} to="/">Home</Link>
          <Link className={mobileLinkClass('/services')} to="/services">Services</Link>
          <Link className={mobileLinkClass('/work')} to="/work">Work</Link>
          <Link className={mobileLinkClass('/blog')} to="/blog">Blog</Link>
          <Link className={mobileLinkClass('/about')} to="/about">About</Link>
          <div className="h-px bg-white/10 my-2"></div>
          <Link className={mobileLinkClass('/contact')} to="/contact">Let's Talk</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;