/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans Thai', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
