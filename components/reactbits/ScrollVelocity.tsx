import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

type ScrollVelocityProps = {
  children: React.ReactNode;
  /** Baseline drift in px/sec. */
  baseSpeed?: number;
  /** How hard scroll velocity pushes the rail. */
  velocityFactor?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * ScrollVelocity (React Bits) — a marquee whose speed and direction respond
 * to how fast, and which way, you are scrolling. Flicking down throws the
 * rail forward; scrolling up drags it back.
 *
 * Performance note: the loop width is measured once and re-measured only on
 * resize. Reading `scrollWidth` inside the ticker (as the naive version
 * does) forces a synchronous layout on every frame, right after the
 * transform write — a read-after-write thrash that gets expensive fast on a
 * page already running ScrollSmoother.
 */
const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  children,
  baseSpeed = 45,
  velocityFactor = 0.25,
  reverse = false,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!track || !copy || prefersReducedMotion) return;

    let loopWidth = copy.offsetWidth;
    let offset = 0;
    let velocity = 0;
    const dir = reverse ? -1 : 1;
    const setX = gsap.quickSetter(track, 'x', 'px');

    const measure = () => {
      loopWidth = copy.offsetWidth;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(copy);

    // ScrollTrigger reports signed velocity in px/sec.
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        velocity = self.getVelocity();
      },
    });

    const tick = (_time: number, deltaMs: number) => {
      if (loopWidth <= 0) return;
      const dt = Math.min(deltaMs, 50) / 1000; // clamp after a tab-out
      velocity *= 0.92; // decay so a flick eases off instead of snapping
      const speed = baseSpeed + Math.abs(velocity) * velocityFactor;
      const direction = velocity < -1 ? -dir : dir;

      offset += speed * dt * direction;
      // Wrap inside one copy's width so the loop is seamless.
      offset = ((offset % loopWidth) + loopWidth) % loopWidth;
      setX(-offset);
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
    };
  }, [baseSpeed, velocityFactor, reverse]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={copyRef} className="flex shrink-0 items-center">
          {children}
        </div>
        {/* Duplicate so the wrap always has something to reveal. */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScrollVelocity;
