import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import Icon from '../../components/v3/Icon';
import Illo from '../../components/v3/Illo';
import { Hl, Em, Note } from '../../components/v3/Type';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/services"]). */
const Services: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({
    title: "Services — DualSync",
    description: "AI agents, Voice AI, custom SaaS, enterprise systems and mobile apps, built by the two founders you talk to.",
    canonical: "/services",
  });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">[ Services ]</div>
          <h1 className="sx-ph-title">Nine ways we make your business <span className="sx-green">run itself.</span></h1>
          <p className="sx-ph-lead">Five core engineering services, four supporting crafts. Every one is scoped and built by the two founders you talk to.</p>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap">
          <div className="sx-label">Core engineering</div>
          <div className="sx-svc-rows">
            <div className="sx-svc-row sx-reveal">
              <div className="sx-svc-num">01</div>
              <div>
                <h2 className="sx-svc-title">AI agents</h2>
                <p className="sx-svc-desc">Agents that handle support, lead routing and back-office work, with a human in the loop where it matters.</p>
              </div>
              <ul role="list" className="sx-svc-list">
                <li className="sx-svc-li">LLM fine-tuning and retrieval on your data</li>
                <li className="sx-svc-li">Autonomous support agents</li>
                <li className="sx-svc-li">Workflow automation</li>
                <li className="sx-svc-li">Data science and computer vision</li>
              </ul>
            </div>
            <div className="sx-svc-row sx-reveal">
              <div className="sx-svc-num">02</div>
              <div>
                <h2 className="sx-svc-title">Voice AI</h2>
                <p className="sx-svc-desc">Phone agents that answer every call, qualify, book and write it all back to your systems.</p>
              </div>
              <ul role="list" className="sx-svc-list">
                <li className="sx-svc-li">Inbound support and reception</li>
                <li className="sx-svc-li">Outbound sales and qualification</li>
                <li className="sx-svc-li">Voice cloning</li>
                <li className="sx-svc-li">CRM and ERP integration</li>
              </ul>
            </div>
            <div className="sx-svc-row sx-reveal">
              <div className="sx-svc-num">03</div>
              <div>
                <h2 className="sx-svc-title">Custom SaaS</h2>
                <p className="sx-svc-desc">Products you can sell: multi-tenant, billing-ready and fast from the first customer.</p>
              </div>
              <ul role="list" className="sx-svc-list">
                <li className="sx-svc-li">Dashboards and admin panels</li>
                <li className="sx-svc-li">Serverless and scalable back ends</li>
                <li className="sx-svc-li">Roles, billing and audit logs</li>
                <li className="sx-svc-li">Performance tuning</li>
              </ul>
            </div>
            <div className="sx-svc-row sx-reveal">
              <div className="sx-svc-num">04</div>
              <div>
                <h2 className="sx-svc-title">Enterprise systems</h2>
                <p className="sx-svc-desc">ERP and CRM that match how your team actually works, not how a template thinks it should.</p>
              </div>
              <ul role="list" className="sx-svc-list">
                <li className="sx-svc-li">Logistics and distribution ERP</li>
                <li className="sx-svc-li">Inventory and production platforms</li>
                <li className="sx-svc-li">Legacy modernisation</li>
                <li className="sx-svc-li">Cloud migration</li>
              </ul>
            </div>
            <div className="sx-svc-row sx-reveal">
              <div className="sx-svc-num">05</div>
              <div>
                <h2 className="sx-svc-title">Web &amp; mobile</h2>
                <p className="sx-svc-desc">Field apps that work without signal and web front ends that load before your client blinks.</p>
              </div>
              <ul role="list" className="sx-svc-list">
                <li className="sx-svc-li">Offline-first mobile apps</li>
                <li className="sx-svc-li">Real-time sync</li>
                <li className="sx-svc-li">Inventory and field tools</li>
                <li className="sx-svc-li">Marketing sites and storefronts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="v3-sec">
        <div className="sx-wrap">
          <div className="sx-label">Supporting crafts</div>
          <h2 className="sx-h2">Also in the <Hl>toolkit</Hl><Note tilt="r">4 crafts</Note></h2>
          <div className="v3-bento">
            <div className="v3-cell v3-c-7 v3-cell-big v3-cell-mist">
              <Illo name="flow" />
              <div className="v3-cell-k">Automation</div>
              <div className="v3-cell-t">n8n workflows</div>
              <p className="v3-cell-p">Custom nodes, lead routing, invoices and reports, self-hosted on AWS or Hetzner.</p>
            </div>
            <div className="v3-cell v3-c-5 v3-cell-white">
                            <Illo name="chat" className="v3-illo-sm" />
                            <div className="v3-cell-k">Messaging</div>
              <div className="v3-cell-t">WhatsApp systems</div>
              <p className="v3-cell-p">Order and shipping updates, routing, a shared inbox and broadcasts on the official Cloud API.</p>
            </div>
            <div className="v3-cell">
              <span className="v3-cell-ic"><Icon name="pen" /></span>
              <div className="v3-cell-k">Design</div>
              <div className="v3-cell-t">Product design</div>
              <p className="v3-cell-p">Prototypes, dashboards and mobile-first user journeys in Figma.</p>
            </div>
            <div className="v3-cell v3-cell-sky">
              <span className="v3-cell-ic"><Icon name="cube" /></span>
              <div className="v3-cell-k">Creative</div>
              <div className="v3-cell-t">3D &amp; motion</div>
              <p className="v3-cell-p">Product renders, character animation and Unreal environments by Sajid Rahim.</p>
            </div>
            <div className="v3-cell v3-cell-white">
              <span className="v3-cell-ic"><Icon name="flask" /></span>
              <div className="v3-cell-t">Currently in the lab</div>
              <div className="v3-cell-row">
                <span className="v3-tag v3-tag-dashed">Blockchain systems</span>
                <span className="v3-tag v3-tag-dashed">Technical SEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-cta-sec">
        <div className="sx-ring sx-ring-l" />
        <div className="sx-ring sx-ring-r" />
        <div className="sx-cta-inner">
          <div className="sx-label sx-label-ink">Not sure which one?</div>
          <h2 className="sx-cta-title">Tell us <Em>the problem.</Em></h2>
          <p className="sx-cta-p">We will tell you which of these it needs, or talk you out of building anything at all.</p>
          <Link to="/contact" className="sx-btn-ink">Start a project<span className="sx-btn-dot-g">→</span></Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
