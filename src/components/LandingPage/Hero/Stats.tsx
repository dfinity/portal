import {
  getBlockCount,
  getBlockRate,
  getEthEquivTxRateMultiplier,
  getTransactionData,
  getTransactionRateV3,
  getckBTCTotalSupply,
} from "@site/src/utils/network-stats";
import React, { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ConstantRateCounter, SpringCounter } from "../PreHero/Counters";
import InfoIcon from "../PreHero/InfoIcon";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { DashboardIcon } from "./Dashboardicon";
import transitions from "@site/static/transitions.json";

function formatNumber(x: number) {
  return x
    .toLocaleString("en-US", {
      maximumFractionDigits: 0,
    })
    .replace(/,/g, "\u2019");
}

function getFigureSpacer(value) {
  const valueDigitCount = value.toString().length;
  const valueDigitCountWithApostrophes =
    valueDigitCount + Math.floor((valueDigitCount - 1) / 3);
  const scheme = `999'999'999'999'999`;
  return scheme.slice(scheme.length - valueDigitCountWithApostrophes);
}

export const TotalBlocks = () => {
  const blockInfoQuery = useQuery(["blockRate"], () =>
    Promise.all([getBlockCount(), getBlockRate()])
  );

  return (
    <motion.div
      className="backdrop-blur-lg rounded-xl text-white tw-lead-lg py-3 px-6 hidden md:block"
      variants={transitions.fadeIn}
    >
      <figure className="m-0">
        {/* <div className="mb-2 inline-grid relative left-1"> */}
        {blockInfoQuery.isFetched && blockInfoQuery.isSuccess ? (
          <>
            <ConstantRateCounter
              start={blockInfoQuery.data[0]}
              ratePerSec={blockInfoQuery.data[1]}
              format={formatNumber}
              className="col-start-1 row-start-1 text-left"
            ></ConstantRateCounter>
            {/* <span className="col-start-1 row-start-1 invisible pointer-events-none pr-[2px]">
                {getFigureSpacer(Math.floor(blockInfoQuery.data[0]))}
              </span> */}
          </>
        ) : (
          <>&nbsp;</>
        )}
        {/* </div> */}

        <figcaption className="tw-paragraph text-white/50 flex items-center gap-1">
          Blocks processed
          <Info>
            <h3 className="tw-button-xs mb-1">Throughput</h3>
            <p className="tw-caption text-white/50 mb-0">
              Capacity horizontally scales as subnet blockchains are seamlessly
              combined into one unified blockchain. Blocks and transactions per
              second are unbounded.
            </p>
          </Info>
        </figcaption>
      </figure>
    </motion.div>
  );
};

let lastUpdateTxRate = 0;
function updateRateWithJitter(): Promise<number> {
  return getTransactionRateV3("update").then((rate) => {
    if (lastUpdateTxRate === rate) {
      return Math.max(0, rate + Math.random() * 4 - 2);
    }
    lastUpdateTxRate = rate;
    return rate;
  });
}

const Info: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <span className="relative flex cursor-pointer group py-1">
      <InfoIcon className="w-4 h-4 text-white" />

      <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 p-2 bg-[#1b1034] rounded-lg text-white w-60">
        {children}
      </div>
    </span>
  );
};

export const EthEquivalentTxRate = () => {
  const multiplierQuery = useQuery(
    "ethEquivMultiplier",
    getEthEquivTxRateMultiplier
  );

  const updateTxRate = useQuery(
    ["getUpdateTxRate"],
    () => updateRateWithJitter().then((rate) => rate * multiplierQuery.data),
    {
      refetchInterval: 1000,

      enabled: !!multiplierQuery.isSuccess,
    }
  );

  return (
    <motion.div
      className="backdrop-blur-lg rounded-xl text-white tw-lead-lg py-3 px-6"
      variants={transitions.fadeIn}
    >
      <figure className="m-0 flex gap-3 justify-center md:block">
        <div className="inline-grid relative left-1 md:static md:inline">
          {updateTxRate.isFetched && updateTxRate.isSuccess ? (
            <>
              <SpringCounter
                target={updateTxRate.data}
                initialTarget={updateTxRate.data}
                initialValue={updateTxRate.data}
                format={formatNumber}
                springConfig={[3, 1, 1]}
                className="text-left col-start-1 row-start-1"
              ></SpringCounter>
              <span className="md:hidden col-start-1 row-start-1 invisible pointer-events-none pr-[2px]">
                {getFigureSpacer(Math.floor(updateTxRate.data))}
              </span>
            </>
          ) : (
            <>&nbsp;</>
          )}
        </div>

        <figcaption className="tw-paragraph-sm md:tw-paragraph text-white/50 flex items-center gap-1">
          ETH eq. TX/s
          <Info>
            <h3 className="tw-button-xs mb-1">ETH-equivalent Transactions</h3>
            <p className="tw-caption text-white/50 mb-0">
              Not all Transactions are equal. ICP performs ~80x the amount of
              computational work of Ethereum per transaction.{" "}
              <Link
                className="text-white hover:underline hover:text-white"
                href="https://wiki.internetcomputer.org/wiki/Not_all_transactions_are_equal"
              >
                Learn More
              </Link>
            </p>
          </Info>
        </figcaption>
      </figure>
    </motion.div>
  );
};

const formatBTC = (value) => {
  return value.toFixed(4);
};

const formatNumberStats = (value, decimals = 2) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const CkBTCTotalSupply = () => {
  const {
    data: totalSupply,
    isSuccess,
    isError,
  } = useQuery("ckBTCTotalSupply", getckBTCTotalSupply);
  const [formattedSupply, setFormattedSupply] = useState(null);

  useEffect(() => {
    if (isSuccess && totalSupply !== null) {
      setFormattedSupply(formatBTC(totalSupply));
    } else if (isError) {
      setFormattedSupply("250+");
    }
  }, [isSuccess, isError, totalSupply]);

  return (
    <motion.div
      className="rounded-xl bg-black/25 backdrop-blur-md text-white tw-lead-lg py-3 px-6"
      variants={transitions.fadeIn}
    >
      <figure className="m-0 flex gap-3 justify-center md:block">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {formattedSupply !== null ? (
            <span className="text-left">{formattedSupply}</span>
          ) : (
            <>&nbsp;</>
          )}
        </div>

        <figcaption className="tw-paragraph-sm md:tw-paragraph text-white/50 flex items-center gap-1 relative z-[3]">
          ckBTC Total Supply
          <Info>
            <h3 className="tw-button-xs mb-1">ckBTC Total Supply</h3>
            <p className="tw-caption text-white/50 mb-0">
              The total supply of ckBTC tokens, which is the amount of ckBTC
              tokens that have been minted minus the amount that have been
              burned.
            </p>
          </Info>
        </figcaption>
      </figure>
    </motion.div>
  );
};

export const TransactionStats = () => {
  const { data, isSuccess, isError } = useQuery(
    "transactionData",
    getTransactionData
  );
  const [formattedData, setFormattedData] = useState({
    dailyVolume: null,
    totalTransactions: null,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setFormattedData({
        dailyVolume: formatNumberStats(data.dailyVolume, 4),
        totalTransactions: formatNumberStats(data.totalTransactions, 0),
      });
    } else if (isError) {
      setFormattedData({
        dailyVolume: "10+",
        totalTransactions: "1M+",
      });
    }
  }, [isSuccess, isError, data]);

  return (
    <>
      <motion.div
        className="rounded-xl bg-black/25 backdrop-blur-md text-white tw-lead-lg py-3 px-6"
        variants={transitions.fadeIn}
      >
        <figure className="m-0 flex gap-3 justify-center md:block">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {" "}
            {formattedData.totalTransactions !== null ? (
              <span className="text-left">
                {formattedData.totalTransactions}
              </span>
            ) : (
              <>&nbsp;</>
            )}
          </div>

          <figcaption className="tw-paragraph-sm md:tw-paragraph text-white/50 flex items-center gap-1 relative z-[3]">
            ckBTC Transactions{" "}
            <Info>
              <h3 className="tw-button-xs mb-1">cckBTC Transactions</h3>
              <p className="tw-caption text-white/50 mb-0">
                The amount of ckBTC tokens transferred, minted, or burned, or
                for "approve" transactions, the designated amount of ckBTC
                tokens that the "Spender Account" is authorized to transfer on
                behalf of the "From" account.
              </p>
            </Info>
          </figcaption>
        </figure>
      </motion.div>
      <motion.div
        className="rounded-xl bg-black/25 backdrop-blur-md text-white tw-lead-lg py-3 px-6"
        variants={transitions.fadeIn}
      >
        <figure className="m-0 flex gap-3 justify-center md:block">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {" "}
            {formattedData.dailyVolume !== null ? (
              <span className="text-left">{formattedData.dailyVolume}</span>
            ) : (
              <>&nbsp;</>
            )}
          </div>

          <figcaption className="tw-paragraph-sm md:tw-paragraph text-white/50 flex items-center gap-1 relative z-[3]">
            Daily Volume{" "}
            <Info>
              <h3 className="tw-button-xs mb-1">ckBTC Volume</h3>
              <p className="tw-caption text-white/50 mb-0">
                The volume of ckBTC tokens transferred, minted, or burned. Date
                ranges of one month or longer show daily volume, while shorter
                date ranges show hourly volume. The total volume shown in the
                chart header is the total for the selected date range.
              </p>
            </Info>
          </figcaption>
        </figure>
      </motion.div>
    </>
  );
};

export const SmartContractMemory = () => {
  return (
    <motion.div
      className="backdrop-blur-lg rounded-xl text-white tw-lead-lg py-3 px-6  hidden md:block"
      variants={transitions.fadeIn}
    >
      <figure className="m-0">
        $5 <span className="tw-lead-sm">/GB/year</span>
        <figcaption className="tw-paragraph text-white/50 flex items-center gap-1">
          Smart Contract Memory
          <Info>
            <h3 className="tw-button-xs mb-1">Memory is $5/GB/year</h3>
            <p className="tw-caption text-white/50 mb-0">
              Each canister smart contract running on ICP can make 400 GiB of
              persistent memory pages available to its bytecode (orthogonal
              persistence allows data structures to be used like databases).
            </p>
          </Info>
        </figcaption>
      </figure>
    </motion.div>
  );
};

export const LiveStats = () => {
  return (
    <motion.div
      className="backdrop-blur-lg rounded-xl py-3 px-6  hidden md:flex"
      variants={transitions.fadeIn}
    >
      <Link
        href="https://dashboard.internetcomputer.org/"
        className="text-white tw-heading-6 inline-flex gap-2 items-center justify-end hover:no-underline hover:text-white/60 transition-all"
      >
        <DashboardIcon />
        See live stats
      </Link>
    </motion.div>
  );
};

export const CkBTCLiveStats = () => {
  return (
    <motion.div
      className="bg-black/25 backdrop-blur-md rounded-xl py-3 px-6 md:flex"
      variants={transitions.fadeIn}
    >
      <Link
        href="https://dashboard.internetcomputer.org/bitcoin"
        className="text-white tw-heading-6 inline-flex gap-2 items-center justify-end hover:no-underline hover:text-white/60 transition-all"
      >
        <DashboardIcon />
        See live stats
      </Link>
    </motion.div>
  );
};
