module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "netflix-black": "#141414",
      },
    },
  },
  plugins: [require("tailwindcss-children")],
};
