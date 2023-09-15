import {
  getDataCenters,
  getLastEnergyConsumptionRateKwh,
  getNodeProvidersCount,
  getTotalRewardableNodeCount,
} from "@site/src/utils/network-stats";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { useQuery } from "react-query";

const Fallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="tw-heading-60 text-transparent bg-black/10 rounded-xl animate-pulse">
      {children}
    </span>
  );
};

export const StatsPanel: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="mt-20 backdrop-blur-md bg-white/80 border border-white border-solid rounded-xl py-12 px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:justify-between gap-10">
      {children}
    </div>
  );
};

export const Stat: React.FC<{
  title: ReactNode;
  value: ReactNode | null;
  fallbackValue: string;
  titleClassName?: string;
}> = ({ title, value, fallbackValue, titleClassName }) => {
  return (
    <figure className="m-0 flex flex-col gap-2 items-center">
      {value !== null ? (
        <span className="tw-heading-60 text-gradient">{value}</span>
      ) : (
        <Fallback>{fallbackValue}</Fallback>
      )}
      <figcaption className={clsx("tw-lead-sm", titleClassName)}>
        {title}
      </figcaption>
    </figure>
  );
};

const Stats: React.FC = () => {
  const nodeProviderCountQuery = useQuery(
    "nodeProviderCount",
    getNodeProvidersCount
  );

  const dataCentersQuery = useQuery("dataCenters", () =>
    getDataCenters().then((res) =>
      res.data_centers.filter((dc) => dc.total_nodes > 0)
    )
  );
  const nodeCountQuery = useQuery(
    "totalRewardableNodeCount",
    getTotalRewardableNodeCount
  );

  const energyConsumptionRateKwhQuery = useQuery(
    "lastEnergyConsumptionRateKwh",
    getLastEnergyConsumptionRateKwh
  );

  return (
    <div className="mt-20 backdrop-blur-2xl bg-white/80 border border-white border-solid rounded-xl py-12 px-6 md:px-20 flex flex-col md:flex-row md:justify-between gap-10">
      <figure className="m-0 flex flex-col gap-2 items-center">
        {nodeProviderCountQuery.isSuccess ? (
          <span className="tw-heading-60 text-gradient">
            {nodeProviderCountQuery.data}
          </span>
        ) : (
          <Fallback>90</Fallback>
        )}
        <figcaption className="tw-lead-sm">Node providers</figcaption>
      </figure>
      <figure className="m-0 flex flex-col gap-2 items-center">
        <span className="tw-heading-60 text-gradient">
          {dataCentersQuery.isSuccess ? (
            <span className="tw-heading-60 text-gradient">
              {dataCentersQuery.data.length}
            </span>
          ) : (
            <Fallback>50</Fallback>
          )}
        </span>
        <figcaption className="tw-lead-sm">Data centers</figcaption>
      </figure>
      <figure className="m-0 flex flex-col gap-2 items-center">
        <span className="tw-heading-60 text-gradient">
          {nodeCountQuery.isSuccess ? (
            <span className="tw-heading-60 text-gradient">
              {nodeCountQuery.data}
            </span>
          ) : (
            <Fallback>1200</Fallback>
          )}
        </span>
        <figcaption className="tw-lead-sm">Total node machines</figcaption>
      </figure>
      <figure className="m-0 flex flex-col gap-2 items-center">
        <span className="tw-heading-60 text-gradient">
          {energyConsumptionRateKwhQuery.isSuccess ? (
            <span className="tw-heading-60 text-gradient">
              {energyConsumptionRateKwhQuery.data.toFixed(0)} kW
            </span>
          ) : (
            <Fallback>300 kW</Fallback>
          )}
        </span>
        <figcaption className="tw-lead-sm">Total energy consumption</figcaption>
      </figure>
    </div>
  );
};

export default Stats;
