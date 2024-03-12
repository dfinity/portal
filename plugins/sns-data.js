const fetch = require("node-fetch-retry");
const logger = require("@docusaurus/logger");
const chunkedParallel = require("./utils/chunked-parallel");

function fetchAggregatorPage(page) {
  return fetch(
    `https://3r4gx-wqaaa-aaaaq-aaaia-cai.icp0.io/v1/sns/list/page/${page}/slow.json`
  ).then((res) => res.json());
}

let cache;

/**
 * Fetches all aggregator pages and returns a list of all dao data
 * @returns {Promise<Array>}
 */
async function fetchAllAggregatorPages(maxRetries = 5) {
  const allDaos = [];
  let page = 0;
  let retriesLeft = maxRetries;
  while (true) {
    try {
      const pageData = await fetchAggregatorPage(page);
      allDaos.push(...pageData);
      if (pageData.length < 10) {
        // reached end
        break;
      }
      page++;
      retriesLeft = maxRetries;
    } catch (e) {
      if (retriesLeft > 0) {
        logger.error(`Failed to fetch aggregator page ${page}, retrying...`);
        await new Promise((r) => setTimeout(r, 60 * 1000));
        retriesLeft--;
        continue;
      } else {
        logger.error(`Failed to fetch aggregator page ${page}, giving up.`);
        throw e;
      }
    }
  }
  return allDaos;
}

/**
 * Gets the number of proposals for a given SNS
 * @param {string} root_canister_id
 * @returns {Promise<number>}
 */
function getProposalCount(root_canister_id) {
  return fetch(
    `https://sns-api.internetcomputer.org/api/v1/snses/${root_canister_id}/proposals?limit=0`
  )
    .then((res) => res.json())
    .then((res) => res.max_proposal_index);
}

function getBuyersFromSwapMetrics(swap_canister_id) {
  return fetch(`https://${swap_canister_id}.raw.icp0.io/metrics`)
    .then((res) => res.text())
    .then((res) => +res.match(/sale_buyer_count (\d+)/)[1]);
}

/** @type {import('@docusaurus/types').PluginModule} */
const snsDataPlugin = async function (context, options) {
  return {
    name: "sns-data",
    async loadContent() {
      if (!cache) {
        // get all sns daos from aggregator
        const snsList = await fetchAllAggregatorPages();

        // keep only launched daos
        const completedDaos = snsList.filter(
          (dao) => dao.lifecycle.lifecycle === 3
        );

        logger.info(
          `Loaded ${snsList.length} daos from the aggregator, out of which ${completedDaos.length} are launched.`
        );

        const websiteDaoData = completedDaos.map((dao) => ({
          name: dao.meta.name,
          description: dao.meta.description,
          url: dao.meta.url,
          logo: dao.meta.logo,
          rootCanisterId: dao.canister_ids.root_canister_id,
          swapCanisterId: dao.canister_ids.swap_canister_id,
          icpRaised: Math.floor(dao.derived_state.buyer_total_icp_e8s / 1e8),
          participants: dao.derived_state.direct_participant_count,
          proposalCount: 0,
        }));

        // some DAO's have missing sale participants, get those from swap canister metrics
        const missingBuyersPromises = websiteDaoData
          .filter((dao) => dao.participants === null)
          .map(
            (dao) => () =>
              getBuyersFromSwapMetrics(dao.swapCanisterId).then(
                (buyers) => (dao.participants = buyers)
              )
          );
        await chunkedParallel(missingBuyersPromises, 5);

        // get proposal count for all daos
        const proposalFillPromises = websiteDaoData.map(
          (dao) => () =>
            getProposalCount(dao.rootCanisterId).then(
              (count) => (dao.proposalCount = count)
            )
        );
        await chunkedParallel(proposalFillPromises, 5);

        cache = websiteDaoData;
      }

      return cache;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("sns-data.json", JSON.stringify(content, null, 2));
    },
  };
};

module.exports = snsDataPlugin;

// snsDataPlugin().then((r) => r.loadContent());
