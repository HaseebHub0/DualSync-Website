import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/v2/PageHero';
import PullQuote from '../components/v2/PullQuote';
import Bento, { type BentoCell } from '../components/v2/Bento';
import Reveal from '../components/anim/Reveal';
import Parallax from '../components/anim/Parallax';
import SplitReveal from '../components/anim/SplitReveal';
import MagneticButton from '../components/ui/MagneticButton';
import Button from '../components/v2/Button';
import { useSEO } from '../hooks/useSEO';

type Member = {
  num: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  links: { label: string; href: string }[];
};

const team: Member[] = [
  {
    num: '01',
    name: 'Muhammad Haseeb',
    role: 'Founder & CEO',
    bio: 'Works at the intersection of AI and product design — high-end ERP systems and autonomous agents, with the aesthetic judgement to make them feel effortless.',
    image: '/assets/haseeb.jpeg',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-haseeb-739884317' },
      { label: 'Behance', href: 'https://www.behance.net/muhammadhaseeb162' },
    ],
  },
  {
    num: '02',
    name: 'Muhammad Siddique',
    role: 'Backend Developer',
    bio: 'The backbone of our server-side architecture. Django and high-performance database engineering — the reason enterprise systems hold under real demand.',
    image: '/assets/siddique.jpeg',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-siddique-88aa98284/' },
    ],
  },
  {
    num: '03',
    name: 'Kiran Haroon',
    role: 'Video & Social',
    bio: 'The creative force behind our digital presence — storytelling and visual craft that turn technical milestones into things people actually watch.',
    image: '/assets/kiran.jpeg',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kiran-haroon-18b840354/' },
    ],
  },
  {
    num: '04',
    name: 'Sajid Rahim',
    role: '3D Artist & Animator',
    bio: 'Brings ideas into three dimensions — product renders, character animation, and game-ready assets built in Unreal Engine.',
    image: '/assets/sajid_rahim.jpeg',
    links: [
      { label: 'Behance', href: 'https://www.behance.net/MotionstudioArts' },
    ],
  },
];

const principles: BentoCell[] = [
  {
    label: 'Method',
    glyph: 'agent',
    title: 'AI-accelerated, human-decided',
    description:
      'We automate boilerplate and debugging so every hour we bill goes into your business logic — not into typing a machine could do.',
    span: 'md:col-span-2',
  },
  {
    label: 'Foundations',
    glyph: 'enterprise',
    title: 'Data layers that hold',
    description:
      'PaFood runs on PostgreSQL with cross-platform sync, so web dashboards and field mobile apps never disagree.',
  },
  {
    label: 'Access',
    glyph: 'chat',
    title: 'You talk to the builder',
    description: 'No account manager relay. The person who answers is the person writing the code.',
  },
  {
    label: 'Cadence',
    glyph: 'automation',
    title: 'Weekly, clickable',
    description: 'Progress arrives as builds you can open and use — never as a status deck.',
  },
  {
    label: 'After launch',
    glyph: 'saas',
    title: 'We stay on',
    description:
      'Launch is the midpoint. We monitor, patch, and scale what we ship — four years running for our anchor client.',
  },
];

const gallery = [
  { src: '/assets/me_at_work.jpeg', title: 'Lead architect', span: 'md:col-span-2 md:row-span-2' },
  { src: '/assets/workplace4.jpeg', title: 'Workstation', span: '' },
  { src: '/assets/workplace5.jpeg', title: 'Desk setup', span: 'md:row-span-2' },
  { src: '/assets/workplace1.jpeg', title: 'The hardware', span: '' },
  { src: '/assets/workplace6.jpeg', title: 'Logic mapping', span: 'md:col-span-2' },
  { src: '/assets/workplace7.jpeg', title: 'Focus zone', span: 'md:row-span-2' },
  { src: '/assets/work_2.jpeg', title: 'Collaboration', span: '' },
  { src: '/assets/workplace3.jpeg', title: 'Infrastructure', span: '' },
];

const About: React.FC = () => {
  useSEO({
    title: 'Team | DualSync — Founder-Led AI & SaaS Engineering',
    description:
      'Meet DualSync: Muhammad Haseeb (Founder & CEO), Muhammad Siddique (Backend), Kiran Haroon (Video & Social), and Sajid Rahim (3D). A hands-on, fully remote team building AI agents and enterprise systems.',
    canonical: '/about',
    keywords:
      'DualSync Team, Muhammad Haseeb, Muhammad Siddique, Software Engineering Studio, AI Agency Pakistan, Founder Led Agency',
  });

  return (
    <>
      <PageHero
        label="The Team"
        title="Founder-led."
        titleOutline="Code-driven."
        lead="When you work with DualSync you talk to the person designing your architecture and writing your code. That is the whole model — and the reason it works."
        meta={[
          ['Team', '4'],
          ['Anchor client', '4 yrs'],
        ]}
      />

      {/* Opening spread */}
      <section className="px-6 sm:px-10 py-24 md:py-32">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Reveal y={24}>
              <div className="mono-label text-accent mb-8">01 — Our DNA</div>
              <p className="font-display font-bold tracking-tight text-ink text-2xl md:text-4xl leading-snug">
                Most agencies sell you a team. We sell you the two people who
                will still be on the call when something breaks at 2 a.m.
              </p>
              <p className="text-ink/55 text-base md:text-lg leading-relaxed mt-8 max-w-lg">
                DualSync stayed small on purpose. Fewer people means fewer
                translation layers between what you need and what gets built —
                and no one on the project who has never opened the codebase.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Parallax speed={1.05}>
              <Reveal y={50} delay={0.1}>
                <figure className="relative border border-rule/10 overflow-hidden group">
                  <img
                    src="/assets/founder_and_cofounder_together.jpeg"
                    alt="The founders of DualSync"
                    className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-canvas/90 to-transparent">
                    <span className="mono-label text-ink/70">Haseeb &amp; Siddique</span>
                  </figcaption>
                </figure>
              </Reveal>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10">
        <div className="max-w-[90rem] mx-auto">
          <Reveal y={24}>
            <div className="mono-label text-accent mb-6">02 — How we work</div>
            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl mb-16 shine">
              The technical edge
            </h2>
          </Reveal>
          <Reveal y={40}>
            <Bento cells={principles} />
          </Reveal>
        </div>
      </section>

      {/* Team index */}
      <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10" id="team">
        <div className="max-w-[90rem] mx-auto">
          <Reveal y={24}>
            <div className="mono-label text-accent mb-6">03 — The team</div>
            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl mb-16 shine">
              Four people. Every line.
            </h2>
          </Reveal>

          <div className="border-t border-rule/10">
            {team.map((m, i) => (
              <Reveal key={m.name} y={40} delay={i * 0.04}>
                <article className="group grid grid-cols-[auto_1fr] md:grid-cols-[4rem_10rem_1fr_auto] items-center gap-x-6 gap-y-4 py-6 md:py-8 border-b border-rule/10">
                  <span className="mono-label text-ink/60 group-hover:text-accent transition-colors">
                    {m.num}
                  </span>
                  <div className="w-20 h-24 md:w-full md:h-32 overflow-hidden border border-rule/10">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display font-black tracking-tighter text-ink text-2xl md:text-4xl group-hover:text-accent transition-colors">
                        {m.name}
                      </h3>
                      <span className="mono-label text-accent/70">{m.role}</span>
                    </div>
                    <p className="text-ink/50 text-sm md:text-base leading-relaxed max-w-xl mt-3">
                      {m.bio}
                    </p>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex gap-4 md:flex-col md:items-end shrink-0">
                    {m.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono-label text-ink/60 hover:text-accent transition-colors whitespace-nowrap"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Studio gallery */}
      <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10">
        <div className="max-w-[90rem] mx-auto">
          <Reveal y={24}>
            <div className="mono-label text-accent mb-6">04 — Where we work</div>
            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl mb-4 shine">
              Remote, and deliberate about it
            </h2>
            <p className="text-ink/50 text-base md:text-lg max-w-xl mb-14">
              We work remotely — no office, no commute, no open-plan noise.
              Four people, their own setups, and long uninterrupted stretches
              where the actual engineering happens.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[220px]">
            {gallery.map((img, i) => (
              <Reveal key={img.src} y={40} delay={i * 0.04} className={img.span}>
                <figure className="group relative overflow-hidden border border-rule/10 h-full">
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-canvas/90 to-transparent">
                    <span className="mono-label text-ink/80">{img.title}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal y={24}>
              <div className="mono-label text-accent mb-6">05 — Anchor partner</div>
              <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl leading-[0.95] mb-8 shine">
                DualSync &amp; Pak Asian Foods
              </h2>
              <p className="text-ink/55 text-base md:text-lg leading-relaxed max-w-xl mb-5">
                For four years we have been the primary technical architects for
                Pak Asian Foods — maintaining the PaFood ecosystem and running
                PakAsianShop.com, bridging digital storefronts and physical
                logistics.
              </p>
              <p className="text-ink/40 text-base leading-relaxed max-w-xl">
                Not a project. A long-term technical partnership where we grow
                as they grow.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal y={40} delay={0.1}>
              <div className="border border-rule/10 bg-surface/[0.02] p-14 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,224,123,0.08),transparent_70%)]" />
                <img
                  src="https://pakasianshop.com/logo.webp"
                  alt="Pak Asian Foods"
                  loading="lazy"
                  className="h-24 md:h-32 object-contain relative z-10 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PullQuote />

      {/* Close */}
      <section className="px-6 sm:px-10 py-28 md:py-40 border-t border-rule/10 text-center relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          <SplitReveal
            as="h2"
            type="words"
            stagger={0.06}
            className="font-display font-black tracking-tighter leading-[0.95] text-ink text-[clamp(2rem,6vw,5rem)] max-w-4xl mx-auto"
          >
            Work with the people who build it.
          </SplitReveal>
          <Reveal y={24} delay={0.3}>
            <div className="flex justify-center mt-12">
              <MagneticButton strength={0.45}>
                <Button as={Link} to="/contact">
                  Start a project
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

export default About;
