import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface ParticlesProps {
  className?: string;
  /** Particle count at 1440px wide; scaled down on smaller viewports. */
  count?: number;
  /** Max link distance in px. 0 disables the constellation lines. */
  linkDistance?: number;
  color?: string;
  /** How far particles drift toward the cursor, 0–1. */
  parallax?: number;
}

type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };

/**
 * Lightweight canvas particle field with constellation links and a subtle
 * cursor parallax. ~2 kB, no WebGL, no dependencies.
 *
 * Pauses entirely when off-screen (IntersectionObserver) or when the tab is
 * hidden, so it never burns battery in a background tab. Renders nothing under
 * prefers-reduced-motion.
 */
const Particles: React.FC<ParticlesProps> = ({
  className = '',
  count = 70,
  linkDistance = 130,
  color = '56, 224, 123',
  parallax = 0.12,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.max(18, Math.round((count * w) / 1440));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.5,
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dx = p.x + pointer.x * parallax * 100;
        const dy = p.y + pointer.y * parallax * 100;
        ctx.beginPath();
        ctx.arc(dx, dy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.a})`;
        ctx.fill();
      }

      if (linkDistance > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > linkDistance * linkDistance) continue;
            const alpha = (1 - Math.sqrt(d2) / linkDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(a.x + pointer.x * parallax * 100, a.y + pointer.y * parallax * 100);
            ctx.lineTo(b.x + pointer.x * parallax * 100, b.y + pointer.y * parallax * 100);
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only animate while actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [count, linkDistance, color, parallax]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
};

export default Particles;
