import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import CreativeVideo from '../../components/v3/CreativeVideo';
import Footer from '../../components/v3/Footer';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/projects"]). */
const Projects: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({
    title: "Work — DualSync",
    description: "Systems that run real businesses: ERP, storefronts, mobile apps and AI.",
    canonical: "/projects",
  });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">[ Selected work ]</div>
          <h1 className="sx-ph-title">Systems that run businesses, and <span className="sx-green">the stories that sell them.</span></h1>
          <p className="sx-ph-lead">From a multi-role ERP running a food distributor to storefronts, finance apps and cinematic production.</p>
        </div>
      </section>
      <section className="sx-dark">
        <div className="sx-wrap">
          <div className="sx-label sx-label-d">01 — Systems</div>
          <Link to="/pafood-case-study" className="sx-feature sx-feature-top">
            <div>
              <div className="sx-label sx-label-d">Pak Asian Foods · ERP &amp; sales ecosystem</div>
              <h3 className="sx-feature-title">PaFood: one system for orders, routes and sales targets.</h3>
              <div className="sx-feature-meta">
                <div className="sx-fm">
                  <div className="sx-fm-v">3</div>
                  <div className="sx-fm-l">systems in production</div>
                </div>
                <div className="sx-fm">
                  <div className="sx-fm-v">4 yrs</div>
                  <div className="sx-fm-l">partnership</div>
                </div>
              </div>
              <div className="sx-feature-link">Read the case study →</div>
            </div>
            <figure className="sx-dash v3-shot">
              <div className="sx-dash-top">
                <span className="sx-dash-dot" />
                <span className="sx-dash-dot" />
                <span className="sx-dash-dot" />
                <span className="sx-dash-title">PaFood · Admin overview</span>
              </div>
              <img src="/assets/work/pafood-overview.webp" width={1600} height={922} loading="lazy" alt="PaFood admin console overview with sales performance and revenue analytics" />
            </figure>
          </Link>
          {/* Real screenshots of the live Pakasian ERP (money figures blurred). */}
          <div className="sx-feature sx-feature-top v3-shot-feature">
            <div>
              <div className="sx-label sx-label-d">Pak Asian Foods · Manufacturing ERP</div>
              <h3 className="sx-feature-title">Pakasian ERP: procurement, stock and production in one system.</h3>
              <div className="sx-feature-meta">
                <div className="sx-fm">
                  <div className="sx-fm-v">8</div>
                  <div className="sx-fm-l">business modules</div>
                </div>
                <div className="sx-fm">
                  <div className="sx-fm-v">Live</div>
                  <div className="sx-fm-l">in daily use</div>
                </div>
              </div>
            </div>
            <figure className="sx-dash v3-shot">
              <div className="sx-dash-top">
                <span className="sx-dash-dot" />
                <span className="sx-dash-dot" />
                <span className="sx-dash-dot" />
                <span className="sx-dash-title">Pakasian ERP · Dashboard</span>
              </div>
              <img src="/assets/work/erp-dashboard.webp" width={1600} height={922} loading="lazy" alt="Pakasian ERP dashboard showing revenue, liquidity, stock value and production today" />
            </figure>
          </div>
          <div className="v3-shots">
            <figure className="sx-dash v3-shot">
              <div className="sx-dash-top">
                <span className="sx-dash-dot" />
                <span className="sx-dash-dot" />
                <span className="sx-dash-dot" />
                <span className="sx-dash-title">Pakasian ERP · Stock summary</span>
              </div>
              <img src="/assets/work/erp-stock.webp" width={1600} height={922} loading="lazy" alt="Stock summary listing raw materials with available, reserved and in-transit quantities by warehouse" />
            </figure>
            <figure className="sx-dash v3-shot">
              <div className="sx-dash-top">
                <span className="sx-dash-dot" />
                <span className="sx-dash-dot" />
                <span className="sx-dash-dot" />
                <span className="sx-dash-title">Pakasian ERP · Inventory analytics</span>
              </div>
              <img src="/assets/work/erp-analytics.webp" width={1600} height={922} loading="lazy" alt="Inventory analytics with stock by warehouse, allocation status and top items charts" />
            </figure>
          </div>
          {/* Our own product, live on Google Play. */}
          <a
            className="sx-feature sx-feature-top v3-app-feature"
            href="https://play.google.com/store/apps/details?id=com.hitasky.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <div className="sx-label sx-label-d">Our product · React Native</div>
              <h3 className="sx-feature-title">HiTasky: a calm task manager you buy once.</h3>
              <p className="v3-feature-p">No subscription, no account, no cloud, no ads. Built, shipped and maintained by us.</p>
              <div className="sx-feature-link">Get it on Google Play ↗</div>
            </div>
            <figure className="v3-phone">
              <img src="/assets/work/hitasky-plan.webp" width={800} height={1300} loading="lazy" alt="HiTasky app showing today's plan with upcoming tasks" />
            </figure>
          </a>
          <div className="sx-minis">
            <div className="sx-mini">
              <div className="sx-label sx-label-d">FinTech · React Native</div>
              <div className="sx-mini-title">Finance Pro</div>
              <p className="sx-mini-p">A freelance ledger: invoices, expenses, client balances and tax-ready exports in one app.</p>
            </div>
            <div className="sx-mini">
              <div className="sx-label sx-label-d">E-commerce · MERN</div>
              <div className="sx-mini-title">PakAsianShop</div>
              <p className="sx-mini-p">A high-conversion storefront built to launch the Glorynuts peanut line.</p>
            </div>
            <div className="sx-mini">
              <div className="sx-label sx-label-d">E-commerce · Brand</div>
              <div className="sx-mini-title">Multan Munch</div>
              <p className="sx-mini-p">A brand storefront for the “Asli Crunch” snack line.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap">
          <div className="sx-label">02 — Creative production</div>
          <h2 className="sx-h2 sx-h2-gap">The stories that sell the systems.</h2>
          <div className="sx-creative">
            <div className="sx-cr sx-reveal">
              <CreativeVideo className="sx-cr-art-1" src="/assets/Videos/kiran_edit_1.mp4" label="video edit by Kiran Haroon" />
              <div className="sx-cr-title">Video edits</div>
              <p className="sx-cr-p">Short-form brand and product films by Kiran Haroon.</p>
            </div>
            <div className="sx-cr sx-reveal">
              <CreativeVideo
                className="sx-cr-art-2"
                src="/assets/Videos/WhatsApp%20Video%202026-02-19%20at%201.22.35%20PM.mp4"
                label="Pak Asian Foods social reel"
              />
              <div className="sx-cr-title">Social media</div>
              <p className="sx-cr-p">Reels and edits for Pak Asian Foods.</p>
            </div>
            <div className="sx-cr sx-reveal">
              <a
                className="sx-cr-art sx-cr-art-3 sx-cr-link"
                href="https://www.behance.net/gallery/205183763/3D-Realistic-Animation-And-Renderings"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="3D work by Sajid Rahim on Behance (opens in a new tab)"
              >
                <div className="sx-cube" />
                <span className="sx-cr-badge">View on Behance ↗</span>
              </a>
              <div className="sx-cr-title">3D &amp; animation</div>
              <p className="sx-cr-p">Product renders, character rigging and environments by Sajid Rahim.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-cta-sec">
        <div className="sx-ring sx-ring-l" />
        <div className="sx-ring sx-ring-r" />
        <div className="sx-cta-inner">
          <div className="sx-label sx-label-ink">Next could be yours</div>
          <h2 className="sx-cta-title">Your system here.</h2>
          <p className="sx-cta-p">Tell us what is breaking. We reply within one business day.</p>
          <Link to="/contact" className="sx-btn-ink">Start a project<span className="sx-btn-dot-g">→</span></Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
