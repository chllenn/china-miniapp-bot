/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        emerald: "#013220",
        graphite: "#111111",
        emeraldDark: "#0b2d24",
        graphiteDark: "#1b1b1b",
      },
    },
  },
  plugins: [],
}
