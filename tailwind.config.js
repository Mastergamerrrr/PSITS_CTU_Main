/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // PSITS design tokens — see design.md
        primary:          '#0066FF',
        'primary-hover':  '#0052CC',
        'primary-neutral':'#B9D2FA',
        secondary:        '#F5B800',
        'bg-dark':        '#0B3B8F',
        'bg-light':       '#F1F6FF',
        'text-primary':   '#14213D',
        'text-body':      '#3C445A',
        'text-muted':     '#64748B',
        'border-light':   '#B9D2FA',
        'border-dark':    '#2E63AD',
        'surface-dark':   '#164C9C',
        'surface-white':  '#FFFFFF',
        positive:         '#2EAD4B',
        warning:          '#FFD11A',
        negative:         '#D03238',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        soft: '0 20px 60px -44px rgba(11, 59, 143, 0.32)',
        float: '0 28px 70px -46px rgba(0, 102, 255, 0.38)',
      },
    },
  },
  plugins: [],
};
