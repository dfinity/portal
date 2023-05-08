const fetch = require("node-fetch-retry");

/** @type {import('@docusaurus/types').PluginModule} */
const xdrPricePlugin = async function (context, options) {
  return {
    name: "xdr-price",
    async loadContent() {
      const icpPrice = await fetch(
        "https://api.coinbase.com/v2/prices/ICP-USD/buy"
      )
        .then((res) => res.json())
        .then((res) => +res.data.amount);

      const icpXdrPrice = await fetch(
        "https://ic-api.internetcomputer.org/api/v3/icp-xdr-conversion-rates"
      )
        .then((res) => res.json())
        .then((res) => res.icp_xdr_conversion_rates[0][1] / 10000);

      return icpPrice / icpXdrPrice;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = xdrPricePlugin;
