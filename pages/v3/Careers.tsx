import React, { useRef } from 'react';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import { Em } from '../../components/v3/Type';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/careers"]). */
const Careers: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({
    title: "Careers — DualSync",
    description: "We hire rarely. Show us something you built.",
    canonical: "/careers",
  });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">[ Careers ]</div>
          <h1 className="sx-ph-title">We hire <span className="sx-green">rarely.</span></h1>
          <p className="sx-ph-lead">Four people, fully remote, deep work over standups. When we do hire, this is what we look for.</p>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap">
          <div className="sx-traits">
            <div className="sx-trait sx-reveal">
              <div className="sx-trait-n">01</div>
              <div className="sx-trait-t">You finish things.</div>
              <p className="sx-trait-p">Shipped beats perfect. Show us what you took all the way to done.</p>
            </div>
            <div className="sx-trait sx-reveal">
              <div className="sx-trait-n">02</div>
              <div className="sx-trait-t">You write.</div>
              <p className="sx-trait-p">Clear writing is clear thinking. Most of our work happens in docs.</p>
            </div>
            <div className="sx-trait sx-reveal">
              <div className="sx-trait-n">03</div>
              <div className="sx-trait-t">You own the outcome.</div>
              <p className="sx-trait-p">Not the ticket, the result the client needed.</p>
            </div>
            <div className="sx-trait sx-reveal">
              <div className="sx-trait-n">04</div>
              <div className="sx-trait-t">You can be wrong out loud.</div>
              <p className="sx-trait-p">Say it early, fix it fast, and we will trust you more.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-cta-sec">
        <div className="sx-ring sx-ring-l" />
        <div className="sx-ring sx-ring-r" />
        <div className="sx-cta-inner">
          <div className="sx-label sx-label-ink">No CV needed</div>
          <h2 className="sx-cta-title">Show us <Em>something you built.</Em></h2>
          <p className="sx-cta-p">A link, a repo or a video. Tell us what you made and what you would do differently.</p>
          <a href="mailto:contact@dualsyncagency.com?subject=Something%20I%20built" className="sx-btn-ink">Send it<span className="sx-btn-dot-g">→</span></a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Careers;
