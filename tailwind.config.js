/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5123', // NukePC Signature Fiery Nuclear Orange-Red rgb(255 81 35)
          hover: '#FF3B0A',
          dark: '#D8380F',
          glow: 'rgba(255, 81, 35, 0.35)',
        },
        'mode-black': '#000000',
        'surface-dark': '#080808',
        'soft-mist': '#FAFAFA',
        'glass-card': 'rgba(255, 255, 255, 0.04)',
        'glass-card-hover': 'rgba(255, 255, 255, 0.08)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
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
        'nuke-glow': '0 0 25px -2px rgba(255, 81, 35, 0.35)',
        'nuke-glow-lg': '0 0 50px -5px rgba(255, 81, 35, 0.45)',
        'glass-edge': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
