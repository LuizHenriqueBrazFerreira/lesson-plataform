/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        'btn-orange': '#e06915',
        'bg-login': 'rgba(214, 40, 31, 0.6)',
      },
      backgroundImage: {
        'bg-image-login': "url('/src/assets/background.png')",
        'eye': "url('/src/assets/eye.png')",
        'eye-slash': "url('/src/assets/eye-slash.png')",
      },
      fontSize: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
});

