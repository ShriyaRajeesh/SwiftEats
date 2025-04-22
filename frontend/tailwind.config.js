/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",  // Paths to your React components
    ],
    theme: {
      extend: {
        colors: {
          'primary-dark': '#171717',
          'secondary-gray': '#444444',
          'accent-red': '#DA0037',
          'light-bg': '#EDEDED',
        },
      },
    },
    plugins: [],
  }