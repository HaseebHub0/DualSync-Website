import React from 'react';
import { Link } from 'react-router-dom';
import MobileMenu, { NAV_LINKS } from './MobileMenu';

/**
 * Site header for every page except Home. Uses the same markup and classes as
 * the Home hero nav (.ds-nav) so the bar looks identical on every page.
 * The Webflow export's pill-style inner nav (.sx-nav) is intentionally unused.
 */
const Nav: React.FC = () => (
  <nav className="ds-nav" aria-label="Main">
    <Link to="/" className="ds-logo" aria-label="DualSync home">
      <div className="ds-logo-word">DualSync</div>
    </Link>
    <div className="ds-nav-links">
      {NAV_LINKS.map(([to, label]) => (
        <Link key={to} to={to} className="ds-nav-link">
          {label}
        </Link>
      ))}
    </div>
    <Link to="/contact" className="ds-btn-green ds-btn-sm">Start a project</Link>
    <MobileMenu />
  </nav>
);

export default Nav;
