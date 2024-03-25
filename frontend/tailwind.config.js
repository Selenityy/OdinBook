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
      XXShomeLayout:[
        "odin",
        "line",
        "login",
      ],
      SMhomeLayout:[
        "odin",
        "line",
        "login",
      ],
      MDhomeLayout: [
        "header header header",
        "odin line login ",
        "footer footer footer",
      ],
      homeLayout: [
        "header header header",
        "odin line login ",
        "footer footer footer",
      ],
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
      XXShomeLayout: "1fr",
      SMhomeLayout: "1fr",
      MDhomeLayout: "min-content min-content auto",
      homeLayout: "1fr auto 1fr",
      userLayout: "0.4fr 1fr 0.5fr",
      XXLuserLayout: "1fr repeat(2, minmax(min-content, max-content)) repeat(6, minmax(auto, 0.25fr)) repeat(2, minmax(min-content, max-content)) 1fr",
      XLuserLayout: "1fr repeat(2, minmax(min-content, max-content)) repeat(6, minmax(auto, 1fr)) repeat(2, minmax(min-content, max-content)) 1fr",
      LuserLayout: "repeat(2, minmax(min-content, max-content)) repeat(7, 1fr) repeat(3, minmax(min-content, max-content))",
      MDuserLayout: "repeat(2, minmax(min-content, max-content)) repeat(4, 1fr) repeat(2, 1.5fr)",
      SMuserLayout: "repeat(4, 1fr)",
      XSuserLayout: "repeat(4, 0.75fr)",
      XXSuserLayout: "repeat(4, 0.5fr)",
    },
    gridTemplateRows: {
      XXShomeLayout: "0.5fr auto 1fr",
      SMhomeLayout: "0.5fr auto 1fr",
      MDhomeLayout: "1fr 2fr 1fr",
      homeLayout: "1fr 2fr 1fr",
      XXLuserLayout: "auto 2fr auto",
      XLuserLayout: "auto 2fr auto",
      XLuserLayout: "auto 2fr auto",
      MDuserLayout: "auto minmax(auto, 2fr) auto",
      SMuserLayout: "repeat(2, min-content) auto min-content",
      XSuserLayout: "repeat(2, minmax(min-content, max-content)) 1fr 0.4fr",
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
