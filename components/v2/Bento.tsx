import React, { useCallback, useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import Glyph, { type GlyphName } from './Glyph';

export type BentoCell = {
  label: string;
  title: string;
  description: string;
  glyph?: GlyphName;
  /** Grid span classes for the md+ layout. */
  span?: string;
};

type BentoProps = {
  cells: BentoCell[];
  /** Radius of the cursor spotlight, in px. */
  spotlightRadius?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
};

const GLOW = '56, 224, 123';

/**
 * Bento grid built on the React Bits MagicBento interaction set — a shared
 * cursor spotlight, a per-card border glow that tracks the pointer, subtle
 * tilt, and magnetism — retuned for this brand.
 *
 * Differences from upstream: the purple default (132,0,255) is replaced by
 * the DualSync green, the card surface uses the semantic tokens so it works
 * in both themes, particles are dropped in favour of the site's own Glyph
 * illustrations, and everything no-ops under reduced motion or on touch.
 */
const Bento: React.FC<BentoProps> = ({
  cells,
  spotlightRadius = 340,
  enableTilt = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const setCardGlow = useCallback((card: HTMLElement, x: number, y: number, on: boolean) => {
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
    card.style.setProperty('--glow-opacity', on ? '1' : '0');
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    const spot = spotRef.current;
    if (!grid || !spot || prefersReducedMotion) return;
    // Pointer choreography is meaningless on touch — leave the static grid.
    if (window.matchMedia('(hover: none)').matches) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-bento-card]'));
    const quickTo = cards.map((card) => ({
      card,
      x: gsap.quickTo(card, 'x', { duration: 0.5, ease: 'power3.out' }),
      y: gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3.out' }),
      rx: gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3.out' }),
      ry: gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3.out' }),
    }));

    const onMove = (e: PointerEvent) => {
      const gridRect = grid.getBoundingClientRect();
      // Shared spotlight follows the cursor across the whole grid.
      gsap.to(spot, {
        x: e.clientX - gridRect.left,
        y: e.clientY - gridRect.top,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: true,
      });

      const near =
        e.clientX >= gridRect.left - 120 &&
        e.clientX <= gridRect.right + 120 &&
        e.clientY >= gridRect.top - 120 &&
        e.clientY <= gridRect.bottom + 120;
      gsap.to(spot, { opacity: near ? 1 : 0, duration: 0.3, overwrite: 'auto' });

      for (const entry of quickTo) {
        const r = entry.card.getBoundingClientRect();
        const relX = e.clientX - r.left;
        const relY = e.clientY - r.top;
        const inside = relX >= 0 && relX <= r.width && relY >= 0 && relY <= r.height;

        setCardGlow(entry.card, relX, relY, inside);

        if (inside) {
          if (enableTilt) {
            entry.rx(((relY - r.height / 2) / r.height) * -8);
            entry.ry(((relX - r.width / 2) / r.width) * 8);
          }
          if (enableMagnetism) {
            entry.x((relX - r.width / 2) * 0.045);
            entry.y((relY - r.height / 2) * 0.045);
          }
        } else {
          entry.rx(0);
          entry.ry(0);
          entry.x(0);
          entry.y(0);
        }
      }
    };

    const onLeave = () => {
      gsap.to(spot, { opacity: 0, duration: 0.3 });
      for (const entry of quickTo) {
        setCardGlow(entry.card, 0, 0, false);
        entry.rx(0);
        entry.ry(0);
        entry.x(0);
        entry.y(0);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enableTilt, enableMagnetism, setCardGlow]);

  return (
    <div ref={gridRef} className="relative [perspective:1200px]">
      {/* Shared cursor spotlight */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-0 opacity-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
        style={{
          width: spotlightRadius,
          height: spotlightRadius,
          background: `radial-gradient(circle, rgba(${GLOW}, 0.16), transparent 70%)`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {cells.map((cell) => (
          <article
            key={cell.title}
            data-bento-card
            className={`bento-card shimmer-card group relative overflow-hidden border border-rule/10 bg-surface/[0.02] p-7 md:p-8 flex flex-col [transform-style:preserve-3d] ${cell.span ?? ''}`}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="mono-label text-accent">{cell.label}</span>
                {cell.glyph && (
                  <div className="size-12 shrink-0 -mt-1">
                    <Glyph name={cell.glyph} className="w-full h-full" />
                  </div>
                )}
              </div>
              <h3 className="font-display font-bold tracking-tight text-ink text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors">
                {cell.title}
              </h3>
              <p className="text-ink/50 text-sm leading-relaxed mt-auto">{cell.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Bento;
