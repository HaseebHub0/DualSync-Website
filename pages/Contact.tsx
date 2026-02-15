
import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import FAQ from '../components/FAQ';

const Contact: React.FC = () => {
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
      // Prepare form data for Web3Forms
      const web3FormsData = new FormData();
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

      // Check if access key is configured
      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        console.error('Web3Forms access key is not configured. Please add it to .env.local');
        throw new Error('Access key not configured');
      }

      web3FormsData.append('access_key', accessKey);
      web3FormsData.append('name', formData.name);
      web3FormsData.append('email', formData.email);
      web3FormsData.append('subject', `🚀 New Project Inquiry: ${formData.projectType}`);
      web3FormsData.append('from_name', 'DualSync Agency Website');

      // Professional HTML email template
      const emailHTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:#333;margin:0;padding:0;background-color:#f4f4f4}
.container{max-width:600px;margin:20px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
.header{background:linear-gradient(135deg,#122017 0%,#1a2e22 100%);padding:30px;text-align:center;border-bottom:4px solid #38e07b}
.logo{font-size:28px;font-weight:bold;color:#fff;margin:0}.logo-accent{color:#38e07b}
.badge{display:inline-block;background:#38e07b;color:#122017;padding:6px 16px;border-radius:20px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin-top:10px}
.content{padding:40px 30px}.greeting{font-size:18px;color:#122017;font-weight:600;margin-bottom:20px}
.info-section{margin-bottom:30px}.info-label{font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#38e07b;margin-bottom:8px}
.info-value{background:#f8f9fa;padding:14px 18px;border-radius:8px;border-left:3px solid #38e07b;font-size:15px;color:#122017;word-wrap:break-word}
.message-box{background:linear-gradient(135deg,#f8f9fa 0%,#fff 100%);padding:20px;border-radius:10px;border:1px solid #e9ecef;margin-top:10px}
.message-text{color:#333;font-size:15px;line-height:1.8;white-space:pre-wrap}
.divider{height:1px;background:linear-gradient(90deg,transparent,#e9ecef,transparent);margin:30px 0}
.footer{background:#122017;padding:25px;text-align:center}.footer-text{color:#fff;font-size:13px;margin:5px 0}
.footer-link{color:#38e07b;text-decoration:none;font-weight:600}
.timestamp{background:#fff3cd;color:#856404;padding:10px 15px;border-radius:6px;font-size:12px;text-align:center;margin-bottom:20px;border-left:3px solid #ffc107}
.priority{background:linear-gradient(135deg,#38e07b 0%,#2bc76b 100%);color:#fff;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:bold;text-transform:uppercase;display:inline-block;margin-bottom:20px}
.btn{display:inline-block;background:#38e07b;color:#122017;padding:14px 30px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;margin:5px}
</style></head><body>
<div class="container">
<div class="header"><div class="logo">Dual<span class="logo-accent">Sync</span> Agency</div><div class="badge">New Inquiry</div></div>
<div class="content">
<div class="priority">⚡ Priority: Immediate Review Required</div>
<div class="greeting">New Project Inquiry Received!</div>
<div class="timestamp">📅 Received: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
<div class="info-section"><div class="info-label">👤 Client Name</div><div class="info-value">${formData.name}</div></div>
<div class="info-section"><div class="info-label">📧 Email Address</div><div class="info-value"><a href="mailto:${formData.email}" style="color:#38e07b;text-decoration:none;font-weight:600">${formData.email}</a></div></div>
<div class="info-section"><div class="info-label">🎯 Project Type</div><div class="info-value">${formData.projectType}</div></div>
<div class="divider"></div>
<div class="info-section"><div class="info-label">💬 Project Details & Message</div><div class="message-box"><div class="message-text">${formData.message}</div></div></div>
<div class="divider"></div>
<div style="text-align:center;margin-top:30px"><a href="mailto:${formData.email}?subject=Re: ${formData.projectType}" class="btn">📧 Reply Now</a></div>
</div>
<div class="footer"><div class="footer-text">DualSync Agency - Contact Form Submission</div><div class="footer-text">📍 <a href="https://dualsyncagency.com" class="footer-link">dualsyncagency.com</a></div><div class="footer-text" style="margin-top:15px;color:#38e07b;font-size:12px">Founder-led. Code-driven.</div></div>
</div></body></html>`;

      web3FormsData.append('message', emailHTML);
      web3FormsData.append('redirect', 'false');

      // Send to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormsData
      });

      const result = await response.json();

      if (result.success) {
        setConfirmationId(Math.random().toString(36).substr(2, 9).toUpperCase());
        setStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          projectType: 'Full Website Development',
          message: ''
        });
      } else {
        console.error('Web3Forms API Error:', result);
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error("Transmission failed:", error);
      setStatus('error');
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
