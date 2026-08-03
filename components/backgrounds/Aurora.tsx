import React from 'react';
import { cn } from '../../lib/utils';

interface AuroraProps {
  className?: string;
  /** 0–1. Higher is more visible. */
  intensity?: number;
  /** Seconds for one full drift cycle. */
  speed?: number;
}

/**
 * Aurora mesh-gradient backdrop.
 *
 * Deliberately CSS rather than WebGL: React Bits' Aurora ships an `ogl`
 * dependency, and this page already carries ~518 kB of JS. Three blurred
 * radial blobs on independent drift cycles read the same at the blur radii we
 * use, animate on the compositor, and cost zero bytes of runtime.
 */
const Aurora: React.FC<AuroraProps> = ({ className = '', intensity = 1, speed = 24 }) => (
  <div
    aria-hidden="true"
    className={cn('aurora', className)}
    style={
      {
        '--aurora-intensity': intensity,
        '--aurora-speed': `${speed}s`,
      } as React.CSSProperties
    }
  >
    <span className="aurora__layer aurora__layer--1" />
    <span className="aurora__layer aurora__layer--2" />
    <span className="aurora__layer aurora__layer--3" />
    <span className="aurora__grain" />
  </div>
);

export default Aurora;
