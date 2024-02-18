/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    padding: {
      main: "60px",
    },
    extend: {
      backgroundColor: {
        "bg-brown-main-50": "#8B7D6B",
      },
      colors: {
        "color-yellow-main": "#FFB40C",
      },
    },
  },
  plugins: [],
}

