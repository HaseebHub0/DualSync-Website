import React, { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '../../lib/gsap';

type SplitRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Unit to animate. */
  type?: 'lines' | 'words' | 'chars' | 'words,chars';
  /** Fire on scroll into view, or immediately on mount. */
  trigger?: 'scroll' | 'load';
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
  start?: string;
  as?: React.ElementType;
};

/**
 * Cinematic text reveal using GSAP SplitText — the signature "line/word
 * rises into place" motion seen on award-winning sites. Falls back to a plain
 * element when reduced motion is requested.
 */
const SplitReveal: React.FC<SplitRevealProps> = ({
  children,
  className = '',
  type = 'lines',
  trigger = 'scroll',
  delay = 0,
  duration = 1,
  stagger = 0.08,
  y = 100,
  start = 'top 85%',
  as = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    let split: any;
    const maskUnit = type.includes('chars')
      ? 'chars'
      : type.includes('words')
      ? 'words'
      : 'lines';

    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type,
        // Built-in per-unit masking (SplitText 3.13+) so text rises from
        // behind a clean clip edge.
        mask: maskUnit as any,
        linesClass: 'split-line',
      });
      const targets =
        maskUnit === 'chars'
          ? split.chars
          : maskUnit === 'words'
          ? split.words
          : split.lines;

      gsap.from(targets, {
        yPercent: 120,
        opacity: 0,
        duration,
        delay,
        ease: 'expo.out',
        stagger,
        scrollTrigger:
          trigger === 'scroll'
            ? { trigger: el, start, once: true }
            : undefined,
      });
    }, el);

    return () => {
      ctx.revert();
      if (split && split.revert) split.revert();
    };
  }, [type, trigger, delay, duration, stagger, y, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default SplitReveal;
