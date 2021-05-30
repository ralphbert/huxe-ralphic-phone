// tailwind.config.js
module.exports = {
  mode: 'jit',
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.{html,ts,scss}", "./style.scss", "./scss/**/*.scss"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#ff44ff'
      }
    },
    minWidth: {
      '1/4': '25%',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
