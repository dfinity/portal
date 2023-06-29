import { getCanisterCount } from "@site/src/utils/network-stats";
import React from "react";
import { useQuery } from "react-query";
import Tooltip from "../Common/Tooltip";

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_384_6058)">
        <path
          d="M5 0C2.23875 0 0 2.23875 0 5C0 7.76125 2.23875 10 5 10C7.76125 10 10 7.76125 10 5C10 2.23875 7.76125 0 5 0ZM4.99958 2.39583C5.28708 2.39583 5.52083 2.62917 5.52083 2.91667C5.52083 3.20417 5.28708 3.4375 4.99958 3.4375C4.71208 3.4375 4.47917 3.20417 4.47917 2.91667C4.47917 2.62917 4.71208 2.39583 4.99958 2.39583ZM5.83333 7.5H4.16667V7.08333C4.36833 7.00875 4.58333 6.99958 4.58333 6.77708V4.91583C4.58333 4.69333 4.36833 4.65833 4.16667 4.58375V4.16708H5.41667V6.7775C5.41667 7.00042 5.63208 7.01 5.83333 7.08375V7.5Z"
          fill="#3B00B9"
          fillOpacity="0.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_384_6058">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Divider() {
  return <div className="my-4 sm:my-0 h-px bg-page sm:h-auto sm:w-px"></div>;
}

function formatNumber(x: number) {
  return x
    .toLocaleString("en-US", {
      maximumFractionDigits: 0
    })
    .replace(/,/g, "\u2019");
}

export const NetworkStats = () => {
  const canisterCount = useQuery(["canisterCount"], getCanisterCount);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch whitespace-nowrap">
      <figure className="m-0">
        <figcaption className="tw-paragraph-sm font-medium text-black/60 inline-flex gap-2 items-center mb-2">
          Storage Costs
          <Tooltip
            tooltip="Cost of storing 1 GB for a year in a canister smart contract"
            className="w-52 whitespace-normal"
            wrapperClassName="inline-flex items-center"
          >
            <InfoIcon />
          </Tooltip>
        </figcaption>
        <div className="tw-heading-6">$5 / GB / Year</div>
      </figure>
      <Divider />
      <figure className="m-0">
        <figcaption className="tw-paragraph-sm font-medium text-black/60 inline-flex gap-2 items-center mb-2">
          Cost per Instruction
          <Tooltip
            tooltip="Cost per instruction when executing canister smart contact code"
            className="w-52 whitespace-normal"
            wrapperClassName="inline-flex items-center"
          >
            <InfoIcon />
          </Tooltip>
        </figcaption>
        <div className="tw-heading-6">$0.000000000000536</div>
      </figure>
      <Divider />
      <figure className="m-0">
        <figcaption className="tw-paragraph-sm font-medium text-black/60 inline-flex gap-2 items-center mb-2">
          Canisters
          <Tooltip
            tooltip="Number of running canister smart contracts"
            className="w-52 whitespace-normal"
            wrapperClassName="inline-flex items-center"
          >
            <InfoIcon />
          </Tooltip>
        </figcaption>
        <div className="tw-heading-6">
          {canisterCount.isSuccess && formatNumber(canisterCount.data)}
        </div>
      </figure>
    </div>
  );
};
