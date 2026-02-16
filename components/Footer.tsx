import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <footer className="py-20 px-4 sm:px-8 border-t border-white/5" id="contact">
      <div className="max-w-4xl mx-auto text-center">

        {/* CTA Card - Only show if NOT on contact page */}
        {!isContactPage && (
          <div className="glass-card rounded-[3rem] p-10 md:p-16 relative overflow-hidden mb-12">
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Ready to Sync?</h2>
              <p className="text-white/70 text-lg max-w-lg mx-auto">Let's discuss how DualSync can elevate your digital presence. Schedule a free consultation today.</p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                <input
                  className="h-12 px-6 rounded-full bg-background-dark/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full sm:w-auto min-w-[280px]"
                  placeholder="Enter your email"
                  type="email"
                />
                <button className="bg-primary text-background-dark font-bold h-12 px-8 rounded-full hover:bg-white hover:scale-105 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Links */}
        <div className={`flex flex-col md:flex-row justify-between items-center text-white/40 text-sm ${isContactPage ? 'pt-0' : 'mt-12'}`}>
          <p>© 2025 DualSync. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0">
            <div className="flex gap-6 order-2 md:order-1">
              <Link className="hover:text-primary transition-colors" to="/privacy">Privacy Policy</Link>
              <Link className="hover:text-primary transition-colors" to="/terms">Terms of Service</Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 order-1 md:order-2 mb-4 md:mb-0">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="LinkedIn">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="Instagram">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="Facebook">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="TikTok">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.99 1.14 2.3 1.94 3.75 2.29v4.03c-1.83-.07-3.53-.88-4.68-2.31v7.59c.02 1.67-.4 3.32-1.22 4.75-.82 1.43-2.03 2.59-3.48 3.34-1.45.75-3.09 1.12-4.73.99-1.64-.13-3.21-.76-4.52-1.82-1.31-1.06-2.28-2.5-2.77-4.14-.49-1.64-.47-3.4.06-5.03.53-1.63 1.55-3.07 2.94-4.11 1.39-1.04 3.08-1.58 4.78-1.54v4.21c-.57-.03-1.14.07-1.66.29-.52.22-.98.57-1.35 1.01-.37.44-.64.97-.79 1.53s-.12 1.15.08 1.7.53 1.04 1 1.42.94.63 1.53.74c.59.1 1.2.02 1.75-.24s1.02-.67 1.34-1.2c.32-.53.48-1.15.46-1.77V.02z" /></svg>
              </a>
              <a href="https://app.daily.dev/squads/dualsynctechhub" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="Daily.dev">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5l5 7.5-5 7.5-5-7.5 5-7.5z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;