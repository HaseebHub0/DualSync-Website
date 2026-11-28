import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from '../../components/v3/MobileMenu';
import Footer from '../../components/v3/Footer';
import { Hl, Em, Note } from '../../components/v3/Type';
import { useSEO } from '../../hooks/useSEO';
import { seoProps } from '../../data/seo';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/"]). */
const Home: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO(seoProps('/'));
  useV3Motion(root);

  return (
    <div ref={root} className="ds-page">
      <section className="ds-hero">
        <div className="ds-cloud ds-cloud-a" />
        <div className="ds-cloud ds-cloud-b" />
        <div className="ds-cloud ds-cloud-c" />
        <header className="ds-nav">
          <Link to="/" className="ds-logo" aria-label="DualSync home">
            <div className="ds-logo-word">DualSync</div>
          </Link>
          <nav className="ds-nav-links" aria-label="Main">
            <Link to="/services" className="ds-nav-link">Services</Link>
            <Link to="/projects" className="ds-nav-link">Work</Link>
            <Link to="/process" className="ds-nav-link">Process</Link>
            <Link to="/about" className="ds-nav-link">Team</Link>
            <Link to="/journal" className="ds-nav-link">Journal</Link>
          </nav>
          <Link to="/contact" className="ds-btn-green ds-btn-sm">Start a project</Link>
          <MobileMenu />
        </header>
        <div className="ds-hero-inner">
          <div className="ds-badge"><div className="ds-dot" />Two founders · Zero handoffs</div>
          <h1 className="ds-hero-title">Software that runs your business <span className="ds-hero-soft">while you sleep.</span></h1>
          <p className="ds-hero-sub">AI agents, SaaS platforms and ERP systems, designed and engineered end to end by the two founders you actually talk to.</p>
          <div className="ds-hero-ctas">
            <Link to="/projects" className="ds-btn-glass">See the work</Link>
            <Link to="/contact" className="ds-btn-green">Book a call</Link>
          </div>
        </div>
        <div className="ds-arc">
          {/* Desktop: the track is display:contents, so the cards sit in the 3D arc as before.
              Phones: the track scrolls as a strip; the aria-hidden copy makes the loop seamless. */}
          <div className="v3-arc-track">
            <div className="ds-card ds-c1">
              <div className="ds-card-label">Orders today</div>
              <div className="ds-card-big">1,284</div>
              <div className="ds-bars">
                <div className="ds-bar ds-b1" />
                <div className="ds-bar ds-b2" />
                <div className="ds-bar ds-b3" />
                <div className="ds-bar ds-b4" />
                <div className="ds-bar ds-b5 ds-bar-on" />
              </div>
            </div>
            <div className="ds-card ds-card-dark ds-c2">
              <div className="ds-card-label ds-on-dark">Voice AI</div>
              <div className="ds-wave">
                <div className="ds-w ds-w1" />
                <div className="ds-w ds-w2" />
                <div className="ds-w ds-w3" />
                <div className="ds-w ds-w4" />
                <div className="ds-w ds-w5" />
                <div className="ds-w ds-w6" />
                <div className="ds-w ds-w7" />
              </div>
              <div className="ds-card-text ds-white">Answers, qualifies and books every call.</div>
            </div>
            <div className="ds-card ds-c3 ds-card-photo-a">
              <div className="ds-photo-tag">Haseeb · Founder</div>
            </div>
            <div className="ds-card ds-card-green ds-c4">
              <div className="ds-card-label ds-ink">Order bookers</div>
              <div className="ds-card-huge">Offline</div>
              <div className="ds-card-text">Works without signal, syncs when back online.</div>
            </div>
            <div className="ds-card ds-c5 ds-card-photo-b">
              <div className="ds-photo-tag">Siddique · Co-founder</div>
            </div>
            <div className="ds-card ds-card-dark ds-c6">
              <div className="ds-card-label ds-on-dark">AI agent</div>
              <div className="ds-card-quote">New lead routed to sales in 4 seconds.</div>
            </div>
            <div className="ds-card ds-c7">
              <div className="ds-card-label">Stack</div>
              <div className="ds-card-big">Django · React</div>
              <div className="ds-card-text">Flutter · Postgres · n8n</div>
            </div>
            <div className="v3-arc-copy" aria-hidden="true">
              <div className="ds-card v3-arc-dup ds-c1">
                <div className="ds-card-label">Orders today</div>
                <div className="ds-card-big">1,284</div>
                <div className="ds-bars">
                  <div className="ds-bar ds-b1" />
                  <div className="ds-bar ds-b2" />
                  <div className="ds-bar ds-b3" />
                  <div className="ds-bar ds-b4" />
                  <div className="ds-bar ds-b5 ds-bar-on" />
                </div>
              </div>
              <div className="ds-card v3-arc-dup ds-card-dark ds-c2">
                <div className="ds-card-label ds-on-dark">Voice AI</div>
                <div className="ds-wave">
                  <div className="ds-w ds-w1" />
                  <div className="ds-w ds-w2" />
                  <div className="ds-w ds-w3" />
                  <div className="ds-w ds-w4" />
                  <div className="ds-w ds-w5" />
                  <div className="ds-w ds-w6" />
                  <div className="ds-w ds-w7" />
                </div>
                <div className="ds-card-text ds-white">Answers, qualifies and books every call.</div>
              </div>
              <div className="ds-card v3-arc-dup ds-c3 ds-card-photo-a">
                <div className="ds-photo-tag">Haseeb · Founder</div>
              </div>
              <div className="ds-card v3-arc-dup ds-card-green ds-c4">
                <div className="ds-card-label ds-ink">Order bookers</div>
                <div className="ds-card-huge">Offline</div>
                <div className="ds-card-text">Works without signal, syncs when back online.</div>
              </div>
              <div className="ds-card v3-arc-dup ds-c5 ds-card-photo-b">
                <div className="ds-photo-tag">Siddique · Co-founder</div>
              </div>
              <div className="ds-card v3-arc-dup ds-card-dark ds-c6">
                <div className="ds-card-label ds-on-dark">AI agent</div>
                <div className="ds-card-quote">New lead routed to sales in 4 seconds.</div>
              </div>
              <div className="ds-card v3-arc-dup ds-c7">
                <div className="ds-card-label">Stack</div>
                <div className="ds-card-big">Django · React</div>
                <div className="ds-card-text">Flutter · Postgres · n8n</div>
              </div>
            </div>
          </div>
        </div>
        <p className="ds-trust"><span className="ds-stars">●●</span>Built for FMCG, retail and service teams</p>
      </section>
      <section className="ds-strip">
        <div className="ds-strip-track">
          <div className="ds-logo-txt">Django</div>
          <div className="ds-logo-txt">React</div>
          <div className="ds-logo-txt">Flutter</div>
          <div className="ds-logo-txt">PostgreSQL</div>
          <div className="ds-logo-txt">n8n</div>
          <div className="ds-logo-txt">Retell AI</div>
          <div className="ds-logo-txt">Twilio</div>
        </div>
      </section>
      <section className="ds-about">
        <div className="ds-eyebrow">About DualSync</div>
        <p className="ds-statement">We're two engineers who <Hl>design, build and run</Hl><Note>Founder-led</Note> the software behind growing businesses. <span className="ds-statement-soft">No account managers, no handoffs. You talk to the people writing the code.</span></p>
      </section>
      <section className="ds-bento-wrap">
        <div className="ds-bento">
          <div className="ds-tile ds-tile-photo">
            <div className="ds-tile-float">
              <div className="ds-tile-small ds-ink">Haseeb &amp; Siddique</div>
              <div className="ds-tile-foot">Founders · Rawalpindi, working worldwide</div>
            </div>
          </div>
          <div className="ds-tile ds-tile-grey">
            <div className="ds-tile-small">What we do</div>
            <div className="ds-tile-num">9 services</div>
            <div className="ds-tile-foot">Five core engineering services and four supporting crafts.</div>
          </div>
          <div className="ds-tile ds-tile-green">
            <div className="ds-tile-small ds-ink">PaFood sales system</div>
            <div className="ds-tile-num">7 modules</div>
            <div className="ds-tile-foot ds-ink">Orders, stock, salesmen, order bookers and admin dashboards.</div>
          </div>
          <div className="ds-tile ds-tile-dark ds-tile-wide">
            <div className="ds-tile-small ds-on-dark">Our promise</div>
            <p className="ds-tile-quote">You talk to the two people who build your system, from the first call to launch day and after.</p>
            <div className="ds-tile-foot ds-on-dark">Haseeb &amp; Siddique</div>
          </div>
          <div className="ds-tile ds-tile-grey ds-tile-narrow">
            <div className="ds-tile-small">Reply time</div>
            <div className="ds-tile-num ds-tile-xl">24h</div>
            <div className="ds-tile-foot">Every brief gets a founder reply within one business day.</div>
          </div>
        </div>
      </section>
      <section className="ds-sec">
        <div className="ds-sec-head">
          <div>
            <div className="ds-eyebrow">Services</div>
            <h2 className="ds-h2">What we <Em>build</Em><Note tilt="r">5 core services</Note></h2>
          </div>
          <Link to="/services" className="ds-btn-green">All services</Link>
        </div>
        <div className="ds-svc-list">
          <Link to="/services" className="ds-svc">
            <div className="ds-svc-n">01</div>
            <div className="ds-svc-name">AI agents</div>
            <div className="ds-svc-desc">Agents that handle support, lead routing and back-office work, with a human in the loop where it matters.</div>
            <div className="ds-svc-arrow">→</div>
          </Link>
          <Link to="/services" className="ds-svc">
            <div className="ds-svc-n">02</div>
            <div className="ds-svc-name">Voice AI</div>
            <div className="ds-svc-desc">Phone agents that answer every call, qualify, book and write it all back to your systems.</div>
            <div className="ds-svc-arrow">→</div>
          </Link>
          <Link to="/services" className="ds-svc">
            <div className="ds-svc-n">03</div>
            <div className="ds-svc-name">Custom SaaS</div>
            <div className="ds-svc-desc">Multi-tenant platforms with billing, roles and dashboards, built to scale from day one.</div>
            <div className="ds-svc-arrow">→</div>
          </Link>
          <Link to="/services" className="ds-svc">
            <div className="ds-svc-n">04</div>
            <div className="ds-svc-name">ERP &amp; enterprise</div>
            <div className="ds-svc-desc">Inventory, production, sales and finance in one system your whole team actually uses.</div>
            <div className="ds-svc-arrow">→</div>
          </Link>
          <Link to="/services" className="ds-svc">
            <div className="ds-svc-n">05</div>
            <div className="ds-svc-name">Mobile apps</div>
            <div className="ds-svc-desc">React Native and Flutter apps that work offline and sync when the signal comes back.</div>
            <div className="ds-svc-arrow">→</div>
          </Link>
        </div>
      </section>
      <section className="ds-sec">
        <div className="ds-sec-head">
          <div>
            <div className="ds-eyebrow">Work</div>
            <h2 className="ds-h2">Systems running <Hl>real businesses</Hl></h2>
          </div>
          <Link to="/projects" className="ds-btn-green">All work</Link>
        </div>
        <div className="ds-work">
          <Link to="/pafood-case-study" className="ds-work-main">
            <div className="ds-eyebrow ds-on-dark">Case study · PaFood</div>
            <div className="ds-work-title">Paper and WhatsApp orders, replaced with one system.</div>
            <img className="v3-work-shot" src="/assets/work/pafood-overview.webp" width={1600} height={922} loading="lazy" alt="PaFood admin console overview" />
          </Link>
          <div className="ds-work-side">
            <Link to="/projects" className="ds-work-card ds-work-card-g">
              <div className="ds-eyebrow">ERP</div>
              <div className="ds-work-name">FMCG manufacturing ERP</div>
              <p className="ds-work-p">Inventory and production for a Pakistani manufacturer, built on the same core as PaFood.</p>
            </Link>
            <Link to="/projects" className="ds-work-card">
              <div className="ds-eyebrow">Voice AI</div>
              <div className="ds-work-name">AI dental receptionist</div>
              <p className="ds-work-p">A phone agent that answers, books appointments and syncs every call through n8n.</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="ds-sec">
        <div className="ds-sec-head">
          <div>
            <div className="ds-eyebrow">Process</div>
            <h2 className="ds-h2">How the work <Em>happens</Em></h2>
          </div>
          <Link to="/process" className="ds-btn-green">Our process</Link>
        </div>
        <div className="ds-steps">
          <div className="ds-step ds-step-on">
            <div className="ds-step-n">01 · Week 1</div>
            <div className="ds-step-name">Listen</div>
            <p className="ds-step-p">We map how your business really runs today, including the messy parts.</p>
            <div className="ds-step-get">You get a written scope and a fixed quote.</div>
          </div>
          <div className="ds-step">
            <div className="ds-step-n">02 · Week 2</div>
            <div className="ds-step-name">Architect</div>
            <p className="ds-step-p">Data model, screens and integrations, agreed before any code is written.</p>
            <div className="ds-step-get">You get clickable screens and a build plan.</div>
          </div>
          <div className="ds-step">
            <div className="ds-step-n">03 · Weeks 3+</div>
            <div className="ds-step-name">Build</div>
            <p className="ds-step-p">Weekly releases you can try, with a founder on every call.</p>
            <div className="ds-step-get">You get working software every week.</div>
          </div>
          <div className="ds-step">
            <div className="ds-step-n">04 · Ongoing</div>
            <div className="ds-step-name">Run</div>
            <p className="ds-step-p">We host, monitor and improve it as your team grows.</p>
            <div className="ds-step-get">You get a system that keeps up with you.</div>
          </div>
        </div>
      </section>
      <section className="ds-cta-wrap">
        <div className="ds-cta">
          <div className="ds-cloud ds-cloud-a" />
          <div className="ds-cloud ds-cloud-c" />
          <h2 className="ds-cta-title">Let's build the system <Em>your business runs on.</Em></h2>
          <p className="ds-cta-sub">Tell us what's breaking. A founder replies within one business day.</p>
          <Link to="/contact" className="ds-btn-green">Start a project</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
