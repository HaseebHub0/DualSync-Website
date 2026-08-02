import React, { useEffect, useRef } from 'react';

/**
 * GlareHover (React Bits) — a specular highlight that follows the pointer
 * across a surface. Drop it inside any `position: relative` card.
 *
 * The glare layer is `pointer-events: none` (it must not eat clicks), so the
 * move listener is attached to the parent rather than to the layer itself.
 * Position is written to CSS custom properties consumed by `.glare` in
 * styles/index.css — no React state, so no re-render per pointer move.
 */
const GlareHover: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      layer.style.setProperty('--glare-x', `${e.clientX - r.left}px`);
      layer.style.setProperty('--glare-y', `${e.clientY - r.top}px`);
    };

    host.addEventListener('pointermove', onMove, { passive: true });
    return () => host.removeEventListener('pointermove', onMove);
  }, []);

  return <span ref={ref} aria-hidden="true" className={`glare ${className}`} />;
};

export default GlareHover;
