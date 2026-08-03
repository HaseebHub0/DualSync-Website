import React from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'dark';

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  /** Seconds for one border-light orbit. */
  speed?: number;
  /** Render as a different element (e.g. react-router Link). */
  as?: React.ElementType;
  [key: string]: unknown;
}

/**
 * Button with a light travelling around its border plus a diagonal shine sweep
 * across the face. The orbiting light uses a conic-gradient rotated via an
 * @property-registered custom angle, which animates on the compositor instead
 * of triggering paint.
 */
const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  speed = 3,
  as: Tag = 'button',
  ...props
}) => (
  <Tag
    className={cn(
      'shimmer-btn group',
      variant === 'primary' ? 'shimmer-btn--primary' : 'shimmer-btn--dark',
      className,
    )}
    style={{ '--shimmer-speed': `${speed}s` } as React.CSSProperties}
    {...props}
  >
    <span aria-hidden="true" className="shimmer-btn__ring" />
    <span className="shimmer-btn__face">
      <span className="shimmer-btn__label">{children}</span>
      <span aria-hidden="true" className="shimmer-btn__shine" />
    </span>
  </Tag>
);

export default ShimmerButton;
