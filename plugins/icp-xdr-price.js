const fetch = require("node-fetch-retry");

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const icpXdrPricePlugin = async function (context, options) {
  return {
    name: "icp-xdr-price",
    async loadContent() {
      if (!cache) {
        const icpXdrPrice = await fetch(
          "https://ic-api.internetcomputer.org/api/v3/icp-xdr-conversion-rates"
        )
          .then((res) => res.json())
          .then((res) => res.icp_xdr_conversion_rates[0][1] / 10000);

        cache = icpXdrPrice;
      }
      return cache;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = icpXdrPricePlugin;
