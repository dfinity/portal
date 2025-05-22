const fetch = require("node-fetch-retry");

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const votingRewardsPlugin = async function () {
  return {
    name: "voting-rewards",
    async loadContent() {
      if (!cache) {
        try {
          console.log("Fetching staking metrics...");
          const response = await fetch(
            "https://ic-api.internetcomputer.org/api/v3/staking-metrics",
            { method: "GET", retry: 10, pause: 500 }
          ).then((res) => res.json());

          console.log("API Response:", JSON.stringify(response, null, 2));

          if (!response.metrics || !Array.isArray(response.metrics)) {
            throw new Error(
              `Invalid response structure: ${JSON.stringify(response)}`
            );
          }

          if (response.metrics.length === 0) {
            console.warn(
              "No metrics found in API response, using fallback data"
            );
            // Return fallback data instead of crashing
            cache = generateFallbackData();
            return cache;
          }

          const lastRewardEventE8s = response.metrics.find((metric) => {
            return metric.name === "governance_last_rewards_event_e8s";
          });

          const totalVotingPowerE8s = response.metrics.find((metric) => {
            return metric.name === "governance_voting_power_total";
          });

          if (!lastRewardEventE8s || !totalVotingPowerE8s) {
            console.warn("Required metrics not found, using fallback data");
            console.log(
              "Available metrics:",
              response.metrics.map((m) => m.name)
            );
            cache = generateFallbackData();
            return cache;
          }

          const lastRewardsEventIcp =
            +lastRewardEventE8s.subsets[0].value[1] / 100000000;
          const totalVotingPowerIcp =
            +totalVotingPowerE8s.subsets[0].value[1] / 100000000;

          cache = [0.5, 1, 2, 3, 4, 5, 6, 7, 8].map((dissolveDelay) => {
            const dissolveDelayBonus = 1 + dissolveDelay / 8;
            const dailyRewardsIcpPerVotingPowerUnit =
              lastRewardsEventIcp / totalVotingPowerIcp;
            const estimatedRewardsIcpPerVotingPowerUnit =
              dailyRewardsIcpPerVotingPowerUnit * dissolveDelayBonus;
            return {
              dissolveDelay,
              reward: estimatedRewardsIcpPerVotingPowerUnit * 365.25 * 100,
            };
          });
        } catch (error) {
          console.error("Error fetching staking metrics:", error);
          console.warn("Using fallback data due to API error");
          cache = generateFallbackData();
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

// Fallback data function
function generateFallbackData() {
  return [0.5, 1, 2, 3, 4, 5, 6, 7, 8].map((dissolveDelay) => {
    // Use reasonable default values
    const dissolveDelayBonus = 1 + dissolveDelay / 8;
    const baseReward = 10; // 10% base annual reward as fallback
    return {
      dissolveDelay,
      reward: baseReward * dissolveDelayBonus,
    };
  });
}

module.exports = votingRewardsPlugin;
