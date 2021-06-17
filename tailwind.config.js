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
        primary: '#FF019A',
        ...['#e6018b', '#cc017b', '#b3016c', '#99015c', '#80014d', '#66003e', '#4c002e', '#33001f', '#19000f'].reduce((all, cur, index) => {
          all[`primary-${(index + 1) * 100}`] = cur;
          return all;
        }, {}),
        secondary: '#00F1FF',
      }
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
