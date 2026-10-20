import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Premium koyu tema + teal accent paleti
        ink: {
          950: '#06060a',
          900: '#0a0a0f',
          800: '#111118',
          700: '#181820',
          600: '#22222c',
        },
        // Monochrome brand palette — no gold accent.
        accent: {
          "DEFAULT": "#e5e7eb",
          "50": "#ffffff",
          "100": "#f8fafc",
          "200": "#f1f5f9",
          "300": "#e5e7eb",
          "400": "#e2e8f0",
          "500": "#e5e7eb",
          "600": "#cbd5e1",
          "700": "#94a3b8",
          "800": "#64748b",
          "900": "#475569"
} ,
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.25), 0 18px 50px -12px rgba(255,255,255,0.35)',
        card: '0 12px 40px -16px rgba(0,0,0,0.7)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'radial-accent':
          'radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.16) 0%, rgba(10,10,15,0) 70%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        shimmer: 'shimmer 2s infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
      },
    },
  },
  plugins: [],
};

export default config;
