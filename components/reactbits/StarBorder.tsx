import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

/**
 * StarBorder (React Bits) — a light travelling around the edge of a control.
 *
 * Adapted for this site: squared off to match the one-radius button rule
 * (upstream is rounded-[20px]), surfaced with the semantic tokens so it
 * inverts with the theme, and sized to the same rhythm as `Button`.
 */
const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#38e07b',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = (as || 'button') as React.ElementType;

  return (
    <Component
      className={`relative inline-block overflow-hidden ${className}`}
      {...(rest as any)}
      style={{ padding: `${thickness}px 0`, ...(rest as any).style }}
    >
      <span
        aria-hidden="true"
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 motion-reduce:hidden"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 motion-reduce:hidden"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <span className="relative z-[1] flex items-center justify-center h-16 px-12 bg-canvas border border-rule/15 text-ink mono-label whitespace-nowrap">
        {children}
      </span>
    </Component>
  );
};

export default StarBorder;
