/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '1920px',
    },
    gridTemplateAreas: {
      homeLayout: [
        "header header header",
        "odin line login ",
        "footer footer footer",
      ],
      userLayout: ["header header header", "nav main friends"],
      XXLuserLayout: [
        "header header header header header header header header header header header header",
        ". nav nav main main main main main main friends friends .",
        "footer footer footer footer footer footer footer footer footer footer footer footer"
      ],
      XLuserLayout: [
        "header header header header header header header header header header header header",
        ". nav nav main main main main main main friends friends .",
        "footer footer footer footer footer footer footer footer footer footer footer footer"
      ],
      LuserLayout: [
        "header header header header header header header header header header header .",
        "nav nav main main main main main main main friends friends friends",
        "footer footer footer footer footer footer footer footer footer footer footer footer"
      ],
      MDuserLayout: [
        "header header header header header header header header",
        "nav nav main main main main friends friends",
        "footer footer footer footer footer footer footer footer"
      ],
      SMuserLayout: [
        "header header header header",
        "nav nav nav nav",
        "main main main main",
        "friends friends friends friends",
      ],
      XSuserLayout: [
        "header header header header",
        "nav nav nav nav",
        "main main main main",
        "friends friends friends friends",
      ],
      XXSuserLayout: [
        "header header header header",
        "nav nav nav nav",
        "main main main main",
        "friends friends friends friends",
      ],
    },
    gridTemplateColumns: {
      homeLayout: "1fr auto 1fr",
      userLayout: "0.4fr 1fr 0.5fr",
      XXLuserLayout: "1fr repeat(2, minmax(min-content, max-content)) repeat(6, minmax(auto, 0.25fr)) repeat(2, minmax(min-content, max-content)) 1fr",
      XLuserLayout: "1fr repeat(2, minmax(min-content, max-content)) repeat(6, minmax(auto, 1fr)) repeat(2, minmax(min-content, max-content)) 1fr",
      LuserLayout: "repeat(2, minmax(min-content, max-content)) repeat(7, 1fr) repeat(3, minmax(min-content, max-content))",
      MDuserLayout: "repeat(2, minmax(min-content, max-content)) repeat(4, minmax(min-content, max-content)) repeat(2, minmax(min-content, max-content))",
      SMuserLayout: "repeat(4, 1fr)",
      XSuserLayout: "repeat(4, 1fr)",
      XXSuserLayout: "repeat(4, 1fr)",
    },
    gridTemplateRows: {
      homeLayout: "1fr 2fr 1fr",
      userLayout: "auto 1fr",
      XXLuserLayout: "repeat(3, minmax(100px, auto)",
      XLuserLayout: "repeat(3, minmax(100px, auto)",
      XLuserLayout: "repeat(3, minmax(100px, auto)",
      MDuserLayout: "repeat(3, minmax(100px, auto)",
      SMuserLayout: "repeat(2, minmax(min-content, max-content)) 1fr 0.4fr",
      XSuserLayout: "repeat(2, minmax(min-content, max-content)) 1fr 0.3fr",
      XXSuserLayout: "repeat(2, minmax(min-content, max-content)) 1fr 0.4fr",
    },
    extend: {
      screens: {
        'xxs': '320px',
        'xs': '375px',
      },
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
