
import React from 'react';
import { TeamMember } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import Testimonials from '../components/Testimonials';
import { useSEO } from '../hooks/useSEO';


const team: TeamMember[] = [
  {
    name: "Muhammad Haseeb",
    role: "Founder & CEO",
    bio: "A visionary developer and designer at the intersection of AI and Product Design. I specialize in building high-end ERP systems and autonomous AI agents that transform business operations. My focus is on blending aesthetic marketing design with complex technical logic to create products that are not just functional, but market-disrupting.",
    image: "/assets/haseeb.jpeg",
    linkedin: "https://www.linkedin.com/in/muhammad-haseeb-739884317",
    behance: "https://www.behance.net/muhammadhaseeb162"
  },
  {
    name: "Muhammad Siddique",
    role: "Co-Founder & Chief Technology Officer (CTO)",
    bio: "A seasoned Systems Architect with a core expertise in Django backend development and high-performance database management. Siddique leads our technical infrastructure and client acquisition strategy. He is responsible for ensuring that our enterprise-level solutions are scalable, secure, and engineered to handle high-traffic business demands.",
    image: "/assets/siddique.jpeg",
    linkedin: "https://www.linkedin.com/in/muhammad-siddique-88aa98284/"
  },
  {
    name: "Kiran Haroon",
    role: "Video Editor & Social Media Manager",
    bio: "The creative force behind DualSync's digital presence. Kiran blends storytelling with visual artistry to craft compelling narratives that resonate with our audience. She manages our social channels and produces high-impact video content that showcases our technological milestones due to her privacy concerns face is hidden.",
    image: "/assets/kiran.jpeg",
    linkedin: "https://www.linkedin.com/in/kiran-haroon-18b840354/"
  },
  {
    name: "Sajid Rahim",
    role: "3D Artist & Animator",
    bio: "The visual dimension of DualSync. Sajid brings ideas to life in three dimensions — from hyper-realistic product renders and character animation to game-ready 3D assets built in Unreal Engine. His work sits at the intersection of art and technical precision, delivering cinematic quality for products, brands, and interactive experiences.",
    image: "/assets/sajid.jpeg",
    behance: "https://www.behance.net/MotionstudioArts"
  }
];

// ... (rest of the file until the team mapping)

// ... (rest of the file until the team mapping)

const About: React.FC = () => {
  useSEO({
    title: 'About DualSync | Founder-Led Software Engineering Team',
    description: 'Meet the DualSync team — Muhammad Haseeb (Founder & CEO), Muhammad Siddique (CTO), Kiran Haroon, and Sajid Rahim. A hands-on technical team building ERP systems and AI agents.',
    canonical: '/about',
    keywords: 'DualSync Team, Muhammad Haseeb, Muhammad Siddique, Software Engineering Team, ERP Founders, AI Agency Pakistan',
  });

  return (
    <div className="pt-44 pb-20">
      {/* Header */}
      {/* Header / DNA Section */}
      <section className="px-4 sm:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-widest">Our DNA</div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                  Founder-led. <span className="text-primary">Code-driven</span>.
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  We are a hands-on technical team. When you partner with DualSync, you talk directly to the founders who are designing your architecture and writing your code.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-10"></div>
                  <img
                    src="/assets/founder_and_cofounder_together.jpeg"
                    alt="Founders of DualSync"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-8 mb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Years Experience", value: "3+" },
            { label: "Successful Projects", value: "10+" },
            { label: "Team Members", value: "4" },
            { label: "AI Optimized", value: "100%" }
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="glass-panel p-8 rounded-3xl text-center h-full flex flex-col justify-center border-white/10 hover:border-primary/30 transition-colors">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* The AI & Technical Edge */}
      <section className="px-4 sm:px-8 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass-card p-10 rounded-[2.5rem] border-white/5 h-full relative overflow-hidden group">
                <span className="material-symbols-outlined text-primary text-5xl mb-6 group-hover:rotate-180 transition-transform duration-700">psychology</span>
                <h3 className="text-2xl font-bold text-white mb-4">AI-Accelerated Workflow</h3>
                <p className="text-white/80 leading-relaxed">
                  We use AI to bridge the gap between vision and reality. By automating boilerplate and streamlining debugging, we focus 100% of our energy on your unique business logic, delivering high-end systems at startup speed.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass-card p-10 rounded-[2.5rem] border-white/5 h-full relative overflow-hidden group">
                <span className="material-symbols-outlined text-primary text-5xl mb-6 group-hover:scale-110 transition-transform duration-700">database</span>
                <h3 className="text-2xl font-bold text-white mb-4">Enterprise Data Layers</h3>
                <p className="text-white/80 leading-relaxed">
                  Our systems, like <strong>PaFood</strong>, are built on robust <strong>PostgreSQL</strong> foundations. We specialize in cross-platform data synchronization, ensuring your web dashboards and mobile apps stay in perfect sync across multiple user roles.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* DualSync Studio Gallery */}
      <section className="px-4 sm:px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Inside the Lab</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">DualSync Studio</h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                A high-end environment engineered for deep work. From architecture design to final deployment, this is where your systems come to life.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
            {[
              { src: "/assets/me_at_work.jpeg", title: "Lead Architect", span: "lg:col-span-2 lg:row-span-2", alt: "Founder at work" },
              { src: "/assets/workplace4.jpeg", title: "Workstation 01", span: "lg:row-span-1", alt: "DualSync Workplace" },
              { src: "/assets/workplace5.jpeg", title: "Studio View", span: "lg:row-span-2", alt: "DualSync Studio" },
              { src: "/assets/workplace1.jpeg", title: "The Hardware", span: "lg:row-span-1", alt: "Workplace Setup" },
              { src: "/assets/workplace6.jpeg", title: "Logic Mapping", span: "lg:col-span-2 lg:row-span-1", alt: "System Architecture" },
              { src: "/assets/work.jpeg", title: "Late Night Sprints", span: "lg:row-span-1", alt: "Work session" },
              { src: "/assets/workplace7.jpeg", title: "Focus Zone", span: "lg:col-span-2 lg:row-span-2", alt: "Detailed workplace" },
              { src: "/assets/workplace2.jpeg", title: "System Design", span: "lg:row-span-1", alt: "Workspace Detail" },
              { src: "/assets/work_2.jpeg", title: "Collaboration", span: "lg:row-span-1", alt: "Pair Programming" },
              { src: "/assets/workplace8.jpeg", title: "Technical Edge", span: "lg:row-span-1", alt: "DualSync Studio Closeup" },
              { src: "/assets/workplace9.jpeg", title: "Final Sprints", span: "lg:row-span-1", alt: "Development Workflow" },
              { src: "/assets/workplace3.jpeg", title: "Infrastructure", span: "lg:col-span-2 lg:row-span-1", alt: "Architecture Setup" },

            ].map((img, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className={`glass-card p-2 rounded-[2rem] border-white/5 relative overflow-hidden group h-full ${img.span}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 flex items-end p-8">
                    <div>
                      <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-1 block">DualSync Studio</span>
                      <p className="text-white font-bold text-lg">{img.title}</p>
                    </div>
                  </div>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded-[1.5rem] grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partnership Section */}
      <section className="px-4 sm:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="glass-card rounded-[3rem] p-8 md:p-16 border-primary/20 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Our Main Partner</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">DualSync & Pak Asian Foods</h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    For over 3 years, we have been the primary technical architects for <strong>Pak Asian Foods</strong>. We maintain the <strong>PaFood</strong> ecosystem and manage <strong>PakAsianShop.com</strong>, providing a seamless bridge between digital storefronts and physical logistics.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    This is a long-term technical marriage where we grow as our partner grows.
                  </p>
                </div>
                <div className="bg-white/5 rounded-[2.5rem] p-12 border border-white/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,224,123,0.1),transparent_70%)]"></div>
                  <img
                    src="https://pakasianshop.com/logo.webp"
                    alt="Pak Asian Foods"
                    className="h-24 md:h-36 object-contain relative z-10 filter drop-shadow-[0_0_30px_rgba(56,224,123,0.4)]"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Testimonials />      {/* Team Bento Grid */}
      <section className="py-20 px-4 sm:px-8 mb-20" id="team">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Team</h2>
              <p className="text-white/60">Technical experts who are personally involved in every line of code.</p>
            </div>
          </ScrollReveal>

          {/* Bento Grid: 3 cols on lg */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows: '320px' }}>

            {/* ── Founder: col-span-2 × row-span-2 ── */}
            <ScrollReveal className="md:col-span-2 md:row-span-2">
              <div className="glass-card rounded-[2.5rem] overflow-hidden relative group hover:border-primary/20 transition-all h-full">
                {/* Full-bleed image */}
                <div className="absolute inset-0 md:grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img
                    src="/assets/haseeb.jpeg"
                    alt="Muhammad Haseeb"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-10" />
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 z-10" />

                {/* Badge */}
                <div className="absolute top-5 right-5 bg-primary text-background-dark text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-1 z-30">
                  <span className="material-symbols-outlined text-xs">verified</span> Founder & Lead
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-2">Founder & CEO</p>
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-3 group-hover:text-primary transition-colors">Muhammad Haseeb</h3>
                      <p className="text-white/70 text-sm leading-relaxed max-w-lg line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                        A visionary developer and designer at the intersection of AI and Product Design. I specialize in building high-end ERP systems and autonomous AI agents that transform business operations.
                      </p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                      <a href="https://www.linkedin.com/in/muhammad-haseeb-739884317" target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/10 hover:bg-[#0077b5]/20 hover:border-[#0077b5]/40 flex items-center justify-center text-white/50 hover:text-[#0077b5] transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                      </a>
                      <a href="https://www.behance.net/muhammadhaseeb162" target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/10 hover:bg-[#1769ff]/20 hover:border-[#1769ff]/40 flex items-center justify-center text-white/50 hover:text-[#1769ff] transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Siddique: col 3, row 1 ── */}
            <ScrollReveal delay={150}>
              <div className="glass-card rounded-[2.5rem] overflow-hidden relative group hover:border-primary/20 transition-all h-full">
                <div className="absolute inset-0 md:grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src="/assets/siddique.jpeg" alt="Muhammad Siddique" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent z-10" />
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white/10 z-20">Co-Founder</div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                  <p className="text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-1">Co-Founder & CTO</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Muhammad Siddique</h3>
                    <a href="https://www.linkedin.com/in/muhammad-siddique-88aa98284/" target="_blank" rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#0077b5] transition-colors flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                    </a>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed mt-2 line-clamp-2">Systems Architect. Django backend & high-performance database specialist.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Kiran: col 3, row 2 ── */}
            <ScrollReveal delay={250}>
              <div className="glass-card rounded-[2.5rem] overflow-hidden relative group hover:border-primary/20 transition-all h-full">
                <div className="absolute inset-0 md:grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src="/assets/kiran.jpeg" alt="Kiran Haroon" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent z-10" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                  <p className="text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-1">Video Editor & Social Media</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Kiran Haroon</h3>
                    <a href="https://www.linkedin.com/in/kiran-haroon-18b840354/" target="_blank" rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#0077b5] transition-colors flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                    </a>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed mt-2 line-clamp-2">Creative force behind DualSync's digital presence & social channels.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Sajid: full-width horizontal card (col-span-3, row 1) ── */}
            <ScrollReveal delay={350} className="md:col-span-3">
              <div className="glass-card rounded-[2.5rem] overflow-hidden relative group hover:border-amber-500/20 transition-all h-full flex flex-col md:flex-row">
                {/* Side image panel */}
                <div className="md:w-72 lg:w-96 flex-shrink-0 relative overflow-hidden" style={{ height: '320px' }}>
                  <div className="absolute inset-0 md:grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="/assets/sajid.jpeg" alt="Sajid Rahim" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background-dark/60 z-10 hidden md:block" />
                </div>
                {/* Text content */}
                <div className="flex-1 flex flex-col justify-center p-8 md:p-10 relative z-10">
                  <div className="absolute top-5 right-5 bg-amber-500/20 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-amber-500/30">3D & VFX</div>
                  <p className="text-amber-400 text-[9px] font-black uppercase tracking-[0.25em] mb-3">3D Artist & Animator</p>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-amber-400 transition-colors">Sajid Rahim</h3>
                    <a href="https://www.behance.net/MotionstudioArts" target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 border border-white/10 hover:bg-[#1769ff]/20 hover:border-[#1769ff]/40 flex items-center justify-center text-white/50 hover:text-[#1769ff] transition-all">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" /></svg>
                    </a>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
                    The visual dimension of DualSync. Sajid brings ideas to life in three dimensions — from hyper-realistic product renders and character animation to game-ready 3D assets built in Unreal Engine. His work sits at the intersection of art and technical precision, delivering cinematic quality for products, brands, and interactive experiences.
                  </p>
                  {/* Skill chips */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {['Unreal Engine', '3D Animation', 'Product Renders', 'Character Design', 'VFX'].map(skill => (
                      <span key={skill} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
