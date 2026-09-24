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
          black: '#070709',
          card: '#0f0f15',
          'card-hover': '#161622',
          border: '#232332',
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
        'red-glow': '0 0 25px -5px rgba(229, 9, 20, 0.45)',
        'red-glow-lg': '0 0 45px -5px rgba(229, 9, 20, 0.7)',
        'solid-red': '4px 4px 0px 0px rgba(229, 9, 20, 1)',
        'solid-dark': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
}
