import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../anim/Reveal';
import DecryptedText from '../reactbits/DecryptedText';
import SplitReveal from '../anim/SplitReveal';
import ScrollVelocity from '../reactbits/ScrollVelocity';
import MagneticButton from '../ui/MagneticButton';
import Button from './Button';
import StarBorder from '../reactbits/StarBorder';
import Aurora from '../backgrounds/Aurora';

const marqueeItems = [
  'AI Agents',
  'Custom SaaS',
  'Voice AI',
  'Enterprise ERP',
  'CRM',
  'Web Apps',
  'Mobile Apps',
  'Automation',
];

/**
 * The close — a full-viewport statement with one magnetic door out.
 */
const FinalCTA: React.FC = () => {
  return (
    <section className="border-t border-rule/10 relative overflow-hidden">
      {/* Discipline ticker — speeds up and reverses with your scroll. */}
      <div className="py-6 border-b border-rule/10">
        <ScrollVelocity baseSpeed={45} velocityFactor={0.25}>
          {marqueeItems.map((item) => (
            <span key={item} className="flex items-center gap-8 whitespace-nowrap pr-8">
              <span className="font-display font-black tracking-tighter text-2xl md:text-3xl text-ink/20">
                {item}
              </span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary/50" />
            </span>
          ))}
        </ScrollVelocity>
      </div>

      {/* Aurora mesh sits behind the close — the only place on the page that
          gets an ambient backdrop, so it stays an event rather than wallpaper. */}
      <Aurora className="z-0" intensity={0.55} speed={30} />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-10 py-32 md:py-44 text-center relative z-10">
        <Reveal y={20}>
          <DecryptedText text="07 — Your move" className="mono-label text-accent block mb-10" />
        </Reveal>
        <SplitReveal
          as="h2"
          type="words"
          stagger={0.06}
          className="font-display font-black tracking-tighter leading-[0.95] text-ink text-[clamp(2.5rem,7.5vw,7rem)] max-w-6xl mx-auto"
        >
          Build the thing your competitors will copy.
        </SplitReveal>
        <Reveal y={24} delay={0.25}>
          <p className="text-ink/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-10">
            Two questions and your email. A founder — not a form response —
            replies within one business day.
          </p>
        </Reveal>
        <Reveal y={24} delay={0.35}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <MagneticButton strength={0.5}>
              <Button as={Link} to="/contact" className="h-16 px-12">
                Tell us what’s breaking
              </Button>
            </MagneticButton>
            <StarBorder as={Link} to="/work" speed="5s">
              See the work
            </StarBorder>
          </div>
        </Reveal>
      </div>

      {/* Ground glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-primary/10 blur-[140px] rounded-full pointer-events-none"
      />
    </section>
  );
};

export default FinalCTA;
