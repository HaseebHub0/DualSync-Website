import React from 'react';
import emailjs from '@emailjs/browser';
import { useLocation, Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS not configured');
      }

      // 1. Send Admin Notification
      const adminParams = {
        email: email,
        message: 'New Footer Subscription from ' + email,
        project_type: 'Newsletter Subscription',
        name: 'Subscriber'
      };

      const adminPromise = emailjs.send(serviceId, templateId, adminParams, publicKey);

      // 2. Send Auto-Reply (if configured)
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      let autoReplyPromise = Promise.resolve(null as any);

      if (autoReplyTemplateId) {
        const autoReplyParams = {
          name: 'Subscriber',
          email: email, // This sends it TO the user
          project_type: 'Newsletter'
        };
        autoReplyPromise = emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams, publicKey);
      }

      await Promise.all([adminPromise, autoReplyPromise]);

      setStatus('success');
      setEmail('');
    } catch (e) {
      console.error('EmailJS Error:', e);
      setStatus('error');
    }
  };

  return (
    <footer className="py-20 px-4 sm:px-8 border-t border-white/5" id="contact">
      <div className="max-w-4xl mx-auto text-center">

        {/* Primary close: one unambiguous ask, routed to the real enquiry flow.
            The newsletter is a separate, de-emphasised action below — previously
            this CTA promised a consultation but performed a mailing-list signup. */}
        {!isContactPage && (
          <div className="glass-card rounded-[3rem] p-10 md:p-16 relative overflow-hidden mb-12">
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Tell us what's breaking.</h2>
              <p className="text-white/70 text-lg max-w-lg mx-auto">
                Two questions and your email. One of the founders replies within one business day —
                not a form response, not a sales script.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <Link
                  to="/contact"
                  className="bg-primary text-background-dark font-bold h-12 px-8 rounded-full hover:bg-white transition-all shadow-lg shadow-primary/20 whitespace-nowrap flex items-center justify-center gap-2"
                >
                  Start a project
                </Link>
                <Link
                  to="/work"
                  className="border border-white/10 bg-white/5 text-white font-bold h-12 px-8 rounded-full hover:bg-white/10 transition-all whitespace-nowrap flex items-center justify-center"
                >
                  See the systems
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter — a distinct, lower-commitment action. */}
        <div className="mb-12 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="text-white/50 text-sm sm:text-right sm:max-w-[16rem]">
              <span className="block text-white/70 font-medium">Engineering notes, monthly.</span>
              What we shipped and what broke.
            </div>
            {status === 'success' ? (
              <p role="status" className="text-primary text-sm font-bold px-4">
                Subscribed — check your inbox.
              </p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  className="h-11 px-5 rounded-full bg-background-dark/50 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full sm:w-auto min-w-[240px]"
                  placeholder="you@company.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                  disabled={status === 'loading'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  aria-invalid={status === 'error' || undefined}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                  className="h-11 px-6 rounded-full border border-white/15 text-white text-sm font-bold hover:bg-white/10 transition-all whitespace-nowrap disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending…' : 'Subscribe'}
                </button>
              </div>
            )}
          </div>
          {status === 'error' && (
            <p id="newsletter-error" role="alert" className="text-red-400 text-xs mt-3">
              That didn't go through. Check the address and try again, or email contact@dualsyncagency.com.
            </p>
          )}
        </div>

        {/* Footer Links */}
        <div className={`flex flex-col md:flex-row justify-between items-center text-white/60 text-sm ${isContactPage ? 'pt-0' : 'mt-12'}`}>
          <p>© {new Date().getFullYear()} DualSync. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0">
            <div className="flex gap-6 order-2 md:order-1">
              <Link className="hover:text-primary transition-colors" to="/privacy">Privacy Policy</Link>
              <Link className="hover:text-primary transition-colors" to="/terms">Terms of Service</Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 order-1 md:order-2 mb-4 md:mb-0">
              <a href="https://www.linkedin.com/company/111605636" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="LinkedIn">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://www.behance.net/muhammadhaseeb162" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="Behance">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 16 16"><path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" /></svg>
              </a>
              <a href="https://x.com/DualSync" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="X (Twitter)">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.instagram.com/dualsync.agency/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="Instagram">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19.2,5.6A0.8,0.8 0 0,1 20,4.8A0.8,0.8 0 0,1 19.2,4H19.2A0.8,0.8 0 0,1 18.4,4.8A0.8,0.8 0 0,1 19.2,5.6Z" /></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="Facebook">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@dualsync_pk" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="TikTok">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.99 1.14 2.3 1.94 3.75 2.29v4.03c-1.83-.07-3.53-.88-4.68-2.31v7.59c.02 1.67-.4 3.32-1.22 4.75-.82 1.43-2.03 2.59-3.48 3.34-1.45.75-3.09 1.12-4.73.99-1.64-.13-3.21-.76-4.52-1.82-1.31-1.06-2.28-2.5-2.77-4.14-.49-1.64-.47-3.4.06-5.03.53-1.63 1.55-3.07 2.94-4.11 1.39-1.04 3.08-1.58 4.78-1.54v4.21c-.57-.03-1.14.07-1.66.29-.52.22-.98.57-1.35 1.01-.37.44-.64.97-.79 1.53s-.12 1.15.08 1.7.53 1.04 1 1.42.94.63 1.53.74c.59.1 1.2.02 1.75-.24s1.02-.67 1.34-1.2c.32-.53.48-1.15.46-1.77V.02z" /></svg>
              </a>
              <a href="https://app.daily.dev/squads/dualsynctechhub" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 group" title="Daily.dev">
                <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5l5 7.5-5 7.5-5-7.5 5-7.5z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;