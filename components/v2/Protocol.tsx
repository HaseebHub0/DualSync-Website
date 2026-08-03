import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import Reveal from '../anim/Reveal';
import DecryptedText from '../reactbits/DecryptedText';

const steps = [
  {
    index: '01',
    title: 'Listen',
    line: 'One call. We map what is actually broken — not what a brief says.',
  },
  {
    index: '02',
    title: 'Architect',
    line: 'System design before pixels. A blueprint, scoped and priced in days.',
  },
  {
    index: '03',
    title: 'Build',
    line: 'Founders write the code. Weekly builds you can click, not decks.',
  },
  {
    index: '04',
    title: 'Run',
    line: 'Launch is the midpoint. We monitor, patch, and scale what we ship.',
  },
];

/**
 * The working protocol — a vertical spine that draws itself as you scroll
 * past four numbered movements. Sticky heading keeps the section oriented.
 */
const Protocol: React.FC = () => {
  const spineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const spine = spineRef.current;
    const list = listRef.current;
    if (!spine || !list || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: list,
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 0.5,
          },
        }
      );
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 sm:px-10 border-t border-rule/10">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sticky orientation column */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal y={24}>
              <DecryptedText text="04 — Protocol" className="mono-label text-accent block mb-6" />
              <h2 className="font-display font-black tracking-tighter text-ink text-4xl md:text-6xl leading-[0.95] shine">
                How the work happens
              </h2>
              <p className="text-ink/50 text-sm md:text-base leading-relaxed max-w-xs mt-6">
                Four movements. No account managers between you and the people
                building your system.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Steps with drawn spine */}
        <div ref={listRef} className="lg:col-span-8 relative pl-10 md:pl-16">
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-surface/10" aria-hidden="true" />
          <div
            ref={spineRef}
            className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-primary shadow-[0_0_12px_rgba(56,224,123,0.6)]"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-20 md:gap-28 py-2">
            {steps.map((step, i) => (
              <Reveal key={step.index} y={50} delay={i * 0.05}>
                <div className="relative">
                  <span
                    className="absolute -left-[2.55rem] md:-left-[3.55rem] top-3 size-2.5 rounded-full bg-canvas border-2 border-primary"
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline gap-6">
                    <span className="mono-label text-ink/60">{step.index}</span>
                    <h3 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-ink/50 text-base md:text-lg leading-relaxed max-w-lg mt-4">
                    {step.line}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Protocol;
