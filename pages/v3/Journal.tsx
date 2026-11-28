import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import Icon, { type IconName } from '../../components/v3/Icon';
import { useSEO } from '../../hooks/useSEO';
import { seoProps } from '../../data/seo';
import { POSTS } from '../../data/journal';
import { readMinutes } from '../../data/journal-bodies';
import { useV3Motion } from '../../hooks/useV3Motion';

export const TOPIC_ICON: Record<string, IconName> = {
  ERP: 'layers',
  'AI agents': 'spark',
  'Voice AI': 'phone',
  Data: 'layers',
  Process: 'calendar',
  Automation: 'chat',
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const Journal: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSEO(seoProps('/journal'));
  useV3Motion(root);
  const [lead, ...rest] = POSTS;

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-ph-inner">
          <div className="sx-ph-label">Journal</div>
          <h1 className="sx-ph-title">What we built, <span className="sx-green">and what broke.</span></h1>
          <p className="sx-ph-lead">Engineering notes on AI agents, SaaS architecture and enterprise systems, written by the people who built them.</p>
        </div>
      </section>
      <section className="v3-sec">
        <div className="sx-wrap">
          <div className="sx-label">Latest entries</div>
          <div className="v3-bento">
            <Link to={`/journal/${lead.slug}`} className="v3-cell v3-c-12 v3-cell-big v3-cell-mist v3-post-lead">
              <div className="v3-post-top">
                <span className="v3-cell-ic"><Icon name={TOPIC_ICON[lead.category] ?? 'spark'} /></span>
                <span className="v3-post-meta">{lead.category} · {readMinutes(lead)} min read</span>
              </div>
              <h2 className="v3-post-title v3-post-title-lg">{lead.title}</h2>
              <p className="v3-cell-p">{lead.description}</p>
              <span className="v3-post-go">Read the entry</span>
            </Link>
            {rest.map((p, i) => (
              <Link
                key={p.slug}
                to={`/journal/${p.slug}`}
                className={`v3-cell ${i % 5 === 0 ? 'v3-c-7 v3-cell-white' : i % 5 === 1 ? 'v3-c-5 v3-cell-sky' : i % 5 === 2 ? 'v3-c-5' : i % 5 === 3 ? 'v3-c-7 v3-cell-white' : 'v3-c-12 v3-cell-mist'}`}
              >
                <div className="v3-post-top">
                  <span className="v3-cell-ic"><Icon name={TOPIC_ICON[p.category] ?? 'spark'} /></span>
                  <span className="v3-post-meta">{p.category} · {readMinutes(p)} min read</span>
                </div>
                <h2 className="v3-post-title">{p.title}</h2>
                <p className="v3-cell-p">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Journal;
