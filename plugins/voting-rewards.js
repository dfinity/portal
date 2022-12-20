const fetch = require("node-fetch-retry");

/** @type {import('@docusaurus/types').PluginModule} */
const votingRewardsPlugin = async function () {
  return {
    name: "voting-rewards",
    async loadContent() {
      // const response = await fetch(
      //   "https://ic-api.internetcomputer.org/api/nns/metrics",
      //   { method: "GET", retry: 10, pause: 500 }
      // ).then((res) => res.json());

      const response = {
        metrics: [
          {
            data_type: "Gauge",
            name: "governance_community_fund_total_maturity_e8s_equivalent",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 49854812188306 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_community_fund_total_staked_e8s",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 776885954707092 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_dissolved_neurons_count",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 96580 }],
          },
          {
            data_type: "Gauge",
            name: "governance_dissolved_neurons_e8s",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 9943191352084384 },
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
              { labels: { le: "6" }, timestamp: 1671554036023, value: 1928 },
              { labels: { le: "7" }, timestamp: 1671554036023, value: 4631 },
              { labels: { le: "0" }, timestamp: 1671554036023, value: 9382 },
              { labels: { le: "1" }, timestamp: 1671554036023, value: 11968 },
              { labels: { le: "4" }, timestamp: 1671554036023, value: 12326 },
              { labels: { le: "2" }, timestamp: 1671554036023, value: 14052 },
              { labels: { le: "3" }, timestamp: 1671554036023, value: 14726 },
              { labels: { le: "5" }, timestamp: 1671554036023, value: 14906 },
              {
                labels: { le: "+Inf" },
                timestamp: 1671554036023,
                value: 14906,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_count_count",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 14906 }],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_count_sum",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 14906 }],
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
                labels: { le: "3" },
                timestamp: 1671554036023,
                value: 201986280972790,
              },
              {
                labels: { le: "0" },
                timestamp: 1671554036023,
                value: 4789592575697194,
              },
              {
                labels: { le: "6" },
                timestamp: 1671554036023,
                value: 4988787647257164,
              },
              {
                labels: { le: "1" },
                timestamp: 1671554036023,
                value: 7154085284339612,
              },
              {
                labels: { le: "7" },
                timestamp: 1671554036023,
                value: 7260737566078448,
              },
              {
                labels: { le: "4" },
                timestamp: 1671554036023,
                value: 7387246110292540,
              },
              {
                labels: { le: "5" },
                timestamp: 1671554036023,
                value: 7393185851988025,
              },
              {
                labels: { le: "2" },
                timestamp: 1671554036023,
                value: 8366457996724621,
              },
              {
                labels: { le: "+Inf" },
                timestamp: 1671554036023,
                value: 8366457996724621,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_e8s_count",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 8366457996724621 },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_dissolving_neurons_e8s_sum",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 14906 }],
          },
          {
            data_type: "Gauge",
            name: "governance_garbage_collectable_neurons_count",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 97786 }],
          },
          {
            data_type: "Gauge",
            name: "governance_last_rewards_event_e8s",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 11057793136190 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_latest_gc_timestamp_seconds",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 1671532729 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_latest_reward_event_timestamp_seconds",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 1671552000 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_locked_neurons_total",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 0 }],
          },
          {
            data_type: "Gauge",
            name: "governance_neurons_total",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 141389 }],
          },
          {
            data_type: "Gauge",
            name: "governance_neurons_with_invalid_stake_count",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 382 }],
          },
          {
            data_type: "Gauge",
            name: "governance_neurons_with_less_than_6_months_dissolve_delay_count",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 101452 }],
          },
          {
            data_type: "Gauge",
            name: "governance_neurons_with_less_than_6_months_dissolve_delay_e8s",
            samples: [
              {
                labels: {},
                timestamp: 1671554036023,
                value: 12140986503702668,
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
              { labels: { le: "1" }, timestamp: 1671554036023, value: 4153 },
              { labels: { le: "2" }, timestamp: 1671554036023, value: 6984 },
              { labels: { le: "3" }, timestamp: 1671554036023, value: 9056 },
              { labels: { le: "5" }, timestamp: 1671554036023, value: 9451 },
              { labels: { le: "4" }, timestamp: 1671554036023, value: 10259 },
              { labels: { le: "6" }, timestamp: 1671554036023, value: 10457 },
              { labels: { le: "8" }, timestamp: 1671554036023, value: 21735 },
              { labels: { le: "0" }, timestamp: 1671554036023, value: 27839 },
              { labels: { le: "7" }, timestamp: 1671554036023, value: 28804 },
              {
                labels: { le: "+Inf" },
                timestamp: 1671554036023,
                value: 28804,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_count_count",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 28804 }],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_count_sum",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 28804 }],
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
                labels: { le: "4" },
                timestamp: 1671554036023,
                value: 228948874645289,
              },
              {
                labels: { le: "5" },
                timestamp: 1671554036023,
                value: 236173928807613,
              },
              {
                labels: { le: "6" },
                timestamp: 1671554036023,
                value: 532574721406731,
              },
              {
                labels: { le: "7" },
                timestamp: 1671554036023,
                value: 1132349754755792,
              },
              {
                labels: { le: "1" },
                timestamp: 1671554036023,
                value: 2435256790551465,
              },
              {
                labels: { le: "3" },
                timestamp: 1671554036023,
                value: 3372080553444419,
              },
              {
                labels: { le: "8" },
                timestamp: 1671554036023,
                value: 15798549446053712,
              },
              {
                labels: { le: "0" },
                timestamp: 1671554036023,
                value: 16900002343734430,
              },
              {
                labels: { le: "2" },
                timestamp: 1671554036023,
                value: 18073126599457800,
              },
              {
                labels: { le: "+Inf" },
                timestamp: 1671554036023,
                value: 18073126599457800,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_e8s_count",
            samples: [
              {
                labels: {},
                timestamp: 1671554036023,
                value: 18073126599457800,
              },
            ],
          },
          {
            data_type: "Untyped",
            name: "governance_not_dissolving_neurons_e8s_sum",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 28804 }],
          },
          {
            data_type: "Gauge",
            name: "governance_proposals_total",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 1027 }],
          },
          {
            data_type: "Gauge",
            name: "governance_ready_to_be_settled_proposals_total",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 4 }],
          },
          {
            data_type: "Gauge",
            name: "governance_seconds_since_latest_reward_event",
            samples: [{ labels: {}, timestamp: 1671554036023, value: 2036 }],
          },
          {
            data_type: "Gauge",
            name: "governance_stable_memory_size_bytes",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 503906304 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_total_memory_size_bytes",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 1067909120 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_total_staked_e8s",
            samples: [
              {
                labels: {},
                timestamp: 1671554036023,
                value: 36436985988993540,
              },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_total_supply_icp",
            samples: [
              { labels: {}, timestamp: 1671554036023, value: 493136059 },
            ],
          },
          {
            data_type: "Gauge",
            name: "governance_voting_power_total",
            samples: [
              {
                labels: {},
                timestamp: 1671554036023,
                value: 43803616543775730,
              },
            ],
          },
        ],
      };

      // console.log(JSON.stringify(response));

      const lastRewardEventE8s = response.metrics.find((metric) => {
        return metric.name === "governance_last_rewards_event_e8s";
      });

      if (
        lastRewardEventE8s === undefined ||
        lastRewardEventE8s.samples.length === 0
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
        totalVotingPowerE8s.samples.length === 0
      ) {
        throw new Error(
          `governance_voting_power_total cannot be found in metrics ${JSON.stringify(
            response.metrics
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
