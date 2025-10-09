/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This covers all your React component files
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
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        hotelhubtheme: {
          "primary": "#1e3a8a",    // blue-800 for Primary text
          "secondary": "#f5f1e9",  // slate-500 for Secondary text
          "accent": "#f97316",     // pink-600 for Accent text
          "info": "#60a5fa",       // blue-500 for Info text
          "success": "#22c55e",    // green-600 for Success text
          "warning": "#facc15",    // yellow-400 for Warning text
          "error": "#ef4444",      // red-600 for Error text

          // Optional background & other colors
          "base-100": "#ffffff",
          "neutral": "#6b7280",
          "base-content": "#111827",
        },
      },
      "light", // keep default light theme as fallback if needed
    ],
  },
}
