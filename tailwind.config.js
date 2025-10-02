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
        // Define tus colores personalizados aquí.
        // Puedes usar los valores hexadecimales que mejor representen tu logo.
        // Estos son ejemplos basados en el degradado anterior:
        climwayBlue: '#3B82F6',   // Un azul similar al from-blue-500
        climwayPurple: '#9333EA', // Un púrpura similar al to-purple-600
        climwayDarkBlue: '#2563EB', // Un tono un poco más oscuro si lo prefieres para el fondo de la tarjeta
        climwayDarkPurple: '#7E22CE', // Un tono más oscuro del púrpura
      }
    },
  },
  plugins: [],
}