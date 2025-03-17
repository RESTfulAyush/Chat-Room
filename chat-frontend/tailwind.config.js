/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#00246b",
        secondary: "#8ab6f9",
        background: "#f0f5ff",
      },
    },
  },
  plugins: [],
};
