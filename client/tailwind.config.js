/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.js"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        dark: "#131314",
        light: "#c4c3ce",
        "semi-dark": "#333537",
        primary: "#ab7aff",
        secondary: "#edab74",
        altdark: "#210102",
      },
    },
  },
  plugins: [],
};
