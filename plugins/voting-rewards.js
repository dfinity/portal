const fetch = require("node-fetch-retry");

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const votingRewardsPlugin = async function () {
  return {
    name: "voting-rewards",
    async loadContent() {
      if (!cache) {
        const response = await fetch(
          "https://ic-api.internetcomputer.org/api/nns/metrics",
          { method: "GET", retry: 10, pause: 500 }
        ).then((res) => res.json());

        const lastRewardEventE8s = response.metrics.find((metric) => {
          return metric.name === "governance_last_rewards_event_e8s";
        });

        if (
          lastRewardEventE8s === undefined ||
          lastRewardEventE8s.subsets.length === 0
        ) {
          throw new Error(
            `governance_last_rewards_event_e8s cannot be found in metrics ${JSON.stringify(
              response.metrics
            )}`
          );
        }

        const totalVotingPowerE8s = response.metrics.find((metric) => {
          return metric.name === "governance_voting_power_total";
        });

        if (
          totalVotingPowerE8s === undefined ||
          totalVotingPowerE8s.subsets.length === 0
        ) {
          throw new Error(
            `governance_voting_power_total cannot be found in metrics ${JSON.stringify(
              response.metrics
            )}`
          );
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
      }

      return cache;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = votingRewardsPlugin;
