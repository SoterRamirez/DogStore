const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    colors: {
      ransparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [
  ],
};
