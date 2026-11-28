import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import Icon from '../../components/v3/Icon';
import { Em, Hl, Note } from '../../components/v3/Type';
import { useSEO } from '../../hooks/useSEO';
import { PK_FAQ, seoProps } from '../../data/seo';
import { useV3Motion } from '../../hooks/useV3Motion';

/**
 * /erp-software-pakistan — the page that answers "who builds custom ERP and
 * business software in Pakistan?" for search and AI answer engines.
 * Every claim here is already established elsewhere on the site.
 */
const ErpPakistan: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO(seoProps('/erp-software-pakistan'));
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">ERP and business software in Pakistan</div>
          <h1 className="sx-ph-title">Custom ERP, built in Pakistan <span className="sx-green">for how you actually work.</span></h1>
          <p className="sx-ph-lead">
            DualSync is a two-founder software studio in Rawalpindi. We build ERP systems, field sales apps and AI
            automation for Pakistani companies, and we have run Pak Asian Foods’ systems in Multan since 2022.
          </p>
        </div>
      </section>

      <section className="v3-sec">
        <div className="sx-wrap">
          <div className="sx-label">In production in Multan</div>
          <h2 className="sx-h2">Four years with <Hl>Pak Asian Foods.</Hl><Note>Since 2022</Note></h2>
          <div className="v3-bento">
            <Link to="/pafood-case-study" className="v3-cell v3-c-8 v3-r-2 v3-cell-big v3-cell-white v3-pk-shot">
              <figure className="sx-dash v3-shot">
                <div className="sx-dash-top">
                  <span className="sx-dash-dot" />
                  <span className="sx-dash-dot" />
                  <span className="sx-dash-dot" />
                  <span className="sx-dash-title">Pakasian ERP · Dashboard</span>
                </div>
                <img src="/assets/work/erp-dashboard.webp" width={1600} height={922} loading="lazy" alt="Pakasian ERP dashboard used by Pak Asian Foods in Multan" />
              </figure>
              <div className="v3-cell-k">Pakasian ERP</div>
              <div className="v3-cell-t">Procurement, inventory, warehouse, sales, manufacturing and finance in one system.</div>
            </Link>
            <div className="v3-cell v3-c-4 v3-cell-mist">
              <div className="v3-pk-num">3</div>
              <div className="v3-cell-t">systems in production</div>
              <p className="v3-cell-p">An ERP, a field order app and a web admin with a KPO desk.</p>
            </div>
            <div className="v3-cell v3-c-4 v3-cell-sky">
              <div className="v3-pk-num">4<span>yrs</span></div>
              <div className="v3-cell-t">continuous partnership</div>
              <p className="v3-cell-p">We still run, monitor and improve every system we shipped.</p>
            </div>
            <div className="v3-cell v3-c-6">
              <span className="v3-cell-ic"><Icon name="phone" /></span>
              <div className="v3-cell-k">PaFood order app</div>
              <div className="v3-cell-t">Order bookers book in the shop, signal or not.</div>
              <p className="v3-cell-p">Orders, visits and payments are saved on the phone and sync when the network returns, exactly once.</p>
            </div>
            <div className="v3-cell v3-c-6 v3-cell-white">
              <span className="v3-cell-ic"><Icon name="monitor" /></span>
              <div className="v3-cell-k">Web admin and KPO desk</div>
              <div className="v3-cell-t">Every order verified before dispatch.</div>
              <p className="v3-cell-p">Routes, targets, cash and team performance by region, branch and salesman.</p>
            </div>
          </div>
          <Link to="/pafood-case-study" className="sx-btn-ink">Read the full case study<span className="sx-btn-dot-g" /></Link>
        </div>
      </section>

      <section className="v3-sec v3-sec-paper">
        <div className="sx-wrap">
          <div className="sx-label">Built for the way businesses run here</div>
          <h2 className="sx-h2">Software that fits <Em>the field, not a template.</Em></h2>
          <div className="v3-bento">
            <div className="v3-cell v3-c-4 v3-cell-white">
              <span className="v3-cell-ic"><Icon name="phone" /></span>
              <div className="v3-cell-t">Works with weak signal</div>
              <p className="v3-cell-p">Offline-first mobile apps for markets and towns where the network comes and goes.</p>
            </div>
            <div className="v3-cell v3-c-4 v3-cell-white">
              <span className="v3-cell-ic"><Icon name="person" /></span>
              <div className="v3-cell-t">Order bookers, salesmen, KPOs</div>
              <p className="v3-cell-p">Roles that match how distribution teams actually split the work.</p>
            </div>
            <div className="v3-cell v3-c-4 v3-cell-white">
              <span className="v3-cell-ic"><Icon name="key" /></span>
              <div className="v3-cell-t">Cash, credit and recoveries</div>
              <p className="v3-cell-p">Shop ledgers, cash reconciliation and recoveries, kept as a history rather than overwritten.</p>
            </div>
            <div className="v3-cell v3-c-6 v3-cell-white">
              <span className="v3-cell-ic"><Icon name="chat" /></span>
              <div className="v3-cell-t">WhatsApp, the official way</div>
              <p className="v3-cell-p">Order and delivery updates on the WhatsApp Cloud API, on the channel your customers already read.</p>
            </div>
            <div className="v3-cell v3-c-6 v3-cell-white">
              <span className="v3-cell-ic"><Icon name="layers" /></span>
              <div className="v3-cell-t">Reports by region and branch</div>
              <p className="v3-cell-p">Performance by region, branch and person, without special cases, because the schema mirrors the company.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="v3-sec v3-faq-sec" aria-labelledby="pk-faq-h">
        <div className="sx-wrap v3-faq-wrap">
          <div>
            <div className="sx-label">Questions from Pakistani companies</div>
            <h2 className="sx-h2" id="pk-faq-h">Before you <Em>call us.</Em></h2>
            <p className="v3-faq-lead">Anything else? <Link to="/contact">Ask us directly</Link>. A founder replies within one business day.</p>
          </div>
          <div className="v3-faq">
            {PK_FAQ.map(({ q, a }, i) => (
              <details key={q} className="v3-faq-item" open={i === 0}>
                <summary><span>{q}</span><span className="v3-faq-x" aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sx-cta-sec">
        <div className="sx-ring sx-ring-l" />
        <div className="sx-ring sx-ring-r" />
        <div className="sx-cta-inner">
          <div className="sx-label sx-label-ink">Rawalpindi, working across Pakistan and worldwide</div>
          <h2 className="sx-cta-title">Tell us <Em>what’s breaking.</Em></h2>
          <p className="sx-cta-p">Two questions and your email. A founder replies within one business day.</p>
          <Link to="/contact" className="sx-btn-ink">Start a project<span className="sx-btn-dot-g" /></Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ErpPakistan;
