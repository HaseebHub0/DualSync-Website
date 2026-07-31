import React from 'react';
import { cn } from '../../lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one gradient cycle. */
  speed?: number;
}

/** Text filled with a slowly travelling brand gradient. */
const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  speed = 6,
}) => (
  <span
    className={cn('gradient-text', className)}
    style={{ animationDuration: `${speed}s` }}
  >
    {children}
  </span>
);

export default GradientText;
