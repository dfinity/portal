import Link from "@docusaurus/Link";
import {
  getBlockCount,
  getBlockRate,
  getEthEquivTxRateMultiplier,
  getSubnetCount,
  getTransactionRate,
  getTransactionRateV3,
} from "@site/src/utils/network-stats";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import AnimateSpawn from "../../Common/AnimateSpawn";
import { CostSvg } from "./CostSvg";
import { ConstantRateCounter, SpringCounter } from "./Counters";
import InfoIcon from "./InfoIcon";

function formatNumber(x: number) {
  return x
    .toLocaleString("en-US", {
      maximumFractionDigits: 0,
    })
    .replace(/,/g, "\u2019");
}

function formatStateSize(x: number) {
  return (
    (x / 1000000000000).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }) + " TB"
  );
}

let lastTxRate = 0;
function transactionRateWithJitter(): Promise<number> {
  return getTransactionRate().then((rate) => {
    if (lastTxRate === rate) {
      return Math.max(0, rate + Math.random() * 40 - 20);
    }
    lastTxRate = rate;
    return rate;
  });
}

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

function getFigureSpacer(value) {
  const valueDigitCount = value.toString().length;
  const valueDigitCountWithApostrophes =
    valueDigitCount + Math.floor((valueDigitCount - 1) / 3);
  const scheme = `999'999'999'999'999`;
  return scheme.slice(scheme.length - valueDigitCountWithApostrophes);
}

function TotalBlocks() {
  const blockInfoQuery = useQuery(["blockRate"], () =>
    Promise.all([getBlockCount(), getBlockRate()])
  );
  return (
    <div className="tw-title-sm md:tw-title-lg mb-2 inline-grid relative left-3">
      {blockInfoQuery.isFetched && blockInfoQuery.isSuccess ? (
        <>
          <ConstantRateCounter
            start={blockInfoQuery.data[0]}
            ratePerSec={blockInfoQuery.data[1]}
            format={formatNumber}
            className="text-transparent bg-clip-text hero-stat-red col-start-1 row-start-1 text-left"
          ></ConstantRateCounter>
          <span className="col-start-1 row-start-1 invisible pointer-events-none pr-[2px]">
            {getFigureSpacer(Math.floor(blockInfoQuery.data[0]))}
          </span>
        </>
      ) : (
        <>&nbsp;</>
      )}
    </div>
  );
}

function ParallelSubnets(): JSX.Element {
  const subnetCountQuery = useQuery(["subnetCount"], getSubnetCount);
  return (
    <>
      {subnetCountQuery.isFetched && subnetCountQuery.isSuccess ? (
        subnetCountQuery.data
      ) : (
        <>&nbsp;&nbsp;</>
      )}
    </>
  );
}

function BlockThroughput(): JSX.Element {
  const finalizationRate = useQuery(["getFinalizationRate"], getBlockRate);
  return (
    <>
      {finalizationRate.isFetched && finalizationRate.isSuccess ? (
        finalizationRate.data.toFixed(1)
      ) : (
        <>&nbsp;&nbsp;&nbsp;&nbsp;</>
      )}
    </>
  );
}

function EthEquivalentTxRate({
  gagueValue,
}: {
  gagueValue: MotionValue<number>;
}) {
  const multiplierQuery = useQuery(
    "ethEquivMultiplier",
    getEthEquivTxRateMultiplier
  );

  const updateTxRate = useQuery(
    ["getUpdateTxRate"],
    () => updateRateWithJitter().then((rate) => rate * multiplierQuery.data),
    {
      refetchInterval: 1000,
      onSuccess(data) {
        gagueValue.set(data);
      },
      enabled: !!multiplierQuery.isSuccess,
    }
  );
  return (
    <div className="tw-title-sm md:tw-title-lg mb-2 inline-grid relative left-1">
      {updateTxRate.isFetched && updateTxRate.isSuccess ? (
        <>
          <SpringCounter
            target={updateTxRate.data}
            initialTarget={updateTxRate.data}
            initialValue={updateTxRate.data}
            format={formatNumber}
            springConfig={[3, 1, 1]}
            className="text-left col-start-1 row-start-1 text-transparent  bg-clip-text hero-stat-blue"
          ></SpringCounter>
          <span className="col-start-1 row-start-1 invisible pointer-events-none pr-[2px]">
            {getFigureSpacer(Math.floor(updateTxRate.data))}
          </span>
        </>
      ) : (
        <>&nbsp;</>
      )}
    </div>
  );
}

function ICPTransactionRate() {
  const transactionRateQuery = useQuery(
    ["transactionRate"],
    transactionRateWithJitter,
    {
      refetchInterval: 1000,
    }
  );
  return (
    <div className="inline-grid">
      {transactionRateQuery.isFetched && transactionRateQuery.isSuccess ? (
        <>
          <SpringCounter
            target={transactionRateQuery.data}
            initialTarget={transactionRateQuery.data}
            initialValue={transactionRateQuery.data}
            format={formatNumber}
            springConfig={[3, 1, 1]}
            className="text-left col-start-1 row-start-1"
          ></SpringCounter>
          <span className="col-start-1 row-start-1 invisible pointer-events-none pr-[2px]">
            {getFigureSpacer(Math.floor(transactionRateQuery.data))}
          </span>
        </>
      ) : (
        // formatNumber(transactionRateQuery.data)
        <>&nbsp;&nbsp;</>
      )}
    </div>
  );
}

const StatSlot: React.FC<{ children: React.ReactNode; index: number }> = ({
  children,
  index,
}) => {
  return (
    <AnimateSpawn
      className="md:border-0 md:odd:border-r md:border-solid md:border-white/20 overflow-hidden"
      variants={transitions.container}
    >
      <div className="text-center h-full flex flex-col md:pt-20 md:mx-[2px]">
        <div className="flex-1 flex flex-col md:px-10 lg:px-1/12 xl:px-2/12">
          {children}
        </div>
        <div
          className={clsx(
            "border-0 border-b border-solid border-white/20 h-20",
            index < 2 ? "border-0 md:border-b" : "border-b md:border-0"
          )}
        ></div>
      </div>
    </AnimateSpawn>
  );
};

export const Facts = () => {
  const ethTxValue = useMotionValue(0);

  const gaugeRot = useTransform(ethTxValue, [0, 300000], [20, 160]);

  return (
    <>
      <div className="" id="stats">
        <h2 className="tw-heading-4 md:tw-heading-60 mb-20 md:mb-20 md:w-[880px] mx-auto text-center">
          Autonomous cloud <br /> from a public network
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-0 text-white mb-20 md:mb-30">
        {/***************************************************************/}
        <StatSlot index={0}>
          <div className="">
            <img
              src={require("./blocks.webp").default}
              loading="lazy"
              alt=""
              className="w-[141px]"
            ></img>
            <div className="text-center mt-4">
              <TotalBlocks></TotalBlocks>
            </div>
            <div className="tw-heading-6">Blocks processed</div>
            <hr className="bg-white/20 w-52 mx-auto mt-4 mb-3" />
            <div className="tw-paragraph md:tw-lead-sm mb-3">
              <ParallelSubnets /> parallel subnets
            </div>
            <div className="tw-paragraph md:tw-lead-sm">
              <BlockThroughput></BlockThroughput> MB/s block throughput capacity
            </div>
          </div>
          <div className="mt-8 md:mt-16">
            <h3 className="md:tw-heading-4 mb-4">Throughput</h3>
            <p className="tw-paragraph-sm text-white/60 mb-0">
              Capacity horizontally scales as subnet blockchains are seamlessly
              combined into one unified blockchain. Blocks and transactions per
              second are unbounded.
            </p>
          </div>
        </StatSlot>
        {/***************************************************************/}
        <StatSlot index={1}>
          <div className="flex-1">
            <div className="mx-auto w-full md:w-[372px] relative">
              <img
                src={require("./eth-eq-txs.webp").default}
                loading="lazy"
                alt=""
                className="w-full"
              ></img>
              <motion.div
                className="absolute transition-transform -bottom-2 md:bottom-1 -left-3 w-6 h-6 rounded-full backdrop-blur-2xl border-2 border-solid border-white/30 bg-white/30 hero-eth-tx-gauge"
                style={{
                  rotate: gaugeRot,
                }}
              ></motion.div>
            </div>
            <div className="text-center -mt-[74px]">
              <EthEquivalentTxRate
                gagueValue={ethTxValue}
              ></EthEquivalentTxRate>
            </div>
            <div className="tw-heading-6 inline-flex">
              ETH equivalent TX/s
              <Link
                href="https://wiki.internetcomputer.org/wiki/Not_all_transactions_are_equal"
                title="Read more: Not all transactions are equal"
                className="text-white hover:text-white-60 hover:no-underline flex items-center ml-2"
              >
                <InfoIcon className="w-4 h-4 md:w-6 md:h-6" />
              </Link>
            </div>
            <hr className="bg-white/20 w-52 mx-auto mt-4 mb-3" />
            <div className="tw-paragraph md:tw-lead-sm">
              <ICPTransactionRate /> Transactions/s
            </div>
          </div>

          <div className="mt-8 md:mt-16">
            <h3 className="md:tw-heading-4 mb-4">Transactions</h3>
            <p className="tw-paragraph-sm text-white/60 mb-0">
              Each transactions invokes an end-point (function) of a canister
              smart contract hosted on the network. Blockchain subnets run their
              transactions concurrently, but deterministically.
            </p>
          </div>
        </StatSlot>
        {/***************************************************************/}
        <StatSlot index={2}>
          <div className="flex-1">
            <CostSvg className="mb-2" />

            <div className="tw-lead-sm flex justify-center items-center gap-2 mt-4">
              Smart contract data for $1
            </div>
          </div>

          <div className="mt-8 md:mt-20">
            <h3 className="md:tw-heading-4 mb-4">Memory is $5/GB/year</h3>
            <p className="tw-paragraph-sm text-white/60 mb-0">
              Each canister smart contract running on ICP can make 64 GB of
              persistent memory pages available to its bytecode (orthogonal
              persistence allows data structures to be used like databases).
            </p>
          </div>
        </StatSlot>
        {/***************************************************************/}
        <StatSlot index={3}>
          <div className="flex-1">
            <img
              src={require("./instructions.webp").default}
              loading="lazy"
              alt=""
              className="w-[89px] md:mt-20"
            ></img>
            <div className="text-center mt-4 mb-2">
              <div className="text-transparent bg-clip-text hero-stat-green text-[29px] font-book lg:tw-title-sm">
                $0.000000000000536
              </div>
            </div>
            <div className="tw-heading-6">Cost per instruction</div>
            <hr className="bg-white/20 w-52 mx-auto mt-4 mb-3" />
            <div className="tw-paragraph md:tw-lead-sm mb-3">
              44&rsquo; 760&rsquo; 000x less expensive than ETH
            </div>
            <div className="tw-paragraph md:tw-lead-sm">ETH - $0.00024</div>
          </div>
          <div className="mt-8 md:mt-16">
            <h3 className="md:tw-heading-4 mb-4">AWS-rivalling efficiency</h3>
            <p className="tw-paragraph-sm text-white/60 mb-0">
              An average ICP transaction executes 6’660’000 instructions
              compared to ETH’s 83’000, while each instruction is orders of
              magnitude less expensive due to ICP’s efficiency.
            </p>
          </div>
        </StatSlot>
      </div>
    </>
  );
};
