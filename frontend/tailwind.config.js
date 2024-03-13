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
      userLayout: ["header header", "user main", "nav main"],
    },
    gridTemplateColumns: {
      homeLayout: "1fr auto 1fr",
      userLayout: "0.3fr 1fr",
    },
    gridTemplateRows: {
      homeLayout: "1fr 2fr 1fr",
      userLayout: "auto auto 1fr",
    },
    extend: {
      dropShadow: {
        glow: [
          "0 0px 2px rgba(255,255, 255, 0.35)",
          "0 0px 5px rgba(255, 255,255, 0.2)",
        ],
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
