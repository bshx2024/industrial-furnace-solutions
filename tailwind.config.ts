/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        furnace: {
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          950: '#431407',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
