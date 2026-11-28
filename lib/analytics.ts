/**
 * First-party, cookie-free analytics. Sends tiny beacons to the messages
 * function (?a=event), which keeps only daily totals per page and per event.
 * No cookies, no identifiers, no third-party script (the CSP stays 'self').
 *
 * Skipped for: localhost, the /admin inbox, automated browsers, and visitors
 * who send Do Not Track or Global Privacy Control.
 */
type EventName = 'pageview' | 'cta_click' | 'form_submit' | 'outbound_click';

const disabled = (() => {
  if (typeof window === 'undefined') return true;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return (
    /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ||
    nav.webdriver === true ||
    nav.doNotTrack === '1' ||
    nav.globalPrivacyControl === true
  );
})();

export function track(name: EventName, label?: string) {
  if (disabled || location.pathname.startsWith('/admin')) return;
  const body = JSON.stringify({ name, label, path: location.pathname });
  try {
    if (!navigator.sendBeacon?.('/api/messages?a=event', new Blob([body], { type: 'application/json' }))) {
      void fetch('/api/messages?a=event', { method: 'POST', body, keepalive: true, headers: { 'content-type': 'application/json' } });
    }
  } catch {
    /* analytics must never break the page */
  }
}

/** Counts clicks on contact CTAs, email links and links to other sites. */
export function installClickTracking() {
  if (disabled) return;
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const label = (a.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 60);
      if (href === '/contact' || href.startsWith('mailto:')) track('cta_click', label || href);
      else if (/^https?:\/\//.test(href) && !href.includes(location.hostname)) track('outbound_click', new URL(href).hostname);
    },
    { capture: true, passive: true },
  );
}
