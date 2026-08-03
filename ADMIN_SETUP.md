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

## 1b. Enable replying (SMTP)

The inbox can send a reply straight from the page. That needs mail
credentials — without them the Send button returns a clear "Email is not
configured" error rather than pretending the message went out.

Using your existing Zoho mailbox (see `ZOHO_APP_PASSWORD_GUIDE.md` for
generating an app password — use that, not your login password):

| Key | Value |
| --- | --- |
| `SMTP_HOST` | `smtp.zoho.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@dualsyncagency.com` |
| `SMTP_PASS` | the Zoho **app password** |
| `REPLY_FROM` | optional — defaults to `SMTP_USER` |

Port `465` uses implicit TLS. If your provider wants STARTTLS instead, set
`SMTP_PORT=587`; the function switches automatically.

Any SMTP provider works — swap the host/port for SendGrid, Mailgun, Resend
SMTP, etc.

## 2. Deploy

Netlify picks up `netlify/functions/messages.mts` automatically. No extra
build config is needed; `netlify.toml` already routes `/api/messages` to it and
marks `/admin` `noindex`.

Messages are stored in **Netlify Blobs**, which is enabled per-site with no
external database.

## 3. Use it

Open `https://dualsyncagency.com/admin`, enter the password, and you get the
inbox: filter all/unread, expand to read, write a reply and send it (with a
sent/failed status and a log of every reply already sent), mark read, delete.

Sent replies are stored on the message, so the list shows a "Replied" tag and
the thread stays readable later. There is still an "Open in mail app" link if
you would rather answer from your own client.

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
