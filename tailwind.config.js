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
        surface: {
          DEFAULT: "#0b0c10",
          100: "#111827",
        },
        accent: {
          DEFAULT: "#3b82f6",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
