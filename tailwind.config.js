/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gw: {
          red: '#E50914',
          'red-bright': '#FF1E27',
          'red-dark': '#8A030A',
          black: '#0A0E17',
          dark: '#070B12',
          navy: '#0D131F',
          card: '#0F172A',
          'card-hover': '#1E293B',
          border: '#1E293B',
          'border-light': '#334155',
          cyan: '#14B8A6',
          'cyan-bright': '#2DD4BF',
          'cyan-glow': '#22D3EE',
          'cyan-dark': '#0F766E',
          'cyan-deep': '#042F2E',
          chrome: '#E2E8F0',
          silver: '#94A3B8',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        tech: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'widest-plus': '0.25em',
      },
      boxShadow: {
        'cyan-glow': '0 4px 20px -2px rgba(45, 212, 191, 0.35)',
        'cyan-glow-lg': '0 10px 30px -4px rgba(45, 212, 191, 0.45)',
        'solid-cyan': '4px 4px 0px 0px rgba(45, 212, 191, 1)',
        'solid-dark': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'red-glow': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
