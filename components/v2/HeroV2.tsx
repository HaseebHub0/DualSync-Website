import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DotField from './DotField';
import SplitReveal from '../anim/SplitReveal';
import MagneticButton from '../ui/MagneticButton';
import Button from './Button';
import DecryptedText from '../reactbits/DecryptedText';
import RotatingText from '../reactbits/RotatingText';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
});

/**
 * Editorial hero — bottom-anchored display type over an interactive dot
 * field. No dashboard theater: one statement, one field, two doors.
 */
const HeroV2: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-canvas">
      <DotField className="z-0 opacity-90" />
      {/* Soft vignette so type always sits on quiet ground. */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(var(--canvas)/0.85)_100%)]" />

      <div className="relative z-10 flex-grow flex flex-col justify-center md:justify-end max-w-[90rem] mx-auto w-full px-6 sm:px-10 pb-10 pt-28 md:pt-36">
        {/* Status line */}
        <motion.div
          {...fade(0.15)}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 md:mb-12"
        >
          <span className="mono-label text-accent flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
            <DecryptedText text="DualSync — AI & SaaS Engineering Studio" />
          </span>
          <span className="mono-label text-ink/60 inline-flex items-center gap-2">
            Now building
            <RotatingText
              words={['AI agents', 'voice systems', 'SaaS platforms', 'ERP systems', 'automations']}
              className="text-accent"
            />
          </span>
        </motion.div>

        {/* Statement */}
        <h1 className="font-display font-black tracking-tighter leading-[0.9] text-ink text-[clamp(2.6rem,11vw,10.5rem)] mb-8 md:mb-16">
          <SplitReveal as="span" type="words" trigger="load" delay={0.25} duration={1.3} stagger={0.09} className="block">
            Software that feels
          </SplitReveal>
          <SplitReveal as="span" type="words" trigger="load" delay={0.5} duration={1.3} className="block text-outline--primary">
            inevitable.
          </SplitReveal>
        </h1>

        {/* Sub + doors */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-rule/10 pt-8">
          <motion.p
            {...fade(0.75)}
            className="text-ink/60 text-base md:text-lg leading-relaxed max-w-md"
          >
            AI agents, SaaS platforms, and enterprise systems — designed and
            engineered end to end by the two founders you actually talk to.
          </motion.p>

          <motion.div {...fade(0.9)} className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto [&>*]:w-full [&>*>*]:w-full sm:[&>*]:w-auto sm:[&>*>*]:w-auto">
            <MagneticButton strength={0.4}>
              <Button as={Link} to="/contact">
                Start a project
              </Button>
            </MagneticButton>
            <Button as={Link} to="/work" variant="line" arrow={false}>
              See the work
            </Button>
          </motion.div>
        </div>

        {/* Meta rail */}
        <motion.div
          {...fade(1.05)}
          className="flex items-center justify-between border-t border-rule/10 mt-8 pt-5"
        >
          <span className="mono-label text-ink/60 flex items-center gap-2">
            Scroll
            <span aria-hidden="true" className="material-symbols-outlined text-sm animate-bounce">south</span>
          </span>
          <span className="mono-label text-ink/60 hidden md:inline">Remote — Worldwide</span>
          <span className="mono-label text-ink/60">Now booking — Q4 2026</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroV2;
