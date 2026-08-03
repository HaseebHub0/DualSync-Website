import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Pull strength (0–1). */
  strength?: number;
}

/**
 * Wraps any element and gives it a magnetic pull toward the cursor on hover —
 * a hallmark micro-interaction of premium agency sites. No-ops on touch /
 * reduced-motion.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.4,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

export default MagneticButton;
