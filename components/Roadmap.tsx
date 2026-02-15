import React from 'react';
import { RoadmapItem } from '../types';
import ScrollReveal from './ScrollReveal';

const futureServices: RoadmapItem[] = [
  {
    icon: 'brush',
    title: 'Graphics Design',
    description: 'Brand identity, UI/UX prototyping, and marketing assets.'
  },
  {
    icon: 'share',
    title: 'Social Media Management',
    description: 'Strategic content planning and community engagement.'
  }
];

const Roadmap: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-transparent to-[#0d1611]" id="roadmap">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Expanding Horizons</h2>
              <p className="text-white/60 max-w-lg">We are constantly evolving. Here is what's coming next to the DualSync ecosystem.</p>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureServices.map((item, index) => (
            <ScrollReveal key={index} delay={index * 100} className="h-full">
              <div className="glass-panel p-6 rounded-[2rem] border-dashed border-white/20 flex items-center gap-6 relative overflow-hidden h-full">
                <div className="absolute right-0 top-0 bg-white/10 px-4 py-1 rounded-bl-xl text-xs font-bold text-white/80 uppercase tracking-wider backdrop-blur-md">Coming Soon</div>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white/40 text-3xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/40 text-sm">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;