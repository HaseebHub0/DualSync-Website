import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '../../lib/analytics';

/** International format, digits only, for wa.me links. */
export const WHATSAPP_NUMBER = '923107951063';
export const WHATSAPP_DISPLAY = '+92 310 7951063';

const QUICK = ['I need an ERP for my business', 'I want an AI agent or chatbot', 'I need a mobile app', 'I have a project in mind'];

const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const WaIcon: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M16.04 3C8.86 3 3.02 8.83 3.02 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.04 29C23.2 29 29.06 23.17 29.06 16S23.2 3 16.04 3Zm0 23.8c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.72 10.72 0 0 1 5.3 16c0-5.92 4.82-10.74 10.74-10.74 5.93 0 10.75 4.82 10.75 10.74 0 5.93-4.82 10.8-10.75 10.8Zm5.9-8.05c-.32-.16-1.91-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.23-.19-.32-.02-.5.14-.65.15-.15.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.62c-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.1 1.31 3.32.16.21 2.26 3.45 5.47 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.91-.78 2.18-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37Z"
    />
  </svg>
);

/**
 * Floating WhatsApp chat. The visitor writes (or picks) a message here and
 * Send opens WhatsApp (app on phones, WhatsApp Web on desktop) with it already
 * addressed to our number; they tap send there. No third-party script, so the
 * CSP stays 'self'.
 *
 * Renders nothing on the server and on the first client render, so it never
 * affects hydration of the prerendered pages.
 */
const WhatsAppChat: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { pathname } = useLocation();
  const panelId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!mounted || pathname.startsWith('/admin')) return null;

  const message = text.trim() || 'Hi DualSync, I would like to discuss a project.';
  const sent = (label: string) => {
    track('cta_click', `WhatsApp chat: ${label}`);
    setOpen(false);
    setText('');
  };

  return (
    <div className="v3-wa">
      {open && (
        <div className="v3-wa-panel" id={panelId} role="dialog" aria-label="Chat with DualSync on WhatsApp">
          <div className="v3-wa-head">
            <span className="v3-wa-avatar" aria-hidden="true">DS</span>
            <div>
              <div className="v3-wa-name">DualSync</div>
              <div className="v3-wa-status"><span className="v3-wa-dot" />A founder replies on WhatsApp</div>
            </div>
            <button type="button" className="v3-wa-close" aria-label="Close chat" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>

          <div className="v3-wa-body">
            <div className="v3-wa-bubble">
              Assalam o Alaikum! Tell us what you need built and send it straight to our WhatsApp. Haseeb or Siddique will reply there.
            </div>
            <div className="v3-wa-quick" aria-label="Quick messages">
              {QUICK.map((q) => (
                <a key={q} href={waLink(q)} target="_blank" rel="noopener noreferrer" className="v3-wa-chip" onClick={() => sent(q)}>
                  {q}
                </a>
              ))}
            </div>
          </div>

          <form
            className="v3-wa-form"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(waLink(message), '_blank', 'noopener,noreferrer');
              sent('typed');
            }}
          >
            <label htmlFor={`${panelId}-msg`} className="sr-only">Your message</label>
            <textarea
              id={`${panelId}-msg`}
              ref={inputRef}
              className="v3-wa-input"
              rows={2}
              maxLength={1000}
              placeholder="Type your message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <button type="submit" className="v3-wa-send" aria-label="Send on WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" /></svg>
            </button>
          </form>
          <div className="v3-wa-foot">Opens WhatsApp to {WHATSAPP_DISPLAY}</div>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        className="v3-wa-toggle"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
        onClick={() => setOpen((o) => !o)}
      >
        <WaIcon />
      </button>
    </div>
  );
};

export default WhatsAppChat;
