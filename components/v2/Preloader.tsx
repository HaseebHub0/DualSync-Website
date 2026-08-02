import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { prefersReducedMotion } from '../../lib/gsap';

const SESSION_KEY = 'ds-boot-shown';

/**
 * Boot sequence — shown once per session on the landing route. A counter
 * runs 0→100 under the wordmark, then the curtain lifts. Total ~1.6s so it
 * reads as intent, not as waiting.
 */
const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (prefersReducedMotion) return false;
    return !window.sessionStorage.getItem(SESSION_KEY);
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    window.sessionStorage.setItem(SESSION_KEY, '1');

    const start = performance.now();
    const duration = 1100;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // Ease-out so the last digits land slowly, like a real boot readout.
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const done = setTimeout(() => setVisible(false), duration + 350);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] } }}
          className="fixed inset-0 z-[200] bg-canvas flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }}
              className="font-display text-3xl md:text-5xl font-black tracking-tighter text-ink"
            >
              DUAL<span className="text-accent">SYNC</span>
            </motion.div>
          </div>
          <div className="mono-label text-ink/60 mt-6 tabular-nums flex items-center gap-3">
            <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
            SYNCING {String(count).padStart(3, '0')} / 100
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 mono-label text-ink/60">
            AI &amp; SAAS ENGINEERING STUDIO
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
