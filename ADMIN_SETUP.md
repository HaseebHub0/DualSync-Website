# Admin inbox — setup

Every contact-form submission and newsletter signup is stored server-side and
read at **`/admin`**.

## Why it is built this way

The site is a static SPA. Anything checked in React ships to the browser, so a
password compared in page code is not a lock — anyone can read it in the JS
bundle and call the data source directly.

So the password lives **only** on the server, in a Netlify environment
variable. The browser never receives it; on a correct login it receives a
short-lived signed token instead.

## 1. Set the environment variables

Netlify → **Site configuration → Environment variables** → add two:

| Key | Value |
| --- | --- |
| `ADMIN_PASSWORD` | your admin password |
| `ADMIN_SECRET` | a long random string used to sign session tokens |

Generate a strong pair locally:

```bash
node -e "console.log('ADMIN_PASSWORD=' + require('crypto').randomBytes(18).toString('base64url')); console.log('ADMIN_SECRET=' + require('crypto').randomBytes(48).toString('base64url'))"
```

Store both in a password manager. Changing `ADMIN_SECRET` invalidates all
existing sessions immediately — that is the way to force a sign-out.

## 2. Deploy

Netlify picks up `netlify/functions/messages.mts` automatically. No extra
build config is needed; `netlify.toml` already routes `/api/messages` to it and
marks `/admin` `noindex`.

Messages are stored in **Netlify Blobs**, which is enabled per-site with no
external database.

## 3. Use it

Open `https://dualsyncagency.com/admin`, enter the password, and you get the
inbox: filter all/unread, expand to read, reply by email, mark read, delete.

Sessions last 12 hours and live in `sessionStorage`, so closing the tab ends
them.

## Local development

`npm run dev` (Vite) does **not** run Netlify functions, so `/api/messages`
returns 404 and the admin page cannot sign in. To exercise it locally:

```bash
npx netlify dev
```

Create a `.env` in the project root with `ADMIN_PASSWORD` and `ADMIN_SECRET`
for that local run. Do not commit it.

## Security notes

- The password is compared with a timing-safe comparison, and a failed attempt
  is delayed ~600 ms to blunt brute forcing.
- Session tokens are HMAC-signed and carry an expiry; they are not guessable
  and cannot be extended client-side.
- The public submit endpoint caps field length and uses a hidden honeypot
  field to drop bot submissions.
- `/admin` sends `X-Robots-Tag: noindex, nofollow` and is excluded from the
  sitemap by never being linked from the public nav.

**Still worth adding later:** rate limiting per IP on the login route. Netlify
does not provide this out of the box, and the current 600 ms delay slows an
attacker but does not stop a determined one. With a long random password this
is an acceptable trade; with a short human-memorable one it is not.
