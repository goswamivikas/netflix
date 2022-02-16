const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "netflix-black": "#141414",
      },
      backgroundImage: {
        "netflix-background":
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url('https://cdn.hipwallpaper.com/i/98/21/dUyCkp.jpg')",
      },
    },
    screens: {
      xsm: "480px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("tailwindcss-children")],
};
