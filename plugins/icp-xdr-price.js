const fetch = require("node-fetch-retry");

/** @type {import('@docusaurus/types').PluginModule} */
const icpXdrPricePlugin = async function (context, options) {
  return {
    name: "icp-xdr-price",
    async loadContent() {
      const icpXdrPrice = await fetch(
        "https://ic-api.internetcomputer.org/api/v3/icp-xdr-conversion-rates"
      )
        .then((res) => res.json())
        .then((res) => res.icp_xdr_conversion_rates[0][1] / 10000);

      return icpXdrPrice;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = icpXdrPricePlugin;
