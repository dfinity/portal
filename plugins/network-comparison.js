const fetch = require("node-fetch").default;
const { v4: uuidv4 } = require("uuid");

/** @type {import('@docusaurus/types').PluginModule} */
const networkComparisonPlugin = async function (context, options) {
  return {
    name: "network-comparison",
    async loadContent() {
      const solanaEpochInfo = await fetch(
        "https://explorer-api.mainnet-beta.solana.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            origin: "https://explorer.solana.com",
          },
          body: JSON.stringify({
            method: "getEpochInfo",
            jsonrpc: "2.0",
            params: [],
            id: uuidv4(),
          }),
        }
      ).then((res) => res.json());

      /* sample response:
        {
          result: {
            absoluteSlot: 159073782,
            blockHeight: 143911222,
            epoch: 368,
            slotIndex: 97782,
            slotsInEpoch: 432000,
            transactionCount: 112060444765
          }
        }
      */

      const blockHeight = await fetch(
        "https://ic-api.internetcomputer.org/api/v3/block-heights"
      )
        .then((res) => res.json())
        .then((res) => +res.block_height[0][1]);

      return {
        solana: solanaEpochInfo.result,
        icp: { blockHeight },
      };
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = networkComparisonPlugin;
