import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

/**
 * A single ruled row of verifiable facts. Numbers count up once on entry.
 * Same sourced figures as the previous StatsCounter — countable facts or
 * commitments DualSync controls, not marketing claims.
 */
const facts = [
  { value: 3, label: 'Systems in production' },
  { value: 4, label: 'Years with our anchor client' },
  { value: 2, label: 'Founders who write the code' },
  { value: 1, label: 'Business day to a reply' },
];

const ProofBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = gsap.utils.toArray<HTMLElement>('[data-count]', root);

    if (prefersReducedMotion) {
      els.forEach((el) => (el.textContent = el.dataset.count ?? ''));
      return;
    }

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const target = Number(el.dataset.count);
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = String(Math.round(state.v))),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="border-y border-rule/10">
      <div className="max-w-[90rem] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            className={`px-6 sm:px-10 py-10 flex flex-col gap-2 ${
              i > 0 ? 'border-l border-rule/10' : ''
            } ${i === 2 ? 'max-lg:border-l-0 max-lg:border-t' : ''} ${
              i === 3 ? 'max-lg:border-t' : ''
            }`}
          >
            <span className="font-display font-black tracking-tighter text-accent text-4xl md:text-6xl tabular-nums">
              <span data-count={fact.value}>0</span>
            </span>
            <span className="mono-label text-ink/60">{fact.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProofBar;
