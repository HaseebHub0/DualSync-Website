import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/v2/PageHero';
import PinnedRail from '../components/v2/PinnedRail';
import Button from '../components/v2/Button';
import Glyph, { type GlyphName } from '../components/v2/Glyph';
import FAQ from '../components/FAQ';
import Reveal from '../components/anim/Reveal';
import SplitReveal from '../components/anim/SplitReveal';
import MagneticButton from '../components/ui/MagneticButton';
import GlareHover from '../components/reactbits/GlareHover';
import DecryptedText from '../components/reactbits/DecryptedText';
import { useSEO } from '../hooks/useSEO';

type Phase = {
  num: string;
  name: string;
  glyph: GlyphName;
  duration: string;
  line: string;
  weDo: string[];
  youGet: string;
};

const phases: Phase[] = [
  {
    num: '01',
    name: 'Listen',
    glyph: 'chat',
    duration: 'Days 1–3',
    line: 'One call, no deck. We map what is actually breaking — not what a brief says is breaking.',
    weDo: [
      'A 45-minute call with both founders',
      'Walk your current tools and workflow',
      'Find the real constraint, not the symptom',
      'Tell you honestly if you need less than you asked for',
    ],
    youGet: 'A written problem statement you can forward to anyone.',
  },
  {
    num: '02',
    name: 'Architect',
    glyph: 'enterprise',
    duration: 'Week 1–2',
    line: 'System design before pixels. Data model, integrations, and failure modes decided while they are still cheap to change.',
    weDo: [
      'Data model and schema design',
      'Integration and API surface map',
      'Scope split into shippable slices',
      'Fixed timeline and fixed price',
    ],
    youGet: 'An architecture doc and a scoped plan — yours to keep either way.',
  },
  {
    num: '03',
    name: 'Build',
    glyph: 'saas',
    duration: 'Week 2 onward',
    line: 'Founders write the code. You get something clickable every week, not a status deck.',
    weDo: [
      'Weekly builds on a live staging URL',
      'Design and engineering in one pass',
      'Your feedback folded into the next slice',
      'No offshore relay, no ticket queue',
    ],
    youGet: 'A working system that grows every Friday.',
  },
  {
    num: '04',
    name: 'Run',
    glyph: 'automation',
    duration: 'Launch onward',
    line: 'Launch is the midpoint, not the finish. We monitor, patch, and scale what we shipped.',
    weDo: [
      'Monitoring and alerting from day one',
      'Patches and dependency upgrades',
      'Scaling as your load grows',
      'Architecture reviews as you evolve',
    ],
    youGet: 'Full source, full infrastructure, no lock-in.',
  },
];

const principles = [
  {
    title: 'We will talk you out of things',
    line: 'If a smaller build solves your problem, we say so. A project that should not have been built is worse for us than a smaller invoice.',
  },
  {
    title: 'No account managers',
    line: 'The person who heard your problem is the person writing the code. Nothing gets lost in a handoff, because there is no handoff.',
  },
  {
    title: 'You own everything',
    line: 'Source, infrastructure, accounts, documentation. No licence traps, no hostage hosting, no "our platform".',
  },
  {
    title: 'One business day',
    line: 'Every message gets a founder reply within one business day — during the build and long after it.',
  },
];

const needFromYou = [
  ['One decision-maker', 'Someone who can say yes without a committee.'],
  ['Two hours a week', 'A short call to review the build and unblock decisions.'],
  ['Access, early', 'Read access to the systems we are replacing or integrating.'],
  ['Honest constraints', 'Real deadlines and real budget. We plan around them, not past them.'],
];

const Process: React.FC = () => {
  useSEO({
    title: 'Process | DualSync — How We Build, Week by Week',
    description:
      'How a DualSync engagement actually runs: Listen, Architect, Build, Run. Founder-led, weekly clickable builds, fixed scope and timeline, and you own everything.',
    canonical: '/process',
    keywords:
      'Software Development Process, Agency Workflow, Founder Led Engineering, Product Architecture, Weekly Builds',
  });

  return (
    <>
      <PageHero
        label="Process"
        title="How the work"
        titleOutline="actually happens."
        lead="Four phases, no mystery. Here is exactly what each week looks like, what we hand over, and what we need from you to make it work."
        meta={[
          ['Phases', '04'],
          ['First build', 'Week 2'],
        ]}
      />

      {/* Pinned horizontal phases */}
      <section className="py-20 md:py-28 border-b border-rule/10">
        <div className="max-w-[90rem] mx-auto px-6 sm:px-10 mb-14">
          <Reveal y={24}>
            <DecryptedText text="01 — The four phases" className="mono-label text-accent block mb-6" />
            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl max-w-2xl shine">
              Scroll sideways through a build.
            </h2>
          </Reveal>
        </div>

        <PinnedRail count={phases.length}>
          {phases.map((phase) => (
            <article
              key={phase.num}
              className="group relative shimmer-card w-[85vw] sm:w-[62vw] md:w-[46vw] lg:w-[34vw] shrink-0 border border-rule/12 bg-surface/[0.02] p-7 md:p-9 flex flex-col"
            >
              <GlareHover />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <span className="mono-label text-accent block mb-3">{phase.duration}</span>
                    <h3 className="font-display font-black tracking-tighter text-ink text-4xl md:text-6xl leading-none">
                      {phase.name}
                    </h3>
                  </div>
                  <div className="size-16 md:size-20 shrink-0 border border-rule/12 p-2.5 group-hover:border-primary/40 transition-colors">
                    <Glyph name={phase.glyph} className="w-full h-full" />
                  </div>
                </div>

                <p className="text-ink/60 text-base leading-relaxed mb-8">{phase.line}</p>

                <ul className="flex flex-col mb-8">
                  {phase.weDo.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 py-2.5 border-b border-rule/[0.08] text-ink/60 text-sm"
                    >
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-rule/12">
                  <span className="mono-label text-ink/60 block mb-2">You walk away with</span>
                  <p className="text-ink/80 text-sm leading-relaxed">{phase.youGet}</p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute -top-2 right-0 font-display font-black text-ink/[0.05] text-[7rem] leading-none select-none pointer-events-none"
                >
                  {phase.num}
                </span>
              </div>
            </article>
          ))}
        </PinnedRail>
      </section>

      {/* Principles */}
      <section className="px-6 sm:px-10 py-24 md:py-32">
        <div className="max-w-[90rem] mx-auto">
          <Reveal y={24}>
            <DecryptedText text="02 — How we behave" className="mono-label text-accent block mb-6" />
            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl mb-14 shine">
              The rules we hold ourselves to
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule/10 border border-rule/10">
            {principles.map((p, i) => (
              <Reveal key={p.title} y={40} delay={i * 0.05}>
                <div className="group relative shimmer-card bg-canvas p-8 md:p-12 h-full">
                  <GlareHover />
                  <div className="relative z-10">
                    <span className="mono-label text-ink/60 block mb-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-ink text-xl md:text-2xl mb-4 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-ink/55 text-sm md:text-base leading-relaxed">{p.line}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we need from you */}
      <section className="px-6 sm:px-10 py-24 md:py-32 border-t border-rule/10">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal y={24}>
                <DecryptedText text="03 — Your side" className="mono-label text-accent block mb-6" />
                <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl leading-[0.95] shine">
                  What we need
                  <br />
                  from you
                </h2>
                <p className="text-ink/50 text-sm md:text-base leading-relaxed max-w-xs mt-6">
                  Short list. Projects stall on these four things far more often
                  than on anything technical.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-rule/10">
              {needFromYou.map(([title, line], i) => (
                <Reveal key={title} y={30} delay={i * 0.05}>
                  <div className="group flex items-start gap-6 md:gap-10 py-8 border-b border-rule/10">
                    <span className="mono-label text-ink/60 shrink-0 mt-2 group-hover:text-accent transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display font-bold tracking-tight text-ink text-xl md:text-3xl mb-3 group-hover:text-accent transition-colors">
                        {title}
                      </h3>
                      <p className="text-ink/55 text-sm md:text-base leading-relaxed max-w-xl">{line}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Close */}
      <section className="px-6 sm:px-10 py-28 md:py-40 border-t border-rule/10 text-center relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          <SplitReveal
            as="h2"
            type="words"
            stagger={0.06}
            className="font-display font-black tracking-tighter leading-[0.95] text-ink text-[clamp(2rem,6vw,5rem)] max-w-4xl mx-auto"
          >
            Phase one is a conversation.
          </SplitReveal>
          <Reveal y={24} delay={0.25}>
            <p className="text-ink/50 text-base md:text-lg max-w-xl mx-auto mt-8">
              Describe the problem in two sentences. We will tell you what it
              actually takes — and what it would cost — before you commit to
              anything.
            </p>
          </Reveal>
          <Reveal y={24} delay={0.35}>
            <div className="flex justify-center mt-12">
              <MagneticButton strength={0.45}>
                <Button as={Link} to="/contact">
                  Start phase one
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

export default Process;
