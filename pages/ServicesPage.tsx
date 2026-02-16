
import React from 'react';
import { ServiceItem } from '../types';
import ScrollReveal from '../components/ScrollReveal';

const detailedServices: (ServiceItem & { details: string[] })[] = [
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
        <div className="text-center mb-24">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Engineered <br /><span className="text-primary">Capabilities.</span></h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              We provide end-to-end technical leadership, helping companies build software that is both beautiful and robust.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {detailedServices.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className={`glass-card p-10 md:p-16 rounded-[3.5rem] border-2 ${service.color} hover:bg-white/[0.03] transition-all flex flex-col lg:flex-row gap-12 items-start relative overflow-hidden group`}>

                {/* Number Indicator */}
                <div className="absolute top-10 right-10 text-8xl font-black text-white/[0.02] select-none group-hover:text-white/[0.05] transition-colors">0{index + 1}</div>

                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white relative z-10">
                  <span className="material-symbols-outlined text-5xl">{service.icon}</span>
                </div>

                <div className="flex-grow relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-xl text-white/50 mb-10 max-w-3xl leading-relaxed">{service.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 mb-10">
                    {service.details.map((detail, dIndex) => (
                      <div key={dIndex} className="flex items-center gap-4 text-white/70">
                        <div className="size-1.5 rounded-full bg-primary/40"></div>
                        <span className="text-sm font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tIndex) => (
                      <span key={tIndex} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:self-center shrink-0 relative z-10 hidden">
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
