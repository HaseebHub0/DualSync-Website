import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/gsap';

type ClickSparkProps = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
};

type Spark = { x: number; y: number; angle: number; start: number };

/**
 * ClickSpark (React Bits pattern) — a burst of short rays on every click,
 * drawn on one fixed full-viewport canvas.
 *
 * Adapted for this site: the canvas is `pointer-events: none` and only runs
 * a RAF loop while sparks are alive, so an idle page costs nothing. Skipped
 * entirely under reduced motion.
 */
const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#38e07b',
  sparkSize = 11,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 420,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = false;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // A canvas is a replaced element: `inset-0` does NOT stretch it, so
      // without an explicit CSS size it renders at its backing-store size —
      // twice the viewport on a 2x screen, which put every spark at the wrong
      // spot and left an oversized layer for the compositor to handle.
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // easeOutCubic — rays shoot out fast then settle.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const frame = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks.current = sparks.current.filter((s) => now - s.start < duration);

      for (const s of sparks.current) {
        const t = ease((now - s.start) / duration);
        const dist = t * sparkRadius * 2.4;
        const len = sparkSize * (1 - t);
        const x1 = s.x + dist * Math.cos(s.angle);
        const y1 = s.y + dist * Math.sin(s.angle);
        const x2 = s.x + (dist + len) * Math.cos(s.angle);
        const y2 = s.y + (dist + len) * Math.sin(s.angle);

        ctx.globalAlpha = 1 - t;
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (sparks.current.length) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const onClick = (e: PointerEvent) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          start: now,
        });
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener('pointerdown', onClick);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('pointerdown', onClick);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[150] pointer-events-none"
    />
  );
};

export default ClickSpark;
