import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/process', label: 'Process' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

const socials = [
  {
    href: 'https://www.linkedin.com/company/111605636',
    title: 'LinkedIn',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    viewBox: '0 0 24 24',
  },
  {
    href: 'https://www.behance.net/muhammadhaseeb162',
    title: 'Behance',
    path: 'M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z',
    viewBox: '0 0 16 16',
  },
  {
    href: 'https://x.com/DualSync',
    title: 'X (Twitter)',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    viewBox: '0 0 24 24',
  },
  {
    href: 'https://www.instagram.com/dualsync.agency/',
    title: 'Instagram',
    path: 'M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M19.2,5.6A0.8,0.8 0 0,1 20,4.8A0.8,0.8 0 0,1 19.2,4H19.2A0.8,0.8 0 0,1 18.4,4.8A0.8,0.8 0 0,1 19.2,5.6Z',
    viewBox: '0 0 24 24',
  },
  {
    href: 'https://facebook.com',
    title: 'Facebook',
    path: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z',
    viewBox: '0 0 24 24',
  },
  {
    href: 'https://www.tiktok.com/@dualsync_pk',
    title: 'TikTok',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.99 1.14 2.3 1.94 3.75 2.29v4.03c-1.83-.07-3.53-.88-4.68-2.31v7.59c.02 1.67-.4 3.32-1.22 4.75-.82 1.43-2.03 2.59-3.48 3.34-1.45.75-3.09 1.12-4.73.99-1.64-.13-3.21-.76-4.52-1.82-1.31-1.06-2.28-2.5-2.77-4.14-.49-1.64-.47-3.4.06-5.03.53-1.63 1.55-3.07 2.94-4.11 1.39-1.04 3.08-1.58 4.78-1.54v4.21c-.57-.03-1.14.07-1.66.29-.52.22-.98.57-1.35 1.01-.37.44-.64.97-.79 1.53s-.12 1.15.08 1.7.53 1.04 1 1.42.94.63 1.53.74c.59.1 1.2.02 1.75-.24s1.02-.67 1.34-1.2c.32-.53.48-1.15.46-1.77V.02z',
    viewBox: '0 0 24 24',
  },
  {
    href: 'https://app.daily.dev/squads/dualsynctechhub',
    title: 'Daily.dev',
    path: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5l5 7.5-5 7.5-5-7.5 5-7.5z',
    viewBox: '0 0 24 24',
  },
];

/**
 * Footer v2 — editorial close. Ruled grid, mono labels, and the wordmark
 * at ground level. Newsletter signups post to the same /api/messages inbox
 * as the contact form, so everything lands in one place.
 */
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
      // Same inbox as the contact form, tagged by source, so every signup
      // lands in /admin instead of a separate mail provider.
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter subscriber',
          email,
          projectType: 'Newsletter',
          message: `Subscribed to engineering notes from ${email}.`,
          source: 'newsletter',
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Subscription failed');

      setStatus('success');
      setEmail('');
    } catch (e) {
      console.error('Newsletter subscription failed:', e);
      setStatus('error');
    }
  };

  return (
    <footer className="border-t border-rule/10" id="contact">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-10">
        {/* Top grid: pitch / nav / newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 md:py-20">
          <div className="md:col-span-5">
            <div className="mono-label text-accent mb-6">DualSync</div>
            <p className="font-display font-bold tracking-tight text-ink text-2xl md:text-3xl leading-snug max-w-sm">
              An AI &amp; SaaS engineering studio run by the two people who
              write the code.
            </p>
            {!isContactPage && (
              <Link
                to="/contact"
                className="mono-label text-accent inline-flex items-center gap-2 mt-8 hover:gap-3 transition-all"
              >
                Start a project
                <span aria-hidden="true" className="material-symbols-outlined text-sm">north_east</span>
              </Link>
            )}
          </div>

          <div className="md:col-span-3">
            <div className="mono-label text-ink/60 mb-6">Index</div>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-ink/60 hover:text-accent transition-colors text-sm font-medium w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <div className="mono-label text-ink/60 mb-6">Engineering notes, monthly</div>
            <p className="text-ink/50 text-sm mb-5">What we shipped and what broke.</p>
            {status === 'success' ? (
              <p role="status" className="text-accent text-sm font-bold">
                Subscribed — check your inbox.
              </p>
            ) : (
              <div className="flex border-b border-rule/20 focus-within:border-primary transition-colors">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  className="flex-grow h-12 bg-transparent text-ink text-sm placeholder:text-ink/30 focus:outline-none min-w-0"
                  placeholder="you@company.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  aria-invalid={status === 'error' || undefined}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                  className="mono-label text-ink hover:text-accent transition-colors disabled:opacity-50 shrink-0 pl-4"
                >
                  {status === 'loading' ? 'Sending…' : 'Subscribe'}
                </button>
              </div>
            )}
            {status === 'error' && (
              <p id="newsletter-error" role="alert" className="text-red-400 text-xs mt-3">
                That didn't go through. Check the address and try again, or email
                contact@dualsyncagency.com.
              </p>
            )}

            <div className="flex flex-wrap gap-3 mt-8">
              {socials.map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.title}
                  className="p-2.5 border border-rule/10 text-ink/50 hover:text-accent hover:border-primary/40 transition-colors"
                >
                  <svg className="size-4 fill-current" viewBox={s.viewBox}>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal rail */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-rule/10">
          <p className="mono-label text-ink/60">© {new Date().getFullYear()} DualSync — All rights reserved</p>
          <div className="flex gap-8">
            <Link className="mono-label text-ink/60 hover:text-accent transition-colors" to="/privacy">
              Privacy
            </Link>
            <Link className="mono-label text-ink/60 hover:text-accent transition-colors" to="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Ground wordmark */}
      <div aria-hidden="true" className="overflow-hidden select-none pointer-events-none">
        <div className="font-display font-black tracking-tighter leading-[0.75] text-center text-[clamp(4rem,14.5vw,13rem)] text-ink/[0.04] translate-y-[12%]">
          DUALSYNC
        </div>
      </div>
    </footer>
  );
};

export default Footer;
