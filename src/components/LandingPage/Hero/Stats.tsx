import {
  getBlockCount,
  getBlockRate,
  getEthEquivTxRateMultiplier,
  getTransactionRateV3,
} from "@site/src/utils/network-stats";
import React from "react";
import { useQuery } from "react-query";
import { ConstantRateCounter, SpringCounter } from "../PreHero/Counters";
import InfoIcon from "../PreHero/InfoIcon";

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
    <div className="backdrop-blur-lg text-white tw-lead-lg py-3 px-6">
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

        <figcaption className="tw-paragraph text-white/50 flex items-center justify-end gap-1">
          Blocks processed <InfoIcon className="w-4 h-4 text-white" />
        </figcaption>
      </figure>
    </div>
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
    <div className="backdrop-blur-lg text-white tw-lead-lg py-3 px-6">
      <figure className="m-0">
        {/* <div className="mb-2 inline-grid relative left-1"> */}
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
            {/* <span className="col-start-1 row-start-1 invisible pointer-events-none pr-[2px]">
                {getFigureSpacer(Math.floor(blockInfoQuery.data[0]))}
              </span> */}
          </>
        ) : (
          <>&nbsp;</>
        )}
        {/* </div> */}

        <figcaption className="tw-paragraph text-white/50 flex items-center justify-end gap-1">
          ETH eq. TX/s <InfoIcon className="w-4 h-4 text-white" />
        </figcaption>
      </figure>
    </div>
  );
};

export const SmartContractMemory = () => {
  return (
    <div className="backdrop-blur-lg text-white tw-lead-lg py-3 px-6">
      <figure className="m-0">
        $5 <span className="tw-lead-sm">/GB/year</span>
        <figcaption className="tw-paragraph text-white/50 flex items-center justify-end gap-1">
          Smart Contract Memory <InfoIcon className="w-4 h-4 text-white" />
        </figcaption>
      </figure>
    </div>
  );
};
