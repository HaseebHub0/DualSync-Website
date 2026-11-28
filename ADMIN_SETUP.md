# Admin inbox — setup

Every contact-form submission is stored server-side and read at **`/admin`**.
The same page shows the last 30 days of cookie-free visit counts.

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

## 1c. Lead alerts

When a message arrives the function emails an alert (with Reply-To set to the
sender, so you can answer straight from your mail app). It goes to
`NOTIFY_TO` if set, otherwise to the SMTP sender address. The message is saved
first, so a mail failure never loses a lead.

| Key | Value |
| --- | --- |
| `NOTIFY_TO` | optional, e.g. `contact@dualsyncagency.com` or a personal inbox |

## 1d. Two-factor sign-in (recommended)

Set `ADMIN_TOTP_SECRET` and the inbox asks for a 6-digit code from an
authenticator app (Google Authenticator, Authy, 1Password) after the password.

```bash
node -e "const a='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',b=require('crypto').randomBytes(20);let s='',v=0,n=0;for(const x of b){v=v<<8|x;n+=8;while(n>=5){s+=a[v>>>(n-5)&31];n-=5}}console.log(s)"
```

Put the printed value in Netlify as `ADMIN_TOTP_SECRET`, and add it to your app
as a manual "time-based" key (account: DualSync admin). Without the variable
the inbox stays password-only.

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
  is delayed ~600 ms.
- Login is rate limited per IP (10 attempts per 15 minutes); the public form
  allows 5 messages per IP per 10 minutes. Over the limit the API returns
  `429` with `Retry-After`. Counters live in the `ratelimits` Blobs store.
- Optional TOTP second factor (`ADMIN_TOTP_SECRET`, above).
- Session tokens are HMAC-signed and carry an expiry; they cannot be extended
  client-side.
- The submit endpoint rejects bodies over 20 KB, validates the email, caps
  every field and strips control characters; a hidden honeypot drops bots.
- `/admin` sends `X-Robots-Tag: noindex, nofollow` and `Cache-Control: no-store`.

## Error reports and analytics

- Browser errors on the live site are sent to `/api/messages?a=log` and appear
  in **Netlify → Logs → Functions → messages** as `[client-error]` lines.
- Page views, contact clicks, form submissions and outbound clicks are counted
  per day in the `analytics` Blobs store. No IP, cookie or identifier is
  stored; visitors with Do Not Track or Global Privacy Control are not counted.
  Totals show at the top of `/admin`.
- `.github/workflows/uptime.yml` checks the home page and the API every 5
  minutes from GitHub and opens an issue labelled `uptime` (GitHub emails you)
  when either fails.
