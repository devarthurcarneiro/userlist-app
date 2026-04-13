/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#08090c',
          900: '#0f1117',
          800: '#181c26',
          700: '#232839',
        },
        accent: {
          DEFAULT: '#6ee7b7',
          dim: '#34d399',
          glow: 'rgba(110,231,183,0.15)',
        },
        muted: '#4b5563',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.4s ease forwards',
        shimmer: 'shimmer 1.6s linear infinite',
        modalIn: 'modalIn 0.25s ease forwards',
      },
    },
  },
  plugins: [],
}
