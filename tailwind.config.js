/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nueva paleta de colores para el rediseño
        climwayBg: '#0f172a',           // Fondo navy oscuro
        climwayCard: '#1e3a4c',         // Tarjetas teal oscuro
        climwayCardLight: '#f5f0e8',    // Tarjetas del pronóstico (beige/crema)
        climwayAccent: '#0d9488',       // Acento teal
        climwayText: '#94a3b8',         // Texto secundario
        climwayBorder: '#2d4a5e',       // Bordes de tarjetas
      }
    },
  },
  plugins: [],
}