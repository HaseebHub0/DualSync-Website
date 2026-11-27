import React from 'react';

/**
 * DualSync icon set. 24px grid, 1.6 stroke, round joins. Every glyph carries
 * one small filled "signal" mark (class v3-i-a) in brand green: the sync dot.
 */
export type IconName =
  | 'flow'
  | 'chat'
  | 'pen'
  | 'cube'
  | 'compass'
  | 'person'
  | 'key'
  | 'clock'
  | 'spark'
  | 'layers'
  | 'calendar'
  | 'phone'
  | 'monitor'
  | 'check'
  | 'globe'
  | 'flask';

const P: Record<IconName, React.ReactNode> = {
  flow: (
    <>
      <rect x="3" y="4" width="6" height="6" rx="2" />
      <rect x="15" y="14" width="6" height="6" rx="2" />
      <path d="M9 7h3a3 3 0 0 1 3 3v4" />
      <circle className="v3-i-a" cx="15" cy="7" r="1.6" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A1.5 1.5 0 0 1 4 14.5z" />
      <path d="M8 9h8M8 12h5" />
      <circle className="v3-i-a" cx="19" cy="5" r="1.8" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-4L16 5a2 2 0 0 1 3 3L8 19z" />
      <path d="M14 7l3 3" />
      <circle className="v3-i-a" cx="5" cy="19" r="1.4" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
      <circle className="v3-i-a" cx="12" cy="12" r="1.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
      <circle className="v3-i-a" cx="12" cy="12" r="1.3" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
      <circle className="v3-i-a" cx="18.5" cy="5.5" r="1.6" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8-8M16 7l2 2M14 9l2 2" />
      <circle className="v3-i-a" cx="8" cy="15" r="1.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
      <circle className="v3-i-a" cx="12" cy="3.5" r="1.4" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      <circle className="v3-i-a" cx="12" cy="12" r="2" />
    </>
  ),
  layers: (
    <>
      <path d="M12 4l8.5 4.5L12 13 3.5 8.5z" />
      <path d="M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5" />
      <circle className="v3-i-a" cx="12" cy="8.5" r="1.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <circle className="v3-i-a" cx="15.5" cy="15" r="1.7" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
      <path d="M10.5 18.5h3" />
      <circle className="v3-i-a" cx="12" cy="9" r="1.7" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2.5" />
      <path d="M9 20h6M12 16v4M7 12l3-3 2 2 4-4" />
      <circle className="v3-i-a" cx="16" cy="7" r="1.3" />
    </>
  ),
  check: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
      <circle className="v3-i-a" cx="19.5" cy="5.5" r="1.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" />
      <circle className="v3-i-a" cx="17" cy="7" r="1.5" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3h5M10.5 3v6L5 18.5A1.6 1.6 0 0 0 6.4 21h11.2a1.6 1.6 0 0 0 1.4-2.5L13.5 9V3" />
      <path d="M7.5 15h9" />
      <circle className="v3-i-a" cx="11" cy="18" r="1.3" />
    </>
  ),
};

const Icon: React.FC<{ name: IconName; className?: string }> = ({ name, className = '' }) => (
  <svg
    className={`v3-icon ${className}`}
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {P[name]}
  </svg>
);

export default Icon;
