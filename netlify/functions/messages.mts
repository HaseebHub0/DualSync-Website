import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import nodemailer from 'nodemailer';

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
 *   POST /api/messages?a=reply      admin   — email a reply and log it
 *   POST /api/messages?a=log        public  — client error report (Netlify function log)
 *   POST /api/messages?a=event      public  — privacy-friendly analytics (daily counts only)
 *   GET  /api/messages?a=stats      admin   — analytics summary for the inbox
 *   GET  /api/messages              admin   — list messages
 *   PATCH/DELETE /api/messages?id=  admin   — mark read / delete
 *
 * Required env vars (set in Netlify → Site settings → Environment):
 *   ADMIN_PASSWORD  the admin password
 *   ADMIN_SECRET    a long random string used to sign session tokens
 *
 * Replying additionally needs SMTP credentials. Without them the reply route
 * returns a clear 503 rather than silently pretending the mail went out:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   REPLY_FROM      optional display address, defaults to SMTP_USER
 *
 * Optional:
 *   NOTIFY_TO          where new-lead alerts go (defaults to REPLY_FROM / SMTP_USER)
 *   ADMIN_TOTP_SECRET  base32 secret; when set, admin sign-in also needs the
 *                      6-digit code from an authenticator app (MFA)
 *
 * Abuse protection: per-IP rate limits (Netlify Blobs), a honeypot field,
 * request and field size caps, and control characters stripped from input.
 */

const SESSION_HOURS = 12;
const MAX_FIELD = 4000;
const MAX_BODY_BYTES = 20_000;
const LIMITS = {
  submit: { max: 5, windowSec: 600 },
  login: { max: 10, windowSec: 900 },
  log: { max: 30, windowSec: 600 },
  event: { max: 120, windowSec: 600 },
} as const;

type Reply = {
  body: string;
  sentAt: string;
};

type DayStats = { pageviews: Record<string, number>; events: Record<string, number> };

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
  replies?: Reply[];
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

/** Trim, cap length and strip control characters (keeps newlines and tabs). */
const clean = (v: unknown, max = MAX_FIELD) =>
  String(v ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,253}\.[a-z]{2,63}$/i;

/** Read a JSON body with a hard size cap. */
async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  const text = await req.text().catch(() => '');
  if (!text || text.length > MAX_BODY_BYTES) return null;
  try {
    const v = JSON.parse(text);
    return v && typeof v === 'object' ? v : null;
  } catch {
    return null;
  }
}

/** Fixed-window per-IP rate limit kept in Netlify Blobs. Returns seconds to wait, 0 if allowed. */
async function rateLimited(bucket: keyof typeof LIMITS, ip: string): Promise<number> {
  const { max, windowSec } = LIMITS[bucket];
  const store = getStore({ name: 'ratelimits', consistency: 'strong' });
  const now = Math.floor(Date.now() / 1000);
  const win = Math.floor(now / windowSec);
  const key = `${bucket}/${ip.replace(/[^0-9a-f:.]/gi, '_')}/${win}`;
  const count = Number((await store.get(key)) ?? 0);
  if (count >= max) return (win + 1) * windowSec - now;
  await store.set(key, String(count + 1));
  if (count === 0) {
    // First hit of a new window: drop this IP's older windows, so IP-keyed
    // counters live minutes, not forever (see the privacy policy).
    const prefix = key.slice(0, key.lastIndexOf('/') + 1);
    const { blobs } = await store.list({ prefix });
    await Promise.all(blobs.filter((b) => b.key !== key).map((b) => store.delete(b.key)));
  }
  return 0;
}

const tooMany = (retryAfter: number) =>
  new Response(JSON.stringify({ error: 'Too many requests. Please wait a few minutes and try again.' }), {
    status: 429,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', 'retry-after': String(retryAfter) },
  });

/** RFC 6238 TOTP (SHA-1, 30 s, 6 digits), accepting one step of clock drift. */
function base32Decode(input: string): Buffer {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const ch of input.toUpperCase().replace(/[^A-Z2-7]/g, '')) bits += alphabet.indexOf(ch).toString(2).padStart(5, '0');
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(bytes);
}
function totpAt(secret: Buffer, step: number) {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(step));
  const h = createHmac('sha1', secret).update(msg).digest();
  const o = h[h.length - 1] & 0xf;
  const n = ((h[o] & 0x7f) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3];
  return String(n % 1_000_000).padStart(6, '0');
}
function verifyTotp(code: string, secretB32: string) {
  const key = base32Decode(secretB32);
  const step = Math.floor(Date.now() / 30_000);
  return [-1, 0, 1].some((d) => safeEqual(totpAt(key, step + d), code));
}

function mailer() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT ?? 465);
  return {
    from: process.env.REPLY_FROM || user,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    transport: nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } }),
  };
}

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
    const wait = await rateLimited('login', context.ip ?? 'unknown');
    if (wait) return tooMany(wait);
    const body = (await readJson(req)) ?? {};
    if (!safeEqual(String(body.password ?? ''), password)) {
      // Blunt the brute-force rate on top of the per-IP limit.
      await new Promise((r) => setTimeout(r, 600));
      return json({ error: 'Incorrect password.' }, 401);
    }
    const totp = process.env.ADMIN_TOTP_SECRET;
    if (totp) {
      const code = String(body.code ?? '').replace(/\s/g, '');
      if (!/^\d{6}$/.test(code)) return json({ error: 'Enter the 6-digit code from your authenticator app.', needCode: true }, 401);
      if (!verifyTotp(code, totp)) {
        await new Promise((r) => setTimeout(r, 600));
        return json({ error: 'That code is not valid. Check the time on your phone and try again.', needCode: true }, 401);
      }
    }
    return json({ token: issueToken(secret), expiresInHours: SESSION_HOURS });
  }

  // ── Client error report (public) ────────────────────────────────────────
  // Lands in the Netlify function log, so runtime errors in visitors'
  // browsers are visible without a third-party service.
  if (req.method === 'POST' && url.searchParams.get('a') === 'log') {
    const wait = await rateLimited('log', context.ip ?? 'unknown');
    if (wait) return new Response(null, { status: 204 });
    const body = (await readJson(req)) ?? {};
    console.error('[client-error]', JSON.stringify({
      message: clean(body.message, 500),
      source: clean(body.source, 300),
      page: clean(body.page, 300),
      stack: clean(body.stack, 1500),
      ua: clean(req.headers.get('user-agent'), 200),
    }));
    return new Response(null, { status: 204 });
  }

  // ── Analytics event (public) ────────────────────────────────────────────
  // First-party and cookie-free: only daily totals per page and per event are
  // stored. No IP address, user agent or identifier is kept.
  if (req.method === 'POST' && url.searchParams.get('a') === 'event') {
    const wait = await rateLimited('event', context.ip ?? 'unknown');
    if (wait) return new Response(null, { status: 204 });
    const body = (await readJson(req)) ?? {};
    const name = clean(body.name, 40);
    const page = clean(body.path, 120).split('?')[0];
    if (!/^(pageview|cta_click|form_submit|outbound_click)$/.test(name) || !page.startsWith('/')) {
      return new Response(null, { status: 204 });
    }
    const stats = getStore({ name: 'analytics', consistency: 'strong' });
    const day = new Date().toISOString().slice(0, 10);
    const cur = ((await stats.get(day, { type: 'json' })) as DayStats | null) ?? { pageviews: {}, events: {} };
    if (name === 'pageview') cur.pageviews[page] = (cur.pageviews[page] ?? 0) + 1;
    else {
      const key = `${name} ${clean(body.label, 60) || page}`;
      cur.events[key] = (cur.events[key] ?? 0) + 1;
    }
    await stats.setJSON(day, cur);
    return new Response(null, { status: 204 });
  }

  // ── Analytics summary (admin) ───────────────────────────────────────────
  if (req.method === 'GET' && url.searchParams.get('a') === 'stats') {
    if (!authed()) return json({ error: 'Unauthorized.' }, 401);
    const stats = getStore({ name: 'analytics', consistency: 'strong' });
    const days = Array.from({ length: 30 }, (_, i) => new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10));
    const rows = await Promise.all(days.map(async (d) => ({ day: d, ...(((await stats.get(d, { type: 'json' })) as DayStats | null) ?? { pageviews: {}, events: {} }) })));
    return json({ days: rows });
  }

  // ── Reply (admin) ───────────────────────────────────────────────────────
  // MUST be matched before the public submit branch below, which otherwise
  // swallows every remaining POST and makes this route unreachable.
  if (req.method === 'POST' && url.searchParams.get('a') === 'reply') {
    if (!authed()) return json({ error: 'Unauthorized.' }, 401);

    const mail = mailer();
    if (!mail) {
      return json(
        { error: 'Email is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in Netlify.' },
        503
      );
    }

    const { id, body } = (await readJson(req)) ?? {};
    const replyBody = clean(body);
    if (!id || !replyBody) return json({ error: 'A message id and reply body are required.' }, 400);

    const original = (await store.get(String(id), { type: 'json' })) as Message | null;
    if (!original) return json({ error: 'Message not found.' }, 404);

    const { from, transport } = mail;

    try {
      await transport.sendMail({
        from: `DualSync <${from}>`,
        to: original.email,
        replyTo: from,
        subject: 'Re: your message to DualSync',
        text: `${replyBody}\n\n—\nDualSync\n\n\nOn ${new Date(original.createdAt).toUTCString()} you wrote:\n> ${original.message.replace(/\n/g, '\n> ')}`,
      });
    } catch (err) {
      console.error('Reply send failed:', err);
      return json(
        { error: err instanceof Error ? `Could not send: ${err.message}` : 'Could not send the email.' },
        502
      );
    }

    const replies = [...(original.replies ?? []), { body: replyBody, sentAt: new Date().toISOString() }];
    await store.setJSON(original.id, { ...original, replies, read: true });
    return json({ ok: true, replies });
  }

  // ── Submit (public) ─────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const body = await readJson(req);
    if (!body) return json({ error: 'Invalid request.' }, 400);

    // Honeypot: real users never fill this. Answer like a success so bots learn nothing.
    if (clean(body.company)) return json({ ok: true, id: randomUUID() });

    const wait = await rateLimited('submit', context.ip ?? 'unknown');
    if (wait) return tooMany(wait);

    const email = clean(body.email, 254);
    const message = clean(body.message, 5000);
    if (!email || !EMAIL_RE.test(email)) return json({ error: 'A valid email is required.' }, 400);
    if (message.length < 2) return json({ error: 'A message is required.' }, 400);

    const record: Message = {
      id: randomUUID(),
      name: clean(body.name, 120) || 'Anonymous',
      email,
      projectType: clean(body.projectType, 80) || 'Unspecified',
      message,
      createdAt: new Date().toISOString(),
      read: false,
      source: clean(body.source) || 'contact',
      ip: context.ip,
    };

    // Store first, so the lead exists even if the alert email fails.
    await store.setJSON(record.id, record);

    // Instant alert. Never blocks or fails the submission.
    const mail = mailer();
    if (mail) {
      const to = process.env.NOTIFY_TO || mail.from;
      const send = mail.transport
        .sendMail({
          from: `DualSync website <${mail.from}>`,
          to,
          replyTo: { name: record.name, address: record.email },
          subject: `New enquiry: ${record.projectType} from ${record.name}`.slice(0, 160),
          text: `New enquiry from the website.\n\nName: ${record.name}\nEmail: ${record.email}\nNeeds: ${record.projectType}\nReceived: ${record.createdAt}\n\n${record.message}\n\n—\nReply to this email to answer them, or open https://dualsyncagency.com/admin`,
        })
        .catch((err: unknown) => console.error('Lead alert failed (lead is stored):', err));
      await Promise.race([send, new Promise((r) => setTimeout(r, 6000))]);
    } else {
      console.warn('Lead stored but no alert sent: SMTP is not configured.');
    }
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
    const { read = true } = (await readJson(req)) ?? {};
    await store.setJSON(id, { ...existing, read: Boolean(read) });
    return json({ ok: true });
  }

  if (req.method === 'DELETE') {
    await store.delete(id);
    return json({ ok: true });
  }

  return json({ error: 'Method not allowed.' }, 405);
}
