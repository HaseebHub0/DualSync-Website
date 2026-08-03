import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { prefersReducedMotion } from '../../lib/gsap';

type RotatingTextProps = {
  words: string[];
  /** ms each word holds before rotating. */
  interval?: number;
  className?: string;
};

/**
 * RotatingText (React Bits) — one word swaps for the next on a timer, each
 * character sliding up behind a clean mask edge.
 *
 * The widest word reserves the space (a hidden sizing copy), so surrounding
 * copy never reflows as the words change — the upstream version jitters the
 * line on every swap. Renders the first word statically under reduced motion.
 */
const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  interval = 2400,
  className = '',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), words[0] ?? '');

  if (prefersReducedMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={`relative inline-grid align-bottom overflow-hidden ${className}`}>
      {/* Reserves the widest footprint so the line never reflows. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {widest}
      </span>
      <span className="sr-only">{words[index]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-110%' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
