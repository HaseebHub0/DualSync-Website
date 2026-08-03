import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProjectItem } from '../types';
import PageHero from '../components/v2/PageHero';
import Reveal from '../components/anim/Reveal';
import SplitReveal from '../components/anim/SplitReveal';
import MagneticButton from '../components/ui/MagneticButton';
import Button from '../components/v2/Button';
import DeviceFrame from '../components/DeviceFrame';
import PakAsianShopMockup from '../components/PakAsianShopMockup';
import FinanceProMockup from '../components/FinanceProMockup';
import PaFoodMockup from '../components/PaFoodMockup';
import { useSEO } from '../hooks/useSEO';

const projects: ProjectItem[] = [
  {
    title: 'PaFood: ERP & Sales Ecosystem',
    category: 'Logistics & Enterprise',
    deviceType: 'both',
    description:
      'A mission-critical enterprise system for Pak Asian Foods. Multi-role infrastructure covering the entire supply chain — admin analytics and KPO order verification on the web, live GPS route tracking and target management for field salesmen on mobile. Scalable PostgreSQL core with real-time field-to-office sync.',
    image: 'custom-mockup',
    mobileImage: 'custom-mockup',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Live Tracking', 'ERP'],
  },
  {
    title: 'PakAsianShop: Glorynuts Launch',
    category: 'Premium E-Commerce',
    deviceType: 'laptop',
    description:
      "A high-conversion storefront for the Glorynuts Coated Peanuts line. Vibrant brand identity, a seamless shop-now flow, live order tracking, and tuned for high-traffic product launches.",
    image: 'custom-mockup',
    tags: ['MERN Stack', 'Brand Storytelling', 'Inventory', 'Fast Checkout'],
  },
  {
    title: 'Multan Munch: Brand Storefront',
    category: 'Premium E-Commerce',
    deviceType: 'laptop',
    description:
      "A high-energy e-commerce experience built to capture the brand's 'Asli Crunch' — bold typography, playful motion, and a shopping flow that brings local flavours to a digital audience.",
    image: '/assets/images/WhatsApp Image 2026-02-20 at 2.19.11 PM.jpeg',
    tags: ['E-Commerce', 'Brand Storytelling', 'Fast Checkout', 'by Haseeb'],
  },
  {
    title: 'Finance Pro: Freelance Ledger',
    category: 'FinTech App',
    deviceType: 'mobile',
    description:
      'A personal and freelance financial management app — income tracking, project budgeting, client management, and visual analytics for independent professionals mastering cash flow.',
    image: 'custom-mockup',
    tags: ['React Native', 'Tailwind CSS', 'Data Visualization', 'Budgeting'],
  },
  {
    title: 'Business Pro Template',
    category: 'Websites',
    deviceType: 'laptop',
    description:
      'A premium, ready-to-launch business website template. Fully responsive with a modern layout and smooth motion — add your content and go live.',
    image: '/assets/images/WhatsApp Image 2026-02-19 at 12.41.46 PM.jpeg',
    tags: ['Ready-Made', 'Business', 'Responsive', 'by Haseeb'],
  },
  {
    title: 'E-Commerce Starter Template',
    category: 'Websites',
    deviceType: 'laptop',
    description:
      'A high-converting online store template designed for quick launch — product pages, cart flow, and a clean UI to start selling immediately.',
    image: '/assets/images/WhatsApp Image 2026-02-19 at 12.46.09 PM.jpeg',
    tags: ['Ready-Made', 'E-Commerce', 'Store', 'by Haseeb'],
  },
  {
    title: 'Agency Portfolio Template',
    category: 'Websites',
    deviceType: 'laptop',
    description:
      'A sleek, bold portfolio template for agencies and creatives — services, team, and work in a layout that converts visitors into clients.',
    image: '/assets/images/WhatsApp Image 2026-02-19 at 12.46.34 PM.jpeg',
    tags: ['Ready-Made', 'Portfolio', 'Branding', 'by Haseeb'],
  },
  { category: 'Creative Production', video: '/assets/Videos/kiran_edit_1.mp4' },
  { category: 'Creative Production', video: '/assets/Videos/kiran_edit_2.mp4' },
  { category: 'Creative Production', video: '/assets/Videos/kiran_edit_3.mp4' },
  { category: 'Creative Production', video: '/assets/Videos/kiran_edit_4.mp4' },
  {
    title: 'PakAsian Foods — Social Media',
    category: 'Social Media',
    description:
      'Performance-driven social content for Pak Asian Foods. Cinematic product reels and scroll-stopping promotional edits, each built to drive engagement and brand recall.',
    image: '/assets/images/social_media_posts/WhatsApp Image 2026-02-19 at 1.21.38 PM.jpeg',
    tags: ['Social Media', 'Content Creation', 'by Haseeb', 'Reels'],
    video: '/assets/Videos/WhatsApp Video 2026-02-19 at 1.22.35 PM.mp4',
  },
  { category: 'Social Media', video: '/assets/Videos/Scene_a_slow_1080p_202602182054.mp4' },
  { category: 'Social Media', video: '/assets/Videos/Scene_an_elegant_1080p_202602181939.mp4' },
  {
    title: '3D Realistic Animation & Renderings',
    category: '3D Art & Animation',
    description:
      'Hyper-realistic 3D animations and product renderings — character animation, environmental storytelling, and photorealistic lighting workflows built for commercial production.',
    tags: ['3D Modeling', 'Character Animation', 'Unreal Engine', 'by Sajid'],
  },
  {
    title: 'Character Design & Rigging',
    category: '3D Art & Animation',
    description:
      'Original character concepts brought into full 3D — topology-clean meshes, advanced rigs, and expressive animation cycles ready for games or film.',
    tags: ['Character Design', 'Rigging', 'Game-Ready Assets', 'by Sajid'],
  },
  {
    title: 'Product Visualization',
    category: '3D Art & Animation',
    description:
      'Photorealistic product renders with cinematic lighting and material precision — for e-commerce, brand campaigns, and launch materials that need to stand out.',
    tags: ['Product Visualization', 'Texturing', 'Lighting', 'by Sajid'],
  },
  {
    title: 'Environment Art & Game Assets',
    category: '3D Art & Animation',
    description:
      'High-fidelity environment art and game-ready assets — from modular kits to full scene compositions, built for Unreal Engine with optimised poly counts.',
    tags: ['Environment Art', 'Game Assets', 'Unreal Engine', 'by Sajid'],
  },
];

/** Renders the right live mockup for the flagship builds, image otherwise. */
const ProjectVisual: React.FC<{ project: ProjectItem; flip: boolean }> = ({ project, flip }) => {
  if (project.title?.includes('PaFood')) {
    return (
      <div className="relative group flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-[540px]">
          <DeviceFrame type="laptop">
            <PaFoodMockup viewType="laptop" />
          </DeviceFrame>
        </div>
        <div
          className={`absolute -bottom-8 z-20 w-[100px] md:w-[130px] drop-shadow-[0_20px_60px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-500 ${
            flip ? 'left-0 md:left-[5%]' : 'right-0 md:right-[5%]'
          }`}
        >
          <DeviceFrame type="mobile">
            <PaFoodMockup viewType="mobile" />
          </DeviceFrame>
        </div>
      </div>
    );
  }
  if (project.title?.includes('PakAsianShop')) {
    return (
      <div className="group">
        <DeviceFrame type="laptop">
          <PakAsianShopMockup />
        </DeviceFrame>
      </div>
    );
  }
  if (project.title?.includes('Finance Pro')) {
    return (
      <div className="group flex justify-center py-8">
        <div className="w-[180px] md:w-[220px]">
          <DeviceFrame type="mobile">
            <FinanceProMockup />
          </DeviceFrame>
        </div>
      </div>
    );
  }
  return (
    <div className="group">
      <DeviceFrame
        src={project.image || ''}
        type="laptop"
        alt={project.title || 'Project'}
        className="group-hover:scale-[1.02]"
      />
    </div>
  );
};

const Work: React.FC = () => {
  const [filter, setFilter] = useState('Logistics & Enterprise');
  useSEO({
    title: 'Work | DualSync — Enterprise Systems, Apps & Creative Production',
    description:
      "Explore DualSync's portfolio: the PaFood ERP ecosystem, PakAsianShop e-commerce, Finance Pro mobile app, website templates, 3D animation, and social campaigns.",
    canonical: '/work',
    keywords:
      'DualSync Portfolio, ERP Case Study, PaFood, PakAsianShop, React Native App, 3D Animation Portfolio',
  });

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filtered = projects.filter((p) => p.category === filter);
  const isTemplates = filter === 'Websites';
  const isVideo = filter === 'Social Media' || filter === 'Creative Production';
  const is3D = filter === '3D Art & Animation';
  const isBuilds = !isTemplates && !isVideo && !is3D;

  return (
    <>
      <PageHero
        label="Selected Work"
        title="Systems &"
        titleOutline="story."
        lead="From multi-role enterprise logistics to cinematic production — the systems that run businesses, and the stories that sell them."
        meta={[
          ['Productions', '18+'],
          ['In production', '3'],
        ]}
      />

      {/* Filter rail */}
      <div className="sticky top-20 z-40 border-b border-rule/10 bg-canvas/80 backdrop-blur-xl">
        <div className="max-w-[90rem] mx-auto px-6 sm:px-10">
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative mono-label whitespace-nowrap transition-colors pb-1 ${
                  filter === cat ? 'text-accent' : 'text-ink/60 hover:text-ink/70'
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.span
                    layoutId="work-filter-rule"
                    className="absolute -bottom-[1.35rem] left-0 right-0 h-px bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="px-6 sm:px-10 py-20 md:py-28">
        <div className="max-w-[90rem] mx-auto">
          {/* Keyed remount rather than AnimatePresence: an exit animation that
              stalls under mode="wait" would hold the outgoing tab on screen
              indefinitely, and the wait costs a dead beat before new content. */}
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
              {/* Flagship builds */}
              {isBuilds && (
                <div className="flex flex-col">
                  {filtered
                    .filter((p) => !p.video)
                    .map((project, i) => (
                      <Reveal key={project.title} y={50} delay={i * 0.05}>
                        <article
                          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-14 md:py-20 ${
                            i > 0 ? 'border-t border-rule/10' : ''
                          }`}
                        >
                          <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                            <ProjectVisual project={project} flip={i % 2 === 1} />
                          </div>
                          <div className="lg:col-span-5">
                            <div className="flex items-center gap-4 mb-6">
                              <span className="mono-label text-ink/60">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="mono-label text-accent">{project.category}</span>
                            </div>
                            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl leading-[0.95] mb-6 shine">
                              {project.title}
                            </h2>
                            <p className="text-ink/55 text-base leading-relaxed mb-8 max-w-lg">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-6 border-t border-rule/10">
                              {project.tags?.map((tag) => (
                                <span key={tag} className="mono-label text-ink/60">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                </div>
              )}

              {/* Ready-made templates */}
              {isTemplates && (
                <div>
                  <Reveal y={24}>
                    <div className="flex flex-wrap items-end justify-between gap-6 pb-8 mb-12 border-b border-rule/10">
                      <div>
                        <div className="mono-label text-accent mb-3">Available for purchase</div>
                        <p className="text-ink/50 text-sm max-w-lg leading-relaxed">
                          Templates designed in-house. Buy one and we customise it
                          with your brand, content, and domain — live fast.
                        </p>
                      </div>
                      <span className="mono-label text-ink/60">{filtered.length} available</span>
                    </div>
                  </Reveal>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filtered.map((project, i) => (
                      <Reveal key={project.title} y={40} delay={i * 0.06}>
                        <article className="group flex flex-col gap-5">
                          <div className="border border-rule/10 group-hover:border-primary/40 transition-colors p-4 bg-surface/[0.02] relative">
                            <DeviceFrame
                              src={project.image}
                              type="laptop"
                              alt={project.title || 'Template'}
                            />
                            <span className="absolute top-3 right-3 z-30 mono-label bg-primary text-background-dark px-2 py-1">
                              Available
                            </span>
                          </div>
                          <div>
                            <h3 className="font-display font-bold tracking-tight text-ink text-lg md:text-xl group-hover:text-accent transition-colors mb-3">
                              {project.title}
                            </h3>
                            <p className="text-ink/50 text-sm leading-relaxed mb-4">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                              {project.tags?.map((tag) => (
                                <span key={tag} className="mono-label text-ink/60">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {/* Video work */}
              {isVideo && (
                <div>
                  {filtered
                    .filter((p) => p.title)
                    .map((project) => (
                      <Reveal key={project.title} y={40}>
                        <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-16 mb-16 border-b border-rule/10">
                          <div className="lg:col-span-6 border border-rule/10 overflow-hidden group">
                            <img
                              src={project.image}
                              alt={project.title || 'Campaign'}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <div className="lg:col-span-6">
                            <div className="mono-label text-accent mb-6">Live campaign</div>
                            <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-4xl leading-[0.95] mb-6 shine">
                              {project.title}
                            </h2>
                            <p className="text-ink/55 text-base leading-relaxed mb-8">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-6 border-t border-rule/10">
                              {project.tags?.map((tag) => (
                                <span key={tag} className="mono-label text-ink/60">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </article>
                      </Reveal>
                    ))}

                  <Reveal y={20}>
                    <div className="mono-label text-ink/60 mb-8">
                      {filter === 'Social Media' ? 'Reels & edits' : 'Productions'} —{' '}
                      {filter === 'Social Media' ? 'by Haseeb' : 'by Kiran Haroon'}
                    </div>
                  </Reveal>
                  <div
                    className={`grid gap-5 ${
                      filter === 'Social Media'
                        ? 'grid-cols-1 md:grid-cols-3'
                        : 'grid-cols-2 md:grid-cols-4'
                    }`}
                  >
                    {filtered
                      .filter((p) => p.video)
                      .map((project, i) => (
                        <Reveal key={project.video} y={40} delay={i * 0.05}>
                          <div className="relative group border border-rule/10 hover:border-primary/40 transition-colors bg-black overflow-hidden">
                            <video
                              className={`w-full object-cover ${
                                filter === 'Social Media' ? 'aspect-[9/16] md:aspect-[4/5]' : 'aspect-video'
                              }`}
                              muted
                              loop
                              playsInline
                              controls
                              preload="metadata"
                            >
                              <source src={project.video} type="video/mp4" />
                            </video>
                          </div>
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {/* 3D & motion */}
              {is3D && (
                <div>
                  <Reveal y={40}>
                    <a
                      href="https://www.behance.net/gallery/205183763/3D-Realistic-Animation-And-Renderings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border border-rule/10 hover:border-primary/40 transition-colors p-8 md:p-14 mb-16 relative overflow-hidden"
                    >
                      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000 pointer-events-none" />
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex-1">
                          <div className="mono-label text-accent mb-5">Live on Behance</div>
                          <h2 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl leading-[0.95] mb-5 group-hover:text-accent transition-colors shine">
                            3D Realistic Animation
                            <br />&amp; Renderings
                          </h2>
                          <p className="text-ink/55 text-base leading-relaxed max-w-xl">
                            Sajid Rahim’s full production showcase — hyper-realistic
                            animation, character work, and photorealistic renders.
                          </p>
                        </div>
                        <span className="mono-label text-accent flex items-center gap-2 shrink-0">
                          View portfolio
                          <span aria-hidden="true" className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                            north_east
                          </span>
                        </span>
                      </div>
                    </a>
                  </Reveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface/10 border border-rule/10">
                    {filtered.map((project, i) => (
                      <Reveal key={project.title} y={40} delay={i * 0.05}>
                        <div className="group bg-canvas p-8 md:p-10 h-full hover:bg-surface/[0.02] transition-colors">
                          <div className="flex items-start justify-between gap-6 mb-5">
                            <h3 className="font-display font-bold tracking-tight text-ink text-xl md:text-2xl group-hover:text-accent transition-colors">
                              {project.title}
                            </h3>
                            <span className="mono-label text-ink/60 shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <p className="text-ink/50 text-sm leading-relaxed mb-6">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {project.tags?.map((tag) => (
                              <span key={tag} className="mono-label text-ink/60">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal y={20}>
                    <div className="mt-14 flex items-center justify-center gap-5">
                      <span className="h-px bg-surface/10 flex-grow" />
                      <img
                        src="/assets/sajid_rahim.jpeg"
                        alt="Sajid Rahim"
                        loading="lazy"
                        className="size-10 object-cover border border-primary/30 grayscale"
                      />
                      <div>
                        <p className="text-ink text-sm font-bold">Sajid Rahim</p>
                        <p className="mono-label text-accent mt-1">3D Artist &amp; Animator</p>
                      </div>
                      <span className="h-px bg-surface/10 flex-grow" />
                    </div>
                  </Reveal>
                </div>
              )}
          </motion.div>
        </div>
      </section>

      {/* Close */}
      <section className="px-6 sm:px-10 py-28 md:py-40 border-t border-rule/10 text-center relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          <SplitReveal
            as="h2"
            type="words"
            stagger={0.06}
            className="font-display font-black tracking-tighter leading-[0.95] text-ink text-[clamp(2rem,6vw,5rem)] max-w-4xl mx-auto"
          >
            Your system could be next.
          </SplitReveal>
          <Reveal y={24} delay={0.3}>
            <div className="flex justify-center mt-12">
              <MagneticButton strength={0.45}>
                <Button as={Link} to="/contact">
                  Start a project
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50rem] h-[16rem] bg-primary/10 blur-[130px] rounded-full pointer-events-none"
        />
      </section>
    </>
  );
};

export default Work;
