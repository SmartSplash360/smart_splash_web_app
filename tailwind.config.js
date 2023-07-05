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
  colors: {
    'bg-dark' : '#31353F',
    'bg-dark-container' : '#1B2028',
    'dark-green' : '#0291BF',
    'green' : '#D4ECF4',
    'light-green' : '#009F10',
    'red' : '#BF0202',
    'white' : '#FFF',
    'black' : '#000',      
    "grey-2": "#C8C8D2",
    "grey-3": "#73737D",
    "grey-4": "#8B8989",
    "grey-5": "#6A6868",
    "grey-6": "#454343",
    "grey-7": "#C4C4C4",
    "grey-8": "#F7F7F7",
    "grey-9": "#D1D1D1",
    "grey-10": "#EFEFF0",
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
