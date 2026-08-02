import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/gsap';

type DotFieldProps = {
  /** Grid spacing in px. */
  spacing?: number;
  className?: string;
};

/**
 * Interactive engineering grid — a field of faint dots that lean away from
 * the cursor and warm toward the brand green near it. Canvas-based, capped
 * at 2x DPR, paused when offscreen or when the tab is hidden. With reduced
 * motion the field renders once, statically.
 */
const DotField: React.FC<DotFieldProps> = ({ spacing = 30, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: { x: number; y: number }[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    // Cursor state lives outside React so the RAF loop never re-renders.
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Dot colour follows the active theme. `--ink` is a channel triplet on
    // :root / .light, so the field inverts with the rest of the page.
    let inkChannels = '255 255 255';
    const readTheme = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
      if (v) inkChannels = v.replace(/\s+/g, ' ');
    };
    readTheme();

    // The theme toggle swaps a class on <html>; re-read when that happens.
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (!running) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          dots.push({ x, y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Cursor easing gives the field a fluid, weighted feel.
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      const radius = 150;
      for (const dot of dots) {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        let px = dot.x;
        let py = dot.y;
        let alpha = 0.1;
        let size = 1;
        let green = false;

        if (dist < radius) {
          const force = (1 - dist / radius) ** 2;
          px += (dx / (dist || 1)) * force * 14;
          py += (dy / (dist || 1)) * force * 14;
          alpha = 0.1 + force * 0.75;
          size = 1 + force * 0.9;
          green = true;
        }

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = green
          ? `rgba(56, 224, 123, ${alpha})`
          : `rgb(${inkChannels} / ${alpha})`;
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || prefersReducedMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };
    const onVisibility = () => {
      if (document.hidden || !inView) stop();
      else start();
    };

    build();
    draw(); // static first paint (also the reduced-motion final state)

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      build();
      if (!running) draw();
    });
    ro.observe(canvas);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [spacing]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default DotField;
