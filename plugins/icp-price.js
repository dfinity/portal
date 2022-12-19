const { default: axios } = require("axios");

/** @type {import('@docusaurus/types').PluginModule} */
const icpPricePlugin = async function (context, options) {
  return {
    name: "icp-price",
    async loadContent() {
      // const {
      //   data: { data },
      // } = await axios.get("https://api.coinbase.com/v2/prices/ICP-USD/buy");

      // .then((res) => res.json());
      // console.log(data);
      const data = { base: "ICP", currency: "USD", amount: "3.62" };

      return +data.amount;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = icpPricePlugin;
