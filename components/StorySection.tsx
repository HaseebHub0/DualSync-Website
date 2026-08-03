import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

type Beat = {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: string;
  accent: string; // tailwind text color
};

const beats: Beat[] = [
  {
    index: '01',
    eyebrow: 'The Friction',
    title: 'Scattered tools. Silent revenue leaks.',
    body: 'Spreadsheets, WhatsApp threads, disconnected dashboards. Every manual hand-off is a place where money, time, and clarity quietly slip away.',
    icon: 'error',
    accent: 'text-red-400',
  },
  {
    index: '02',
    eyebrow: 'The Sync',
    title: 'One architecture. One source of truth.',
    body: 'We design a custom ERP + AI layer that unifies your operations — so data flows in real time and your team stops firefighting and starts deciding.',
    icon: 'sync_alt',
    accent: 'text-primary',
  },
  {
    index: '03',
    eyebrow: 'The Scale',
    title: 'Autonomous systems that compound.',
    body: 'AI agents handle the repetitive load, workflows run themselves, and your infrastructure grows with you. Momentum becomes the default state.',
    icon: 'trending_up',
    accent: 'text-primary',
  },
];

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.story-panel', track);
      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      // Per-panel content parallax + reveal as each enters the viewport.
      panels.forEach((panel) => {
        const content = panel.querySelector('.story-content');
        const bigNum = panel.querySelector('.story-bignum');
        if (content) {
          gsap.from(content, {
            opacity: 0,
            y: 60,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 70%',
              end: 'left 30%',
              scrub: true,
            },
          });
        }
        if (bigNum) {
          gsap.fromTo(
            bigNum,
            { xPercent: 18 },
            {
              xPercent: -18,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background-dark"
      aria-label="How DualSync works"
    >
      {/* Ambient depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,224,123,0.06),transparent_60%)]" />

      <div ref={trackRef} className="flex h-screen w-max will-change-transform">
        {/* Intro panel */}
        <div className="story-panel relative flex h-screen w-screen shrink-0 flex-col justify-center px-8 sm:px-16 lg:px-28">
          <div className="story-content max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              The DualSync Method
            </div>
            <h2 className="text-4xl font-black leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-7xl">
              From operational chaos <br />
              <span className="text-white/30">to compounding</span>{' '}
              <span className="text-primary">momentum.</span>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/50">
              Scroll to follow how we turn tangled, manual operations into a
              single synchronized system that runs — and scales — itself.
            </p>
            <div className="mt-10 flex items-center gap-3 text-white/40">
              <span className="text-xs font-bold uppercase tracking-[0.3em]">
                Scroll
              </span>
              <span className="material-symbols-outlined animate-pulse">
                arrow_forward
              </span>
            </div>
          </div>
        </div>

        {/* Beat panels */}
        {beats.map((beat) => (
          <div
            key={beat.index}
            className="story-panel relative flex h-screen w-screen shrink-0 items-center px-8 sm:px-16 lg:px-28"
          >
            {/* Oversized parallax index */}
            <div className="story-bignum pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[42vw] font-black leading-none text-white/[0.03] lg:text-[32vw]">
              {beat.index}
            </div>

            <div className="story-content relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <span
                    className={`flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${beat.accent}`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {beat.icon}
                    </span>
                  </span>
                  <span
                    className={`text-xs font-black uppercase tracking-[0.4em] ${beat.accent}`}
                  >
                    {beat.eyebrow}
                  </span>
                </div>
                <h3 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {beat.title}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
                  {beat.body}
                </p>
              </div>

              {/* Themed visual card */}
              <div className="glass-card relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border-white/10 p-8">
                <div
                  className={`absolute -right-16 -top-16 size-56 rounded-full blur-[90px] ${
                    beat.accent === 'text-red-400' ? 'bg-red-500/20' : 'bg-primary/20'
                  }`}
                />
                <StoryVisual index={beat.index} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress rail */}
      <div className="pointer-events-none absolute bottom-10 left-8 right-8 z-20 sm:left-16 sm:right-16 lg:left-28 lg:right-28">
        <div className="h-px w-full bg-white/10">
          <div
            ref={progressRef}
            className="h-px w-full origin-left scale-x-0 bg-primary shadow-[0_0_10px_rgba(56,224,123,0.8)]"
          />
        </div>
      </div>
    </section>
  );
};

/** Small self-contained illustrations for each beat, styled in-theme. */
const StoryVisual: React.FC<{ index: string }> = ({ index }) => {
  if (index === '01') {
    return (
      <div className="relative z-10 flex h-full flex-col justify-center gap-3">
        {['Sales.xlsx', 'WhatsApp', 'Old CRM', 'Inventory?', 'Manual notes'].map(
          (label, i) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white/40"
              style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (1 + i)}deg)` }}
            >
              <span>{label}</span>
              <span className="material-symbols-outlined text-red-400/60 text-lg">
                priority_high
              </span>
            </div>
          ),
        )}
      </div>
    );
  }
  if (index === '02') {
    return (
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="grid grid-cols-2 gap-3 text-center">
          {['ERP Core', 'AI Layer', 'Realtime DB', 'Dashboards'].map((label) => (
            <div
              key={label}
              className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-6 text-xs font-bold uppercase tracking-widest text-primary"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative z-10 flex h-full flex-col justify-between">
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
          Live Revenue
        </div>
        <div className="mt-1 text-4xl font-black tabular-nums text-white">
          +42.8k
        </div>
      </div>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-24 w-full">
        <path
          d="M0,55 C15,50 25,20 40,30 T70,10 T100,4"
          fill="none"
          stroke="#38e07b"
          strokeWidth="2"
        />
        <path
          d="M0,55 C15,50 25,20 40,30 T70,10 T100,4 L100,60 L0,60 Z"
          fill="url(#storyGrad)"
        />
        <defs>
          <linearGradient id="storyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38e07b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38e07b" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex gap-2">
        {['Autonomous', 'Scaling', '24/7'].map((t) => (
          <span
            key={t}
            className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StorySection;
