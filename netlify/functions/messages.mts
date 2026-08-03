import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';

/**
 * Message inbox API.
 *
 * Why a function and not client-side: the site is a static SPA, so anything
 * checked in React is readable in the JS bundle. The password and the stored
 * messages never leave the server — the browser only ever holds a short-lived
 * signed token.
 *
 * Routes (see netlify.toml for the /api/* rewrite):
 *   POST /api/messages              public  — submit a contact message
 *   POST /api/messages?a=login      public  — exchange password for a token
 *   GET  /api/messages              admin   — list messages
 *   PATCH/DELETE /api/messages?id=  admin   — mark read / delete
 *
 * Required env vars (set in Netlify → Site settings → Environment):
 *   ADMIN_PASSWORD  the admin password
 *   ADMIN_SECRET    a long random string used to sign session tokens
 */

const SESSION_HOURS = 12;
const MAX_FIELD = 4000;

type Message = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
  read: boolean;
  source: string;
  ip?: string;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/** Constant-time compare that does not leak length via early return. */
function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Still burn a comparison so timing does not reveal the length.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function issueToken(secret: string) {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  const payload = String(expires);
  return `${payload}.${sign(payload, secret)}`;
}

function verifyToken(token: string | null, secret: string) {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  if (!safeEqual(sig, sign(payload, secret))) return false;
  return Number(payload) > Date.now();
}

const clean = (v: unknown) => String(v ?? '').trim().slice(0, MAX_FIELD);

export default async function handler(req: Request, context: Context) {
  // process.env works in the Netlify runtime and keeps this file typeable
  // with plain @types/node rather than a global ambient declaration.
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET;
  if (!password || !secret) {
    return json({ error: 'Server not configured: set ADMIN_PASSWORD and ADMIN_SECRET.' }, 500);
  }

  const url = new URL(req.url);
  const store = getStore({ name: 'messages', consistency: 'strong' });

  const authed = () =>
    verifyToken(req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? null, secret);

  // ── Login ───────────────────────────────────────────────────────────────
  if (req.method === 'POST' && url.searchParams.get('a') === 'login') {
    const { password: supplied } = await req.json().catch(() => ({ password: '' }));
    if (!safeEqual(String(supplied ?? ''), password)) {
      // Blunt the brute-force rate a little without keeping server state.
      await new Promise((r) => setTimeout(r, 600));
      return json({ error: 'Incorrect password.' }, 401);
    }
    return json({ token: issueToken(secret), expiresInHours: SESSION_HOURS });
  }

  // ── Submit (public) ─────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const body = await req.json().catch(() => null);
    if (!body) return json({ error: 'Invalid JSON.' }, 400);

    const email = clean(body.email);
    const message = clean(body.message);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return json({ error: 'A valid email is required.' }, 400);
    if (!message) return json({ error: 'A message is required.' }, 400);
    // Honeypot: real users never fill this.
    if (clean(body.company)) return json({ ok: true, id: randomUUID() });

    const record: Message = {
      id: randomUUID(),
      name: clean(body.name) || 'Anonymous',
      email,
      projectType: clean(body.projectType) || 'Unspecified',
      message,
      createdAt: new Date().toISOString(),
      read: false,
      source: clean(body.source) || 'contact',
      ip: context.ip,
    };

    await store.setJSON(record.id, record);
    return json({ ok: true, id: record.id });
  }

  // ── Everything below requires a valid session ───────────────────────────
  if (!authed()) return json({ error: 'Unauthorized.' }, 401);

  if (req.method === 'GET') {
    const { blobs } = await store.list();
    const items = await Promise.all(
      blobs.map((b) => store.get(b.key, { type: 'json' }) as Promise<Message | null>)
    );
    const messages = items
      .filter((m): m is Message => Boolean(m))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return json({ messages, unread: messages.filter((m) => !m.read).length });
  }

  const id = url.searchParams.get('id');
  if (!id) return json({ error: 'Missing id.' }, 400);

  if (req.method === 'PATCH') {
    const existing = (await store.get(id, { type: 'json' })) as Message | null;
    if (!existing) return json({ error: 'Not found.' }, 404);
    const { read } = await req.json().catch(() => ({ read: true }));
    await store.setJSON(id, { ...existing, read: Boolean(read) });
    return json({ ok: true });
  }

  if (req.method === 'DELETE') {
    await store.delete(id);
    return json({ ok: true });
  }

  return json({ error: 'Method not allowed.' }, 405);
}
