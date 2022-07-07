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
    },
    screens: {
      sm: "641px",
      md: "997px",
      lg: "1281px",
      xl: "1441px",
      "2xl": "1921px",
    },
    colors: {
      infinite: "#3B00B9",
      transparent: "transparent",
      black: {
        DEFAULT: "#181818",
        60: "rgba(24, 24, 24, 0.6)",
      },
      white: {
        DEFAULT: "#ffffff",
      },
      green: {
        DEFAULT: "#18D0B5",
      },
    },
    leading: {
      tight: 1.13,
    },
    fontSize: {
      "heading-1": ["120px", "130px"],
      "heading-2": ["75px", "85px"],
      "heading-3": ["40px", "50px"],
      "heading-4": ["24px", "32px"],
      "heading-5": ["18px", "28px"],
      "heading-6": ["16px", "26px"],
      "heading-6-caps": ["16px", "22px"],
      lead: ["18px", "22px"],
      "paragraph-lg": ["24px", "34px"],
      paragraph: ["18px", "22px"],
      "paragraph-sm": ["18px", "22px"],
      "paragraph-xs": ["14px", "22px"],
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
};
