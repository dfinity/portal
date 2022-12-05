const fetch = require("node-fetch").default;

/** @type {import('@docusaurus/types').PluginModule} */
const icpPricePlugin = async function (context, options) {
  return {
    name: "icp-price",
    async loadContent() {
      const ticker = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr?symbol=ICPUSDT"
      ).then((res) => res.json());

      console.log(JSON.stringify(ticker, null, 2));

      return +ticker.lastPrice;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = icpPricePlugin;
