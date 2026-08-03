
import React from 'react';
import ScrollReveal from './ScrollReveal';

const reasons = [
  {
    icon: "person_celebrate",
    title: "Founder-Led Architecture",
    description: "You bypass the account managers. You work directly with the technical founders who design your system architecture and write the production code.",
    gradient: "from-primary/20 to-transparent"
  },
  {
    icon: "bolt",
    title: "AI-Accelerated Engineering",
    description: "We use AI to absorb the boilerplate, so our hours go into the logic that is specific to your business. Less scaffolding, more system.",
    gradient: "from-blue-500/20 to-transparent"
  },
  {
    icon: "sync_alt",
    title: "Strategic Synchronization",
    description: "We don't just build features; we sync with your business objectives. Every line of code is mapped to a growth metric or operational efficiency.",
    gradient: "from-purple-500/20 to-transparent"
  },
  {
    icon: "security",
    title: "Technical Guardianship",
    description: "As seen with Pak Asian Foods, we act as long-term technical partners, ensuring your infrastructure evolves as your user base scales.",
    gradient: "from-emerald-500/20 to-transparent"
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-8 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4">The DualSync Advantage</div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Why Leading Companies <br /> <span className="text-white/30">Choose DualSync</span>
              </h2>
            </div>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed">
              We bridge the gap between technical complexity and business growth through a unique founder-led approach.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="glass-card p-8 rounded-[2.5rem] border-white/5 h-full hover:bg-white/[0.04] transition-all group relative overflow-hidden">
                {/* Accent Glow */}
                <div className={`absolute -bottom-12 -right-12 size-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity bg-gradient-to-br ${reason.gradient}`}></div>

                <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500">
                  <span className="material-symbols-outlined text-2xl">{reason.icon}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{reason.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>

                <div className="mt-8 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-500">
                  <div className="w-4 h-[1px] bg-primary"></div>
                  <span className="text-[10px] font-black uppercase text-primary tracking-widest">Verified Edge</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
