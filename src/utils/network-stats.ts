export function getBytesStored(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/metrics/ic-memory-usage"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          memory_usage: [timestamp: number, stateSize: string];
        }>
    )
    .then((res) => +res.memory_usage[1]);
}
export function getNodeProviders(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/node-providers-count"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          count: number;
        }>
    )
    .then((res) => +res.count);
}

export function getTransactionRate(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/metrics/message-execution-rate"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          message_execution_rate: [timestamp: number, rate: string][];
        }>
    )
    .then((res) => +res.message_execution_rate[0][1]);
}

export function getTransactionRateV3(
  messageType: "update" | "query" | "all",
  step: number = 7200
): Promise<number> {
  return fetch(
    `https://ic-api.internetcomputer.org/api/v3/metrics/message-execution-rate?step=${step}&message_type=${messageType}`
  )
    .then(
      (res) =>
        res.json() as Promise<{
          message_execution_rate: [timestamp: number, rate: number][];
        }>
    )
    .then((res) => res.message_execution_rate[0][1]);
}

export function getCyclesBurnRate(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/metrics/cycle-burn-rate"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          cycle_burn_rate: [timestamp: number, rate: string][];
        }>
    )
    .then((res) => +res.cycle_burn_rate[0][1]);
}

export function getBlockCount(): Promise<number> {
  return fetch("https://ic-api.internetcomputer.org/api/v3/block-heights")
    .then(
      (res) =>
        res.json() as Promise<{
          block_height: [[timestamp: number, height: number]];
        }>
    )
    .then((res) => +res.block_height[0][1]);
}

export function getCanisterCount(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/metrics/registered-canisters-count"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          running_canisters: [timestamp: number, count: string][];
          stopped_canisters: [timestamp: number, count: string][];
        }>
    )
    .then((res) => +res.running_canisters[0][1]);
}

export function getBlockRate(): Promise<number> {
  return fetch("https://ic-api.internetcomputer.org/api/v3/metrics/block-rate")
    .then(
      (res) =>
        res.json() as Promise<{
          block_rate: [[timestamp: number, block_rate: string]];
        }>
    )
    .then((res) => +res.block_rate[0][1]);
}

export function getFinalizationRate(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/metrics/finalization-rate"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          block_rate: [[timestamp: number, block_rate: string]];
        }>
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => +res.block_rate[0][1]);
}

export function getNodeCount(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/metrics/ic-nodes-count"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          total_nodes: [timestamp: number, value: string][];
          up_nodes: [timestamp: number, value: string][];
        }>
    )
    .then((res) => +res.total_nodes[0][1]);
}

export function getSubnetCount(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/metrics/ic-subnet-total"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          ic_subnet_total: [timestamp: number, count: string][];
        }>
    )
    .then((res) => +res.ic_subnet_total[0][1]);
}

export function getCpuCoreCount(): Promise<number> {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/metrics/ic-cpu-cores"
  )
    .then(
      (res) =>
        res.json() as Promise<{
          ic_cpu_cores: [timestamp: number, count: string][];
        }>
    )
    .then((res) => +res.ic_cpu_cores[0][1]);
}

/*
  Add new metrics here with | 
*/
export type StakingMetric = {
  name: "governance_total_locked_e8s";
  samples: {
    timestamp: number;
    value: number;
  }[];
};

export type StakingMetrics = { metrics: StakingMetric[] };

export function getStakingMetrics() {
  return fetch(
    "https://ic-api.internetcomputer.org/api/v3/staking-metrics"
  ).then((res) => res.json() as Promise<StakingMetrics>);
}
