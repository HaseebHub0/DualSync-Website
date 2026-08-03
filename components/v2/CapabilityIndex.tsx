import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../anim/Reveal';
import DecryptedText from '../reactbits/DecryptedText';

type Capability = {
  index: string;
  title: string;
  line: string;
  tags: string[];
};

const capabilities: Capability[] = [
  {
    index: '01',
    title: 'AI Agents',
    line: 'Autonomous workflows that run your operations while you sleep.',
    tags: ['OpenAI', 'n8n', 'Python'],
  },
  {
    index: '02',
    title: 'Voice AI',
    line: 'Calls answered, booked, and logged — by software that sounds human.',
    tags: ['Retell AI', 'VAPI'],
  },
  {
    index: '03',
    title: 'Custom SaaS',
    line: 'From first sketch to paying customers, one team end to end.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    index: '04',
    title: 'Enterprise Systems',
    line: 'ERP and CRM shaped to the business — not the other way around.',
    tags: ['Django', 'Python', 'PostgreSQL'],
  },
  {
    index: '05',
    title: 'Web & Mobile',
    line: 'Interfaces people don’t have to think about.',
    tags: ['React', 'React Native', 'TypeScript'],
  },
];

/**
 * The services section as an editorial index — ruled rows of display type
 * instead of card grids. Hover shifts the title, ignites the row, and
 * reveals the arrow; the whole row routes to /services.
 */
const CapabilityIndex: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 sm:px-10" id="services">
      <div className="max-w-[90rem] mx-auto">
        <Reveal y={24}>
          <div className="flex items-end justify-between mb-14">
            <div>
              <DecryptedText text="02 — Capabilities" className="mono-label text-accent block mb-6" />
              <h2 className="font-display font-black tracking-tighter text-ink text-4xl md:text-6xl shine">
              What we build
            </h2>
            </div>
            <span className="mono-label text-ink/60 hidden md:block">Index / 5</span>
          </div>
        </Reveal>

        <div className="border-t border-rule/10">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.index} y={40} delay={i * 0.04}>
              <Link
                to="/services"
                className="cap-row group grid grid-cols-[auto_1fr] md:grid-cols-[5rem_1fr_minmax(0,22rem)_3rem] items-center gap-x-6 gap-y-2 py-8 md:py-10 border-b border-rule/10 px-2 md:px-4"
              >
                <span className="mono-label text-ink/60 group-hover:text-accent transition-colors">
                  {cap.index}
                </span>
                <h3 className="cap-row__title font-display font-black tracking-tighter text-ink text-3xl md:text-5xl lg:text-6xl group-hover:text-accent">
                  {cap.title}
                </h3>
                <div className="col-start-2 md:col-start-3 max-w-md">
                  <p className="text-ink/50 text-sm md:text-base leading-relaxed mb-2">{cap.line}</p>
                  <div className="flex flex-wrap gap-x-3">
                    {cap.tags.map((t) => (
                      <span key={t} className="mono-label text-ink/60">{t}</span>
                    ))}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="cap-row__arrow material-symbols-outlined text-accent text-3xl hidden md:block"
                >
                  north_east
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilityIndex;
