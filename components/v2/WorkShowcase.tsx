import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../anim/Reveal';
import Parallax from '../anim/Parallax';
import GlareHover from '../reactbits/GlareHover';
import DecryptedText from '../reactbits/DecryptedText';
import DeviceFrame from '../DeviceFrame';
import FinanceProMockup from '../FinanceProMockup';
import PakAsianShopMockup from '../PakAsianShopMockup';

/**
 * Selected work as an asymmetric editorial spread — offset columns, mono
 * captions, live product mockups in device frames.
 */
const WorkShowcase: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 sm:px-10 border-t border-rule/10" id="work">
      <div className="max-w-[90rem] mx-auto">
        <Reveal y={24}>
          <div className="flex items-end justify-between mb-20">
            <div>
              <DecryptedText text="03 — Selected work" className="mono-label text-accent block mb-6" />
              <h2 className="font-display font-black tracking-tighter text-ink text-4xl md:text-6xl shine">
              Proof, not promises
            </h2>
            </div>
            <Link
              to="/work"
              className="mono-label text-ink/60 hover:text-accent transition-colors items-center gap-2 hidden md:flex"
            >
              Full index
              <span aria-hidden="true" className="material-symbols-outlined text-sm">north_east</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12 items-start">
          {/* Pak Asian Foods — anchor engagement, leads the spread. */}
          <div className="md:col-span-7">
            <Parallax speed={1.04}>
              <Reveal y={60} duration={1.1}>
                <Link to="/work" className="group block">
                  <div className="relative border border-rule/10 group-hover:border-primary/40 transition-colors p-4 sm:p-8 bg-surface/[0.02]">
                    <GlareHover />
                    <DeviceFrame type="laptop" className="group-hover:-translate-y-2 transition-transform duration-700">
                      <PakAsianShopMockup />
                    </DeviceFrame>
                  </div>
                  <div className="flex items-start justify-between mt-6 gap-6">
                    <div>
                      <h3 className="font-display font-bold text-ink text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors">
                        Pak Asian Foods
                      </h3>
                      <p className="text-ink/50 text-sm md:text-base leading-relaxed max-w-md mt-2">
                        Four years as technical partner. Three systems in
                        production — commerce, launch campaigns, and the
                        infrastructure underneath all of it.
                      </p>
                    </div>
                    <span className="mono-label text-ink/60 shrink-0 mt-2">E-commerce / ERP</span>
                  </div>
                </Link>
              </Reveal>
            </Parallax>
          </div>

          {/* Finance Pro — offset right column. */}
          <div className="md:col-span-5 md:pt-32">
            <Parallax speed={0.94}>
              <Reveal y={60} duration={1.1} delay={0.1}>
                <Link to="/work" className="group block">
                  <div className="relative border border-rule/10 group-hover:border-primary/40 transition-colors p-8 sm:p-12 bg-surface/[0.02] flex justify-center">
                    <GlareHover />
                    <div className="w-[180px] md:w-[210px]">
                      <DeviceFrame type="mobile" className="group-hover:-translate-y-2 transition-transform duration-700">
                        <FinanceProMockup />
                      </DeviceFrame>
                    </div>
                  </div>
                  <div className="flex items-start justify-between mt-6 gap-6">
                    <div>
                      <h3 className="font-display font-bold text-ink text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors">
                        Finance Pro
                      </h3>
                      <p className="text-ink/50 text-sm md:text-base leading-relaxed max-w-md mt-2">
                        A ledger that thinks like a freelancer — clients,
                        invoices, and revenue in one calm surface.
                      </p>
                    </div>
                    <span className="mono-label text-ink/60 shrink-0 mt-2">FinTech</span>
                  </div>
                </Link>
              </Reveal>
            </Parallax>
          </div>
        </div>

        <Reveal y={20}>
          <div className="mt-16 md:hidden">
            <Link to="/work" className="mono-label text-accent flex items-center gap-2">
              Full index
              <span aria-hidden="true" className="material-symbols-outlined text-sm">north_east</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WorkShowcase;
