/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ include all your source files
  ],
  theme: {
    extend: {
      colors: {
        brand: "#171717",         // optional custom color
      },
    },
  },
  plugins: [],
};
