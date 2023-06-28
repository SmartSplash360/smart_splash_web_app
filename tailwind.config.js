// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
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
    blue: "#001F5B",
    "light-blue": "#0096FA",
    "dark-light-blue": "#001F5B",
    "ligher-blue": "#f2faff",
    yellow: "#FFC520",
    "yellow-gold": "#CCB300",
    "grey-silver": "#979797",
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
  plugins: [],
  darkMode: "class",
};
