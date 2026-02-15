import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const roadmapData = [
  {
    phase: "Phase 1: Foundation (Completed)",
    items: [
      { title: "Brand Identity", desc: "Established core visual language and design system.", status: "done" },
      { title: "Core Team Assembly", desc: "Recruited top-tier talent in design and engineering.", status: "done" },
      { title: "Initial Service Launch", desc: "Web and Mobile development services live.", status: "done" }
    ]
  },
  {
    phase: "Phase 2: Expansion (Current)",
    items: [
      { title: "Graphics Design Wing", desc: "Launching specialized branding and asset creation services.", status: "in-progress" },
      { title: "SaaS Product Development", desc: "Building proprietary tools for project management.", status: "in-progress" },
      { title: "Global Partnership Program", desc: "Establishing agency partners in Europe and Asia.", status: "in-progress" }
    ]
  },
  {
    phase: "Phase 3: Innovation (Future)",
    items: [
      { title: "AI Research Lab", desc: "Dedicated R&D for custom machine learning models.", status: "upcoming" },
      { title: "Web3 Integration", desc: "Blockchain solutions for decentralized applications.", status: "upcoming" },
      { title: "Social Media Management", desc: "Full-service digital marketing and content strategy.", status: "upcoming" }
    ]
  },
  {
    phase: "Phase 4: Ecosystem",
    items: [
      { title: "DualSync Academy", desc: "Educational platform for aspiring developers.", status: "upcoming" },
      { title: "Open Source Initiative", desc: "Releasing internal tools to the community.", status: "upcoming" },
      { title: "Venture Studio", desc: "Incubating startups built on our tech stack.", status: "upcoming" }
    ]
  }
];

const RoadmapPage: React.FC = () => {
  return (
    <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
             <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider">
               Future Vision
             </div>
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Strategic Roadmap</h1>
             <p className="text-xl text-white/60 max-w-2xl mx-auto">
               Our path forward is clear. We are building the infrastructure for the next generation of digital experiences.
             </p>
          </div>
        </ScrollReveal>

        <div className="space-y-12 relative">
           {/* Central Line for visual connection */}
           <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary via-primary/20 to-transparent opacity-30"></div>

           {roadmapData.map((phase, index) => (
             <ScrollReveal key={index} delay={index * 150}>
               <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
                 <h2 className="text-2xl font-bold text-white mb-8 relative z-10 pl-4 border-l-4 border-primary/50">{phase.phase}</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                   {phase.items.map((item, i) => (
                     <div key={i} className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors group h-full flex flex-col">
                       <div className="flex justify-between items-start mb-4">
                         <div className={`w-3 h-3 rounded-full ${item.status === 'done' ? 'bg-primary shadow-[0_0_10px_rgba(56,224,123,0.5)]' : item.status === 'in-progress' ? 'bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-white/20'}`}></div>
                         {item.status === 'done' && <span className="material-symbols-outlined text-primary text-sm">check</span>}
                         {item.status === 'in-progress' && <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Active</span>}
                       </div>
                       <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                       <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                 </div>
               </div>
             </ScrollReveal>
           ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;