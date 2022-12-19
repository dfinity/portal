const { default: axios } = require("axios");

/** @type {import('@docusaurus/types').PluginModule} */
const votingRewardsPlugin = async function () {
  return {
    name: "voting-rewards",
    async loadContent() {
      // const { data } = await axios.get(
      //   "https://ic-api.internetcomputer.org/api/nns/metrics"
      // );

      // console.log(JSON.stringify(data));
      data = {
        metrics: [
          {
            data_type: "Gauge",
            name: "governance_community_fund_total_maturity_e8s_equivalent",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 49421643267145 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_community_fund_total_staked_e8s",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 776852473646175 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_dissolved_neurons_count",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 96372 }],
          },
          {
            data_type: "Gauge",
            name: "governance_dissolved_neurons_e8s",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 9938593729803788 },
            ],
          },
          {
            data_type: "Histogram",
            name: "governance_dissolving_neurons_count",
            samples: [],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_count_bucket",
            samples: [
              { labels: { le: "0" }, timestamp: 1671474442119, value: 4750 },
              { labels: { le: "1" }, timestamp: 1671474442119, value: 7332 },
              { labels: { le: "2" }, timestamp: 1671474442119, value: 9064 },
              { labels: { le: "4" }, timestamp: 1671474442119, value: 9421 },
              { labels: { le: "6" }, timestamp: 1671474442119, value: 11340 },
              { labels: { le: "7" }, timestamp: 1671474442119, value: 14029 },
              { labels: { le: "3" }, timestamp: 1671474442119, value: 14705 },
              { labels: { le: "5" }, timestamp: 1671474442119, value: 14885 },
              {
                labels: { le: "+Inf" },
                timestamp: 1671474442119,
                value: 14885,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_count_count",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 14885 }],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_count_sum",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 14885 }],
          },
          {
            data_type: "Histogram",
            name: "governance_dissolving_neurons_e8s",
            samples: [],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_e8s_bucket",
            samples: [
              {
                labels: { le: "6" },
                timestamp: 1671474442119,
                value: 199029361641023,
              },
              {
                labels: { le: "3" },
                timestamp: 1671474442119,
                value: 401020121899873,
              },
              {
                labels: { le: "5" },
                timestamp: 1671474442119,
                value: 406944237031843,
              },
              {
                labels: { le: "1" },
                timestamp: 1671474442119,
                value: 2570298516465748,
              },
              {
                labels: { le: "4" },
                timestamp: 1671474442119,
                value: 2696919328318467,
              },
              {
                labels: { le: "7" },
                timestamp: 1671474442119,
                value: 2803567337704074,
              },
              {
                labels: { le: "0" },
                timestamp: 1671474442119,
                value: 7400318706524947,
              },
              {
                labels: { le: "2" },
                timestamp: 1671474442119,
                value: 8375803224751838,
              },
              {
                labels: { le: "+Inf" },
                timestamp: 1671474442119,
                value: 8375803224751838,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_e8s_count",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 8375803224751838 },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_e8s_sum",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 14885 }],
          },
          {
            data_type: "Gauge",
            name: "governance_garbage_collectable_neurons_count",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 97590 }],
          },
          {
            data_type: "Gauge",
            name: "governance_last_rewards_event_e8s",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 11061411952392 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_latest_gc_timestamp_seconds",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 1671417631 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_latest_reward_event_timestamp_seconds",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 1671465600 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_locked_neurons_total",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 0 }],
          },
          {
            data_type: "Gauge",
            name: "governance_neurons_total",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 141181 }],
          },
          {
            data_type: "Gauge",
            name: "governance_neurons_with_invalid_stake_count",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 382 }],
          },
          {
            data_type: "Gauge",
            name: "governance_neurons_with_less_than_6_months_dissolve_delay_count",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 101275 }],
          },
          {
            data_type: "Gauge",
            name: "governance_neurons_with_less_than_6_months_dissolve_delay_e8s",
            samples: [
              {
                labels: {},
                timestamp: 1671474442119,
                value: 12141790840776452,
              },
            ],
          },
          {
            data_type: "Histogram",
            name: "governance_not_dissolving_neurons_count",
            samples: [],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_count_bucket",
            samples: [
              { labels: { le: "6" }, timestamp: 1671474442119, value: 198 },
              { labels: { le: "4" }, timestamp: 1671474442119, value: 1006 },
              { labels: { le: "1" }, timestamp: 1671474442119, value: 5158 },
              { labels: { le: "3" }, timestamp: 1671474442119, value: 7227 },
              { labels: { le: "8" }, timestamp: 1671474442119, value: 18483 },
              { labels: { le: "0" }, timestamp: 1671474442119, value: 24568 },
              { labels: { le: "2" }, timestamp: 1671474442119, value: 27398 },
              { labels: { le: "5" }, timestamp: 1671474442119, value: 27793 },
              { labels: { le: "7" }, timestamp: 1671474442119, value: 28754 },
              {
                labels: { le: "+Inf" },
                timestamp: 1671474442119,
                value: 28754,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_count_count",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 28754 }],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_count_sum",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 28754 }],
          },
          {
            data_type: "Histogram",
            name: "governance_not_dissolving_neurons_e8s",
            samples: [],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_e8s_bucket",
            samples: [
              {
                labels: { le: "5" },
                timestamp: 1671474442119,
                value: 7219554162324,
              },
              {
                labels: { le: "4" },
                timestamp: 1671474442119,
                value: 236144271213329,
              },
              {
                labels: { le: "8" },
                timestamp: 1671474442119,
                value: 12661687322819368,
              },
              {
                labels: { le: "0" },
                timestamp: 1671474442119,
                value: 13762693272015362,
              },
              {
                labels: { le: "1" },
                timestamp: 1671474442119,
                value: 15065557499541456,
              },
              {
                labels: { le: "3" },
                timestamp: 1671474442119,
                value: 16002350851666032,
              },
              {
                labels: { le: "6" },
                timestamp: 1671474442119,
                value: 16298741690063380,
              },
              {
                labels: { le: "2" },
                timestamp: 1671474442119,
                value: 17471856044671936,
              },
              {
                labels: { le: "7" },
                timestamp: 1671474442119,
                value: 18071610504551256,
              },
              {
                labels: { le: "+Inf" },
                timestamp: 1671474442119,
                value: 18071610504551256,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_e8s_count",
            samples: [
              {
                labels: {},
                timestamp: 1671474442119,
                value: 18071610504551256,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_e8s_sum",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 28754 }],
          },
          {
            data_type: "Gauge",
            name: "governance_proposals_total",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 1035 }],
          },
          {
            data_type: "Gauge",
            name: "governance_ready_to_be_settled_proposals_total",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 19 }],
          },
          {
            data_type: "Gauge",
            name: "governance_seconds_since_latest_reward_event",
            samples: [{ labels: {}, timestamp: 1671474442119, value: 8842 }],
          },
          {
            data_type: "Gauge",
            name: "governance_stable_memory_size_bytes",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 503906304 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_total_memory_size_bytes",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 1067909120 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_total_staked_e8s",
            samples: [
              {
                labels: {},
                timestamp: 1671474442119,
                value: 36439581089237416,
              },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_total_supply_icp",
            samples: [
              { labels: {}, timestamp: 1671474442119, value: 493132850 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_voting_power_total",
            samples: [
              {
                labels: {},
                timestamp: 1671474442119,
                value: 43803183267384940,
              },
            ],
          },
        ],
      };

      const lastRewardEventE8s = data.metrics.find((metric) => {
        return metric.name === "governance_last_rewards_event_e8s";
      });

      if (
        lastRewardEventE8s === undefined ||
        lastRewardEventE8s.samples.length === 0
      ) {
        throw new Error(
          `governance_last_rewards_event_e8s cannot be found in metrics ${JSON.stringify(
            data.metrics
          )}`
        );
      }

      const totalVotingPowerE8s = data.metrics.find((metric) => {
        return metric.name === "governance_voting_power_total";
      });

      if (
        totalVotingPowerE8s === undefined ||
        totalVotingPowerE8s.samples.length === 0
      ) {
        throw new Error(
          `governance_voting_power_total cannot be found in metrics ${JSON.stringify(
            data.metrics
          )}`
        );
      }

      const lastRewardsEventIcp =
        +lastRewardEventE8s.samples[0].value / 100000000;
      const totalVotingPowerIcp =
        +totalVotingPowerE8s.samples[0].value / 100000000;

      return [0.5, 1, 2, 3, 4, 5, 6, 7, 8].map((dissolveDelay) => {
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
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = votingRewardsPlugin;
