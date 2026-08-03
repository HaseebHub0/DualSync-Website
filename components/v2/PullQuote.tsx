import React from 'react';
import SplitReveal from '../anim/SplitReveal';
import Reveal from '../anim/Reveal';
import DecryptedText from '../reactbits/DecryptedText';

/**
 * One voice, full width — the anchor client's words as an editorial
 * pull-quote instead of a testimonial card grid.
 */
const PullQuote: React.FC = () => {
  return (
    <section className="py-28 md:py-40 px-6 sm:px-10 border-t border-rule/10 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 font-display font-black text-ink/[0.03] text-[24rem] leading-none pointer-events-none select-none"
      >
        ”
      </div>
      <div className="max-w-[90rem] mx-auto relative z-10">
        <Reveal y={20}>
          <DecryptedText text="06 — In their words" className="mono-label text-accent block mb-10" />
        </Reveal>
        <SplitReveal
          as="blockquote"
          type="lines"
          stagger={0.1}
          className="font-display font-bold tracking-tight leading-[1.2] text-ink text-[clamp(1.5rem,3.4vw,3.25rem)] max-w-5xl"
        >
          “DualSync is our most trusted technical partner. Their ability to
          sync complex business logic with high-end code is why they handle
          our entire digital infrastructure.”
        </SplitReveal>
        <Reveal y={20} delay={0.2}>
          <div className="flex items-center gap-4 mt-12">
            <span className="h-px w-12 bg-primary" aria-hidden="true" />
            <div>
              <div className="text-ink font-bold">Abdullah Akhtar</div>
              <div className="mono-label text-ink/60 mt-1">Director of Strategy — Pak Asian Foods</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PullQuote;
