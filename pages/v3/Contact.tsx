import React, { useEffect, useRef, useState } from 'react';
import Nav from '../../components/v3/Nav';
import Footer from '../../components/v3/Footer';
import { useSEO } from '../../hooks/useSEO';
import { useV3Motion } from '../../hooks/useV3Motion';

type FormState = { name: string; email: string; projectType: string; message: string };
type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: FormState = { name: '', email: '', projectType: 'AI agents', message: '' };

/* Rebuilt 1:1 from the Webflow export (dualsync-export.json → pages["/contact"]). */
const Contact: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  // Same backend as the previous site: a Google Apps Script web app. text/plain
  // keeps the request "simple", so the browser sends no CORS preflight.
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;
      if (!url) throw new Error('VITE_GOOGLE_SCRIPT_URL is not set');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(form),
      });
      const result = await res.json().catch(() => null);
      if (!result || result.status !== 'success') throw new Error(result?.message || 'Submission rejected');
      setForm(EMPTY);
      setStatus('success');
    } catch (err) {
      console.error('Contact submission failed:', err);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'success') doneRef.current?.focus();
  }, [status]);
  useSEO({
    title: "Contact — DualSync",
    description: "Two questions and your email. A founder replies within one business day.",
    canonical: "/contact",
  });
  useV3Motion(root);

  return (
    <div ref={root} className="sx-page">
      <section className="sx-ph sx-ph-contact">
        <Nav />
        <div className="sx-ph-ring sx-ph-ring-a" />
        <div className="sx-ph-ring sx-ph-ring-b" />
        <div className="sx-contact-grid">
          <div>
            <div className="sx-ph-label">[ Contact ]</div>
            <h1 className="sx-ph-title sx-contact-title">Two questions and <span className="sx-green">your email.</span></h1>
            <div className="sx-promise">
              <div className="sx-promise-row"><span className="sx-pulse" />A founder reads this, not a chatbot</div>
              <div className="sx-promise-row"><span className="sx-promise-k">Reply within</span>1 business day</div>
              <div className="sx-promise-row"><span className="sx-promise-k">Based in</span>Rawalpindi · working worldwide</div>
              <div className="sx-promise-row"><span className="sx-promise-k">Or email</span>contact@dualsyncagency.com</div>
            </div>
          </div>
          <div className="sx-form">
            {status !== 'success' && (
            <form name="project-enquiry" onSubmit={onSubmit} aria-busy={status === 'sending'}>
              <label htmlFor="name" className="sx-flabel">Your name</label>
              <input className="sx-input" maxLength={256} name="Name" placeholder="Ali Raza" type="text" id="name" required autoComplete="name" value={form.name} onChange={set('name')} />
              <label htmlFor="Email" className="sx-flabel">Email</label>
              <input className="sx-input" maxLength={256} name="Email" placeholder="ali@company.com" type="email" id="Email" required autoComplete="email" value={form.email} onChange={set('email')} />
              <label htmlFor="Service" className="sx-flabel">What do you need built?</label>
              <select id="Service" name="Service" className="sx-input" required value={form.projectType} onChange={set('projectType')}>
                <option value="AI agents">AI agents</option>
                <option value="Voice AI">Voice AI</option>
                <option value="Custom SaaS">Custom SaaS</option>
                <option value="ERP / CRM">ERP / CRM</option>
                <option value="Web or mobile">Web or mobile</option>
                <option value="Something else">Something else</option>
              </select>
              <label htmlFor="Message" className="sx-flabel">What is breaking?</label>
              <textarea required placeholder="A few sentences is enough. What happens today, and what should happen instead?" maxLength={5000} id="Message" name="Message" className="sx-input sx-textarea" value={form.message} onChange={set('message')} />
              <input type="submit" className="sx-submit" value={status === 'sending' ? 'Sending…' : 'Send it →'} disabled={status === 'sending'} />
            </form>
            )}
            {status === 'success' && (
              <div className="sx-form-done" role="status" tabIndex={-1} ref={doneRef}>
                <div>Thank you! Your submission has been received!</div>
              </div>
            )}
            {status === 'error' && (
              <div className="sx-form-fail" role="alert">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
