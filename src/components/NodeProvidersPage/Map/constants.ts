/**
 * @file constants
 */

const oneSecondMs: number = 1000;
const threeSecondsMs: number = 3000;
const fiveSecondsMs: number = 5 * 1000;
const oneMinuteMs: number = 60 * 1000;
const fiveMinutesMs: number = 5 * 60 * 1000;
const oneMinuteSeconds = 60;
const oneHourSeconds = oneMinuteSeconds * 60;
const oneDaySeconds = oneHourSeconds * 24;
const oneYearSeconds = oneDaySeconds * 365.25;
const oneMonthSeconds = oneYearSeconds / 12;
// There are text values on where to show 'copy' icon
const valuesToCopy = ['Hash', 'To', 'From', 'Address', 'Principal ID', 'Node ID', 'Subnet ID', 'Node Provider ID', 'Provider ID'];
const localeValue = 'de-CH'; // locale to conform to xx'xxx number format.
const localeDate = 'fr-CA'; // Used to display dates in ISO format (yyyy-mm-dd) without having to conform to time display.

const Constants = {
  areaChartOpacity: 0.2,
  areaChartOpacityNew: 0.08,
  bitcoinDataStartTimestamp: 1669939200, // first day Bitcoin data was set
  breakpointMinXXS: 0,
  breakpointMaxXXS: 359,
  breakpointMinXS: 360,
  breakpointMaxXS: 599,
  breakpointMinSM: 600,
  breakpointMaxSM: 959,
  breakpointMinMD: 960,
  breakpointMaxMD: 1279,
  breakpointMinLG1: 1280,
  breakpointMaxLG1: 1599,
  breakpointMinLG2: 1600,
  breakpointMaxLG2: 1919,
  breakpointMinXL: 1920,
  breakpointMaxXL: 100000,
  burnTypeTransaction: 'burn',
  burnTypeFee: 'fee',
  canisterIdCandidUI: 'a4gq6-oaaaa-aaaab-qaa4q-cai',
  canisterIdCkBtcLedger: 'mxzaz-hqaaa-aaaar-qaada-cai',
  canisterIdDragginzRoot: 'zxeu2-7aaaa-aaaaq-aaafa-cai',
  canisterIdKinicRoot: '7jkta-eyaaa-aaaaq-aaarq-cai',
  canisterIdNNSFrontendDapp: 'qoctq-giaaa-aaaaa-aaaea-cai',
  canisterIdNNSLedger: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
  canisterIdOpenChatRoot: '3e3x2-xyaaa-aaaaq-aaalq-cai',
  canisterIdSonicRoot: '23ten-uaaaa-aaaaq-aaapa-cai',
  cardListDefaultPageSizeReplicaVersions: 10,
  cardListDefaultPageSizeSNSes: 10,
  chartAreaBackgroundColor: '#080812', // $bg-color-default
  chartAreaColors: [
    '#4d68ff',  // $color-blue-i
    '#01f1e3',  // $color-blue-b
    '#4da1ff'   // $color-blue-g
  ],
  chartAreaColorsNew: [
    '#9B5CFA',  // $color-violet-p
    '#9AF9F1',  // $color-blue-r
    '#4da1ff'   // $color-blue-g
  ],
  chartAxisGridColor: '#153B58',
  chartAxisGridColorNew: '#121028',
  chartCategoryAxisNavigatorName: 'categoryAxisNavigator',
  // These colors were chosen for the staking charts (that show up to 10 dissolve-delay series), but
  // may be useful elsewhere. The rainbow-inspired color rotation is: red, violet, blue, light blue,
  // green, yellow, and orange. Kendo's default chart colors are also rainbow-based. If needed, more
  // colors that follow this rotation can be added to the end of this array, but the existing colors
  // should not be modified without careful consideration.
  chartColorsRainbow: [
    '#ed1e79', // $dfinity-color-razzmatazz
    '#7040ff', // $color-violet-e
    '#02a4ff', // $color-blue-h
    '#01f1e3', // $color-blue-b
    '#02c751', // $color-green-c
    '#ffd422', // $color-orange-a
    '#ff7d05', // $color-orange-d
    '#cf4c1d', // $color-brown-a
    '#991bfa', // $color-violet-d
    '#4d68ff', // $color-blue-i
    '#19d0dc', // $color-blue-d
    '#5eff5a', // $color-green-b
    '#ffeb03', // $color-yellow-a
    '#fbb03b'  // $color-orange-b
  ],
  chartColorsRainbowNew: [
    '#ed1e79', // $dfinity-color-razzmatazz
    '#7040ff', // $color-violet-e
    '#110128', // $heatmap-chart-new-marker-color-intensity-0
    '#2E0769', // $heatmap-chart-new-marker-color-intensity-1
    '#4E0CB1', // $heatmap-chart-new-marker-color-intensity-2
    '#7421F0', // $heatmap-chart-new-marker-color-intensity-3
    '#9B5CFA', // $heatmap-chart-new-marker-color-intensity-4
    '#cf4c1d', // $color-brown-a
    '#991bfa', // $color-violet-d
    '#4d68ff', // $color-blue-i
    '#19d0dc', // $color-blue-d
    '#5eff5a', // $color-green-b
    '#ffeb03', // $color-yellow-a
    '#fbb03b'  // $color-orange-b
  ],
  chartLineColors: [
    '#176bf8', // $color-blue-main
    '#01f1e3',  // $color-blue-b
    '#4da1ff'   // $color-blue-g
  ],
  chartLineColorsNew: [
    '#9B5CFA', // $color-blue-main
    '#01f1e3',  // $color-blue-b
    '#4da1ff'   // $color-blue-g
  ],
  chartNoteFont: '10px Manrope, sans-serif',
  chartNoteFontNew: '10px CircularXX, sans-serif',
  chartNoteIconType: 'square',
  chartNoteIconTypeNew: 'circle',
  chartNoteLineColor: '#b4b4b6', // $color-gray-a
  chartNoteLineLength: 6,
  chartNoteLineWidth: 1,
  chartNoteTextColor: '#ffffff', // $text-color-primary
  chartNoteTextColorNew: '#F3EBFF', // $text-color-primary-new
  chartNoteOpacity: 0.5,
  chartNumberOfDays: 7,
  chartPlotBandLabelLeftMargin: 2,
  chartPlotBandOpacity: 0.2,
  chartPlotBandTextColor: '#b4b4b6', // $color-gray-a
  chartPlotBandTextColorNew: '#F3EBFF', // $text-color-primary-new
  chartSelectorHeight: 30,
  chartSelectorHeightNew: 50, // new Value for ER-3640
  chartSelectorLineWidth: 1,
  chartSelectorLineWidthNew: 2,
  chartSelectorOpacity: 0.1,
  chartSelectorSeriesColor: '#909090',
  chartSelectorSeriesColorNew: '#5C81FA',
  chartStepSeconds: oneMinuteSeconds * 10, // 10 minutes
  chartTextColor: '#979799', // c-grey/400
  chartTextColorNew: '#A29EA7', // $text-color-secondary-new
  chartValueAxisNavigatorName: 'valueAxisNavigator',
  compactChartAreaOpacity: 0.2, // lightmode: 0.5?!
  compactChartAreaOpacityNew: 0.08,
  compactChartLineWidth: 1.4,
  drawerWidth: 250, // TODO: Remove once January 2023 redesign is complete.
  faviconLightTheme: '/favicon-light-theme.ico',
  faviconDarkTheme: '/favicon-dark-theme.ico',
  firstProposalIdGovernanceRewardWeight1: 71629,
  firstProposalIdGovernanceRewardWeight20: 115067,
  firstProposalIdRewardWeights: 44967,
  firstProposalIdWaitForQuiet4Days: 39260,
  genesisAsTime: 1620604799, // One second before Genesis (May 10th 2021 UTC+0)
  governanceShortVotingPeriodSeconds: oneHourSeconds * 12, // 12 hours
  governanceWaitForQuietThresholdSeconds: oneDaySeconds * 4, // 4 days
  governanceMaxDissolveDelaySeconds: oneYearSeconds * 8, // 8 years
  governanceMaxNeuronAgeForAgeBonusSeconds: oneYearSeconds * 4, // 4 years
  governanceMinDissolveDelayForVotingSeconds: oneYearSeconds / 2, // 6 months
  gridDefaultPageSizeCanisters: 10,
  gridDefaultPageSizeCkBtcCanisters: 10,
  gridDefaultPageSizeDataCenters: 10,
  gridDefaultPageSizeIcrc1Transactions: 10,
  gridDefaultPageSizeKnownNeuronsVotes: 10,
  gridDefaultPageSizeNeurons: 10,
  gridDefaultPageSizeNodeProviders: 10,
  gridDefaultPageSizeNodes: 10,
  gridDefaultPageSizeNodesSubnetPage: 25,
  gridDefaultPageSizeProposals: 10,
  gridDefaultPageSizeSnsCanisters: 10,
  gridDefaultPageSizeSnsNeurons: 10,
  gridDefaultPageSizeSnsProposals: 10,
  gridDefaultPageSizeSubnets: 25,
  gridDefaultPageSizeSubnetsDataCenterPage: 10,
  gridDefaultPageSizeReplicaVersionSubnetsReleasePage: 25,
  gridDefaultPageSizeReplicaVersionSubnetsVersionCard: 5,
  gridDefaultPageSizeTransactions: 10,
  gridDefaultPageSizeVotingHistory: 10,
  icpTransactionFirstDay: 1620259200, // May 6th 2021
  ieee754Float32Max: 3.4028235e+38,
  ieee754Float32Min: -3.4028235e+38,
  intervalMsAverageDailyRewards: fiveMinutesMs,
  intervalMsAverageVotingPower: fiveMinutesMs,
  intervalMsNeurons: oneMinuteMs,
  intervalMsBlocks: oneSecondMs,
  intervalMsBurn: fiveMinutesMs,
  intervalMsBurnValue: oneMinuteMs,
  intervalMsBoundaryNode: fiveMinutesMs,
  intervalMsCardRewards: fiveMinutesMs,
  intervalMsChartBitcoinBlockHeight: fiveMinutesMs,
  intervalMsChartBitcoinBlockHeightValue: oneMinuteMs,
  intervalMsChartBitcoinStableMemory: fiveMinutesMs,
  intervalMsChartBitcoinStableMemoryValue: fiveSecondsMs,
  intervalMsChartBitcoinUtxos: fiveMinutesMs,
  intervalMsChartBitcoinUtxosValue: fiveSecondsMs,
  intervalMsChartCanisterState: fiveMinutesMs,
  intervalMsChartCanisterStateValue: fiveSecondsMs,
  intervalMsChartConversionRateChart: fiveMinutesMs,
  intervalMsChartConversionRateChartValue: oneMinuteMs,
  intervalMsChartCycleBurnRate: fiveMinutesMs,
  intervalMsChartCycleBurnRateValue: oneSecondMs,
  intervalMsChartDfinityIcaVotingPower: fiveMinutesMs,
  intervalMsChartFinalizationRate: fiveMinutesMs,
  intervalMsChartFinalizationRateValue: oneSecondMs,
  intervalMsChartIcPowerConsumptionRateChart: fiveMinutesMs,
  intervalMsChartIcPowerConsumptionRateValue: threeSecondsMs,
  intervalMsChartIcrc1TotalSupply: fiveMinutesMs,
  intervalMsChartIcrc1TotalSupplyValue: fiveMinutesMs,
  intervalMsChartMaturityModulation: fiveMinutesMs,
  intervalMsChartMessageExecutionRate: fiveMinutesMs,
  intervalMsChartMessageExecutionRateValue: oneSecondMs,
  intervalMsChartMessages: fiveMinutesMs,
  intervalMsChartMessagesValue: oneSecondMs,
  intervalMsChartRegisteredCanisters: fiveMinutesMs,
  intervalMsChartRegisteredCanistersValue: oneMinuteMs,
  intervalMsChartReleases: fiveMinutesMs,
  intervalMsChartStaked: fiveMinutesMs, // staking metrics update once a day
  intervalMsChartSubnetUpgrades: fiveMinutesMs,
  intervalMsChartTiny: fiveMinutesMs,
  intervalMsChartTransactionVolume: oneMinuteMs,
  intervalMsChartTotalNodesInSubnets: fiveMinutesMs,
  intervalMsChartVotingHistory: fiveMinutesMs,
  intervalMsChartVotingParticipation: fiveMinutesMs,
  intervalMsNeuronsFund: fiveMinutesMs, // Neurons' fund staked and maturity updated once per day.
  intervalMsCpuCores: fiveMinutesMs,
  intervalMsCyclesBurned: fiveSecondsMs,
  intervalMsCyclesBurnedNinetyDayAverage: fiveMinutesMs,
  intervalMsGenericChartValue: oneMinuteMs,
  intervalMsIcpSupply: fiveMinutesMs,
  intervalMSInflation: (oneDaySeconds / 2) * 1000, // twice a day
  intervalMsInternetIdentity: fiveMinutesMs,
  intervalMsPageCanister: fiveMinutesMs,
  intervalMsPageDataCenter: fiveMinutesMs,
  intervalMsPageIcrc1Transaction: fiveMinutesMs,
  intervalMsPageIcrc1Transactions: fiveMinutesMs,
  intervalMsPageNeuron: fiveMinutesMs,
  intervalMsPageProvider: fiveMinutesMs,
  intervalMsPageProposal: oneMinuteMs,
  intervalMsPageSns: fiveMinutesMs,
  intervalMsPageSnsNeuron: fiveMinutesMs,
  intervalMsPageSnsNeurons: fiveMinutesMs,
  intervalMsPageSnsProposal: oneMinuteMs,
  intervalMsPageSnsProposals: fiveMinutesMs,
  intervalMsPageSubnet: fiveMinutesMs,
  intervalMsGovernanceParticipationRate: fiveMinutesMs,
  intervalMsLastRewardsEventIcp: fiveMinutesMs,
  intervalMsLastBlockIndex: threeSecondsMs,
  intervalMsMap: fiveMinutesMs,
  intervalMsMemoryTotal: fiveMinutesMs,
  intervalMsMemoryUsage: fiveSecondsMs,
  intervalMsMessages: fiveSecondsMs,
  intervalMsMillionInstructionsExecuted: fiveSecondsMs,
  intervalMsNNSProposals: fiveMinutesMs,
  intervalMsNodeMachines: fiveMinutesMs,
  intervalMsStatusNotification: oneMinuteMs,
  intervalMsSupply: fiveMinutesMs,
  intervalMsSupplyValue: oneMinuteMs,
  intervalMsTotalVotingPower: fiveMinutesMs,
  intervalMsTransactionsNinetyDayPeak: fiveMinutesMs,
  intervalMsTransactionsValue: oneSecondMs,
  intervalOneDay: 86400,
  intervalMsNodeProviderCount: fiveMinutesMs,
  intervalMSRewardsData: fiveMinutesMs,
  intervalMsSubnetCount: fiveMinutesMs,
  heatmapChartBackgroundColor: '#05050f',
  heatmapChartMarkerBorderRadius: 2,
  heatmapChartMarkerColorIntensity0: '#110128',
  heatmapChartMarkerColorIntensity1: '#2E0769',
  heatmapChartMarkerColorIntensity2: '#4E0CB1',
  heatmapChartMarkerColorIntensity3: '#7421F0',
  heatmapChartMarkerColorIntensity4: '#9B5CFA',
  knownNeuronIdDfinity: '27',
  knownNeuronIdIca: '28',
  knownNeuronsVotesGridFirstProposalId: 46094,
  legendItemDisabledColor: '#535356', // Kendo default color when legend item is disabled.
  lineChartLineWidth: 1.4,
  lineChartLineWidthNew: 2, // updated for ER-3640
  lineChartOpacity: 1,
  localeDate: localeDate,
  localeValue: localeValue,
  mapCircleColorBoundary: '#991bfa', // $color-violet-d
  mapCircleColorBoundaryNew: '#9B5CFA', // $color-violet-p
  mapCircleColorBorder: 'rgba(0, 0, 0, 0.32)',
  mapCircleColorBoundaryUpcoming: '#fbb03b', // $color-orange-b/$dfinity-color-sea-buckthorn
  mapCircleColorBoundaryUpcomingNew: '#FABD5C',
  mapCircleColorReplica: '#176bf8', // $color-blue-main
  mapCircleColorReplicaNew: '#2151F0',
  mapCircleColorReplicaDown: '#ff0000',
  mapCircleColorReplicaUpcoming: '#01f1e3', // $color-blue-b
  mapCircleColorReplicaUpcomingNew: '#5CFAED',
  millisecondsInDay: oneDaySeconds * 1000,
  minimumStepSecondsNNSProposalsAPI: oneHourSeconds,
  mintingAccountName: 'Minting Account',
  mintingAccountNameCkBtc: 'BTC Network',
  // First day of full data for /api/v3/neuron-voting-powers (2021-05-10, 16:00 UTC).
  neuronVotingPowerDataStartTimestamp: 1620662400,
  oneDaySeconds: oneDaySeconds,
  oneHourSeconds: oneHourSeconds,
  oneMinuteSeconds: oneMinuteSeconds,
  oneMonthSeconds: oneMonthSeconds,
  oneYearSeconds: oneYearSeconds,
  proposalDefaultUrlIcAdmin: 'https://github.com/dfinity/nns-proposals/',
  proposalSummaryAsTitleMaxLength: 280,
  searchFieldResetButtonId: 'reset',
  snsMaxNativeNervousSystemFunctionId: 999,
  stakingDataStartTimestamp: 1636095600, // first day governance_neurons_with_less_than_6_months_dissolve_delay_e8s was set
  subnetIdInternetIdentity: 'uzr34-akd3s-xrdag-3ql62-ocgoh-ld2ao-tamcv-54e7j-krwgb-2gm4z-oqe',
  subnetIdNns: 'tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe',
  subnetIdSns: 'x33ed-h457x-bsgyx-oqxqf-6pzwv-wkhzr-rm2j3-npodi-purzm-n66cg-gae',
  svgBorder: 'M20.625 3.125H3.375C2.96016 3.125 2.625 3.46016 2.625 3.875V21.125C2.625 21.5398 2.96016 21.875 3.375 21.875H20.625C21.0398 21.875 21.375 21.5398 21.375 21.125V3.875C21.375 3.46016 21.0398 3.125 20.625 3.125ZM19.6875 20.1875H4.3125V4.8125H19.6875V20.1875Z',
  svgBuild: 'M21.4688 5.42188H8.8125C8.39766 5.42188 8.0625 5.75703 8.0625 6.17188V11.7031H2.53125C2.11641 11.7031 1.78125 12.0383 1.78125 12.4531V18.8281C1.78125 19.243 2.11641 19.5781 2.53125 19.5781H15.1875C15.6023 19.5781 15.9375 19.243 15.9375 18.8281V13.2969H21.4688C21.8836 13.2969 22.2188 12.9617 22.2188 12.5469V6.17188C22.2188 5.75703 21.8836 5.42188 21.4688 5.42188ZM9.65625 7.01562H14.3438V11.7031H9.65625V7.01562ZM8.0625 17.9844H3.375V13.2969H8.0625V17.9844ZM14.3438 17.9844H9.65625V13.2969H14.3438V17.9844ZM20.625 11.7031H15.9375V7.01562H20.625V11.7031Z',
  svgBurn: 'M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z',
  svgFire: 'M19.5492 11.4973C19.0942 10.4732 18.4328 9.55401 17.6063 8.79726L16.9242 8.17148C16.9011 8.15082 16.8732 8.13615 16.843 8.12877C16.8129 8.1214 16.7814 8.12153 16.7513 8.12917C16.7212 8.1368 16.6935 8.15171 16.6705 8.17257C16.6475 8.19343 16.63 8.21962 16.6195 8.24883L16.3148 9.12304C16.125 9.67148 15.7758 10.2316 15.2812 10.7824C15.2484 10.8176 15.2109 10.827 15.1852 10.8293C15.1594 10.8316 15.1195 10.827 15.0844 10.7941C15.0516 10.766 15.0352 10.7238 15.0375 10.6816C15.1242 9.2707 14.7023 7.67929 13.7789 5.94726C13.0148 4.5082 11.9531 3.38554 10.6266 2.60273L9.65859 2.0332C9.53203 1.9582 9.37031 2.05664 9.37734 2.20429L9.42891 3.32929C9.46406 4.09804 9.375 4.77773 9.16406 5.34257C8.90625 6.03398 8.53594 6.67617 8.0625 7.25273C7.73302 7.65343 7.35959 8.01585 6.94922 8.3332C5.96087 9.09296 5.15722 10.0665 4.59844 11.1809C4.04103 12.3049 3.75068 13.5426 3.75 14.7973C3.75 15.9035 3.96797 16.9746 4.39922 17.9848C4.81562 18.9573 5.41654 19.84 6.16875 20.584C6.92813 21.334 7.80938 21.9246 8.79141 22.3348C9.80859 22.7613 10.8867 22.9769 12 22.9769C13.1133 22.9769 14.1914 22.7613 15.2086 22.3371C16.1882 21.9294 17.079 21.3347 17.8312 20.5863C18.5906 19.8363 19.1859 18.9598 19.6008 17.9871C20.0314 16.9797 20.2523 15.8952 20.25 14.7996C20.25 13.6559 20.0156 12.5449 19.5492 11.4973ZM16.7109 19.4496C15.4523 20.6965 13.7812 21.3809 12 21.3809C10.2188 21.3809 8.54766 20.6965 7.28906 19.4496C6.03516 18.2051 5.34375 16.5551 5.34375 14.7996C5.34375 13.7801 5.57344 12.8027 6.02578 11.8934C6.46641 11.0051 7.12266 10.2105 7.91953 9.59883C8.42775 9.21022 8.8887 8.76342 9.29297 8.26757C9.87891 7.55273 10.3383 6.75586 10.657 5.90039C10.7878 5.54751 10.8828 5.1824 10.9406 4.81054C11.5055 5.33086 11.9789 5.95898 12.375 6.69492C13.1578 8.16211 13.5187 9.46758 13.4484 10.5785C13.4316 10.8402 13.4744 11.1022 13.5734 11.345C13.6725 11.5877 13.8253 11.8049 14.0203 11.9801C14.1893 12.1328 14.387 12.2503 14.6019 12.326C14.8167 12.4016 15.0445 12.4338 15.2719 12.4207C15.7336 12.3973 16.1578 12.1934 16.4672 11.8488C16.7789 11.4996 17.0484 11.1434 17.2734 10.7801C17.6016 11.1996 17.8758 11.6566 18.0938 12.1488C18.4664 12.9879 18.6562 13.8809 18.6562 14.7996C18.6562 16.5551 17.9648 18.2074 16.7109 19.4496Z',
  svgMint: 'M15.787 7.531c-5.107 2.785-12.72 9.177-15.787 15.469h2.939c.819-2.021 2.522-4.536 3.851-5.902 8.386 3.747 17.21-2.775 17.21-11.343 0-1.535-.302-3.136-.92-4.755-2.347 3.119-5.647 1.052-10.851 1.625-7.657.844-11.162 6.797-8.764 11.54 3.506-3.415 9.523-6.38 12.322-6.634z',
  svgSearch: 'M12.523 11.463l3.213 3.211-1.062 1.062-3.211-3.213A6.72 6.72 0 017.25 14 6.752 6.752 0 01.5 7.25 6.752 6.752 0 017.25.5 6.752 6.752 0 0114 7.25a6.72 6.72 0 01-1.477 4.213zm-1.504-.557A5.233 5.233 0 0012.5 7.25C12.5 4.349 10.15 2 7.25 2A5.248 5.248 0 002 7.25c0 2.9 2.349 5.25 5.25 5.25a5.233 5.233 0 003.656-1.481l.113-.113z',
  svgTransaction: 'M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm2.085 14h-9v2h9v3l5-4-5-4v3zm-4-6v-3l-5 4 5 4v-3h9v-2h-9z',
  tinyChartAreaHeight: 20,
  tinyChartAreaHeightNew: 34,
  tinyChartAreaOpacity: .08,
  tinyChartBackgroundColor: '#191a1a',
  tinyChartBackgroundColorNew: '#9B5CFA',
  tinyChartGridColor: '#05050f',
  tinyChartGridColorNew: '#07060D',
  tinyChartGridLineWidth: 2,
  tinyChartLineColorDown: '#991bfa', // $color-violet-d
  tinyChartLineColorUp: '#176bf8', // $color-blue-main
  tinyChartLineColorUpNew: '#9B5CFA', // $color-violet-p
  tinyChartLineWidth: 2,
  tinyChartNumberOfDays: 7,
  tinyChartStepSeconds: oneHourSeconds * 2, // 2 hours
  tinyChartBackgroundOpacity: 0.01,
  transactionVolumeChartTransactionLineColor: '#9AF9F1',
  transactionVolumeChartVolumeLineColor: '#D0B2FD',
  tooltipBackgroundColor: '#eaf7fc',
  tooltipTextColor: '#05050f',
  totalSupplyAtGenesis: 469213710,
  transactionStatus: 'Completed',
  urlHashStringNeurons: '#neurons',
  urlHashStringProposals: '#proposals',
  urlHashStringTransactions: '#transactions',
  urlInternetComputerHost: 'https://ic0.app',
  urlInternetComputerStatus: 'https://status.internetcomputer.org',
  urlInternetComputerStatusApi: 'https://status.internetcomputer.org/api/v2',
  urlNnsDapp: 'https://nns.ic0.app',
  urlRouteIdSnsRootCanisterId: 'snsRootCanisterId',
  urlWikiMaturityModulation: 'https://wiki.internetcomputer.org/wiki/Maturity_modulation',
  urlWikiNodeMachineHardware: 'https://wiki.internetcomputer.org/wiki/Node_Machine_Hardware',
  valuesToCopy: valuesToCopy,
  votingHistoryChartFirstProposalId: 27261,
  votingHistoryChartLineColorNo: '#991bfa', // $color-violet-d
  votingHistoryChartLineColorNoNew: '#F99AA0', // $color-red-g
  votingHistoryChartLineColorYes: '#176bf8', // $color-blue-main
  votingHistoryChartLineColorYesNew: '#D0B2FD', // $color-violet-o
  votingHistoryChartStepSeconds: oneMinuteSeconds * 5, // 5 minutes
  // First day of data for v3/participation-rates after which DFINITY did not use its full voting
  // power (with following) on Governance topic proposals. We currently subtract one day from this
  // value due to an apparent bug in v3/participation-rates.
  votingParticipationChartDataStartTimestamp: 1640188800 - 86400
} as const;

export default Constants;
