module.exports = {
  plain: {
    color: "#F8F8F2",
    backgroundColor: "#181818"
  },
  styles: [
    {
      types: ["title"],
      style: {
        color: "#29ABE2" //"#BA4ADB",
      }
    },
    {
      types: ["prolog", "constant", "builtin"],
      style: {
        color: "#29ABE2" //"#FF79C6",
      }
    },
    {
      types: ["inserted", "function", "namespace"],
      style: {
        color: "#26D76D" //"#50FA7B",
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "#F68E5F" // "#FF5555",
      }
    },
    {
      types: ["changed"],
      style: {
        color: "#F68E5F" // "#FFB86C",
      }
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#F1EEF5" // "#F8F8F2",
      }
    },
    {
      types: ["string", "char", "tag", "selector"],
      style: {
        color: "#F68E5F" // "#FF79C6",
      }
    },
    {
      types: ["keyword", "variable"],
      style: {
        color: "#EB318A" // "#EB318A",
      }
    },
    {
      types: ["comment"],
      style: {
        color: "#707070" // "#6272A4",
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "#F8F8F2"
      }
    }
  ]
};
