import React from 'react';

type Variant = 'primary' | 'line' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  /** Trailing ↗ glyph. On by default for primary and line. */
  arrow?: boolean;
  /** Seconds for one orbit of the border light. */
  speed?: number;
  className?: string;
  children?: React.ReactNode;
};

type ButtonProps<T extends React.ElementType> = ButtonOwnProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonOwnProps | 'as'> & {
    as?: T;
  };

/**
 * The single button in the system.
 *
 * `primary` and `line` are shimmer buttons — a light orbits the border and a
 * diagonal shine sweeps the face on hover. Both share one square radius so
 * every action on the site reads as the same component. `ghost` stays a plain
 * text link for tertiary actions.
 *
 * Size drives CSS custom properties rather than utility classes, because the
 * height has to reach the inner `__face` element, not the outer wrapper.
 */
const sizeVars: Record<Size, React.CSSProperties> = {
  sm: { '--btn-h': '2.5rem', '--btn-px': '1.5rem' } as React.CSSProperties,
  md: { '--btn-h': '3rem', '--btn-px': '2rem' } as React.CSSProperties,
  lg: { '--btn-h': '3.5rem', '--btn-px': '2.5rem' } as React.CSSProperties,
};

const ghostSizes: Record<Size, string> = {
  sm: 'h-10 px-6 gap-2',
  md: 'h-12 px-8 gap-2.5',
  lg: 'h-14 px-10 gap-3',
};

function Button<T extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'lg',
  arrow,
  speed = 3.5,
  className = '',
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = (as || 'button') as React.ElementType;
  const showArrow = arrow ?? variant !== 'ghost';

  const label = (
    <>
      {children}
      {showArrow && (
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-base transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        >
          north_east
        </span>
      )}
    </>
  );

  if (variant === 'ghost') {
    return (
      <Component
        className={`group/btn inline-flex items-center justify-center whitespace-nowrap mono-label text-ink/60 hover:text-accent transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none ${ghostSizes[size]} ${className}`}
        {...rest}
      >
        {label}
      </Component>
    );
  }

  return (
    <Component
      className={`shimmer-sq group/btn shimmer-sq--${variant} ${className}`}
      style={{ ...sizeVars[size], '--shimmer-speed': `${speed}s` } as React.CSSProperties}
      {...rest}
    >
      <span aria-hidden="true" className="shimmer-sq__ring" />
      <span className="shimmer-sq__face">
        <span className="shimmer-sq__label">{label}</span>
        <span aria-hidden="true" className="shimmer-sq__shine" />
      </span>
    </Component>
  );
}

export default Button;
