import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../anim/Reveal';
import DecryptedText from '../reactbits/DecryptedText';
import Parallax from '../anim/Parallax';

const frames = [
  { src: '/assets/me_at_work.jpeg', label: 'The craft', speed: 1.05 },
  { src: '/assets/founder_and_cofounder_together.jpeg', label: 'The founders', speed: 0.95 },
  { src: '/assets/workplace3.jpeg', label: 'The setup', speed: 1.05 },
];

/**
 * The people behind the systems — real photography in an offset
 * strip, monochrome until hovered.
 */
const FoundersStrip: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 sm:px-10 border-t border-rule/10">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <Reveal y={24}>
              <DecryptedText text="05 — The team" className="mono-label text-accent block mb-6" />
              <h2 className="font-display font-black tracking-tighter text-ink text-4xl md:text-6xl leading-[0.95] shine">
                Two founders.
                <br />
                Zero handoffs.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal y={24} delay={0.1}>
              <p className="text-ink/50 text-base md:text-lg leading-relaxed max-w-md">
                Every line of code on every project is written by the people in
                these photos. When you call, an engineer answers.
              </p>
              <Link
                to="/about#team"
                className="mono-label text-accent flex items-center gap-2 mt-6 hover:gap-3 transition-all"
              >
                Meet the founders
                <span aria-hidden="true" className="material-symbols-outlined text-sm">north_east</span>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frames.map((img, i) => (
            <Parallax key={img.label} speed={img.speed}>
              <Reveal y={50} delay={i * 0.08}>
                <figure
                  className={`group relative overflow-hidden border border-rule/10 aspect-[4/5] ${
                    i === 1 ? 'md:-mt-12' : ''
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 flex items-center justify-between p-5 bg-gradient-to-t from-canvas/90 to-transparent">
                    <span className="mono-label text-ink/80">{img.label}</span>
                    <span className="mono-label text-ink/60">{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersStrip;
