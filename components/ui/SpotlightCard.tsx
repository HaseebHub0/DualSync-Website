import React, { useRef } from 'react';
import { cn } from '../../lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Radius of the cursor glow in px. */
  radius?: number;
}

/**
 * Card that lights up where the cursor is, with the highlight riding the
 * border. Position is written to CSS custom properties on pointermove, so the
 * effect never re-renders React.
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  radius = 320,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    el.style.setProperty('--spot-opacity', '1');
  };

  const onLeave = () => {
    ref.current?.style.setProperty('--spot-opacity', '0');
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ '--spot-radius': `${radius}px` } as React.CSSProperties}
      className={cn('spotlight-card', className)}
    >
      <span aria-hidden="true" className="spotlight-card__glow" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
