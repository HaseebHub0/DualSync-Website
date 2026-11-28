import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const SERVICES = ['AI agents', 'Voice AI', 'Custom SaaS', 'ERP & enterprise', 'Mobile apps'];

const SOCIAL: [string, string][] = [
  ['Instagram', 'https://instagram.com/dualsyncagency'],
  ['Behance', 'https://www.behance.net/muhammadhaseeb162'],
  ['LinkedIn', 'https://www.linkedin.com/company/dualsync'],
];

/** Site footer, shared by every page including Home. */
const Footer: React.FC = () => (
  <footer className="v3-foot">
    <div className="sx-wrap">
      <div className="v3-foot-top">
        <div className="v3-foot-intro">
          <Link to="/" className="v3-foot-brand" aria-label="DualSync home">DualSync</Link>
          <p>An AI &amp; SaaS engineering studio in Rawalpindi, Pakistan, run by the two founders who write the code.</p>
        </div>
        <div className="v3-foot-contact">
          <a href="mailto:contact@dualsyncagency.com" className="v3-foot-mail">contact@dualsyncagency.com</a>
          <div className="v3-foot-facts">
            <span><Icon name="clock" />A founder replies within one business day</span>
            <span><Icon name="globe" />Rawalpindi, working worldwide</span>
          </div>
        </div>
      </div>

      <nav className="v3-foot-cols" aria-label="Footer">
        <div>
          <div className="v3-foot-h">Services</div>
          {SERVICES.map((s) => (
            <Link key={s} to="/services">{s}</Link>
          ))}
        </div>
        <div>
          <div className="v3-foot-h">Work</div>
          <Link to="/projects">All work</Link>
          <Link to="/pafood-case-study">PaFood case study</Link>
          <Link to="/erp-software-pakistan">ERP software in Pakistan</Link>
          <Link to="/process">How we work</Link>
        </div>
        <div>
          <div className="v3-foot-h">Company</div>
          <Link to="/about">Team</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <div className="v3-foot-h">Elsewhere</div>
          {SOCIAL.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </div>
      </nav>
    </div>

    <div className="sx-wordmark v3-foot-mark" aria-hidden="true">Dual<span className="sx-green">Sync</span></div>
    <div className="sx-wrap v3-foot-base">
      <span>© {new Date().getFullYear()} DualSync. All rights reserved.</span>
      <nav className="v3-foot-legal" aria-label="Legal">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Use</Link>
        <Link to="/contact">Start a project</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
