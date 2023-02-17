const fetch = require("node-fetch-retry");

/** @type {import('@docusaurus/types').PluginModule} */
const xdrPricePlugin = async function (context, options) {
  return {
    name: "xdr-price",
    async loadContent() {
      return 1.33875;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = xdrPricePlugin;
