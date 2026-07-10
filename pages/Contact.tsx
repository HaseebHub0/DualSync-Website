
import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import FAQ from '../components/FAQ';
import { useSEO } from '../hooks/useSEO';

const Contact: React.FC = () => {
  useSEO({
    title: 'Contact DualSync Agency | Start Your Project Today',
    description: 'Ready to build your ERP system or AI agent? Contact DualSync Agency directly. Talk to the technical founders who will design and build your solution.',
    canonical: '/contact',
    keywords: 'Contact DualSync, Hire ERP Developer, AI Agent Agency, Software Project Inquiry Pakistan',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full Website Development',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [confirmationId, setConfirmationId] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        throw new Error('Google Apps Script URL missing. Check .env.local (VITE_GOOGLE_SCRIPT_URL)');
      }

      const response = await fetch(scriptUrl, {
        method: 'POST',
        // Send as plain text to avoid CORS preflight issues with Google Apps Script
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message
        }),
      });

      const result = await response.json();

      if (result.status !== 'success') {
        throw new Error(result.message || 'Error from server');
      }

      setConfirmationId(Math.random().toString(36).substr(2, 9).toUpperCase());
      setStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: 'Full Website Development',
        message: ''
      });
    } catch (error: any) {
      console.error("Transmission failed:", error);
      setStatus('error');
      // Show the exact error text to the user for debugging
      alert(`Transmission Error: ${JSON.stringify(error)}`);
    }
  };

  if (status === 'success') {
    return (
      <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl mx-auto w-full">
          <ScrollReveal>
            <div className="glass-card p-10 md:p-16 rounded-[3rem] border-primary/30 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,224,123,0.1),transparent_70%)]"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-8 animate-float">
                  <span className="material-symbols-outlined text-5xl">task_alt</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Signal Transmitted</h2>
                <p className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-8">Synchronization Initialized</p>

                <div className="w-full h-px bg-white/10 mb-8"></div>

                <div className="text-left w-full space-y-6">
                  <div>
                    <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-2">Status Update</div>
                    <div className="text-white/80 text-lg leading-relaxed italic border-l-2 border-primary/50 pl-6">
                      "Thank you for reaching out! We've received your message and will sync with you soon."
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel p-4 rounded-2xl bg-white/5">
                      <div className="text-white/30 text-[8px] font-bold uppercase mb-1">Confirmation ID</div>
                      <div className="text-white font-mono text-xs">DS-{confirmationId}</div>
                    </div>
                    <div className="glass-panel p-4 rounded-2xl bg-white/5">
                      <div className="text-white/30 text-[8px] font-bold uppercase mb-1">Priority Status</div>
                      <div className="text-primary font-bold text-xs uppercase">Founder Review</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStatus('idle')}
                  className="mt-12 text-white/50 hover:text-primary transition-colors text-sm font-bold flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  Send another transmission
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Initialize Sequence</h1>
          <p className="text-white/60 text-lg">Tell us about your vision. We'll handle the reality.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left Column: The Dual Meaning */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden group">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background-dark text-lg font-bold">D</span>
                The Dual Philosophy
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-1 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Vision + Reality</h4>
                    <p className="text-white/60 text-sm leading-relaxed mt-1">
                      We don't just write code; we interpret dreams. "Dual" represents the partnership between your strategic vision and our technical execution.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1 bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Design + Engineering</h4>
                    <p className="text-white/60 text-sm leading-relaxed mt-1">
                      A beautiful product that doesn't work is art. A functional product that's ugly is a tool. We build <strong>Experiences</strong> by syncing both.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[2.5rem] flex items-center justify-between">
              <div>
                <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Direct Line</div>
                <div className="text-white text-xl font-bold">info@dualsyncagency.com</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">mail</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Sync Form */}
          <div className="glass-card p-8 md:p-10 rounded-[3rem] border-t border-white/20 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-primary">sync_alt</span>
              Sync With Us
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-4">Name</label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-background-dark/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-4">Email</label>
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full bg-background-dark/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-4">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-background-dark/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                >
                  <option>Full Website Development</option>
                  <option>Mobile Application</option>
                  <option>UI/UX Design</option>
                  <option>Custom Software Solution</option>
                  <option>AI Calling Agent</option>
                  <option>n8n Workflow Automation</option>
                  <option>WhatsApp Automation</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-4">Message</label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-background-dark/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20 resize-none"
                  placeholder="Tell us about your project goals..."
                ></textarea>
              </div>

              <button
                disabled={status === 'loading'}
                className="w-full bg-primary disabled:bg-primary/50 text-background-dark font-bold text-lg h-14 rounded-2xl hover:bg-white transition-all shadow-[0_0_20px_rgba(56,224,123,0.2)] hover:shadow-[0_0_30px_rgba(56,224,123,0.4)] flex items-center justify-center gap-2 group"
              >
                {status === 'loading' ? (
                  <>
                    <div className="size-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></div>
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Signal</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-xs text-center font-bold">Transmission failed. Please check your signal and try again.</p>
              )}
            </form>
          </div>

        </div>

        {/* FAQ Section Integrated into Contact Page */}
        <FAQ />
      </div>
    </div>
  );
};

export default Contact;
