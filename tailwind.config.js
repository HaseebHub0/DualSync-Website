/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    // data/ holds article bodies as HTML strings containing utility classes —
    // omit this and the blog's typography is purged from the build.
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#38e07b',
        'background-light': '#f6f8f7',
        'background-dark': '#122017',
        glass: 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        // Semantic, theme-aware tokens (see :root / .light in styles/index.css).
        // These flip automatically, so `text-ink/60` is correct in both themes.
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        // Brand green for TEXT — darkens in light mode so it stays legible.
        // Use `primary` for fills and `accent` for type.
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        full: '9999px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        gradient: 'textGradient 6s ease infinite',
        drift: 'drift 20s linear infinite',
        // Required by the React Bits StarBorder component.
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        textGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(20px, 30px) rotate(10deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
        // Used by the Hero sync-scan overlay and scroll cue.
        scan: {
          '0%': { top: '0', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        scrollcue: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '60%': { transform: 'translateY(10px)', opacity: '0.2' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
