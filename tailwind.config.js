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
          'red-dark': '#B91C1C',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          'card-hover': '#F1F5F9',
          border: '#E2E8F0',
          'border-strong': '#CBD5E1',
          slate: '#0F172A',
          muted: '#64748B',
          blue: '#0284C7',
          teal: '#0D9488',
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
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'red-btn': '0 4px 14px 0 rgba(229, 9, 20, 0.35)',
        'solid-dark': '4px 4px 0px 0px rgba(15, 23, 42, 1)',
      }
    },
  },
  plugins: [],
}
