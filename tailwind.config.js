/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Manrope', 'sans-serif'],
        display: ['Unbounded', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
