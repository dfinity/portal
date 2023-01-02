const fetch = require("node-fetch").default;

/** @type {import('@docusaurus/types').PluginModule} */
const icpPricePlugin = async function (context, options) {
  return {
    name: "icp-price",
    async loadContent() {
      const ticker = await fetch(
        "https://api.coinbase.com/v2/prices/ICP-USD/buy"
      ).then((res) => res.json());

      return +ticker.data.amount;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = icpPricePlugin;
