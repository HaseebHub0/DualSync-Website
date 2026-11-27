import React from 'react';
import Icon, { type IconName } from './Icon';

/** Phrase on a green marker block (inspired by the "land plots" highlight). */
export const Hl: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="v3-hl">{children}</span>;

/** Phrase set in Instrument Serif italic, for the voice inside a headline. */
export const Em: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="v3-em">{children}</span>;

/** Small tilted annotation pill that sits beside a headline. Decorative. */
export const Note: React.FC<{ children: React.ReactNode; tilt?: 'l' | 'r' }> = ({ children, tilt = 'l' }) => (
  <span className={`v3-note v3-note-${tilt}`} aria-hidden="true">
    {children}
  </span>
);

/** Icon chip set inline within a line of text. */
export const Chip: React.FC<{ icon: IconName }> = ({ icon }) => (
  <span className="v3-chip" aria-hidden="true">
    <Icon name={icon} />
  </span>
);
