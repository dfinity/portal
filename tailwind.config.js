const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        page: "1440px",
        "page-narrow": "1214px",
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
      },
      margin: {
        "1/12": "8.333333%",
        "2/12": "16.666666666%",
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
      transparent: "transparent",
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
      },
      green: {
        DEFAULT: "#18D0B5",
      },
      razzmatazz: {
        DEFAULT: "#DA3979",
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
      "heading-2": ["75px", "85px"],
      "heading-60": ["60px", "70px"],
      "heading-3": ["40px", "50px"],
      "heading-4": ["32px", "42px"],
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
            100: "100deg",
          }),
        }
      );
    }),
    plugin(({ addComponents }) => {
      // prettier-ignore
      const components = {
        ".tw-heading-1": "@apply text-heading-1 font-bold",
        ".tw-heading-2": "@apply text-heading-2 font-bold",
        ".tw-heading-60": "@apply text-heading-60 font-bold",
        ".tw-heading-3": "@apply text-heading-3 font-bold",
        ".tw-heading-4": "@apply text-heading-4 font-bold",
        ".tw-heading-5": "@apply text-heading-5 font-bold",
        ".tw-heading-6": "@apply text-heading-6 font-bold",
        ".tw-heading-7": "@apply text-heading-7 font-bold",
        ".tw-heading-7-caps": "@apply text-heading-7-caps font-bold",

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
        '.button-outline': '@apply inline-block bg-transparent rounded-xl border-2 border-black border-solid text-black tw-heading-7-caps py-[14px] px-6 uppercase hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors',
        '.button-outline-white': '@apply inline-block bg-transparent rounded-xl border-2 border-white border-solid text-white tw-heading-7-caps py-[14px] px-6 uppercase hover:no-underline hover:bg-white hover:border-white hover:text-infinite transition-colors',
        '.button-fancy': '@apply inline-flex gap-6 hover:gap-8 transition-[gap] items-center cursor-pointer from-infinite via-infinite to-razzmatazz rounded-xl text-white tw-heading-7-caps py-4 px-6 hover:no-underline hover:text-white bg-gradient-100',
        '.button-small': '@apply tw-title-navigation-on-page px-3 py-[6px] normal-case',
        '.link-primary': '@apply tw-heading-6 text-infinite hover:text-black hover:no-underline',
        '.link-external': '@apply link-primary after:ml-2 after:content-externalLink after:hover:content-externalLinkHovered',
        //
        '.container-12': '@apply max-w-page mx-auto px-6 md:px-12.5',
        '.container-10': '@apply max-w-page-narrow mx-auto px-6 md:px-12.5',
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
