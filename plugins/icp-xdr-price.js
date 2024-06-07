const fetch = require("node-fetch-retry");

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const icpXdrPricePlugin = async function (context, options) {
  return {
    name: "icp-xdr-price",
    async loadContent() {
      if (!cache) {
        try {
          const response = await fetch(
            "https://ic-api.internetcomputer.org/api/v3/icp-xdr-conversion-rates"
          );
          const data = await response.json();

          if (
            data &&
            Array.isArray(data.icp_xdr_conversion_rates) &&
            data.icp_xdr_conversion_rates.length > 0 &&
            Array.isArray(data.icp_xdr_conversion_rates[0]) &&
            data.icp_xdr_conversion_rates[0].length > 1
          ) {
            cache = data.icp_xdr_conversion_rates[0][1] / 10000;
          } else {
            throw new Error("Unexpected response structure");
          }
        } catch (error) {
          console.error("Failed to fetch ICP-XDR conversion rates:", error);
          cache = null;
        }
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
