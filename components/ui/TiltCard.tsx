import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Show a moving specular glow that tracks the cursor. */
  glare?: boolean;
}

/**
 * 3D pointer-tilt container. Adds subtle depth + an optional cursor-tracking
 * glare. Degrades to a static card on touch / reduced-motion.
 */
const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  max = 10,
  glare = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height;
      rotY((px - 0.5) * max * 2);
      rotX((0.5 - py) * max * 2);
      if (glareRef.current) {
        gsap.to(glareRef.current, {
          opacity: 0.18,
          duration: 0.3,
          background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.9), transparent 55%)`,
        });
      }
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
      if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
    };

    gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [max, glare]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay"
        />
      )}
    </div>
  );
};

export default TiltCard;
