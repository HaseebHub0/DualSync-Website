import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import Icon from '../../components/v3/Icon';
import Illo from '../../components/v3/Illo';
import { Hl, Em } from '../../components/v3/Type';
import { useSEO } from '../../hooks/useSEO';
import { seoProps } from '../../data/seo';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/pafood-case-study"]). */
const PafoodCaseStudy: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO(seoProps('/pafood-case-study'));
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">Case study · Pak Asian Foods</div>
          <h1 className="sx-ph-title">From paper and WhatsApp to <span className="sx-green">one system.</span></h1>
          <p className="sx-ph-lead">How a 4-year partnership replaced scattered order slips with an ERP, a field app and a verification desk that all speak the same language.</p>
          <div className="sx-meta">
            <div className="sx-meta-i">
              <div className="sx-meta-l">Client</div>
              <div className="sx-meta-v">Pak Asian Foods · Multan · FMCG</div>
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
          <div className="sx-label">The problem</div>
          <h2 className="sx-statement">Order bookers wrote orders <Hl>on paper</Hl> and sent photos over WhatsApp. Head office re-typed every one, chased the missing ones, and had no view of where salesmen were or how close they were to target.</h2>
        </div>
      </section>
      <section className="v3-sec">
        <div className="sx-wrap">
          <div className="sx-label">What we built</div>
          <h2 className="sx-h2">Three parts, <Em>one core.</Em></h2>
          <div className="v3-bento">
            <div className="v3-cell v3-c-6 v3-r-2 v3-cell-big v3-cell-mist">
              <Illo name="route" />
              <div className="v3-cell-k">Field</div>
              <div className="v3-cell-t">Order app</div>
              <p className="v3-cell-p">An Android app for order bookers and salesmen. Works offline, syncs when signal returns, tracks routes by GPS and shows daily targets.</p>
            </div>
            <div className="v3-cell v3-c-6 v3-cell-white">
              <span className="v3-cell-ic"><Icon name="monitor" /></span>
              <div className="v3-cell-k">Management</div>
              <div className="v3-cell-t">Web admin</div>
              <p className="v3-cell-p">Orders, routes, targets and team performance in one place, by region and by salesman.</p>
            </div>
            <div className="v3-cell v3-c-6 v3-cell-sky">
              <span className="v3-cell-ic"><Icon name="check" /></span>
              <div className="v3-cell-k">Quality</div>
              <div className="v3-cell-t">KPO desk</div>
              <p className="v3-cell-p">Every order is verified before it reaches dispatch, so bad orders stop at the door.</p>
            </div>
          </div>
          {/* Real screenshots of the live PaFood console (amounts blurred). */}
          <figure className="sx-dash v3-shot sx-dash-wide">
            <div className="sx-dash-top">
              <span className="sx-dash-dot" />
              <span className="sx-dash-dot" />
              <span className="sx-dash-dot" />
              <span className="sx-dash-title">PaFood · Admin overview</span>
            </div>
            <img src="/assets/work/pafood-overview.webp" width={1600} height={922} loading="lazy" alt="PaFood admin console overview with sales performance, cash flow and revenue analytics" />
          </figure>
          <figure className="sx-dash v3-shot sx-dash-wide">
            <div className="sx-dash-top">
              <span className="sx-dash-dot" />
              <span className="sx-dash-dot" />
              <span className="sx-dash-dot" />
              <span className="sx-dash-title">PaFood · Analytics &amp; reports</span>
            </div>
            <img src="/assets/work/pafood-analytics.webp" width={1600} height={922} loading="lazy" alt="PaFood analytics and reports with period filters, booker day view and sales, cash and credit cards" />
          </figure>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap">
          <div className="sx-label">Outcomes</div>
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
            {/* Two more outcome figures go here once the client confirms them:
                orders processed per month, and hours a week saved on re-typing.
                Kept off the page until then rather than shown as placeholders. */}
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
            <div className="sx-next-title">See all <Em>work</Em></div>
          </div>
          <div className="sx-next-arrow">→</div>
        </div>
      </Link>
      <Footer />
    </div>
  );
};

export default PafoodCaseStudy;
