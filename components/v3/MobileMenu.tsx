import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export const NAV_LINKS: [string, string][] = [
  ['/services', 'Services'],
  ['/projects', 'Work'],
  ['/process', 'Process'],
  ['/about', 'Team'],
  ['/journal', 'Journal'],
];

/**
 * Hamburger + full-screen panel. Only visible below 991px (see site.css),
 * where the export hides the desktop link rail.
 */
const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('v3-lock', open);
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      // Focus trap: Tab and Shift+Tab cycle within the open menu.
      const panel = document.getElementById('v3-menu');
      const items = panel ? Array.from(panel.querySelectorAll<HTMLElement>('a[href], button')) : [];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('v3-lock');
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="v3-burger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="v3-menu"
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>
      <div id="v3-menu" className="v3-menu" role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <button
          ref={closeRef}
          type="button"
          className="v3-burger v3-menu-close"
          aria-label="Close menu"
          aria-expanded={open}
          onClick={() => setOpen(false)}
        >
          <span />
          <span />
          <span />
        </button>
        <NavLink to="/" end className="v3-menu-link">
          Home
        </NavLink>
        {NAV_LINKS.map(([to, label]) => (
          <NavLink key={to} to={to} className="v3-menu-link">
            {label}
          </NavLink>
        ))}
        <Link to="/contact" className="v3-menu-cta">
          Start a project
        </Link>
      </div>
    </>
  );
};

export default MobileMenu;
