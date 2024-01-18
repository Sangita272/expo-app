/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx,png,jpg}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        'east-bay': "#415877",
        'sepia-dark': "#683B11",
        'nugget': "#D29922",
        'albescent-white': "#f5ebd4",
        'janna': "#f4e9d1",
        'linen': "#fcf6eb",
        'bridal-heath': "#fffcf6",
      },
      borderRadius: {
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
      },
      fontFamily: {
        Laila: ["Laila", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Laginchy: ["Laginchy", "sans-serif"]
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/aspect-ratio')
  ],
}
