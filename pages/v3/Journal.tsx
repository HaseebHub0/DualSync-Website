import React, { useRef } from 'react';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/journal"]). */
const Journal: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO({
    title: "Journal — DualSync",
    description: "Engineering notes on AI agents, SaaS and enterprise systems, and what broke.",
    canonical: "/journal",
  });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">[ Journal ]</div>
          <h1 className="sx-ph-title">What we built, <span className="sx-green">and what broke.</span></h1>
          <p className="sx-ph-lead">Engineering notes on AI agents, SaaS architecture and enterprise systems, written by the people who built them.</p>
        </div>
      </section>
      <section className="sx-paper">
        <div className="sx-wrap">
          <div className="sx-label">Suggested first posts · replace with your published articles</div>
          <div className="sx-posts">
            <a href="#" className="sx-post sx-reveal">
              <span className="sx-post-cat">ERP</span>
              <span className="sx-post-t">How we made PaFood work with no signal</span>
              <span className="sx-post-m">Offline-first sync</span>
              <span className="sx-post-a">→</span>
            </a>
            <a href="#" className="sx-post sx-reveal">
              <span className="sx-post-cat">AI agents</span>
              <span className="sx-post-t">The agent that knew when to stop and ask a human</span>
              <span className="sx-post-m">Human-in-the-loop</span>
              <span className="sx-post-a">→</span>
            </a>
            <a href="#" className="sx-post sx-reveal">
              <span className="sx-post-cat">Voice AI</span>
              <span className="sx-post-t">Building a receptionist with Retell AI and n8n</span>
              <span className="sx-post-m">Voice + booking</span>
              <span className="sx-post-a">→</span>
            </a>
            <a href="#" className="sx-post sx-reveal">
              <span className="sx-post-cat">Data</span>
              <span className="sx-post-t">Designing a PostgreSQL schema for orders, routes and targets</span>
              <span className="sx-post-m">Schema first</span>
              <span className="sx-post-a">→</span>
            </a>
            <a href="#" className="sx-post sx-reveal">
              <span className="sx-post-cat">Process</span>
              <span className="sx-post-t">Why we ship a build every Friday</span>
              <span className="sx-post-m">Weekly builds</span>
              <span className="sx-post-a">→</span>
            </a>
            <a href="#" className="sx-post sx-reveal">
              <span className="sx-post-cat">Automation</span>
              <span className="sx-post-t">WhatsApp order updates on the official Cloud API</span>
              <span className="sx-post-m">Messaging</span>
              <span className="sx-post-a">→</span>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Journal;
