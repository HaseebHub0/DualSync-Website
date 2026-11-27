import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import MobileMenu, { NAV_LINKS } from './MobileMenu';

/** Inner-page header (export: header.sx-nav), shared by every page except Home. */
const Nav: React.FC = () => (
  <header className="sx-nav">
    <Link to="/" className="sx-brand" aria-label="DualSync home">
      <span className="sx-mark" aria-hidden="true">
        <span className="sx-mark-a" />
        <span className="sx-mark-b" />
      </span>
      <span className="sx-brand-word">DualSync</span>
    </Link>
    <nav className="sx-links" aria-label="Main">
      {NAV_LINKS.map(([to, label]) => (
        <NavLink key={to} to={to} className="sx-link">
          {label}
        </NavLink>
      ))}
    </nav>
    <Link to="/contact" className="sx-cta">Start a project</Link>
    <MobileMenu />
  </header>
);

export default Nav;
