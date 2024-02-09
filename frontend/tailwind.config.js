/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    gridTemplateAreas: {
      homeLayout: [
        "header header header",
        "odin line login ",
        "footer footer footer",
      ],
      userLayout: [
        "header header header",
        "user main friends",
        "nav main friends",
      ],
    },
    gridTemplateColumns: {
      homeLayout: "1fr auto 1fr",
      userLayout: "auto 1fr 0.5fr",
    },
    gridTemplateRows: {
      homeLayout: "1fr 2fr 1fr",
      userLayout: "auto auto 1fr",
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
