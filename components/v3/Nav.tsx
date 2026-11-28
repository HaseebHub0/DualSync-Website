import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import MobileMenu, { NAV_LINKS } from './MobileMenu';

/**
 * Site header for every page except Home. Uses the same markup and classes as
 * the Home hero nav (.ds-nav) so the bar looks identical on every page.
 * The Webflow export's pill-style inner nav (.sx-nav) is intentionally unused.
 */
const Nav: React.FC = () => (
  <header className="ds-nav">
    <Link to="/" className="ds-logo" aria-label="DualSync home">
      <div className="ds-logo-word">DualSync</div>
    </Link>
    <nav className="ds-nav-links" aria-label="Main">
      {NAV_LINKS.map(([to, label]) => (
        <NavLink key={to} to={to} className="ds-nav-link">
          {label}
        </NavLink>
      ))}
    </nav>
    <Link to="/contact" className="ds-btn-green ds-btn-sm">Start a project</Link>
    <MobileMenu />
  </header>
);

export default Nav;
