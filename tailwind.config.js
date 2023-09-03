const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        1: "1",
        "-1": "-1",
        "-10": "-10",
      },
      maxWidth: {
        page: "1440px",
        "page-10-cols": "1214px",
        "page-8-cols": "987px",
      },
      spacing: {
        12.5: "50px",
        15: "60px",
        30: "120px",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "1/12": "8.333%",
        "2/12": "16.666%",
        "3/12": "25%",
        "4/12": "33.333%",
        "5/12": "41.666%",
        "6/12": "50%",
        "7/12": "58.333%",
        "8/12": "66.666%",
        "9/12": "75%",
        "10/12": "83.333%",
        "11/12": "91.666%",
      },
      margin: {
        "1/12": "8.333333%",
        "2/12": "16.666666666%",
        "3/12": "25%",
      },
      padding: {
        "2/3": "33.333333%",
        "16/9": "56.25%",
      },
      fontWeight: {
        book: 450,
      },
      content: {
        externalLink: 'url("/static/img/svgIcons/externalLink.svg")',
        externalLinkHovered:
          'url("/static/img/svgIcons/externalLinkHovered.svg")',
      },
      backgroundImage: {
        "https-outcalls":
          "url('/static/img/https-outcalls/sample-code-bg.jpeg')",
      },
      backgroundSize: {
        stretch: "100% 100%",
      },
    },
    screens: {
      sm: "641px",
      md: "997px",
      lg: "1281px",
      xl: "1441px",
      "2xl": "1921px",
    },
    colors: {
      infinite: {
        DEFAULT: "#3B00B9",
        60: "#6E52AA",
      },
      page: {
        DEFAULT: "#F1EEF5",
      },
      transparent: "transparent",
      grey: {
        300: "#dfdfdf",
        500: "#b6b6b6",
      },
      black: {
        DEFAULT: "#181818",
        60: "rgba(24, 24, 24, 0.6)",
        30: "rgba(24, 24, 24, 0.3)",
        20: "rgba(24, 24, 24, 0.2)",
      },
      white: {
        DEFAULT: "#ffffff",
        80: "rgba(255, 255, 255, 0.8)",
        60: "rgba(255, 255, 255, 0.6)",
        50: "rgba(255, 255, 255, 0.5)",
        30: "rgba(255, 255, 255, 0.3)",
        20: "rgba(255, 255, 255, 0.2)",
        15: "rgba(255, 255, 255, 0.15)",
      },
      green: {
        DEFAULT: "#18D0B5",
      },
      red: {
        DEFAULT: "#EC008C",
      },
      razzmatazz: {
        DEFAULT: "#DA3979",
        300: "#EB318A",
      },
      blue: {
        DEFAULT: "#29ABE2",
      },
    },
    leading: {
      tight: 1.13,
    },
    fontFamily: {
      circular: ["CircularXX", "sans-serif"],
    },
    fontSize: {
      // bold
      "heading-1": ["120px", "110px"],
      "heading-2": ["75px", "75px"],
      "heading-22": ["100px", "100px"],
      "heading-50": ["50px", "50px"],
      "heading-60": ["60px", "70px"],
      "heading-3": ["40px", "50px"],
      "heading-4": ["32px", "42px"],
      "heading-44": ["22px", "22px"],
      "heading-5": ["24px", "32px"],
      "heading-6": ["18px", "26px"],
      "heading-7": ["16px", "26px"],
      "heading-7-caps": ["16px", "22px"],
      // medium
      navigation: ["16px", "22px"],
      "navigation-on-page": ["14px", "22px"],

      // book
      "title-lg": ["60px", "70px"],
      "title-sm": ["40px", "50px"],
      "lead-lg": ["32px", "42px"],
      lead: ["24px", "34px"],
      "lead-sm": ["18px", "28px"],
      paragraph: ["16px", "24px"],
      "paragraph-sm": ["14px", "22px"],

      caption: ["12px", "16px"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme("bgGradientDeg", {}), {
            141: "141deg",
            100: "100deg",
            30: "30deg",
          }),
        }
      );
    }),
    plugin(function ({ addVariant }) {
      addVariant("docs", "html.docs-doc-page &");
    }),
    plugin(({ addComponents }) => {
      // prettier-ignore
      const components = {
                ".tw-heading-1": "@apply text-heading-1 font-bold",
                ".tw-heading-2": "@apply text-heading-2 font-bold",
                ".tw-heading-22": "@apply text-heading-22 font-bold",
                ".tw-heading-50": "@apply text-heading-50 font-bold",
                ".tw-heading-60": "@apply text-heading-60 font-bold",
                ".tw-heading-3": "@apply text-heading-3 font-bold",
                ".tw-heading-4": "@apply text-heading-4 font-bold",
                ".tw-heading-44": "@apply text-heading-44 font-bold",
                ".tw-heading-5": "@apply text-heading-5 font-bold",
                ".tw-heading-6": "@apply text-heading-6 font-bold",
                ".tw-heading-7": "@apply text-heading-7 font-bold",
                ".tw-heading-7-caps": "@apply text-heading-7-caps font-bold uppercase tracking-[1px]",
                ".tw-button-sm": "@apply text-paragraph-sm font-bold tracking-[1px] uppercase",


                //
                ".tw-title-navigation": "@apply text-navigation font-medium",
                ".tw-title-navigation-on-page": "@apply text-navigation-on-page font-medium",
                //
                ".tw-title-lg": "@apply text-title-lg font-book",
                ".tw-title-sm": "@apply text-title-sm font-book",
                ".tw-lead-lg": "@apply text-lead-lg font-book",
                ".tw-lead": "@apply text-lead font-book",
                ".tw-lead-sm": "@apply text-lead-sm font-book",
                ".tw-paragraph": "@apply text-paragraph font-book",
                ".tw-paragraph-sm": "@apply text-paragraph-sm font-book",
                ".tw-caption": "@apply text-caption font-book",
                '.button-primary': '@apply inline-block bg-infinite rounded-xl text-white tw-heading-7-caps py-4 px-6 uppercase hover:no-underline hover:bg-black hover:text-white transition-colors border-none',
                '.button-white': '@apply inline-block bg-white rounded-xl text-infinite tw-heading-7-caps py-4 px-6 uppercase hover:no-underline hover:bg-white-80 hover:text-infinite transition-colors border-none',
                '.button-outline': '@apply inline-block bg-transparent rounded-xl border-2 border-black border-solid text-black tw-heading-7-caps py-[14px] px-6 uppercase hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors',
                '.button-outline-white': '@apply inline-block bg-transparent rounded-xl border-2 border-white border-solid text-white tw-heading-7-caps py-[14px] px-6 uppercase hover:no-underline hover:bg-white hover:border-white hover:text-infinite transition-colors',
                '.button-fancy': '@apply inline-flex gap-6 hover:gap-8 transition-[gap] items-center cursor-pointer from-infinite via-infinite to-razzmatazz rounded-xl text-white tw-heading-7-caps py-4 px-6 hover:no-underline hover:text-white bg-gradient-100',
                '.button-small': '@apply tw-title-navigation-on-page px-3 py-[6px] normal-case tracking-normal',
                '.button-round': '@apply tw-title-navigation px-5 py-[9px] text-infinite bg-white border border-solid border-grey-300 rounded-full hover:bg-infinite hover:border-infinite hover:text-white hover:no-underline transition-all',
                '.button-round-icon': '@apply inline-flex justify-center items-center w-10 h-10 text-infinite bg-white border border-solid border-grey-300 rounded-full hover:bg-infinite hover:border-infinite hover:text-white hover:no-underline transition-all',
                '.button-with-icon': '@apply inline-flex gap-2 items-start md:items-center',
                
                '.link-subtle': '@apply text-infinite hover:text-black hover:no-underline',
                '.link-primary': '@apply tw-heading-6 text-infinite hover:text-black hover:no-underline',
                '.link-primary-disabled': '@apply tw-heading-6 text-black/60 hover:text-black/60 hover:no-underline',
                '.link-white': '@apply tw-heading-6 text-white hover:text-white-60 hover:no-underline',
                '.link-primary-light': '@apply tw-heading-6 text-white hover:text-white-60 hover:no-underline',
                '.link-external': '@apply link-primary after:ml-2 after:content-externalLink after:hover:content-externalLinkHovered',
                '.link-with-icon': '@apply inline-flex gap-2 items-start md:items-center',
                '.container-12': '@apply max-w-page mx-auto px-6 md:px-12.5',
                '.container-10': '@apply max-w-page-10-cols mx-auto px-6 md:px-12.5',
                '.container-8': '@apply max-w-page-8-cols mx-auto px-6 md:px-12.5',
                '.checklist': '@apply list-none pl-0',
                '.checklist-item': '@apply bg-[url(\'/img/checkmark.svg\')] bg-no-repeat bg-left-top',
                '.checklist-item-white': '@apply bg-[url(\'/img/checkmark-white.svg\')] bg-no-repeat bg-left-top',
                '.blob': '@apply absolute bg-contain bg-no-repeat pointer-events-none',
                '.blob-purple': '@apply bg-[url("/img/gradientBlurredCircle.webp")] aspect-[256/232]',
                '.blob-infinite': '@apply bg-[url("/img/blob-infinite.webp")] aspect-[256/232]',
                '.blob-white': '@apply bg-[url("/img/whiteBlurredCircle.webp")] aspect-[256/251]',
                '.blob-white-dense': '@apply bg-[url("/img/blob-white-dense.webp")] aspect-[512/461]',
                '.blob-xs': '@apply w-[500px]',
                '.blob-sm': '@apply w-[800px]',
                '.blob-md': '@apply w-[1000px]',
                '.blob-lg': '@apply w-[1500px]',
                '.blob-xl': '@apply w-[2000px]',
                '.blob-center': '@apply top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                '.blob-top-left': '@apply left-0 -translate-x-6/10 top-0 bottom-auto -translate-y-1/3',
                '.blob-top-right': '@apply right-0 translate-x-6/10 top-0 bottom-auto -translate-y-1/3',
                '.blob-center-left': '@apply left-0 -translate-x-6/10 top-1/2 bottom-auto -translate-y-1/2',
                '.blob-center-right': '@apply right-0 translate-x-6/10 top-1/2 bottom-auto -translate-y-1/2',
                '.blob-bottom-left': '@apply left-0 -translate-x-6/10 top-auto bottom-0 translate-y-1/3',
                '.blob-bottom-right': '@apply right-0 translate-x-6/10 top-auto bottom-0 translate-y-1/3',
                '.blob-bottom-center': '@apply left-1/2 -translate-x-1/2 top-auto bottom-0 translate-y-1/3',

                '.blob-x-0': '@apply right-auto left-0 -translate-x-1/2',
                '.blob-x-1': '@apply right-auto left-1/10 -translate-x-1/2',
                '.blob-x-2': '@apply right-auto left-1/10 -translate-x-1/2',
                '.blob-x-3': '@apply right-auto left-3/10 -translate-x-1/2',
                '.blob-x-4': '@apply right-auto left-4/10 -translate-x-1/2',
                '.blob-x-5': '@apply right-auto left-5/10 -translate-x-1/2',
                '.blob-x-6': '@apply right-auto left-6/10 -translate-x-1/2',
                '.blob-x-7': '@apply right-auto left-7/10 -translate-x-1/2',
                '.blob-x-8': '@apply right-auto left-8/10 -translate-x-1/2',
                '.blob-x-9': '@apply right-auto left-9/10 -translate-x-1/2',
                '.blob-x-10': '@apply right-auto left-full -translate-x-1/2',
                '.blob-x-13': '@apply right-auto left-[130%] -translate-x-1/2',

                '.blob-y-0': '@apply bottom-auto top-0 -translate-y-1/2',
                '.blob-y-1': '@apply bottom-auto top-1/10 -translate-y-1/2',
                '.blob-y-2': '@apply bottom-auto top-2/10 -translate-y-1/2',
                '.blob-y-3': '@apply bottom-auto top-3/10 -translate-y-1/2',
                '.blob-y-4': '@apply bottom-auto top-4/10 -translate-y-1/2',
                '.blob-y-5': '@apply bottom-auto top-5/10 -translate-y-1/2',
                '.blob-y-6': '@apply bottom-auto top-6/10 -translate-y-1/2',
                '.blob-y-7': '@apply bottom-auto top-7/10 -translate-y-1/2',
                '.blob-y-8': '@apply bottom-auto top-8/10 -translate-y-1/2',
                '.blob-y-9': '@apply bottom-auto top-9/10 -translate-y-1/2',
                '.blob-y-10': '@apply bottom-auto top-full -translate-y-1/2',

                '.text-gradient-base': '@apply text-transparent bg-clip-text',
                '.text-gradient': '@apply text-gradient-base bg-gradient-100 from-[#3B00B9] to-[#2586B6DE]',
                '.text-gradient-denver': '@apply text-gradient-base bg-[linear-gradient(90deg,#6A85F1_22.19%,#C572EF_79.9%)]',
                '.text-gradient-green': '@apply text-gradient-base bg-[linear-gradient(48.09deg,#4DEDD3_-32.7%,#31A782_46.37%,#3B00B9_129.51%)]',
                '.input-text': '@apply block border border-solid rounded-xl tw-paragraph bg-transparent py-[14px] px-4 outline-offset-1',
                '.input-text-white': '@apply border-white-80 text-white placeholder:text-white-60',

                '.card-white': '@apply backdrop-blur-md bg-white/80 border border-white border-solid rounded-xl',
            };

      addComponents(
        Object.assign(
          {},
          ...Object.keys(components).map((key) => ({
            [key]: { [components[key]]: {} },
          }))
        )
      );
    }),
  ],
  corePlugins: { preflight: false },
};
