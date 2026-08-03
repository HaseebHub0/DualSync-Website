import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

type Stat = { value: number; suffix?: string; prefix?: string; label: string; decimals?: number };

/**
 * Every figure here must be independently verifiable. The previous set
 * ("40% cost reduction", "10x faster", "98.4% uptime") was unsourced marketing
 * copy — the kind of claim enterprise procurement treats as a red flag. These
 * four are countable facts or commitments DualSync controls.
 */
const stats: Stat[] = [
  { value: 3, label: 'Systems in production' },
  { value: 4, label: 'Years with our anchor client' },
  { value: 2, label: 'Founders who write the code' },
  { value: 1, label: 'Business day to a reply' },
];

const StatsCounter: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const numberEls = gsap.utils.toArray<HTMLElement>('[data-stat]', root);

    if (prefersReducedMotion) {
      numberEls.forEach((el) => {
        const target = Number(el.dataset.stat);
        const decimals = Number(el.dataset.decimals || 0);
        el.textContent = target.toFixed(decimals);
      });
      return;
    }

    const ctx = gsap.context(() => {
      numberEls.forEach((el) => {
        const target = Number(el.dataset.stat);
        const decimals = Number(el.dataset.decimals || 0);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals);
          },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative border-y border-white/5 bg-white/[0.015] py-16 px-4 sm:px-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <div className="flex items-end justify-center gap-0.5 lg:justify-start">
              {s.prefix && (
                <span className="text-3xl font-black text-primary sm:text-4xl">
                  {s.prefix}
                </span>
              )}
              <span
                data-stat={s.value}
                data-decimals={s.decimals || 0}
                className="text-5xl font-black tabular-nums tracking-tighter text-white sm:text-6xl"
              >
                0
              </span>
              {s.suffix && (
                <span className="text-3xl font-black text-primary sm:text-4xl">
                  {s.suffix}
                </span>
              )}
            </div>
            <div className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
