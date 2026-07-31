import React from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-background-dark shadow-[0_0_20px_rgba(56,224,123,0.3)] hover:bg-white hover:shadow-[0_0_34px_rgba(255,255,255,0.28)]',
  secondary:
    'bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10',
  outline:
    'border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
};

const sizes: Record<Size, string> = {
  sm: 'text-[10px] px-5 py-2.5',
  md: 'text-xs px-7 py-3.5',
  lg: 'text-sm px-9 py-4',
};

/** Shared class recipe so plain <Link>/<a> can wear the same skin. */
export function buttonClasses(
  variant: Variant = 'primary',
  size: Size = 'md',
  className = '',
) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => (
  <button className={buttonClasses(variant, size, className)} {...props}>
    {children}
  </button>
);

export default Button;
