const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{html,njk,md}",
    "./src/**/*.11ty.js",
    "./.eleventy.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: "#ecf5ff",
          100: "#d7e9ff",
          200: "#b5d3f5",
          300: "#8ab6e6",
          400: "#5c95d4",
          500: "#3b76b8",
          600: "#2f5f99",
          700: "#274c7a",
          800: "#223e61",
          900: "#1b314c",
        },
        accent: {
          DEFAULT: "#2ec4b6",
        },
        sand: {
          50: "#fdfaf5",
          100: "#f7f0e4",
          200: "#eee0c8",
          300: "#e1cda8",
          400: "#d4b98a",
          500: "#c6a56e",
          600: "#aa8650",
          700: "#8c6b3c",
          800: "#6e5330",
          900: "#553f27",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
