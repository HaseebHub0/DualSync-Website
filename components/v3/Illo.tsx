import React from 'react';

/**
 * Bento-cell illustrations built on the DualSync motif: rounded squares
 * (the logo's two overlapping tiles) joined by "sync" lines.
 * Paths marked data-draw are drawn on scroll by useV3Motion; elements with
 * .v3-pulse breathe slowly (both disabled under reduced motion).
 */
export type IlloName = 'flow' | 'route' | 'stack' | 'sync' | 'chat';

const INK = '#08140d';
const SIGNAL = '#38e07b';
const DEEP = '#0d7a3f';

const Flow = () => (
  <>
    <path data-draw d="M78 70 C 130 70, 120 150, 160 150 S 200 70, 248 70" stroke={INK} strokeOpacity=".35" strokeWidth="2" strokeDasharray="5 7" fill="none" />
    <path data-draw d="M160 150 L160 190" stroke={INK} strokeOpacity=".35" strokeWidth="2" strokeDasharray="5 7" fill="none" />
    <rect x="34" y="44" width="56" height="52" rx="16" fill="#fff" stroke={INK} strokeOpacity=".14" />
    <path d="M50 64h24M50 76h16" stroke={INK} strokeOpacity=".5" strokeWidth="2.4" strokeLinecap="round" />
    <rect x="132" y="122" width="56" height="56" rx="16" fill={SIGNAL} />
    <path d="M148 150l8 8 16-16" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="232" y="44" width="56" height="52" rx="16" fill="#fff" stroke={INK} strokeOpacity=".14" />
    <circle cx="260" cy="70" r="10" fill="none" stroke={INK} strokeOpacity=".5" strokeWidth="2.4" />
    <rect x="140" y="188" width="40" height="14" rx="7" fill="#fff" stroke={INK} strokeOpacity=".14" />
    <circle className="v3-pulse" cx="118" cy="112" r="5" fill={DEEP} />
  </>
);

const Route = () => (
  <>
    <rect x="186" y="18" width="104" height="184" rx="22" fill="#fff" stroke={INK} strokeOpacity=".14" />
    <rect x="198" y="34" width="80" height="12" rx="6" fill={INK} fillOpacity=".08" />
    <rect x="198" y="56" width="80" height="44" rx="10" fill={SIGNAL} fillOpacity=".25" />
    <path d="M206 88l14-12 12 8 20-18" stroke={DEEP} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="198" y="110" width="80" height="16" rx="8" fill={INK} fillOpacity=".06" />
    <rect x="198" y="132" width="56" height="16" rx="8" fill={INK} fillOpacity=".06" />
    <rect x="198" y="164" width="80" height="24" rx="12" fill={INK} />
    <path data-draw d="M30 180 C 60 120, 110 190, 130 120 S 160 60, 180 70" stroke={INK} strokeOpacity=".4" strokeWidth="2.2" strokeDasharray="4 7" fill="none" />
    <circle cx="30" cy="180" r="8" fill="#fff" stroke={INK} strokeOpacity=".3" strokeWidth="2" />
    <circle cx="130" cy="120" r="8" fill="#fff" stroke={INK} strokeOpacity=".3" strokeWidth="2" />
    <circle className="v3-pulse" cx="72" cy="150" r="9" fill={SIGNAL} />
    <circle cx="72" cy="150" r="3.5" fill={INK} />
  </>
);

const Stack = () => (
  <>
    <path d="M160 150 L268 120 L160 92 L52 120 Z" fill="#fff" stroke={INK} strokeOpacity=".14" />
    <path d="M160 118 L268 88 L160 60 L52 88 Z" fill={SIGNAL} fillOpacity=".3" stroke={INK} strokeOpacity=".14" />
    <path d="M160 86 L268 56 L160 28 L52 56 Z" fill="#fff" stroke={INK} strokeOpacity=".14" />
    <path d="M118 56 L160 45 L202 56" stroke={INK} strokeOpacity=".45" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <path data-draw d="M52 56 V 190 M268 56 V 190" stroke={INK} strokeOpacity=".25" strokeWidth="2" strokeDasharray="4 7" fill="none" />
    <path data-draw d="M52 190 H 268" stroke={INK} strokeOpacity=".25" strokeWidth="2" strokeDasharray="4 7" fill="none" />
    <circle className="v3-pulse" cx="160" cy="118" r="6" fill={DEEP} />
  </>
);

const Sync = () => (
  <>
    <path data-draw d="M40 110 C 40 40, 120 30, 150 70" stroke={INK} strokeOpacity=".3" strokeWidth="2" strokeDasharray="4 7" fill="none" />
    <path data-draw d="M280 110 C 280 180, 200 190, 170 150" stroke={INK} strokeOpacity=".3" strokeWidth="2" strokeDasharray="4 7" fill="none" />
    <rect x="96" y="56" width="88" height="88" rx="26" fill="#fff" stroke={INK} strokeOpacity=".18" strokeWidth="2" />
    <rect x="136" y="84" width="88" height="88" rx="26" fill={SIGNAL} fillOpacity=".85" />
    <path d="M136 110 a26 26 0 0 1 26 -26 H184 V118 a26 26 0 0 1 -26 26 H136 Z" fill={SIGNAL} />
    <circle className="v3-pulse" cx="40" cy="110" r="7" fill={DEEP} />
    <circle cx="280" cy="110" r="7" fill="#fff" stroke={INK} strokeOpacity=".3" strokeWidth="2" />
  </>
);

const Chat = () => (
  <>
    <rect x="40" y="34" width="170" height="48" rx="20" fill="#fff" stroke={INK} strokeOpacity=".14" />
    <path d="M60 52h96M60 64h60" stroke={INK} strokeOpacity=".45" strokeWidth="2.4" strokeLinecap="round" />
    <rect x="110" y="96" width="170" height="48" rx="20" fill={SIGNAL} />
    <path d="M130 114h110M130 126h70" stroke={INK} strokeOpacity=".7" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M246 156l6 6 10-12M258 156l6 6 10-12" stroke={DEEP} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="40" y="158" width="120" height="40" rx="18" fill="#fff" stroke={INK} strokeOpacity=".14" />
    <circle className="v3-pulse" cx="66" cy="178" r="4" fill={INK} fillOpacity=".5" />
    <circle cx="82" cy="178" r="4" fill={INK} fillOpacity=".35" />
    <circle cx="98" cy="178" r="4" fill={INK} fillOpacity=".2" />
    <path data-draw d="M210 58 C 250 58, 260 80, 250 96" stroke={INK} strokeOpacity=".3" strokeWidth="2" strokeDasharray="4 7" fill="none" />
  </>
);

const MAP: Record<IlloName, () => React.ReactElement> = { flow: Flow, route: Route, stack: Stack, sync: Sync, chat: Chat };

const Illo: React.FC<{ name: IlloName; className?: string }> = ({ name, className = '' }) => {
  const Art = MAP[name];
  return (
    <svg className={`v3-illo ${className}`} viewBox="0 0 320 220" fill="none" aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
};

export default Illo;
