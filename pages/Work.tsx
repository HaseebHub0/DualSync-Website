
import React, { useState } from 'react';
import { ProjectItem } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import DeviceFrame from '../components/DeviceFrame';
import PakAsianShopMockup from '../components/PakAsianShopMockup';
import FinanceProMockup from '../components/FinanceProMockup';
import PaFoodMockup from '../components/PaFoodMockup';

const projects: ProjectItem[] = [
  {
    title: "PaFood: ERP & Sales Ecosystem",
    category: "Logistics & Enterprise",
    deviceType: "both",
    description: "A mission-critical enterprise system built for Pak Asian Foods. This multi-role infrastructure manages the entire supply chain—from Admin analytics and KPO order verification on the web, to live GPS route tracking and target management for field salesmen on mobile. Built with a scalable PostgreSQL core and real-time field-to-office sync.",
    image: "custom-mockup",
    mobileImage: "custom-mockup",
    tags: ["React Native", "Node.js", "PostgreSQL", "Live Tracking", "ERP"]
  },
  {
    title: "PakAsianShop: Glorynuts Launch",
    category: "Premium E-Commerce",
    deviceType: "laptop",
    description: "A specialized high-conversion storefront for the 'Glorynuts Coated Peanuts' line. Designed with a vibrant red brand identity, featuring a seamless 'Shop Now' flow, live order tracking, and optimized for high-traffic snacking industry product launches.",
    image: "custom-mockup",
    tags: ["MERN Stack", "Brand Storytelling", "Inventory Management", "Fast Checkout"]
  },
  {
    title: "Finance Pro: Freelance Ledger",
    category: "FinTech App",
    deviceType: "mobile",
    description: "A specialized personal and freelance financial management app. Features income tracking, project-based budgeting, client management, and visual analytics to help independent professionals master their cash flow.",
    image: "custom-mockup",
    tags: ["React Native", "Tailwind CSS", "Data Visualization", "Budgeting"]
  },
  {
    category: "Creative Production",
    video: "/assets/Videos/kiran_edit_1.mp4"
  },
  {
    category: "Creative Production",
    video: "/assets/Videos/kiran_edit_2.mp4"
  },
  {
    category: "Creative Production",
    video: "/assets/Videos/kiran_edit_3.mp4"
  },
  {
    category: "Creative Production",
    video: "/assets/Videos/kiran_edit_4.mp4"
  }
];

const Work: React.FC = () => {
  const [filter, setFilter] = useState("Logistics & Enterprise");

  const categories = Array.from(new Set(projects.map(p => p.category)));

  const filteredProjects = projects.filter(p => p.category === filter);

  return (
    <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-6 uppercase tracking-wider border border-primary/20">
              <span className="material-symbols-outlined text-sm">verified</span>
              14+ Productions Completed
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">Systems & Story <br />Synced.</h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl">
              From multi-role enterprise logistics to high-end cinematic productions, we engineer the systems that power businesses and the stories that define them.
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${filter === cat
                    ? 'bg-primary text-background-dark border-primary'
                    : 'bg-transparent text-white/80 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-40">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={`${project.title || project.video}-${index}`} delay={index * 100}>
              <div className={`flex flex-col items-center gap-12 ${project.video ? 'w-full' : 'lg:flex-row lg:gap-24'}`}>

                <div className="w-full">
                  {project.video ? (
                    <div className="relative rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                      <video
                        className="w-full h-auto min-h-[400px] md:min-h-[600px] lg:min-h-[700px]"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                      >
                        <source src={project.video} type="video/mp4" />
                      </video>

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                        <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg">
                          DualSync Studio • Kiran Haroon
                        </span>
                      </div>
                    </div>
                  ) : project.title?.includes("PaFood") ? (
                    <div className="relative group flex items-center justify-center py-10 px-4">
                      <div className="w-full max-w-[540px] opacity-90 group-hover:opacity-100 transition-opacity">
                        <DeviceFrame type="laptop">
                          <PaFoodMockup viewType="laptop" />
                        </DeviceFrame>
                      </div>
                      {/* Mobile device frame overlay */}
                      <div className={`absolute -bottom-10 z-20 w-[100px] md:w-[130px] drop-shadow-[0_20px_60px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-500 ${index % 2 === 1 ? 'left-0 md:left-[5%]' : 'right-0 md:right-[5%]'}`}>
                        <DeviceFrame type="mobile">
                          <PaFoodMockup viewType="mobile" />
                        </DeviceFrame>
                      </div>
                    </div>
                  ) : project.title?.includes("PakAsianShop") ? (
                    <div className="group">
                      <DeviceFrame type="laptop">
                        <PakAsianShopMockup />
                      </DeviceFrame>
                    </div>
                  ) : project.title?.includes("Finance Pro") ? (
                    <div className="group flex justify-center py-10">
                      <div className="w-[180px] md:w-[220px]">
                        <DeviceFrame type="mobile">
                          <FinanceProMockup />
                        </DeviceFrame>
                      </div>
                    </div>
                  ) : (
                    <div className="group">
                      <DeviceFrame
                        src={project.image || ''}
                        type="laptop"
                        alt={project.title || 'Project Image'}
                        className="group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                </div>

                {!project.video && (
                  <div className="w-full lg:w-2/5 flex flex-col">
                    <div className="flex flex-col gap-2 mb-6">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">{project.category}</span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h3>
                    </div>

                    <p className="text-white/70 leading-relaxed text-lg mb-8">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-black uppercase tracking-widest text-white/70 border border-white/10 px-4 py-1.5 rounded-full bg-white/5">{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6">
                      <button className="bg-white text-background-dark font-bold px-8 py-3 rounded-full hover:bg-primary transition-all flex items-center gap-2 group/btn">
                        Explore System
                        <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
