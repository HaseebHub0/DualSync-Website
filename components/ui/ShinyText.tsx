import React from 'react';
import { cn } from '../../lib/utils';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one sweep cycle. */
  speed?: number;
  disabled?: boolean;
}

/**
 * Text with a specular highlight sweeping across it — the "shiny text" effect.
 * Pure CSS background-clip animation, so it costs nothing on the main thread.
 * Falls back to plain text under reduced motion.
 */
const ShinyText: React.FC<ShinyTextProps> = ({
  children,
  className = '',
  speed = 4,
  disabled = false,
}) => (
  <span
    className={cn('shiny-text', disabled && 'shiny-text--off', className)}
    style={{ animationDuration: `${speed}s` }}
  >
    {children}
  </span>
);

export default ShinyText;
