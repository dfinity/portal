const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        page: "1440px",
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
      },
      fontWeight: {
        book: 450,
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
      },
      white: {
        DEFAULT: "#ffffff",
        50: "rgba(255, 255, 255, 0.5)",
      },
      green: {
        DEFAULT: "#18D0B5",
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
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      // prettier-ignore
      const components = {
        ".tw-heading-1": "@apply text-heading-1 font-bold",
        ".tw-heading-2": "@apply text-heading-2 font-bold",
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
