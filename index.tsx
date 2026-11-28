import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Self-hosted fonts (Latin subset, weights in use). No third-party font requests,
// so the CSP can stay 'self' and nothing blocks first render.
import '@fontsource/inter-tight/latin-400.css';
import '@fontsource/inter-tight/latin-500.css';
import '@fontsource/inter-tight/latin-600.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import './styles/site.css';
import './styles/v3-premium.css';
import App from './App';
import { installErrorReporter } from './lib/errorReporter';
import { installClickTracking } from './lib/analytics';

installErrorReporter();
installClickTracking();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Every public route is prerendered (scripts/prerender.mjs), so hydrate that
// HTML instead of replacing it: the first paint is the final paint, which keeps
// LCP at first render. /admin is served from the bare index.html and renders.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app, {
    onRecoverableError: (err) => console.warn('[hydrate]', err),
  });
} else {
  createRoot(rootElement).render(app);
}