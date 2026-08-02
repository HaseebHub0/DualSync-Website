import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export type GlyphName =
  | 'agent'
  | 'voice'
  | 'saas'
  | 'enterprise'
  | 'devices'
  | 'automation'
  | 'design'
  | 'render'
  | 'chat';

type GlyphProps = {
  name: GlyphName;
  className?: string;
  /** Draw on scroll into view, or immediately. */
  trigger?: 'scroll' | 'load';
  delay?: number;
};

/**
 * Hand-built animated SVG illustrations — the Lottie role, without the
 * dependency or the generic stock look. Every glyph is stroke-based so
 * GSAP DrawSVG can trace it on entry, then a subtle idle loop keeps it
 * alive. Hovering the parent (`.group`) accelerates and brightens it.
 *
 * Kept on-brand by construction: two stroke weights, one accent colour.
 */

const P = '#38e07b';

const paths: Record<GlyphName, React.ReactNode> = {
  // Neural agent — a core that radiates to satellite nodes.
  agent: (
    <>
      <circle className="g-draw" cx="60" cy="60" r="15" />
      <circle className="g-draw" cx="60" cy="60" r="28" strokeDasharray="4 6" />
      <path className="g-draw" d="M60 45V22" />
      <path className="g-draw" d="M60 75v23" />
      <path className="g-draw" d="M45 60H22" />
      <path className="g-draw" d="M75 60h23" />
      <circle className="g-node" cx="60" cy="18" r="4" />
      <circle className="g-node" cx="60" cy="102" r="4" />
      <circle className="g-node" cx="18" cy="60" r="4" />
      <circle className="g-node" cx="102" cy="60" r="4" />
      <circle className="g-pulse" cx="60" cy="60" r="6" />
    </>
  ),
  // Voice — a waveform between two brackets.
  voice: (
    <>
      <path className="g-draw" d="M22 40v-8a6 6 0 016-6h8" />
      <path className="g-draw" d="M98 40v-8a6 6 0 00-6-6h-8" />
      <path className="g-draw" d="M22 80v8a6 6 0 006 6h8" />
      <path className="g-draw" d="M98 80v8a6 6 0 01-6 6h-8" />
      <path className="g-bar" d="M40 52v16" />
      <path className="g-bar" d="M50 44v32" />
      <path className="g-bar" d="M60 36v48" />
      <path className="g-bar" d="M70 44v32" />
      <path className="g-bar" d="M80 52v16" />
    </>
  ),
  // SaaS — stacked planes lifting off a base.
  saas: (
    <>
      <path className="g-draw" d="M60 82L26 66l34-16 34 16z" />
      <path className="g-draw g-layer" d="M60 62L26 46l34-16 34 16z" />
      <path className="g-draw" d="M26 82v10l34 16 34-16V82" />
      <circle className="g-pulse" cx="60" cy="46" r="5" />
    </>
  ),
  // Enterprise — a database spine with record rows.
  enterprise: (
    <>
      <ellipse className="g-draw" cx="60" cy="30" rx="30" ry="11" />
      <path className="g-draw" d="M30 30v30c0 6 13 11 30 11s30-5 30-11V30" />
      <path className="g-draw" d="M30 60v30c0 6 13 11 30 11s30-5 30-11V60" />
      <path className="g-bar" d="M44 44h8" />
      <path className="g-bar" d="M44 76h8" />
      <path className="g-bar" d="M68 44h8" />
      <path className="g-bar" d="M68 76h8" />
    </>
  ),
  // Devices — desktop plus handset.
  devices: (
    <>
      <rect className="g-draw" x="18" y="26" width="62" height="44" rx="4" />
      <path className="g-draw" d="M40 82h24" />
      <path className="g-draw" d="M52 70v12" />
      <rect className="g-draw g-layer" x="76" y="56" width="28" height="46" rx="5" />
      <path className="g-bar" d="M86 64h8" />
      <path className="g-bar" d="M30 40h26" />
      <path className="g-bar" d="M30 52h16" />
    </>
  ),
  // Automation — connected workflow nodes.
  automation: (
    <>
      <rect className="g-draw" x="14" y="46" width="26" height="26" rx="5" />
      <rect className="g-draw" x="80" y="20" width="26" height="26" rx="5" />
      <rect className="g-draw" x="80" y="72" width="26" height="26" rx="5" />
      <path className="g-flow" d="M40 59h20a10 10 0 0010-10v-6a10 10 0 0110-10" />
      <path className="g-flow" d="M40 59h20a10 10 0 0110 10v6a10 10 0 0010 10" />
      <circle className="g-pulse" cx="27" cy="59" r="4" />
    </>
  ),
  // Design — artboard with a cursor pulling a corner.
  design: (
    <>
      <rect className="g-draw" x="22" y="22" width="60" height="60" rx="4" />
      <path className="g-draw" d="M22 44h60" />
      <path className="g-draw" d="M44 44v38" />
      <path className="g-node-fill" d="M78 74l22 9-9 4-4 9z" />
      <circle className="g-pulse" cx="33" cy="33" r="3.5" />
    </>
  ),
  // Chat — two threaded bubbles with a typing indicator.
  chat: (
    <>
      <path className="g-draw" d="M20 34a8 8 0 018-8h44a8 8 0 018 8v24a8 8 0 01-8 8H40l-14 12V66h-6a8 8 0 01-8-8z" />
      <path className="g-draw g-layer" d="M92 54h8a8 8 0 018 8v20a8 8 0 01-8 8h-4v10l-12-10H68a8 8 0 01-8-8v-8" />
      <circle className="g-node" cx="38" cy="46" r="3.5" />
      <circle className="g-node" cx="50" cy="46" r="3.5" />
      <circle className="g-node" cx="62" cy="46" r="3.5" />
    </>
  ),
  // Render — a wireframe cube resolving.
  render: (
    <>
      <path className="g-draw" d="M60 20l34 20v40L60 100 26 80V40z" />
      <path className="g-draw g-layer" d="M60 20v40l34-20" />
      <path className="g-draw g-layer" d="M60 60v40" />
      <path className="g-draw g-layer" d="M60 60L26 40" />
      <circle className="g-pulse" cx="60" cy="60" r="5" />
    </>
  ),
};

const Glyph: React.FC<GlyphProps> = ({
  name,
  className = '',
  trigger = 'scroll',
  delay = 0,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const strokes = el.querySelectorAll('.g-draw');
      const nodes = el.querySelectorAll('.g-node, .g-node-fill');
      const bars = el.querySelectorAll('.g-bar');
      const flows = el.querySelectorAll('.g-flow');
      const pulses = el.querySelectorAll('.g-pulse');

      const tl = gsap.timeline({
        delay,
        scrollTrigger:
          trigger === 'scroll'
            ? { trigger: el, start: 'top 88%', once: true }
            : undefined,
      });

      // Trace the structure, then populate the detail.
      tl.from(strokes, {
        drawSVG: '0%',
        duration: 1.1,
        ease: 'power2.inOut',
        stagger: 0.09,
      })
        .from(bars, { drawSVG: '50% 50%', duration: 0.5, stagger: 0.05 }, '-=0.5')
        .from(nodes, { scale: 0, transformOrigin: 'center', duration: 0.5, ease: 'back.out(2.5)', stagger: 0.06 }, '-=0.4')
        .from(pulses, { scale: 0, transformOrigin: 'center', duration: 0.5, ease: 'back.out(3)' }, '-=0.3');

      // Idle life — a slow breathing core and travelling flow dashes.
      if (pulses.length) {
        gsap.to(pulses, {
          scale: 1.35,
          opacity: 0.35,
          transformOrigin: 'center',
          duration: 1.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
      if (flows.length) {
        gsap.to(flows, {
          strokeDashoffset: -28,
          duration: 1.4,
          ease: 'none',
          repeat: -1,
        });
      }
      if (bars.length && (name === 'voice' || name === 'enterprise')) {
        gsap.to(bars, {
          scaleY: 0.45,
          transformOrigin: 'center',
          duration: 0.7,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.11, from: 'center' },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [name, trigger, delay]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={`g-root ${className}`}
    >
      <g
        stroke={P}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name]}
      </g>
    </svg>
  );
};

export default Glyph;
