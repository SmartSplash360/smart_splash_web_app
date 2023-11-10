// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          lg: "1024px",
          xl: "1124px",
          "2xl": "1124px",
          "3xl": "1524px",
        },
      },
    },
  },
  darkMode: "class",
  fontFamily: {
    sans: ["Poppins", "sans-serif"],
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [require("flowbite/plugin")],
};
