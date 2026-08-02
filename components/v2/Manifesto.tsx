import React, { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '../../lib/gsap';
import DecryptedText from '../reactbits/DecryptedText';

/**
 * Scroll-scrubbed manifesto — every word starts dim and ignites as the
 * reader passes through it, so the statement is literally read by scrolling.
 */
const Manifesto: React.FC = () => {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = new SplitText(el, { type: 'words', wordsClass: 'manifesto-word' });
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 0.4,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section className="py-32 md:py-48 px-6 sm:px-10">
      <div className="max-w-[90rem] mx-auto">
        <DecryptedText text="01 — Position" className="mono-label text-accent block mb-10" />
        <p
          ref={ref}
          className="font-display font-bold tracking-tight leading-[1.15] text-ink text-[clamp(1.75rem,4.2vw,4rem)] max-w-5xl"
        >
          Most software is assembled from parts and handed down a chain. Ours
          is engineered — by the two people you talk to on day one, on day
          ninety, and at 2 a.m. when it matters. Templates are rented.
          Systems are owned. We build the second kind.
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
