import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/v2/PageHero';
import FAQ from '../components/FAQ';
import Glyph from '../components/v2/Glyph';
import Button from '../components/v2/Button';
import Reveal from '../components/anim/Reveal';
import { useSEO } from '../hooks/useSEO';

const projectTypes = [
  'AI Agent / Automation',
  'Voice AI',
  'Custom SaaS Platform',
  'Enterprise System (ERP / CRM)',
  'Web Application',
  'Mobile Application',
  'Product Design',
  '3D & Motion',
  'Something else',
];

const field =
  'w-full bg-transparent border-b border-rule/15 h-14 text-ink text-base focus:outline-none focus:border-primary transition-colors placeholder:text-ink/25';

const Contact: React.FC = () => {
  useSEO({
    title: 'Contact DualSync | Talk to the Founders',
    description:
      'Start a project with DualSync. Two questions and your email — a founder replies within one business day. AI agents, SaaS platforms, and enterprise systems.',
    canonical: '/contact',
    keywords:
      'Contact DualSync, Hire AI Agency, Custom SaaS Development, ERP Developer, Software Project Inquiry Pakistan',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: projectTypes[0],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationId, setConfirmationId] = useState('');
  // Honeypot — hidden from people, irresistible to bots.
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Posts to our own Netlify function, which stores the message and
      // serves it to /admin. `company` is a honeypot — bots fill it, people
      // never see it.
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...formData, company: honeypot, source: 'contact' }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'The server rejected the submission.');
      }

      setConfirmationId(String(result.id ?? '').slice(0, 8).toUpperCase());
      setStatus('success');
      setFormData({ name: '', email: '', projectType: projectTypes[0], message: '' });
    } catch (error) {
      console.error('Contact submission failed:', error);
      // Surfaced inline rather than in an alert() — an alert dumped raw JSON
      // at the user and blocked the page.
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong sending your message.'
      );
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="min-h-screen flex items-center px-6 sm:px-10 pt-36 pb-24">
        <div className="max-w-[90rem] mx-auto w-full">
          <div className="max-w-3xl">
            <div className="mono-label text-accent mb-8 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-primary animate-pulse" />
              Message received
            </div>
            <h1 className="font-display font-black tracking-tighter text-ink text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] mb-10">
              We’ll be in touch.
            </h1>
            <p className="text-ink/55 text-lg leading-relaxed max-w-xl mb-12">
              A founder reads every message personally and replies within one
              business day — usually sooner.
            </p>

            <dl className="grid grid-cols-2 gap-px bg-surface/10 border border-rule/10 max-w-md mb-12">
              <div className="bg-canvas p-6">
                <dt className="mono-label text-ink/60 mb-2">Reference</dt>
                <dd className="text-ink font-mono text-sm">DS-{confirmationId}</dd>
              </div>
              <div className="bg-canvas p-6">
                <dt className="mono-label text-ink/60 mb-2">Queue</dt>
                <dd className="text-accent font-bold text-sm">Founder review</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-8">
              <button
                onClick={() => setStatus('idle')}
                className="mono-label text-ink/50 hover:text-accent transition-colors"
              >
                ← Send another message
              </button>
              <Link to="/work" className="mono-label text-accent hover:text-ink transition-colors">
                See the work ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        label="Contact"
        title="Tell us what’s"
        titleOutline="breaking."
        lead="Two questions and your email. A founder replies within one business day — not a form response, not a sales script."
        meta={[['Reply time', '1 day']]}
      />

      <section className="px-6 sm:px-10 py-20 md:py-28">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {/* Honeypot: off-screen rather than display:none, which some
                  bots detect and skip. */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label htmlFor="company">Company (leave blank)</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label htmlFor="name" className="mono-label text-ink/60 block mb-3">
                    01 — Your name
                  </label>
                  <input
                    id="name"
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={field}
                    placeholder="Jane Cooper"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mono-label text-ink/60 block mb-3">
                    02 — Email
                  </label>
                  <input
                    id="email"
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={field}
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="mono-label text-ink/60 block mb-3">
                  03 — What do you need built?
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`${field} appearance-none cursor-pointer`}
                >
                  {projectTypes.map((t) => (
                    <option key={t} className="bg-canvas">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mono-label text-ink/60 block mb-3">
                  04 — What’s the problem?
                </label>
                <textarea
                  id="message"
                  required
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-rule/15 py-4 text-ink text-base focus:outline-none focus:border-primary transition-colors placeholder:text-ink/25 resize-none"
                  placeholder="The part of your operation that keeps breaking, or the thing you wish existed…"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Button type="submit" disabled={status === 'loading'} arrow={status !== 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <span className="size-4 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin" />
                      Sending
                    </>
                  ) : (
                    'Send message'
                  )}
                </Button>
                <span className="mono-label text-ink/60">No sales sequence. Ever.</span>
              </div>

              {status === 'error' && (
                <p role="alert" className="text-red-400 text-sm border-l-2 border-red-400/50 pl-4">
                  That didn’t send. {errorMessage} You can also email us directly at
                  info@dualsyncagency.com.
                </p>
              )}
            </form>
          </div>

          {/* Aside */}
          <aside className="lg:col-span-5 lg:pl-8">
            <Reveal y={30}>
              <div className="size-24 mb-10 border border-rule/10 p-3">
                <Glyph name="chat" className="w-full h-full" />
              </div>

              <div className="mono-label text-accent mb-6">Direct line</div>
              <a
                href="mailto:info@dualsyncagency.com"
                className="font-display font-bold tracking-tight text-ink text-xl md:text-2xl hover:text-accent transition-colors break-all"
              >
                info@dualsyncagency.com
              </a>

              <dl className="mt-12 border-t border-rule/10">
                {[
                  ['Where', 'Fully remote — working worldwide'],
                  ['Reply', 'Within one business day'],
                  ['Who answers', 'A founder, not a chatbot'],
                  ['Availability', 'Booking Q4 2026'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-4 border-b border-rule/10">
                    <dt className="mono-label text-ink/60 shrink-0">{k}</dt>
                    <dd className="text-ink/70 text-sm text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>
      </section>

      <FAQ />
    </>
  );
};

export default Contact;
