import React from 'react';
import SplitReveal from '../anim/SplitReveal';
import Reveal from '../anim/Reveal';
import DotField from './DotField';

type PageHeroProps = {
  /** Mono eyebrow, e.g. "Services". */
  label: string;
  /** Display headline. Keep it to a few words. */
  title: React.ReactNode;
  /** Optional second line rendered as outlined ghost type. */
  titleOutline?: string;
  lead?: string;
  /** Right-hand meta pairs shown on the rail. */
  meta?: [string, string][];
  /** Interactive dot field behind the type. */
  field?: boolean;
};

/**
 * Shared inner-page opener. Same grammar as the homepage hero — mono
 * eyebrow, bottom-anchored display type, ruled meta rail — at reduced
 * scale so the homepage stays the loudest moment on the site.
 */
const PageHero: React.FC<PageHeroProps> = ({
  label,
  title,
  titleOutline,
  lead,
  meta = [],
  field = true,
}) => (
  <section className="relative overflow-hidden border-b border-rule/10">
    {field && <DotField className="z-0 opacity-60" spacing={34} />}
    <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(var(--canvas)/0.9)_100%)]" />

    <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-10 pt-36 md:pt-44 pb-14 md:pb-20">
      <Reveal y={20}>
        <div className="mono-label text-accent mb-8 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
          {label}
        </div>
      </Reveal>

      <h1 className="font-display font-black tracking-tighter leading-[0.92] text-ink text-[clamp(2.75rem,8vw,7rem)]">
        <SplitReveal as="span" type="words" trigger="load" duration={1.2} stagger={0.08} className="block">
          {title}
        </SplitReveal>
        {titleOutline && (
          <SplitReveal
            as="span"
            type="words"
            trigger="load"
            delay={0.2}
            duration={1.2}
            className="block text-outline--primary"
          >
            {titleOutline}
          </SplitReveal>
        )}
      </h1>

      {(lead || meta.length > 0) && (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-rule/10 mt-10 md:mt-14 pt-8">
          {lead && (
            <Reveal y={24} delay={0.35}>
              <p className="text-ink/60 text-base md:text-lg leading-relaxed max-w-xl">{lead}</p>
            </Reveal>
          )}
          {meta.length > 0 && (
            <Reveal y={24} delay={0.45}>
              <dl className="flex gap-10 shrink-0">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono-label text-ink/60 mb-2">{k}</dt>
                    <dd className="font-display font-black tracking-tighter text-accent text-2xl md:text-3xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
