/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        doctortheme: {
          primary: '#0FCFEC',
          secondary: '#19D3AE',
          info: '#E1A2B8',
          danger: '#FFDEDE',
          accent: "#16213E",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}