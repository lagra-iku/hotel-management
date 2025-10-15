/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false, // disable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Inter", "serif"],
      },
      colors: {
        powderBlue: "#B0E0E6",
        deepSeaBlue: "#4682B4",
        lightSteelBlue: "#A2C8D9",
        charcoalGray: "#36454F",
        tealGreen: "#008080",
        champagne: "#F7E7CE",
        ivory: "#FFFFF0",
      },
    },
  },
  plugins: [],
};
