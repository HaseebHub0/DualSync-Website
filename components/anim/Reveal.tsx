import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical travel distance in px. */
  y?: number;
  /** Horizontal travel distance in px. */
  x?: number;
  /** Start scale (1 = none). */
  scale?: number;
  /** Blur-in amount in px. */
  blur?: number;
  delay?: number;
  duration?: number;
  /** When set, animates direct children with this stagger instead of the wrapper. */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
  as?: React.ElementType;
};

/**
 * Scroll-triggered reveal built on GSAP ScrollTrigger.
 * Honors prefers-reduced-motion by rendering content statically.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  y = 44,
  x = 0,
  scale = 1,
  blur = 0,
  delay = 0,
  duration = 1,
  stagger,
  start = 'top 85%',
  as = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const targets =
      stagger != null ? (gsap.utils.toArray(el.children) as Element[]) : el;

    const ctx = gsap.context(() => {
      gsap.set(targets, { willChange: 'transform, opacity' });
      gsap.from(targets, {
        opacity: 0,
        y,
        x,
        scale,
        filter: blur ? `blur(${blur}px)` : undefined,
        duration,
        delay,
        ease: 'expo.out',
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          once: true,
        },
        onComplete: () => gsap.set(targets, { willChange: 'auto' }),
      });
    }, el);

    return () => ctx.revert();
  }, [y, x, scale, blur, delay, duration, stagger, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default Reveal;
