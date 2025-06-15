/** @type {import('tailwindcss').Config} */
export default {
  // AJOUT DE CETTE LIGNE POUR ACTIVER LE BOUTON
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}