import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/gsap';

type DecryptedTextProps = {
  text: string;
  className?: string;
  /** ms between scramble frames. */
  speed?: number;
  /** Scramble passes before a character locks in. */
  maxIterations?: number;
  /** Run on scroll into view, or on hover. */
  trigger?: 'view' | 'hover';
  as?: React.ElementType;
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*—';

/**
 * DecryptedText (React Bits) — characters scramble, then resolve left to
 * right. Reads as a system booting, which suits engineering labels.
 *
 * Adaptations: the real string is always present in the DOM (the scramble is
 * a visual layer via `aria-hidden`), so screen readers and crawlers get the
 * plain text; whitespace never scrambles; and it degrades to static text
 * under reduced motion.
 */
const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  speed = 38,
  maxIterations = 12,
  trigger = 'view',
  as: Tag = 'span',
}) => {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(text);
  const frame = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = React.useCallback(() => {
    if (prefersReducedMotion) return;
    if (timer.current) clearInterval(timer.current);
    frame.current = 0;

    timer.current = setInterval(() => {
      frame.current += 1;
      // Characters lock in progressively from the left.
      const locked = frame.current / maxIterations;
      const next = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ch;
          if (i < locked * text.length) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      setDisplay(next);

      if (frame.current >= maxIterations) {
        if (timer.current) clearInterval(timer.current);
        setDisplay(text);
      }
    }, speed);
  }, [text, speed, maxIterations]);

  useEffect(() => {
    setDisplay(text);
    const el = ref.current;
    if (!el || prefersReducedMotion || trigger !== 'view') return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer.current) clearInterval(timer.current);
    };
  }, [run, text, trigger]);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={trigger === 'hover' ? run : undefined}
    >
      {/* Real text for assistive tech and crawlers. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
};

export default DecryptedText;
