/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    gridTemplateAreas: {
      homeLayout: ["header header header", "odin line login ", "footer footer footer"],
    },
    gridTemplateColumns: {
      homeLayout: "1fr auto 1fr",
    },
    gridTemplateRows: {
      homeLayout: "1fr 2fr 1fr",
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
