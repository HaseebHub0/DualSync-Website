import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

type PinnedRailProps = {
  children: React.ReactNode;
  /** Number of panels — drives how much scroll distance to reserve. */
  count: number;
  className?: string;
};

/**
 * Pins the section and translates a horizontal rail as you scroll — the
 * "sideways chapter" device. Vertical scrolling drives horizontal travel,
 * so the reader never loses their place.
 *
 * Pinning only engages when the viewport can actually show a whole card.
 * While pinned this element sits at viewport top, which is *behind* the fixed
 * 80px navbar, so it reserves a full viewport height and pads the navbar out.
 * On anything shorter (or narrower, or with reduced motion) it degrades to a
 * plain horizontal swipe rail — clamping card height instead would just move
 * the clipping from the top of the card to the bottom of its content.
 */
const PIN_QUERY = '(min-width: 768px) and (min-height: 740px)';

const PinnedRail: React.FC<PinnedRailProps> = ({ children, count, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  // Keep the layout in sync with whether GSAP will pin at this size.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const mq = window.matchMedia(PIN_QUERY);
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail || prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add(PIN_QUERY, () => {
      const distance = () => rail.scrollWidth - section.offsetWidth;

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // Reserve vertical scroll proportional to the horizontal travel.
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(rail, { x: 0 });
      };
    });

    return () => mm.revert();
  }, [count]);

  return (
    <div
      ref={sectionRef}
      className={`relative ${
        pinned
          ? 'overflow-hidden h-[100svh] flex items-center pt-24 pb-10'
          : 'overflow-x-auto no-scrollbar py-6'
      } ${className}`}
    >
      <div ref={railRef} className="flex gap-6 md:gap-8 w-max px-6 sm:px-10 items-stretch">
        {children}
      </div>
    </div>
  );
};

export default PinnedRail;
