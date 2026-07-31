import React from 'react';
import { cn } from '../../lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  /** Fade the left/right edges into the background. */
  fade?: boolean;
}

/**
 * Infinite horizontal marquee. Duplicates its children so the loop is seamless.
 * Pauses on hover. Pure CSS animation (keyframes injected once), so it costs
 * nothing on the main thread.
 */
const Marquee: React.FC<MarqueeProps> = ({
  children,
  className = '',
  speed = 30,
  reverse = false,
  fade = true,
}) => (
  <div
    className={cn('group relative flex overflow-hidden', className)}
    style={
      fade
        ? {
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }
        : undefined
    }
  >
    {[0, 1].map((i) => (
      <div
        key={i}
        aria-hidden={i === 1}
        className="flex shrink-0 items-center gap-12 pr-12 marquee-track group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
    ))}
    <style>{`
      @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }
      .marquee-track { animation-name: marquee-scroll; animation-timing-function: linear; animation-iteration-count: infinite; }
    `}</style>
  </div>
);

export default Marquee;
