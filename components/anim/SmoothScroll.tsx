import React, { useLayoutEffect, useRef } from 'react';
import { ScrollSmoother, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

/**
 * Site-wide buttery smooth scrolling via GSAP ScrollSmoother.
 *
 * Renders the required `#smooth-wrapper > #smooth-content` structure. Fixed
 * chrome (navbar, cursor, progress bar, ambient bg) must live OUTSIDE this
 * wrapper so it isn't transformed by the smoother. Disabled entirely when the
 * user prefers reduced motion — the page then scrolls natively.
 */
const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.35,
      effects: true, // enables data-speed / data-lag parallax
      smoothTouch: 0.1,
      normalizeScroll: false,
    });
    smootherRef.current = smoother;
    if (import.meta.env.DEV) (window as any).__smoother = smoother;

    // Layout can settle after fonts/images load — keep triggers accurate.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      smoother.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default SmoothScroll;
