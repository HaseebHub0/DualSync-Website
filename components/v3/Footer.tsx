import React from 'react';
import { Link } from 'react-router-dom';

/** Inner-page footer (export: footer.sx-foot), shared by every page except Home. */
const Footer: React.FC = () => (
  <footer className="sx-foot">
    <div className="sx-wrap sx-foot-grid">
      <div>
        <div className="sx-foot-h">A founder replies within one business day.</div>
        <a href="mailto:contact@dualsyncagency.com" className="sx-foot-mail">contact@dualsyncagency.com</a>
      </div>
      <div className="sx-foot-col">
        <div className="sx-foot-label">Studio</div>
        <Link to="/services" className="sx-foot-link">Services</Link>
        <Link to="/projects" className="sx-foot-link">Work</Link>
        <Link to="/process" className="sx-foot-link">Process</Link>
        <Link to="/about" className="sx-foot-link">Team</Link>
      </div>
      <div className="sx-foot-col">
        <div className="sx-foot-label">More</div>
        <Link to="/journal" className="sx-foot-link">Journal</Link>
        <Link to="/careers" className="sx-foot-link">Careers</Link>
        <Link to="/contact" className="sx-foot-link">Contact</Link>
      </div>
    </div>
    <div className="sx-wordmark" aria-hidden="true">Dual<span className="sx-green">Sync</span></div>
    <div className="sx-wrap sx-foot-base">
      <span>© 2026 DualSync · Remote, Pakistan → worldwide</span>
      <span>Privacy · Terms</span>
    </div>
  </footer>
);

export default Footer;
