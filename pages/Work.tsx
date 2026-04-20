
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import DeviceFrame from '../components/DeviceFrame';
import PakAsianShopMockup from '../components/PakAsianShopMockup';
import FinanceProMockup from '../components/FinanceProMockup';
import PaFoodMockup from '../components/PaFoodMockup';
import { useSEO } from '../hooks/useSEO';


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
    title: "Multan Munch: Brand Storefront",
    category: "Premium E-Commerce",
    deviceType: "laptop",
    description: "A vibrant, high-energy e-commerce experience for Multan Munch. Designed to capture the 'Asli Crunch' of the brand with bold typography, playful animations, and a seamless shopping flow that brings local flavours to a digital audience.",
    image: "/assets/images/WhatsApp Image 2026-02-20 at 2.19.11 PM.jpeg",
    tags: ["E-Commerce", "Brand Storytelling", "Fast Checkout", "by Haseeb"]
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
    title: "Business Pro Template",
    category: "Websites",
    deviceType: "laptop",
    description: "A premium, ready-to-launch business website template. Fully responsive with a modern design, smooth animations, and a professional layout — just add your content and go live.",
    image: "/assets/images/WhatsApp Image 2026-02-19 at 12.41.46 PM.jpeg",
    tags: ["Ready-Made", "Business", "Responsive", "by Haseeb"]
  },
  {
    title: "E-Commerce Starter Template",
    category: "Websites",
    deviceType: "laptop",
    description: "A high-converting online store template designed for quick launch. Comes with product pages, cart flow, and a clean UI — everything you need to start selling online immediately.",
    image: "/assets/images/WhatsApp Image 2026-02-19 at 12.46.09 PM.jpeg",
    tags: ["Ready-Made", "E-Commerce", "Store", "by Haseeb"]
  },
  {
    title: "Agency Portfolio Template",
    category: "Websites",
    deviceType: "laptop",
    description: "A sleek, bold portfolio template built for agencies and creatives. Showcases your services, team, and work in a visually stunning layout that converts visitors into clients.",
    image: "/assets/images/WhatsApp Image 2026-02-19 at 12.46.34 PM.jpeg",
    tags: ["Ready-Made", "Portfolio", "Branding", "by Haseeb"]
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
  },
  {
    title: "PakAsian Foods — Social Media",
    category: "Social Media",
    description: "Performance-driven social media content created for Pak Asian Foods. From cinematic product reels to scroll-stopping promotional edits, every piece was crafted to drive engagement and brand recall.",
    image: "/assets/images/social_media_posts/WhatsApp Image 2026-02-19 at 1.21.38 PM.jpeg",
    tags: ["Social Media", "Content Creation", "by Haseeb", "Reels"],
    video: "/assets/Videos/WhatsApp Video 2026-02-19 at 1.22.35 PM.mp4"
  },
  {
    category: "Social Media",
    video: "/assets/Videos/Scene_a_slow_1080p_202602182054.mp4"
  },
  {
    category: "Social Media",
    video: "/assets/Videos/Scene_an_elegant_1080p_202602181939.mp4"
  },
  {
    title: "3D Realistic Animation & Renderings",
    category: "3D Art & Animation",
    description: "A collection of hyper-realistic 3D animations and product renderings crafted with precision. Showcasing character animation, environmental storytelling, and photorealistic lighting workflows built for commercial production.",
    tags: ["3D Modeling", "Character Animation", "Unreal Engine", "Product Viz", "by Sajid"],
  },
  {
    title: "Character Design & Rigging",
    category: "3D Art & Animation",
    description: "Original character concepts brought into full 3D — complete with topology-clean meshes, advanced rigs, and expressive animation cycles ready for games or film production.",
    tags: ["Character Design", "Rigging", "Game-Ready Assets", "by Sajid"],
  },
  {
    title: "Product Visualization",
    category: "3D Art & Animation",
    description: "Photorealistic 3D product renders with cinematic lighting and material precision. Ideal for e-commerce, brand campaigns, and launch materials that need to stand out.",
    tags: ["Product Visualization", "Texturing", "Lighting", "by Sajid"],
  },
  {
    title: "Environment Art & Game Assets",
    category: "3D Art & Animation",
    description: "High-fidelity environment art and game-ready 3D assets. From modular kits to full scene compositions, built for Unreal Engine pipelines with optimized poly counts.",
    tags: ["Environment Art", "Game Assets", "Unreal Engine", "Texturing", "by Sajid"],
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Work: React.FC = () => {
  const [filter, setFilter] = useState("Websites");
  useSEO({
    title: 'Our Work | DualSync Agency — ERP, Apps & Creative Productions',
    description: 'Explore DualSync\'s portfolio: PaFood ERP ecosystem, PakAsianShop e-commerce, Finance Pro mobile app, 3D animations, and social media campaigns.',
    canonical: '/work',
    keywords: 'DualSync Portfolio, ERP Case Study, PaFood, PakAsianShop, React Native App, 3D Animation Portfolio',
  });


  const categories = Array.from(new Set(projects.map(p => p.category)));
  const filteredProjects = projects.filter(p => p.category === filter);

  return (
    <div className="pt-44 pb-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-24 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-6 uppercase tracking-wider border border-primary/20">
              <span className="material-symbols-outlined text-sm">verified</span>
              18+ Productions Completed
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
              Systems &amp; Story <br />Synced.
            </h1>
            <p className="text-lg text-white/60 mb-12 max-w-xl leading-relaxed">
              From multi-role enterprise logistics to high-end cinematic productions, we engineer the systems that power businesses and the stories that define them.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors border ${filter === cat
                    ? 'text-background-dark border-transparent'
                    : 'bg-transparent text-white/50 border-white/10 hover:border-white/20 hover:text-white/80'
                    }`}
                >
                  {filter === cat && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tab Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >

            {/* ── WEBSITES TAB ── */}
            {filter === "Websites" && (
              <div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-14">
                  <div className="flex items-center gap-4 flex-grow">
                    <span className="h-px bg-white/10 flex-grow hidden md:block"></span>
                    <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-bold whitespace-nowrap">Ready-Made Website Templates</span>
                    <span className="h-px bg-white/10 flex-grow"></span>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
                    Available for Purchase
                  </span>
                </div>

                <p className="text-white/35 text-sm text-center max-w-xl mx-auto mb-16 leading-relaxed">
                  Professionally designed website templates built in-house by DualSync. Purchase one and we'll customise it with your brand, content, and domain — ready to launch fast.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={`website-${index}`}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      className="group flex flex-col gap-5"
                    >
                      <div className="w-full group-hover:scale-[1.02] transition-transform duration-500 relative">
                        <DeviceFrame src={project.image} type="laptop" alt={project.title || 'Website Template'} />
                        <span className="absolute top-2 right-2 z-30 px-2 py-0.5 rounded-full bg-green-500/90 text-black text-[9px] font-black uppercase tracking-widest shadow-lg">
                          Available
                        </span>
                      </div>
                      <div>
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-medium uppercase tracking-widest">
                          Template
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-white mt-3 mb-2 leading-tight">{project.title}</h3>
                        <p className="text-white/45 text-sm leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags?.map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-white/5 rounded-full text-white/30 text-xs border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── MAIN PROJECT TABS (Logistics / E-Commerce / FinTech) ── */}
            {filter !== "Websites" && filter !== "Social Media" && filter !== "Creative Production" && filter !== "3D Art & Animation" && (
              <div className="flex flex-col gap-36">
                {filteredProjects.filter(p => !p.video).map((project, index) => (
                  <ScrollReveal key={`${project.title}-${index}`} delay={index * 80}>
                    <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-24">
                      <div className="w-full lg:w-3/5">
                        {project.title?.includes("PaFood") ? (
                          <div className="relative group flex items-center justify-center py-10 px-4">
                            <div className="w-full max-w-[540px] opacity-90 group-hover:opacity-100 transition-opacity">
                              <DeviceFrame type="laptop">
                                <PaFoodMockup viewType="laptop" />
                              </DeviceFrame>
                            </div>
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

                      <div className="w-full lg:w-2/5 md:text-left">
                        <div className="flex items-center gap-4 mb-5">
                          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium uppercase tracking-widest backdrop-blur-md">
                            {project.category}
                          </span>
                          {project.title === "PaFood: ERP & Sales Ecosystem" && (
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
                              Live Enterprise
                            </span>
                          )}
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">{project.title}</h3>
                        <p className="text-white/55 text-base leading-relaxed mb-8">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags?.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-white/35 text-sm border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button className="group flex items-center gap-2 text-white/70 font-medium hover:text-primary transition-colors text-sm">
                          <span className="border-b border-white/20 group-hover:border-primary pb-0.5">View Case Study</span>
                          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* ── SOCIAL MEDIA TAB ── */}
            {filter === "Social Media" && (
              <div>
                <div className="flex items-center gap-4 mb-16">
                  <span className="h-px bg-white/10 flex-grow"></span>
                  <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-bold">Social Media Content</span>
                  <span className="h-px bg-white/10 flex-grow"></span>
                </div>

                {filteredProjects.filter(p => p.title).map((project, index) => (
                  <ScrollReveal key={`sm-featured-${index}`}>
                    <div className="flex flex-col md:flex-row gap-12 mb-20 items-center">
                      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                        <img
                          src={project.image}
                          alt={project.title || 'Social Media Posts'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-5">
                          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium uppercase tracking-widest">
                            Social Media
                          </span>
                          <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
                            Live Campaign
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">{project.title}</h3>
                        <p className="text-white/55 text-base leading-relaxed mb-8">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-white/35 text-sm border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}

                <div className="flex items-center gap-4 mb-10">
                  <span className="h-px bg-white/10 flex-grow"></span>
                  <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-bold">Reels &amp; Edits</span>
                  <span className="h-px bg-white/10 flex-grow"></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredProjects.filter(p => p.video).map((project, index) => (
                    <motion.div
                      key={`sm-video-${index}`}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      className="relative group rounded-2xl overflow-hidden border border-white/5 bg-black shadow-xl"
                    >
                      <video
                        className="w-full object-cover aspect-[9/16] md:aspect-[4/5]"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                      >
                        <source src={project.video} type="video/mp4" />
                      </video>
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-white/80 text-[8px] font-bold uppercase tracking-widest">
                          by Haseeb
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CREATIVE PRODUCTION TAB ── */}
            {filter === "Creative Production" && (
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <span className="h-px bg-white/10 flex-grow"></span>
                  <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-bold">Creative Productions</span>
                  <span className="h-px bg-white/10 flex-grow"></span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projects.filter(p => p.category === "Creative Production" && p.video).map((project, index) => (
                    <motion.div
                      key={`video-${index}`}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      className="relative group rounded-xl overflow-hidden border border-white/5 bg-black shadow-md"
                    >
                      <video
                        className="w-full object-cover aspect-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                      >
                        <source src={project.video} type="video/mp4" />
                      </video>
                      <div className="absolute top-2 left-2 z-20">
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-white/70 text-[7px] font-bold uppercase tracking-widest">
                          by Kiran Haroon
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 3D ART & ANIMATION TAB ── */}
            {filter === "3D Art & Animation" && (
              <div>
                <div className="flex items-center gap-4 mb-16">
                  <span className="h-px bg-white/10 flex-grow"></span>
                  <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-bold">3D Art &amp; Animation</span>
                  <span className="h-px bg-white/10 flex-grow"></span>
                </div>

                {/* Behance showcase hero */}
                <ScrollReveal>
                  <a
                    href="https://www.behance.net/gallery/205183763/3D-Realistic-Animation-And-Renderings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block mb-16"
                  >
                    <div className="glass-card rounded-[2.5rem] p-8 md:p-14 border-amber-500/20 relative overflow-hidden hover:border-amber-500/40 transition-all duration-500">
                      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full group-hover:bg-amber-500/20 transition-colors duration-1000 pointer-events-none"></div>
                      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-5">
                            <span className="material-symbols-outlined text-amber-400 text-2xl">view_in_ar</span>
                            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
                              Live on Behance
                            </span>
                          </div>
                          <h3 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight group-hover:text-amber-400 transition-colors">
                            3D Realistic Animation<br />& Renderings
                          </h3>
                          <p className="text-white/55 text-base leading-relaxed max-w-xl">
                            Sajid Rahim's full production showcase — hyper-realistic 3D animations, character work, and photorealistic renders. View the complete portfolio on Behance.
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-amber-400 font-black text-sm uppercase tracking-widest shrink-0">
                          <span>View Portfolio</span>
                          <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>

                {/* Work type cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={`3d-${index}`}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-amber-500/20 transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="absolute top-6 right-8 text-6xl font-black text-white/[0.03] select-none group-hover:text-amber-500/[0.06] transition-colors">
                        0{index + 1}
                      </div>
                      <div className="relative z-10">
                        <span className="material-symbols-outlined text-amber-400/60 text-3xl mb-5 block group-hover:text-amber-400 transition-colors">view_in_ar</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/55 text-sm leading-relaxed mb-6">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-white/35 text-xs border border-white/5 group-hover:border-amber-500/10 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Artist attribution footer */}
                <ScrollReveal>
                  <div className="mt-16 flex items-center justify-center gap-6">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <div className="flex items-center gap-4">
                      <img
                        src="/assets/sajid_rahim.jpeg"
                        alt="Sajid Rahim"
                        className="w-10 h-10 rounded-full object-cover border border-amber-500/30 grayscale"
                      />
                      <div>
                        <p className="text-white/80 text-sm font-bold">Sajid Rahim</p>
                        <p className="text-amber-400 text-xs uppercase tracking-widest font-bold">3D Artist &amp; Animator</p>
                      </div>
                    </div>
                    <div className="h-px bg-white/10 flex-grow"></div>
                  </div>
                </ScrollReveal>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Work;
