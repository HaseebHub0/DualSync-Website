import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      server: {
        port: Number(process.env.PORT) || 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // NOTE: no `define` for provider credentials. Anything injected here is
      // inlined into the client bundle as plain text and is readable by every
      // visitor. Model/provider calls belong in a serverless function so the
      // key never leaves the server.
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            // Split long-lived vendor code from app code so a copy change does
            // not invalidate the whole bundle in users' caches.
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
              gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollSmoother', 'gsap/SplitText'],
              motion: ['framer-motion'],
            },
          },
        },
      }
    };
});
