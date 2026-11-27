import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/pafood-case-study"]). */
const PafoodCaseStudy: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({
    title: "PaFood case study — DualSync",
    description: "How DualSync replaced paper and WhatsApp orders with one system for Pak Asian Foods.",
    canonical: "/pafood-case-study",
  });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">[ Case study · Pak Asian Foods ]</div>
          <h1 className="sx-ph-title">From paper and WhatsApp to <span className="sx-green">one system.</span></h1>
          <p className="sx-ph-lead">How a 4-year partnership replaced scattered order slips with an ERP, a field app and a verification desk that all speak the same language.</p>
          <div className="sx-meta">
            <div className="sx-meta-i">
              <div className="sx-meta-l">Client</div>
              <div className="sx-meta-v">Pak Asian Foods · FMCG</div>
            </div>
            <div className="sx-meta-i">
              <div className="sx-meta-l">Since</div>
              <div className="sx-meta-v">2022 — ongoing</div>
            </div>
            <div className="sx-meta-i">
              <div className="sx-meta-l">Built</div>
              <div className="sx-meta-v">Android app · Web admin · KPO</div>
            </div>
            <div className="sx-meta-i">
              <div className="sx-meta-l">Stack</div>
              <div className="sx-meta-v">React Native · Node · PostgreSQL</div>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap sx-split">
          <div className="sx-label">[01] The problem</div>
          <h2 className="sx-statement">Order bookers wrote orders on paper and sent photos over WhatsApp. Head office re-typed every one, chased the missing ones, and had no view of where salesmen were or how close they were to target.</h2>
        </div>
      </section>
      <section className="sx-dark">
        <div className="sx-wrap">
          <div className="sx-label sx-label-d">[02] What we built</div>
          <h2 className="sx-h2 sx-h2-gap">Three parts, one core.</h2>
          <div className="sx-minis">
            <div className="sx-mini">
              <div className="sx-label sx-label-d">Field</div>
              <div className="sx-mini-title">Order app</div>
              <p className="sx-mini-p">An Android app for order bookers and salesmen. Works offline, syncs when signal returns, tracks routes by GPS and shows daily targets.</p>
            </div>
            <div className="sx-mini">
              <div className="sx-label sx-label-d">Management</div>
              <div className="sx-mini-title">Web admin</div>
              <p className="sx-mini-p">Orders, routes, targets and team performance in one place, by region and by salesman.</p>
            </div>
            <div className="sx-mini">
              <div className="sx-label sx-label-d">Quality</div>
              <div className="sx-mini-title">KPO desk</div>
              <p className="sx-mini-p">Every order is verified before it reaches dispatch, so bad orders stop at the door.</p>
            </div>
          </div>
          <div className="sx-dash sx-dash-wide">
            <div className="sx-dash-top">
              <span className="sx-dash-dot" />
              <span className="sx-dash-dot" />
              <span className="sx-dash-dot" />
              <span className="sx-dash-title">PaFood · Admin dashboard (replace with a real screenshot)</span>
            </div>
            <div className="sx-dash-body">
              <div className="sx-dash-side">
                <div className="sx-dash-nav sx-dash-nav-on" />
                <div className="sx-dash-nav" />
                <div className="sx-dash-nav" />
                <div className="sx-dash-nav" />
                <div className="sx-dash-nav" />
              </div>
              <div className="sx-dash-main">
                <div className="sx-kpis sx-kpis-light">
                  <div className="sx-kpi-lt">
                    <div className="sx-kpi-l">Orders today</div>
                    <div className="sx-kpi-v">—</div>
                  </div>
                  <div className="sx-kpi-lt">
                    <div className="sx-kpi-l">Routes live</div>
                    <div className="sx-kpi-v">—</div>
                  </div>
                  <div className="sx-kpi-lt sx-kpi-lt-g">
                    <div className="sx-kpi-l">Verified</div>
                    <div className="sx-kpi-v">—</div>
                  </div>
                </div>
                <div className="sx-grow">
                  <div className="sx-gbar sx-h40" />
                  <div className="sx-gbar sx-h55" />
                  <div className="sx-gbar sx-h48" />
                  <div className="sx-gbar sx-h70" />
                  <div className="sx-gbar sx-h62" />
                  <div className="sx-gbar sx-h75" />
                  <div className="sx-gbar sx-h85 sx-bar-g" />
                  <div className="sx-gbar sx-h62" />
                  <div className="sx-gbar sx-h75" />
                  <div className="sx-gbar sx-h70" />
                  <div className="sx-gbar sx-h85" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap">
          <div className="sx-label">[03] Outcomes · bracketed figures to confirm with the client</div>
          <div className="sx-numbers sx-numbers-top">
            <div className="sx-num">
              <div className="sx-num-mask">
                <div className="sx-num-v">3</div>
              </div>
              <div className="sx-num-l">Systems in production</div>
            </div>
            <div className="sx-num">
              <div className="sx-num-mask">
                <div className="sx-num-v">4<span className="sx-num-u">yrs</span></div>
              </div>
              <div className="sx-num-l">Continuous partnership</div>
            </div>
            <div className="sx-num">
              <div className="sx-num-mask">
                <div className="sx-num-v sx-num-ph">[orders/mo]</div>
              </div>
              <div className="sx-num-l">Processed through the system</div>
            </div>
            <div className="sx-num">
              <div className="sx-num-mask">
                <div className="sx-num-v sx-num-ph">[hrs/wk]</div>
              </div>
              <div className="sx-num-l">Saved on re-typing orders</div>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-mint">
        <div className="sx-wrap sx-quote">
          <div className="sx-quote-mark">“</div>
          <blockquote className="sx-quote-text">DualSync is our most trusted technical partner. Their ability to sync complex business logic with high-end code is why they handle our entire digital infrastructure.</blockquote>
          <div className="sx-quote-by">
            <div className="sx-quote-avatar">AA</div>
            <div>
              <div className="sx-quote-name">Abdullah Akhtar</div>
              <div className="sx-quote-role">Director of Strategy, Pak Asian Foods</div>
            </div>
          </div>
        </div>
      </section>
      <Link to="/projects" className="sx-next">
        <div className="sx-wrap sx-next-in">
          <div>
            <div className="sx-label sx-label-d">Next</div>
            <div className="sx-next-title">See all work</div>
          </div>
          <div className="sx-next-arrow">→</div>
        </div>
      </Link>
      <Footer />
    </div>
  );
};

export default PafoodCaseStudy;
