import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  /** Show the pulsing status dot. */
  dot?: boolean;
}

/** Small uppercase eyebrow pill used above section headings. */
const Badge: React.FC<BadgeProps> = ({ children, className = '', dot = false }) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-md',
      className,
    )}
  >
    {dot && <span className="size-1.5 rounded-full bg-primary animate-pulse" />}
    {children}
  </span>
);

export default Badge;
