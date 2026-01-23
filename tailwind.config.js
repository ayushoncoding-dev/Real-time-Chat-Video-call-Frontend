/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx, tsx}",
  ],
   daisyui: {
    themes: [
      "black",   // ⭐ default theme
      "light",
      
      // ... whatever themes you have
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

