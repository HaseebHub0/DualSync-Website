import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/gsap';

type DotFieldProps = {
  /** Grid spacing in px. */
  spacing?: number;
  className?: string;
};

/** Pointer influence radius, in CSS px. */
const RADIUS = 150;

/**
 * Interactive engineering grid — a field of faint dots that lean away from
 * the cursor and warm toward the brand green near it.
 *
 * Performance shape (the naive version was the site's biggest jank source):
 *   - The static grid is rasterised ONCE into an offscreen canvas. Each frame
 *     blits that image and repaints only the ~60 dots inside the pointer
 *     radius, instead of stroking all ~1100 every frame.
 *   - The RAF loop parks itself when the pointer has settled, so an idle page
 *     costs nothing.
 *   - Touch devices and reduced-motion get a single static paint and never
 *     start a loop at all — there is no hover there to react to.
 *
 * Sizing is driven by ResizeObserver AND visualViewport, because on mobile
 * the URL bar collapsing changes the hero's height after mount; without that
 * second signal the backing store stayed short and the field rendered only
 * across part of the section.
 */
const DotField: React.FC<DotFieldProps> = ({ spacing = 34, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isTouch =
      typeof window !== 'undefined' &&
      (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    const interactive = !isTouch && !prefersReducedMotion;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let cols: number[] = [];
    let rows: number[] = [];
    let raf = 0;
    let running = false;
    let inView = true;

    // Pointer state lives outside React so the loop never triggers a render.
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    let ink = '255 255 255';
    const readTheme = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
      if (v) ink = v.replace(/\s+/g, ' ');
    };

    // Static layer: the resting grid, drawn once per resize/theme change.
    const layer = document.createElement('canvas');
    const lctx = layer.getContext('2d');

    const paintStatic = () => {
      if (!lctx) return;
      lctx.setTransform(1, 0, 0, 1, 0, 0);
      lctx.clearRect(0, 0, layer.width, layer.height);
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.fillStyle = `rgb(${ink} / 0.1)`;
      for (const y of rows) {
        for (const x of cols) {
          lctx.beginPath();
          lctx.arc(x, y, 1, 0, Math.PI * 2);
          lctx.fill();
        }
      }
    };

    const build = () => {
      // Measure the PARENT, never the canvas. Observing an element while
      // writing its own size is a feedback loop: each pass fed the previous
      // backing-store size back in as the new CSS size, so the canvas grew to
      // 2x the viewport and the grid ended up painted mostly off-screen.
      // Display size stays with the `w-full h-full` classes; only the backing
      // store is set here.
      const host = canvas.parentElement;
      const rect = host ? host.getBoundingClientRect() : canvas.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return false;
      if (w === width && h === height) return false;
      width = w;
      height = h;

      for (const c of [canvas, layer]) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = [];
      rows = [];
      for (let x = spacing / 2; x < width; x += spacing) cols.push(x);
      for (let y = spacing / 2; y < height; y += spacing) rows.push(y);

      paintStatic();
      return true;
    };

    /** Blit the resting grid, then overdraw only the dots near the pointer. */
    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(layer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!interactive || mouse.x < -1000) return;

      // Only the rows/cols intersecting the influence circle are touched.
      const x0 = mouse.x - RADIUS;
      const x1 = mouse.x + RADIUS;
      const y0 = mouse.y - RADIUS;
      const y1 = mouse.y + RADIUS;

      for (const dy of rows) {
        if (dy < y0 || dy > y1) continue;
        for (const dx of cols) {
          if (dx < x0 || dx > x1) continue;

          const ox = dx - mouse.x;
          const oy = dy - mouse.y;
          const dist = Math.hypot(ox, oy);
          if (dist > RADIUS) continue;

          const force = (1 - dist / RADIUS) ** 2;
          const px = dx + (ox / (dist || 1)) * force * 14;
          const py = dy + (oy / (dist || 1)) * force * 14;

          // Cover the resting dot before drawing the displaced one.
          ctx.clearRect(dx - 2, dy - 2, 4, 4);
          ctx.beginPath();
          ctx.arc(px, py, 1 + force * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 224, 123, ${0.1 + force * 0.75})`;
          ctx.fill();
        }
      }
    };

    const loop = () => {
      const dx = mouse.tx - mouse.x;
      const dy = mouse.ty - mouse.y;
      mouse.x += dx * 0.12;
      mouse.y += dy * 0.12;
      draw();

      // Park once the easing has caught up — an idle page should cost nothing.
      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
        draw();
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (running || !interactive || !inView || document.hidden) return;
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
      kick();
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
      kick();
    };

    const onResize = () => {
      if (build()) draw();
    };

    build();
    readTheme();
    paintStatic();
    draw();

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement ?? canvas);

    // The theme toggle swaps a class on <html>; restamp the static layer.
    const themeObserver = new MutationObserver(() => {
      readTheme();
      paintStatic();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }
    // Mobile URL-bar collapse resizes the viewport without resizing the
    // element synchronously — this is what left the field half-painted.
    window.addEventListener('resize', onResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      if (interactive) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerleave', onLeave);
      }
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
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
