import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText } from '../lib/gsapV3';

/**
 * All v3 motion, scoped to one page root.
 *
 * Every tween is created inside a gsap.context, so unmounting the page (route
 * change) reverts inline styles, kills ScrollTriggers and un-splits text.
 * With prefers-reduced-motion nothing is created at all: the page is simply
 * the final, static state from the CSS.
 *
 * Only `opacity`, `translate`/`y`, `scale*` and the hero arc's own rotation
 * are animated, so the CSS transforms on the cards (3D arc) and every CSS
 * :hover transform keep working untouched.
 */

const EASE = 'expo.out';

const CARD_SELECTOR = [
  '.ds-tile',
  '.ds-svc',
  '.ds-step',
  '.ds-work-card',
  '.sx-mini',
  '.sx-svc-row',
  '.sx-pp',
  '.sx-post',
  '.sx-trait',
  '.sx-founder',
  '.v3-cell',
].join(',');

const HEADING_SELECTOR = '.ds-h2, .ds-cta-title, .sx-h2, .sx-cta-title, .ds-statement, .sx-statement';

export function useV3Motion(rootRef: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: (() => void)[] = [];
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      /* ---------------- Home hero ---------------- */
      const hero = root.querySelector<HTMLElement>('.ds-hero');
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: EASE, duration: 1.1 } });
        const title = hero.querySelector('.ds-hero-title');
        const split = title ? new SplitText(title, { type: 'words', mask: 'words' }) : null;

        tl.from(hero.querySelector('.ds-badge'), { y: 20, opacity: 0 }, 0.1);
        if (split) tl.from(split.words, { yPercent: 110, opacity: 0, stagger: 0.06 }, 0.2);
        tl.from(hero.querySelectorAll('.ds-hero-sub, .ds-hero-ctas'), { y: 24, opacity: 0, stagger: 0.12 }, 0.55);

        // Cards rise one by one. `translate` composes with the CSS `transform`
        // that builds the 3D arc, so the arc geometry and :hover lift survive.
        const cards = gsap.utils.toArray<HTMLElement>('.ds-arc .ds-card', hero);
        tl.fromTo(
          cards,
          { translate: '0px 140px', opacity: 0 },
          { translate: '0px 0px', opacity: 1, duration: 1.2, stagger: 0.09, clearProps: 'translate,opacity' },
          0.7,
        );
        tl.from(hero.querySelector('.ds-trust'), { opacity: 0, y: 12 }, 1.3);

        // Pointer tilt + cloud parallax (desktop pointers only).
        const arc = hero.querySelector<HTMLElement>('.ds-arc');
        const clouds = gsap.utils.toArray<HTMLElement>('.ds-cloud', hero);
        if (arc && finePointer) {
          gsap.set(arc, { transformPerspective: 1400 });
          const rx = gsap.quickTo(arc, 'rotationX', { duration: 0.8, ease: 'power3.out' });
          const ry = gsap.quickTo(arc, 'rotationY', { duration: 0.8, ease: 'power3.out' });
          const cx = clouds.map((c) => gsap.quickTo(c, 'x', { duration: 2.2, ease: 'power2.out' }));
          const cy = clouds.map((c) => gsap.quickTo(c, 'y', { duration: 2.2, ease: 'power2.out' }));
          const onMove = (e: PointerEvent) => {
            const r = hero.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
            const ny = (e.clientY - r.top) / r.height - 0.5;
            ry(nx * 8); // ±4°
            rx(-ny * 8);
            clouds.forEach((_, i) => {
              const depth = (i + 1) * 14;
              cx[i](nx * depth);
              cy[i](ny * depth * 0.5);
            });
          };
          const onLeave = () => {
            rx(0);
            ry(0);
          };
          hero.addEventListener('pointermove', onMove);
          hero.addEventListener('pointerleave', onLeave);
          cleanups.push(() => {
            hero.removeEventListener('pointermove', onMove);
            hero.removeEventListener('pointerleave', onLeave);
          });
        }
        // Slow ambient drift, on a wrapper-free property so it stacks with the
        // pointer parallax (x/y) above.
        clouds.forEach((c, i) => {
          gsap.to(c, { xPercent: i % 2 ? -4 : 4, duration: 14 + i * 4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        });
      }

      /* ---------------- Inner page hero ---------------- */
      const ph = root.querySelector<HTMLElement>('.sx-ph');
      if (ph) {
        const tl = gsap.timeline({ defaults: { ease: EASE, duration: 1.1 } });
        const title = ph.querySelector('.sx-ph-title');
        const split = title ? new SplitText(title, { type: 'words', mask: 'words' }) : null;
        tl.from(ph.querySelectorAll('.sx-ph-label'), { opacity: 0, y: 10 }, 0.1);
        if (split) tl.from(split.words, { yPercent: 110, stagger: 0.06 }, 0.2);
        tl.from(ph.querySelectorAll('.sx-ph-lead, .sx-promise'), { opacity: 0, y: 20 }, 0.6);

        const ringA = ph.querySelector('.sx-ph-ring-a');
        const ringB = ph.querySelector('.sx-ph-ring-b');
        const drift = { trigger: ph, start: 'top top', end: 'bottom top', scrub: 0.6 };
        if (ringA) gsap.to(ringA, { x: 70, ease: 'none', scrollTrigger: drift });
        if (ringB) gsap.to(ringB, { x: -70, ease: 'none', scrollTrigger: drift });
      }

      /* ---------------- Scroll reveals ---------------- */

      // Headings + statements: word-by-word, scrubbed with scroll.
      q(HEADING_SELECTOR).forEach((el) => {
        // aria-label is only valid on headings; on the <p> statements leave the
        // (still readable) word spans alone instead of hiding them.
        const split = new SplitText(el, { type: 'words', aria: /^H\d$/.test(el.tagName) ? 'auto' : 'none' });
        gsap.fromTo(
          split.words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: 0.5 },
          },
        );
      });

      // Cards / tiles: fade up in a stagger as each batch enters.
      const cards = q(CARD_SELECTOR).filter((el) => !el.closest('.ds-hero'));
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.batch(cards, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.08, clearProps: 'transform,opacity' }),
        });
      }

      // Illustrations assemble piece by piece when their cell scrolls in
      // (the dashed sync lines then keep flowing via CSS).
      q('.v3-illo').forEach((svg) => {
        const parts = Array.from(svg.children) as SVGElement[];
        gsap.from(parts, {
          opacity: 0,
          y: 14,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: svg, start: 'top 85%', once: true },
        });
      });

      // Chart bars grow from the bottom.
      const bars = q('.ds-bar, .sx-gbar');
      const groups = new Map<Element, HTMLElement[]>();
      bars.forEach((b) => {
        const p = b.parentElement as Element;
        groups.set(p, [...(groups.get(p) ?? []), b]);
      });
      groups.forEach((group, parent) => {
        gsap.from(group, {
          scaleY: 0,
          transformOrigin: '50% 100%',
          duration: 1,
          ease: 'power3.out',
          stagger: 0.06,
          delay: parent.closest('.ds-hero') ? 1.2 : 0,
          scrollTrigger: { trigger: parent, start: 'top 90%', once: true },
        });
      });

      // Big numbers rise out of their mask.
      q('.sx-num-v').forEach((el) => {
        gsap.from(el, {
          yPercent: 105,
          duration: 1.1,
          ease: EASE,
          scrollTrigger: { trigger: el.parentElement ?? el, start: 'top 90%', once: true },
        });
      });

      // CTA rings close in as the CTA scrolls through.
      q('.sx-ring-l, .sx-ring-r').forEach((ring) => {
        const host = ring.parentElement ?? ring;
        gsap.fromTo(
          ring,
          { x: ring.classList.contains('sx-ring-l') ? -120 : 120 },
          { x: 0, ease: 'none', scrollTrigger: { trigger: host, start: 'top bottom', end: 'center center', scrub: 0.6 } },
        );
      });

      // Footer wordmark rises letter by letter.
      q('.sx-wordmark').forEach((el) => {
        // Decorative (aria-hidden in Footer.tsx); no aria-label on a <div>.
        // No mask: the wordmark's 0.8 line-height would clip the "y" descender.
        const split = new SplitText(el, { type: 'chars', aria: 'none' });
        gsap.from(split.chars, {
          yPercent: 60,
          opacity: 0,
          duration: 1.1,
          ease: EASE,
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        });
      });
    }, root);

    // Layout shifts once web fonts and images land; re-measure triggers.
    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [rootRef]);
}
