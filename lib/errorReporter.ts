/**
 * Sends uncaught browser errors to the messages function (?a=log), which
 * writes them to the Netlify function log. Same origin, so the CSP stays
 * 'self'. Deduplicated and capped per page; never runs on localhost.
 */
const MAX_PER_PAGE = 5;

export function installErrorReporter() {
  if (typeof window === 'undefined' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
  const seen = new Set<string>();

  const report = (message: string, source = '', stack = '') => {
    const key = `${message}|${source}`;
    if (seen.has(key) || seen.size >= MAX_PER_PAGE) return;
    seen.add(key);
    const body = JSON.stringify({ message, source, stack, page: location.pathname });
    try {
      if (!navigator.sendBeacon?.('/api/messages?a=log', new Blob([body], { type: 'application/json' }))) {
        void fetch('/api/messages?a=log', { method: 'POST', body, keepalive: true, headers: { 'content-type': 'application/json' } });
      }
    } catch {
      /* reporting must never throw */
    }
  };

  window.addEventListener('error', (e) => {
    // Resource load failures (img/script) have no message; skip them.
    if (!e.message) return;
    report(e.message, `${e.filename ?? ''}:${e.lineno ?? 0}`, e.error?.stack ?? '');
  });
  window.addEventListener('unhandledrejection', (e) => {
    const r = e.reason;
    report(r instanceof Error ? r.message : String(r), 'unhandledrejection', r instanceof Error ? r.stack ?? '' : '');
  });
}
