import React from 'react';
import { ServiceItem, RoadmapItem } from '../types';
import ScrollReveal from '../components/ScrollReveal';

// Adding features and color to the type to match the object literals and usage in JSX
const detailedServices: (ServiceItem & { details: string[]; features: string[]; color: string })[] = [
  {
    icon: 'psychology',
    title: 'AI Integration',
    description: 'Boost efficiency with intelligent automation. We build custom AI solutions that reduce costs by 40% and increase productivity.',
    tags: ['NLP', 'Computer Vision', 'Generative AI', 'Agentic Workflows'],
    features: ['Chatbots & Automation', 'Predictive Analytics', 'ML Models'],
    color: 'border-rose-500/20',
    details: ['Custom LLM Fine-tuning', 'Autonomous Customer Support Agents', 'Workflow Automation & Integration', 'Data Science & Visualizations']
  },
  {
    icon: 'language',
    title: 'Web Development',
    description: 'Fast, scalable web applications that convert visitors into customers. Built for performance and optimized for SEO.',
    tags: ['React', 'Next.js', 'PostgreSQL', 'Cloud Native'],
    features: ['React & Next.js', 'E-commerce', 'Enterprise Apps'],
    color: 'border-blue-500/20',
    details: ['Headless E-commerce Solutions', 'Enterprise Dashboards', 'Serverless Architectures', 'Performance Optimization']
  },
  {
    icon: 'smartphone',
    title: 'Mobile Apps',
    description: "Efficient cross-platform solutions for modern businesses. We build functional, high-performance apps that solve real operational problems.",
    tags: ['React Native', 'Expo', 'Android', 'iOS'],
    features: ['Business Apps', 'Cross-Platform', 'Internal Tools'],
    color: 'border-cyan-400/20',
    details: ['Real-time Data Synchronization', 'Offline-First Architecture', 'Inventory Management Apps', 'Field Operation Tools']
  },
  {
    icon: 'code',
    title: 'Custom Software',
    description: 'Tailor-made solutions that solve your unique business challenges. Save 60% compared to off-the-shelf alternatives.',
    tags: ['Microservices', 'API Design', 'Python', 'DevOps'],
    features: ['SaaS Platforms', 'Internal Tools', 'API Development'],
    color: 'border-primary/20',
    details: ['Complex Logistics Systems (ERP)', 'Inventory Management Platforms', 'Legacy System Modernization', 'Cloud Migration Strategies']
  },
  {
    icon: 'palette',
    title: 'UI/UX Design',
    description: 'Clean, intuitive interfaces designed for clarity. We focus on usability and logical flows to ensure your software is easy to navigate.',
    tags: ['Figma', 'Wireframing', 'Prototyping'],
    features: ['User Flows', 'Information Architecture', 'Design Systems'],
    color: 'border-purple-500/20',
    details: ['Interactive Prototypes', 'Dashboard layouts', 'Mobile-First Design', 'User Journey Mapping']
  },
  {
    icon: 'campaign',
    title: 'Social Media Marketing',
    description: 'Data-driven social strategies that build community and drive engagement. We handle everything from content creation to analytics.',
    tags: ['Instagram', 'LinkedIn', 'Content Creation', 'Analytics'],
    features: ['Reels & Shorts', 'Copywriting', 'Growth Hacking'],
    color: 'border-orange-500/20',
    details: ['Short-form Video Production', 'LinkedIn Authority Building', 'Community Management', 'Performance Analytics']
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter">Engineered <br /><span className="text-primary">Capabilities.</span></h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              We provide end-to-end technical leadership, helping companies build software that is both beautiful and robust.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-12 perspective-[2000px]">
          {detailedServices.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className={`
                glass-card p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[3.5rem] border-2 ${service.color} 
                hover:bg-white/[0.03] transition-all duration-700 
                flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative overflow-hidden group
                hover:[transform:rotateX(2deg)_rotateY(-1deg)_translateZ(20px)]
              `}>

                {/* Tech Mesh Background Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,224,123,0.1)_1px,transparent_1px),linear-gradient(rgba(56,224,123,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
                </div>

                {/* AI Scan-line Animation */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/40 shadow-[0_0_15px_#38e07b] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_3s_infinite_linear] pointer-events-none z-50"></div>

                {/* Number Indicator with Hover Glow */}
                <div className="absolute top-10 right-10 text-8xl font-black text-white/[0.02] select-none group-hover:text-primary/[0.05] group-hover:scale-110 transition-all duration-1000">0{index + 1}</div>

                {/* Interactive Icon Container */}
                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white relative z-10 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_rgba(56,224,123,0.1)] transition-all duration-500">
                  <div className="animate-float group-hover:animate-none">
                    <span className="material-symbols-outlined text-5xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">{service.icon}</span>
                  </div>
                  {/* Subtle pulsing ring behind icon */}
                  <div className="absolute inset-0 rounded-3xl border border-primary/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                </div>

                <div className="flex-grow relative z-10">
                  <div className="flex flex-col mb-6">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 opacity-60">Service Module</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors duration-500">{service.title}</h3>
                  </div>

                  <p className="text-xl text-white/50 mb-10 max-w-3xl leading-relaxed transition-colors group-hover:text-white/70">{service.description}</p>

                  {/* Feature Grid with Staggered Visuals */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                    {service.details.map((detail, dIndex) => (
                      <div
                        key={dIndex}
                        className="flex items-center gap-4 text-white/40 group-hover:text-white/80 transition-all duration-500 group-hover:translate-x-2"
                        style={{ transitionDelay: `${dIndex * 50}ms` }}
                      >
                        <div className="size-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:shadow-[0_0_8px_#38e07b] transition-all"></div>
                        <span className="text-sm font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60 group-hover:border-white/20 transition-all"
                        style={{ transitionDelay: `${tIndex * 100}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Expanding Horizons Section */}
      <div className="max-w-6xl mx-auto mt-32">
        <ScrollReveal>
          <div className="mb-12 gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Expanding Horizons</h2>
              <p className="text-white/60 max-w-lg">We are constantly evolving. Here is what's coming next to the DualSync ecosystem.</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: 'brush',
              title: 'Graphics Design',
              description: 'Brand identity, UI/UX prototyping, and marketing assets.'
            },
            {
              icon: 'trending_up',
              title: 'SEO Optimization',
              description: 'Advanced technical SEO, programmatic content strategies, and ranking domination.'
            }
          ].map((item, index) => (
            <ScrollReveal key={index} delay={index * 100} className="h-full">
              <div className="glass-panel p-6 rounded-[2rem] border-dashed border-white/20 flex items-center gap-6 relative overflow-hidden h-full hover:border-primary/30 transition-colors group">
                <div className="absolute right-0 top-0 bg-white/10 px-4 py-1 rounded-bl-xl text-xs font-bold text-white/80 uppercase tracking-wider backdrop-blur-md group-hover:bg-primary group-hover:text-background-dark transition-colors">Coming Soon</div>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-white/40 text-3xl group-hover:text-primary transition-colors">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(600px); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default ServicesPage;