import React, { useCallback, useEffect, useState } from 'react';
import Button from '../components/v2/Button';
import { useSEO } from '../hooks/useSEO';

/**
 * Admin inbox.
 *
 * This page holds no secret. The password is verified by the Netlify function
 * against a server-side env var; all this component ever stores is a
 * short-lived signed token, and it keeps it in sessionStorage so closing the
 * tab ends the session.
 */

type Message = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
  read: boolean;
  source: string;
};

const API = '/api/messages';
const TOKEN_KEY = 'ds-admin-token';

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const Admin: React.FC = () => {
  useSEO({
    title: 'Inbox | DualSync',
    description: 'Private message inbox.',
    canonical: '/admin',
    noindex: true,
  });

  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setMessages([]);
  }, []);

  const load = useCallback(
    async (t: string) => {
      setStatus('loading');
      setError('');
      try {
        const res = await fetch(API, { headers: { authorization: `Bearer ${t}` } });
        if (res.status === 401) {
          signOut();
          setError('Session expired. Sign in again.');
          setStatus('idle');
          return;
        }
        if (!res.ok) throw new Error((await res.json()).error ?? 'Could not load messages.');
        const data = await res.json();
        setMessages(data.messages ?? []);
        setStatus('idle');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not load messages.');
        setStatus('error');
      }
    },
    [signOut]
  );

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch(`${API}?a=login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Sign in failed.');
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setPassword('');
      setToken(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
      setStatus('error');
    }
  };

  const mutate = async (id: string, method: 'PATCH' | 'DELETE', body?: unknown) => {
    if (!token) return;
    await fetch(`${API}?id=${encodeURIComponent(id)}`, {
      method,
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    load(token);
  };

  /* ── Locked ─────────────────────────────────────────────────────────── */
  if (!token) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 pt-28 pb-20">
        <form onSubmit={signIn} className="w-full max-w-sm">
          <div className="mono-label text-accent mb-6">Restricted</div>
          <h1 className="font-display font-black tracking-tighter text-ink text-4xl mb-8">
            Inbox
          </h1>
          <label htmlFor="pw" className="mono-label text-ink/60 block mb-3">
            Admin password
          </label>
          <input
            id="pw"
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-rule/20 h-14 text-ink text-base focus:outline-none focus:border-primary transition-colors mb-8"
          />
          <Button type="submit" disabled={status === 'loading'} arrow={false} className="w-full [&>*]:w-full">
            {status === 'loading' ? 'Checking…' : 'Sign in'}
          </Button>
          {error && (
            <p role="alert" className="text-red-400 text-sm mt-6 border-l-2 border-red-400/50 pl-4">
              {error}
            </p>
          )}
        </form>
      </section>
    );
  }

  /* ── Inbox ──────────────────────────────────────────────────────────── */
  const shown = filter === 'unread' ? messages.filter((m) => !m.read) : messages;
  const unread = messages.filter((m) => !m.read).length;

  return (
    <section className="min-h-screen px-6 sm:px-10 pt-28 md:pt-32 pb-24">
      <div className="max-w-[70rem] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-rule/10">
          <div>
            <div className="mono-label text-accent mb-4">Inbox</div>
            <h1 className="font-display font-black tracking-tighter text-ink text-3xl md:text-5xl">
              {messages.length} message{messages.length === 1 ? '' : 's'}
              {unread > 0 && <span className="text-accent"> · {unread} new</span>}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            {(['all', 'unread'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`mono-label transition-colors ${
                  filter === f ? 'text-accent' : 'text-ink/40 hover:text-ink'
                }`}
              >
                {f}
              </button>
            ))}
            <button onClick={() => load(token)} className="mono-label text-ink/40 hover:text-accent transition-colors">
              Refresh
            </button>
            <button onClick={signOut} className="mono-label text-ink/40 hover:text-accent transition-colors">
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-red-400 text-sm mt-6 border-l-2 border-red-400/50 pl-4">
            {error}
          </p>
        )}

        {status === 'loading' && <p className="mono-label text-ink/40 mt-10">Loading…</p>}

        {status !== 'loading' && shown.length === 0 && (
          <p className="text-ink/50 mt-16">
            {filter === 'unread' ? 'Nothing unread.' : 'No messages yet.'}
          </p>
        )}

        <div className="mt-2">
          {shown.map((m) => {
            const open = openId === m.id;
            return (
              <article key={m.id} className="border-b border-rule/10">
                <button
                  onClick={() => {
                    setOpenId(open ? null : m.id);
                    if (!m.read && !open) mutate(m.id, 'PATCH', { read: true });
                  }}
                  aria-expanded={open}
                  className="w-full text-left py-6 flex items-start gap-4 group"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-2 size-2 shrink-0 rounded-full ${m.read ? 'bg-rule/20' : 'bg-primary'}`}
                  />
                  <span className="min-w-0 flex-grow">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className={`font-display tracking-tight text-lg md:text-xl ${m.read ? 'text-ink/70' : 'text-ink font-bold'} group-hover:text-accent transition-colors`}>
                        {m.name}
                      </span>
                      <span className="mono-label text-ink/50">{m.email}</span>
                    </span>
                    <span className="flex flex-wrap gap-x-4 mt-2">
                      <span className="mono-label text-accent">{m.projectType}</span>
                      <span className="mono-label text-ink/40">{fmt(m.createdAt)}</span>
                    </span>
                    {!open && (
                      <span className="block text-ink/50 text-sm mt-3 line-clamp-1">{m.message}</span>
                    )}
                  </span>
                </button>

                {open && (
                  <div className="pb-8 pl-6 md:pl-10">
                    <p className="text-ink/75 text-base leading-relaxed whitespace-pre-wrap max-w-3xl">
                      {m.message}
                    </p>
                    <div className="flex flex-wrap gap-6 mt-8">
                      <a
                        href={`mailto:${m.email}?subject=Re:%20your%20message%20to%20DualSync`}
                        className="mono-label text-accent hover:text-ink transition-colors"
                      >
                        Reply ↗
                      </a>
                      <button
                        onClick={() => mutate(m.id, 'PATCH', { read: !m.read })}
                        className="mono-label text-ink/50 hover:text-accent transition-colors"
                      >
                        Mark {m.read ? 'unread' : 'read'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this message permanently?')) mutate(m.id, 'DELETE');
                        }}
                        className="mono-label text-ink/50 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Admin;
