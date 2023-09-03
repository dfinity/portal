import {
  getDataCenters,
  getLastEnergyConsumptionRateKwh,
  getNodeProvidersCount,
  getTotalRewardableNodeCount,
} from "@site/src/utils/network-stats";
import React from "react";
import { useQuery } from "react-query";
import { Stat, StatsPanel } from "../../Common/Stats";

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
    <StatsPanel>
      <Stat
        title="Node providers"
        value={
          nodeProviderCountQuery.isSuccess ? nodeProviderCountQuery.data : null
        }
        fallbackValue="90"
      />
      <Stat
        title="Data centers"
        value={dataCentersQuery.isSuccess ? dataCentersQuery.data.length : null}
        fallbackValue="50"
      />
      <Stat
        title="Total node machines"
        value={nodeCountQuery.isSuccess ? nodeCountQuery.data : null}
        fallbackValue="1200"
      />
      <Stat
        title="Total energy consumption"
        value={
          energyConsumptionRateKwhQuery.isSuccess
            ? energyConsumptionRateKwhQuery.data.toFixed(0)
            : null
        }
        fallbackValue="300 kW"
      />
    </StatsPanel>
  );
};

export default Stats;
