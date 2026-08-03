import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Thin scroll-progress bar pinned to the top of the viewport. Lives outside the
 * smooth-scroll wrapper so it stays fixed. Driven by ScrollTrigger so it stays
 * in sync with ScrollSmoother.
 */
const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-primary via-primary to-emerald-300 shadow-[0_0_12px_rgba(56,224,123,0.7)]"
      />
    </div>
  );
};

export default ScrollProgress;
