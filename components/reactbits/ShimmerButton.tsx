import React from 'react';

type ShimmerButtonProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  /** Seconds for one full orbit of the border light. */
  speed?: number;
  /** Filled brand green, or the recessed dark face. */
  variant?: 'primary' | 'dark';
};

/**
 * ShimmerButton — a light orbiting the border plus a diagonal shine sweep
 * across the face on hover.
 *
 * Note on provenance: this is the Magic UI shimmer pattern (React Bits ships
 * StarBorder instead), rebuilt here rather than installed — neither library
 * publishes an npm package for it, both are copy-in.
 *
 * Adapted for this site: squared to match the one-radius button rule,
 * surfaced with the semantic tokens so it inverts with the theme, and sized
 * on the same rhythm as `Button`. The orbit animates a registered custom
 * angle property, so it runs on the compositor instead of repainting.
 */
const ShimmerButton = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  speed = 3,
  variant = 'primary',
  children,
  ...rest
}: ShimmerButtonProps<T>) => {
  const Component = (as || 'button') as React.ElementType;

  return (
    <Component
      className={`shimmer-sq ${variant === 'primary' ? 'shimmer-sq--primary' : 'shimmer-sq--dark'} ${className}`}
      style={{ '--shimmer-speed': `${speed}s` } as React.CSSProperties}
      {...(rest as any)}
    >
      <span aria-hidden="true" className="shimmer-sq__ring" />
      <span className="shimmer-sq__face">
        <span className="shimmer-sq__label">{children}</span>
        <span aria-hidden="true" className="shimmer-sq__shine" />
      </span>
    </Component>
  );
};

export default ShimmerButton;
