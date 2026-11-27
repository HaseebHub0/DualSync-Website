import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Simple 404 built from the existing inner-page hero styles. */
const NotFound: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({ title: 'Page not found | DualSync', description: 'This page does not exist.', noindex: true });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner v3-404">
          <div className="sx-ph-label">404</div>
          <h1 className="sx-ph-title">This page <span className="sx-green">doesn’t exist.</span></h1>
          <p className="sx-ph-lead">The link may be old, or the page has moved.</p>
          <Link to="/" className="sx-btn-ink">Back to home<span className="sx-btn-dot-g">→</span></Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotFound;
