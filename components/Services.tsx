
import React from 'react';
import { ServiceItem } from '../types';
import ScrollReveal from './ScrollReveal';
import { Link } from 'react-router-dom';

const services: ServiceItem[] = [
  {
    icon: 'psychology',
    title: 'AI Integration',
    description: 'Boost efficiency with intelligent automation. We build custom AI solutions that reduce costs by 40% and increase productivity.',
    features: ['Chatbots & Automation', 'Predictive Analytics', 'ML Models'],
    tags: [],
    color: 'border-rose-500/30'
  },
  {
    icon: 'settings_voice',
    title: 'AI Calling Agents',
    description: 'Deploy human-like voice agents for inbound and outbound calling. Automate support, cold outreach, and customer qualification with realistic AI.',
    features: ['Voice Agents (VAPI/Bland)', 'Outbound/Inbound Calling', 'CRM Integrations'],
    tags: [],
    color: 'border-green-500/30'
  },
  {
    icon: 'hub',
    title: 'n8n Automation',
    description: 'Seamlessly connect your tools and databases. We build secure, self-hosted, complex n8n workflows that eliminate manual data entry.',
    features: ['Self-Hosted n8n Setup', 'API & Webhook Integrations', 'Custom Workflow Syncs'],
    tags: [],
    color: 'border-orange-500/30'
  },
  {
    icon: 'forum',
    title: 'WhatsApp Automation',
    description: 'Scale your communications via WhatsApp. We integrate the official WhatsApp Cloud API for automated support, campaigns, and chatbot flows.',
    features: ['WhatsApp Cloud API', 'Interactive Chatbots', 'Broadcast Campaigns'],
    tags: [],
    color: 'border-emerald-500/30'
  },
  {
    icon: 'language',
    title: 'Web Development',
    description: 'Fast, scalable web applications that convert visitors into customers. Built for performance and optimized for SEO.',
    features: ['React & Next.js', 'E-commerce', 'Enterprise Apps'],
    tags: [],
    color: 'border-blue-500/30'
  },
  {
    icon: 'smartphone',
    title: 'Mobile Apps',
    description: "We build efficient cross-platform apps focused on business logic and operational utility.",
    features: ['Business Focus', 'Cross-Platform', 'React Native'],
    tags: [],
    color: 'border-cyan-400/30'
  },
  {
    icon: 'code',
    title: 'Custom Software',
    description: 'Tailor-made solutions that solve your unique business challenges. Save 60% compared to off-the-shelf alternatives.',
    features: ['SaaS Platforms', 'Internal Tools', 'API Development'],
    tags: [],
    color: 'border-primary/30'
  },
  {
    icon: 'palette',
    title: 'UI/UX Design',
    description: 'Clean, functional design prioritization clarity and ease of use for complex data systems.',
    features: ['Prototyping', 'User Flows', 'Dashboard Design'],
    tags: [],
    color: 'border-purple-500/30'
  },
  {
    icon: 'view_in_ar',
    title: '3D Art & Animation',
    description: 'Cinematic 3D visuals that elevate your brand. From photorealistic product renders to character animation, we create assets that captivate and convert.',
    features: ['Character Design & Rigging', 'Product Visualization', 'Game-Ready Assets'],
    tags: [],
    color: 'border-amber-500/30'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-8 relative" id="services">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col gap-4 mb-16 text-center">
            <div className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-2">Our Capabilities</div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Technical Excellence</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
              We leverage cutting-edge technology to solve complex problems and drive business growth.
            </p>
          </div>
        </ScrollReveal>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100} className="h-full">
              <div className={`glass-card p-10 rounded-[2.5rem] flex flex-col h-full group border-2 ${service.color} hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden`}>
                {/* Background Glow */}
                <div className={`absolute -top-24 -right-24 size-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity ${
                  service.title === 'AI Integration' ? 'bg-rose-500' :
                  service.title === 'AI Calling Agents' ? 'bg-green-500' :
                  service.title === 'n8n Automation' ? 'bg-orange-500' :
                  service.title === 'WhatsApp Automation' ? 'bg-emerald-500' :
                  service.title === 'Web Development' ? 'bg-blue-500' :
                  service.title === 'Mobile Apps' ? 'bg-cyan-500' :
                  service.title === 'Custom Software' ? 'bg-primary' :
                  service.title === '3D Art & Animation' ? 'bg-amber-500' :
                  'bg-purple-500'
                }`}></div>
 
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 bg-white/5 border border-white/10 text-white/80 group-hover:text-white transition-colors`}>
                  <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                </div>
 
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-8">{service.description}</p>
 
                <ul className="space-y-3 mb-10">
                  {service.features?.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/60 group-hover:text-white/80 transition-colors text-xs font-medium">
                      <div className="size-1 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></div>
                      {feat}
                    </li>
                  ))}
                </ul>
 
                <Link to="/contact" className={`mt-auto flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all group/link ${
                  service.title === 'AI Integration' ? 'text-rose-400' :
                  service.title === 'AI Calling Agents' ? 'text-green-400' :
                  service.title === 'n8n Automation' ? 'text-orange-400' :
                  service.title === 'WhatsApp Automation' ? 'text-emerald-400' :
                  service.title === 'Web Development' ? 'text-blue-400' :
                  service.title === 'Mobile Apps' ? 'text-cyan-400' :
                  service.title === 'Custom Software' ? 'text-primary' :
                  service.title === '3D Art & Animation' ? 'text-amber-400' :
                  'text-purple-400'
                }`}>
                  Get Started
                  <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
