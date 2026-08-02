import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/v2/PageHero';
import Button from '../components/v2/Button';
import Glyph, { type GlyphName } from '../components/v2/Glyph';
import Reveal from '../components/anim/Reveal';
import SplitReveal from '../components/anim/SplitReveal';
import Parallax from '../components/anim/Parallax';
import MagneticButton from '../components/ui/MagneticButton';
import GlareHover from '../components/reactbits/GlareHover';
import DecryptedText from '../components/reactbits/DecryptedText';
import { useSEO } from '../hooks/useSEO';

/**
 * NOTE: `roles` is intentionally an open list rather than fabricated job
 * postings. Add real openings here as they exist; while it is empty the page
 * renders an honest "no formal openings, but we read every message" state
 * instead of advertising positions that do not exist.
 */
type Role = {
  title: string;
  type: string;
  location: string;
  line: string;
  glyph: GlyphName;
};

const roles: Role[] = [];

const whatWeLookFor = [
  {
    title: 'You finish things',
    line: 'A small shipped thing beats a large unshipped one. We care far more about what you have put in front of real users than where you studied.',
  },
  {
    title: 'You write',
    line: 'Clear writing is clear thinking. Most of our work happens in written architecture notes before a line of code exists.',
  },
  {
    title: 'You own the outcome',
    line: 'Not "the ticket said". If something is broken and you can see it, you fix it or you flag it. Nobody here waits to be assigned.',
  },
  {
    title: 'You can be wrong out loud',
    line: 'We change our minds in front of each other constantly. Ego about a decision costs more than the bad decision did.',
  },
];

const howWeWork = [
  ['Team size', 'Four people — deliberately'],
  ['Where', 'Fully remote'],
  ['Hours', 'Deep work over standups'],
  ['Stack', 'React, Next.js, Node, Django, PostgreSQL'],
];

const gallery = [
  { src: '/assets/workplace7.jpeg', label: 'Focused work' },
  { src: '/assets/me_at_work.jpeg', label: 'Deep work' },
  { src: '/assets/work_2.jpeg', label: 'Pairing' },
];

const Careers: React.FC = () => {
  useSEO({
    title: 'Careers | DualSync — Work With a Small Studio',
    description:
      'DualSync is a four-person, fully remote AI and SaaS engineering studio. We hire rarely and carefully. See what we look for and how to reach us.',
    canonical: '/careers',
    keywords:
      'Remote Software Jobs, React Developer Jobs Pakistan, AI Engineer Careers, Django Developer, Design Engineer',
  });

  return (
    <>
      <PageHero
        label="Careers"
        title="We hire rarely."
        titleOutline="Carefully."
        lead="Four people run everything here. That only works if every one of them can own a system end to end — so we take a long time choosing, and we pay attention to people who reach out before we advertise."
        meta={[
          ['Team', '4'],
          ['Open roles', String(roles.length)],
        ]}
      />

      {/* Open roles — or an honest empty state */}
      <section className="px-6 sm:px-10 py-24 md:py-32">
        <div className="max-w-[90rem] mx-auto">
          <Reveal y={24}>
            <DecryptedText text="01 — Open roles" className="mono-label text-accent block mb-6" />
            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl mb-14 shine">
              What we&rsquo;re hiring for
            </h2>
          </Reveal>

          {roles.length > 0 ? (
            <div className="border-t border-rule/10">
              {roles.map((role, i) => (
                <Reveal key={role.title} y={40} delay={i * 0.05}>
                  <Link
                    to="/contact"
                    className="cap-row group grid grid-cols-[auto_1fr] md:grid-cols-[4rem_1fr_minmax(0,20rem)_3rem] items-center gap-x-6 gap-y-3 py-8 border-b border-rule/10 px-2 md:px-4"
                  >
                    <span className="mono-label text-ink/60 group-hover:text-accent transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="cap-row__title font-display font-black tracking-tighter text-ink text-2xl md:text-4xl group-hover:text-accent">
                      {role.title}
                    </h3>
                    <div className="col-start-2 md:col-start-3">
                      <p className="text-ink/55 text-sm leading-relaxed mb-2">{role.line}</p>
                      <div className="flex flex-wrap gap-x-4">
                        <span className="mono-label text-ink/60">{role.type}</span>
                        <span className="mono-label text-ink/60">{role.location}</span>
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
          ) : (
            <Reveal y={40}>
              <div className="group relative shimmer-card border border-rule/12 bg-surface/[0.02] p-10 md:p-16">
                <GlareHover />
                <div className="relative z-10 max-w-2xl">
                  <span className="mono-label text-accent block mb-6">No formal openings right now</span>
                  <p className="font-display font-bold tracking-tight text-ink text-2xl md:text-4xl leading-snug mb-6">
                    That has never stopped us hiring someone.
                  </p>
                  <p className="text-ink/55 text-base md:text-lg leading-relaxed mb-10">
                    Every person here reached out before there was a job posting.
                    If you read the section below and recognise yourself, send us
                    something you have built — not a CV. A founder reads it
                    personally and replies within one business day.
                  </p>
                  <MagneticButton strength={0.4}>
                    <Button as={Link} to="/contact">
                      Introduce yourself
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* What we look for */}
      <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10">
        <div className="max-w-[90rem] mx-auto">
          <Reveal y={24}>
            <DecryptedText text="02 — The bar" className="mono-label text-accent block mb-6" />
            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl mb-14 shine">
              What we actually look for
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule/10 border border-rule/10">
            {whatWeLookFor.map((item, i) => (
              <Reveal key={item.title} y={40} delay={i * 0.05}>
                <div className="group relative shimmer-card bg-canvas p-8 md:p-12 h-full">
                  <GlareHover />
                  <div className="relative z-10">
                    <span className="mono-label text-ink/60 block mb-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-ink text-xl md:text-2xl mb-4 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-ink/55 text-sm md:text-base leading-relaxed">{item.line}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-14">
          <div className="lg:col-span-7">
            <Reveal y={24}>
              <DecryptedText text="03 — How we work" className="mono-label text-accent block mb-6" />
              <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl leading-[0.95] shine">
                Small on purpose
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal y={24} delay={0.1}>
              <dl className="border-t border-rule/10">
                {howWeWork.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3.5 border-b border-rule/10">
                    <dt className="mono-label text-ink/60 shrink-0">{k}</dt>
                    <dd className="text-ink/70 text-sm text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {gallery.map((img, i) => (
            <Parallax key={img.src} speed={i === 1 ? 0.95 : 1.05}>
              <Reveal y={50} delay={i * 0.08}>
                <figure
                  className={`group relative overflow-hidden border border-rule/10 aspect-[4/5] ${
                    i === 1 ? 'md:-mt-10' : ''
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 flex items-center justify-between p-5 bg-gradient-to-t from-canvas/90 to-transparent">
                    <span className="mono-label text-ink/80">{img.label}</span>
                    <span className="mono-label text-ink/60">{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </Parallax>
          ))}
        </div>
      </section>

      {/* Close */}
      <section className="px-6 sm:px-10 py-28 md:py-40 border-t border-rule/10 text-center relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          <SplitReveal
            as="h2"
            type="words"
            stagger={0.06}
            className="font-display font-black tracking-tighter leading-[0.95] text-ink text-[clamp(2rem,6vw,5rem)] max-w-4xl mx-auto"
          >
            Show us something you built.
          </SplitReveal>
          <Reveal y={24} delay={0.25}>
            <p className="text-ink/50 text-base md:text-lg max-w-xl mx-auto mt-8">
              A repo, a side project, a system nobody asked you to build. That
              tells us more in five minutes than a CV does in an hour.
            </p>
          </Reveal>
          <Reveal y={24} delay={0.35}>
            <div className="flex justify-center mt-12">
              <MagneticButton strength={0.45}>
                <Button as={Link} to="/contact">
                  Get in touch
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50rem] h-[16rem] bg-primary/10 blur-[130px] rounded-full pointer-events-none"
        />
      </section>
    </>
  );
};

export default Careers;
