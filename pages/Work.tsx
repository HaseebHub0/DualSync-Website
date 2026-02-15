
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
  }
];

const Work: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-6 uppercase tracking-wider border border-primary/20">
              <span className="material-symbols-outlined text-sm">verified</span>
              10+ Systems Built
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">Systems Built <br />To Scale.</h1>
            <p className="text-xl text-white/60 mb-10 max-w-2xl">
              From multi-role enterprise logistics to high-traffic retail platforms, we've engineered 10+ successful digital systems that run modern businesses.
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${filter === cat
                      ? 'bg-primary text-background-dark border-primary'
                      : 'bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white'
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
            <ScrollReveal key={`${project.title}-${index}`} delay={index * 100}>
              <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                <div className="w-full lg:w-3/5">
                  {project.title.includes("PaFood") ? (
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
                  ) : project.title.includes("PakAsianShop") ? (
                    <div className="group">
                      <DeviceFrame type="laptop">
                        <PakAsianShopMockup />
                      </DeviceFrame>
                    </div>
                  ) : project.title.includes("Finance Pro") ? (
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
                        src={project.image}
                        type="laptop"
                        alt={project.title}
                        className="group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-2/5 flex flex-col">
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h3>
                  </div>

                  <p className="text-white/50 leading-relaxed text-lg mb-8">{project.description}</p>

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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
