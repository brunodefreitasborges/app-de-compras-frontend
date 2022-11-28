/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '390px',
        'tablet': '768px',
        'desktop': '1280px',
      },
      colors: {
        primary: {
          DEFAULT: '#673AB7'
        },
        accent: {
          DEFAULT: '#FFB80D'
        },
        warn: {
          DEFAULT: '#F44336'
        }
      }
    }

  },
  plugins: [],
}
