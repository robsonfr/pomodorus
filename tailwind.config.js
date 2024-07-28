/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./www/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'logo-image' : "url('/img/logo2.png')",
      }
    },
  },
  plugins: [],
}

