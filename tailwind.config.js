/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(18,18,18,1) 5%, rgba(0,81,103,1) 50%, rgba(18,18,18,1) 95%)',
      },
    },
  },
  plugins: [],
}

