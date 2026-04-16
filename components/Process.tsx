
import React from 'react';
import ScrollReveal from './ScrollReveal';

const steps = [
  {
    number: "01",
    title: "Strategic Initialization",
    label: "Phase: Discovery",
    description: "We don't just take requirements; we sync with your business logic. Our founders personally lead deep-dive sessions to architect a system that solves your specific scaling bottlenecks.",
    icon: "architecture",
    color: "from-primary/20 to-transparent"
  },
  {
    number: "02",
    title: "Technical Engineering",
    label: "Phase: Development",
    description: "Reality is built in the code. We utilize an AI-accelerated workflow to bypass boilerplate and focus 100% on complex logic, PostgreSQL optimization, and cross-platform synchronization.",
    icon: "terminal",
    color: "from-blue-500/20 to-transparent"
  },
  {
    number: "03",
    title: "Continuous Sync",
    label: "Phase: Growth",
    description: "Launch is only the beginning. We provide long-term technical guardianship, ensuring your infrastructure evolves alongside your users. Your success is our primary data point.",
    icon: "sync_saved_locally",
    color: "from-purple-500/20 to-transparent"
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent hidden lg:block"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4">The Workflow</div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">The Sync Sequence</h2>
            <p className="text-white/40 max-w-xl mx-auto mt-4 text-lg">Our proven technical roadmap for turning ambitious visions into high-performance digital reality.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="group relative">
                {/* Connecting Line (Mobile) */}
                {index < 2 && <div className="absolute left-10 top-full w-px h-8 bg-gradient-to-b from-primary/30 to-transparent lg:hidden"></div>}

                <div className="glass-card p-10 rounded-[3rem] border-white/5 h-full hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                  {/* Step Number Background */}
                  <div className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.03] italic select-none group-hover:text-primary/[0.05] transition-colors">{step.number}</div>

                  {/* Content */}
                  <div className={`size-16 rounded-2xl bg-gradient-to-br ${step.color} border border-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                  </div>

                  <div className="space-y-4">
                    <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">{step.label}</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  {/* Footer Decor */}
                  <div className="mt-10 flex items-center gap-2">
                    <div className="size-1 rounded-full bg-primary animate-pulse"></div>
                    <div className="h-px flex-grow bg-white/5"></div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
