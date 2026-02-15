
import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Roadmap from '../components/Roadmap';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ScrollReveal from '../components/ScrollReveal';
import DeviceFrame from '../components/DeviceFrame';
import PakAsianShopMockup from '../components/PakAsianShopMockup';
import FinanceProMockup from '../components/FinanceProMockup';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      
      {/* Strategic Partner Section */}
      <div className="w-full overflow-hidden py-16 border-y border-white/5 bg-background-dark/30 backdrop-blur-sm relative z-10">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto px-6 text-center mb-10 text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
            Strategic Partner
          </div>
          <div className="flex justify-center items-center px-4">
              <div className="group relative transition-all duration-700 hover:scale-105 cursor-default">
                  <div className="absolute inset-0 bg-primary/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="relative z-10 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] group-hover:border-white/[0.1] transition-colors shadow-2xl backdrop-blur-md">
                    <img 
                        src="https://pakasianshop.com/logo.webp" 
                        alt="Pak Asian Foods" 
                        className="h-20 md:h-28 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(56,224,123,0.3)]" 
                    />
                  </div>
              </div>
          </div>
        </ScrollReveal>
      </div>

      <Services />

      <WhyChooseUs />

      {/* Selected Work Preview */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-20">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Featured Systems</h2>
                <p className="text-white/50 max-w-md">Engineered with precision for Pak Asian Foods and beyond.</p>
              </div>
              <Link to="/work" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group">
                Full Portfolio <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
             {/* Project 1: Finance Pro - Animated */}
             <ScrollReveal delay={100}>
               <div className="group cursor-pointer">
                   <div className="mb-10 flex justify-center md:justify-start">
                      <div className="w-[180px] md:w-[220px]">
                        <DeviceFrame type="mobile" className="group-hover:-translate-y-2 shadow-2xl">
                           <FinanceProMockup />
                        </DeviceFrame>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">FinTech Architecture</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">Finance Pro App</h3>
                      <p className="text-white/50 text-sm leading-relaxed">A specialized ledger system for freelancers to manage clients, track invoices, and analyze revenue growth.</p>
                   </div>
               </div>
             </ScrollReveal>

             {/* Project 2: PakAsianShop - Animated */}
             <ScrollReveal delay={300}>
               <div className="group cursor-pointer pt-0 md:pt-20">
                   <div className="mb-10">
                      <DeviceFrame type="laptop" className="group-hover:-translate-y-2">
                         <PakAsianShopMockup />
                      </DeviceFrame>
                   </div>
                   <div className="space-y-3">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Premium Snack Launch</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">Glorynuts Coated Peanuts</h3>
                      <p className="text-white/50 text-sm leading-relaxed">A high-conversion landing page built for PakAsianShop, showcasing the complete customer journey from shop to delivery.</p>
                   </div>
               </div>
             </ScrollReveal>
          </div>
          
          <div className="mt-20 text-center sm:hidden">
            <Link to="/work" className="inline-flex items-center gap-2 text-primary font-bold transition-all group">
              View All Work <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <Process />

      <Testimonials />

      <FAQ />

      <Roadmap />
    </>
  );
};

export default Home;
