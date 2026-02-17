
import React from 'react';
import { TeamMember } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import Testimonials from '../components/Testimonials';

const team: TeamMember[] = [
  {
    name: "Muhammad Haseeb",
    role: "Founder & CEO",
    bio: "A visionary developer and designer at the intersection of AI and Product Design. I specialize in building high-end ERP systems and autonomous AI agents that transform business operations. My focus is on blending aesthetic marketing design with complex technical logic to create products that are not just functional, but market-disrupting.",
    image: "/assets/haseeb.jpeg",
    linkedin: "https://www.linkedin.com/in/muhammad-haseeb-739884317"
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
  }
];

// ... (rest of the file until the team mapping)

// ... (rest of the file until the team mapping)

const About: React.FC = () => {
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
            { label: "Core Founders", value: "2" },
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

      <Testimonials />

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-8 mb-20" id="team">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Team</h2>
              <p className="text-white/60">Technical experts who are personally involved in every line of code.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="glass-card rounded-[2.5rem] p-5 group h-full hover:border-primary/20 transition-all">
                  <div className="aspect-[4/5] min-h-[350px] rounded-[2rem] overflow-hidden mb-6 relative md:grayscale group-hover:grayscale-0 transition-all duration-700 bg-white/5 border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-10"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      loading="lazy"
                    />

                    {/* Founder Badge */}
                    {member.name === "Muhammad Haseeb" ? (
                      <div className="absolute top-4 right-4 bg-primary text-background-dark text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-1 z-20">
                        <span className="material-symbols-outlined text-xs">verified</span> Lead
                      </div>
                    ) : member.name === "Muhammad Siddique" ? (
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white/10 z-20">
                        Co-Founder
                      </div>
                    ) : null}
                  </div>
                  <div className="px-3 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{member.name}</h3>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-[#0077b5] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-primary text-[10px] font-black mb-4 uppercase tracking-[0.2em]">{member.role}</p>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{member.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
