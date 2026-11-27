import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/about"]). */
const About: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({
    title: "Team — DualSync",
    description: "Two founders, zero handoffs. Meet the DualSync team.",
    canonical: "/about",
  });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">[ The team ]</div>
          <h1 className="sx-ph-title">Most agencies sell you a team. <span className="sx-green">We sell you two people.</span></h1>
          <p className="sx-ph-lead">The two people who will still be on the call when something breaks at 2 a.m.</p>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap sx-founders">
          <div className="sx-founder sx-reveal">
            <div className="sx-founder-img sx-fimg-has" />
            <div className="sx-founder-name">Muhammad Haseeb</div>
            <div className="sx-founder-role">Founder &amp; CEO</div>
            <p className="sx-founder-p">AI and product design. Scopes every project, designs the systems and builds the ERP and agent layers.</p>
          </div>
          <div className="sx-founder sx-founder-low sx-reveal">
            <div className="sx-founder-img sx-fimg-sid" />
            <div className="sx-founder-name">Muhammad Siddique</div>
            <div className="sx-founder-role">Co-founder · Backend</div>
            <p className="sx-founder-p">Django and high-performance database engineering. Makes sure the data layer holds when the orders pile up.</p>
          </div>
        </div>
        <div className="sx-wrap sx-crew">
          <div className="sx-label">With</div>
          <div className="sx-crew-row">
            <div className="sx-crew-i sx-reveal">
              <div className="sx-crew-img sx-cimg-kir" />
              <div>
                <div className="sx-crew-name">Kiran Haroon</div>
                <div className="sx-crew-role">Video &amp; social</div>
              </div>
            </div>
            <div className="sx-crew-i sx-reveal">
              <div className="sx-crew-img sx-cimg-saj" />
              <div>
                <div className="sx-crew-name">Sajid Rahim</div>
                <div className="sx-crew-role">3D artist &amp; animator</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-dark">
        <div className="sx-wrap">
          <div className="sx-label sx-label-d">How we work</div>
          <h2 className="sx-h2 sx-h2-gap">Five principles.</h2>
          <div className="sx-also">
            <div className="sx-mini">
              <div className="sx-label sx-label-d">01</div>
              <div className="sx-mini-title">AI-accelerated, human-decided.</div>
              <p className="sx-mini-p">We use AI to move fast and people to decide what is right.</p>
            </div>
            <div className="sx-mini">
              <div className="sx-label sx-label-d">02</div>
              <div className="sx-mini-title">Data layers that hold.</div>
              <p className="sx-mini-p">The schema comes first, because everything else sits on it.</p>
            </div>
            <div className="sx-mini">
              <div className="sx-label sx-label-d">03</div>
              <div className="sx-mini-title">You talk to the builder.</div>
              <p className="sx-mini-p">No relay, no lost context, no account managers.</p>
            </div>
            <div className="sx-mini">
              <div className="sx-label sx-label-d">04</div>
              <div className="sx-mini-title">Weekly and clickable.</div>
              <p className="sx-mini-p">A working build every Friday, not a status report.</p>
            </div>
          </div>
          <div className="sx-remote sx-reveal">
            <div className="sx-remote-t">Remote, and deliberate about it.</div>
            <p className="sx-remote-p">Based in Rawalpindi, working with clients worldwide since 2022. Long stretches of deep work, short sharp calls, everything written down.</p>
          </div>
        </div>
      </section>
      <section className="sx-cta-sec">
        <div className="sx-ring sx-ring-l" />
        <div className="sx-ring sx-ring-r" />
        <div className="sx-cta-inner">
          <div className="sx-label sx-label-ink">Meet us</div>
          <h2 className="sx-cta-title">Both of us. One call.</h2>
          <p className="sx-cta-p">Tell us what you need built. The two people you meet are the two people who build it.</p>
          <Link to="/contact" className="sx-btn-ink">Start a project<span className="sx-btn-dot-g">→</span></Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
