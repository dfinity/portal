// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const defiSidebar = [
  {
    type: "doc",
    label: "DeFi on ICP",
    id: "defi/overview",
  },
  "defi/concepts",
  {
    type: "category",
    label: "Token standards",
    link: {
      type: "doc",
      id: "defi/token-standards/index",
    },
    items: [
      {
        type: "doc",
        label: "ICRC-1",
        id: "defi/token-standards/icrc-1",
      },
      {
        type: "doc",
        label: "ICRC-2",
        id: "defi/token-standards/icrc-2",
      },
      {
        type: "doc",
        label: "ICRC-7",
        id: "defi/token-standards/icrc-7",
      },
      {
        type: "doc",
        label: "ICRC-37",
        id: "defi/token-standards/icrc-37",
      }
    ],
  },
  {
    type: "category",
    label: "Tutorials",
    items: [
      "defi/receiving-icp",
      {
        type: "doc",
        label: "Launch a token",
        id: "defi/create",
      },
      {
        type: "doc",
        label: "Launch an NFT collection",
        id: "defi/nft-collections",
      },
    ],
  },
  {
    type: "category",
    label: "Ledgers",
    items: [
      {
        type: "category",
        label: "ICP ledger",
        items: [
          "defi/token-ledgers/setup/icp_ledger_setup",
          "defi/token-ledgers/usage/icp_ledger_usage",
        ],
      },
      {
        type: "category",
        label: "ICRC ledger",
        items: [
          "defi/token-ledgers/setup/icrc1_ledger_setup",
          "defi/token-ledgers/usage/icrc1_ledger_usage",
          "defi/token-ledgers/upgrading/icrc1_ledger_upgrade",
        ],
      },
      "defi/token-ledgers/cycles-ledger",
      "defi/token-integrations/index",
    ],
  },
  "defi/token-indexes/index",
  "defi/defi-best-practices",
  {
    type: "category",
    label: "Chain Fusion",
    link: {
      type: "doc",
      id: "defi/chain-fusion/overview",
    },
    items: [
      "defi/chain-fusion/supported-chains",
      {
        type: "doc",
        label: "Bitcoin",
        id: "build-on-btc/index",
      },
      {
        type: "doc",
        label: "Dogecoin",
        id: "defi/chain-fusion/dogecoin/overview",
      },
      {
        type: "category",
        label: "Ethereum & EVM chains",
        link: {
          type: "doc",
          id: "defi/chain-fusion/ethereum/overview",
        },
        items: [
          "defi/chain-fusion/ethereum/using-eth/eth-comparison",
          "defi/chain-fusion/ethereum/using-eth/eth-dev-workflow",
          {
            type: "category",
            label: "Interacting with Ethereum",
            items: [
              "defi/chain-fusion/ethereum/using-eth/generating-addresses",
              "defi/chain-fusion/ethereum/using-eth/signing-transactions",
              "defi/chain-fusion/ethereum/using-eth/submit-transactions",
            ],
          },
          {
            type: "category",
            label: "EVM RPC canister",
            link: {
              type: "doc",
              id: "defi/chain-fusion/ethereum/evm-rpc/overview",
            },
            items: [
              "defi/chain-fusion/ethereum/evm-rpc/how-it-works",
              "defi/chain-fusion/ethereum/evm-rpc/evm-rpc-canister",
              "defi/chain-fusion/ethereum/evm-rpc/costs",
            ],
          },
        ],
      },
      {
        type: "doc",
        label: "Solana",
        id: "defi/chain-fusion/solana/overview",
      },
      "defi/chain-fusion/examples",
    ],
  },
  {
    type: "category",
    label: "Chain-key tokens",
    link: {
      type: "doc",
      id: "defi/chain-key-tokens/overview",
    },
    items: [
      {
        type: "category",
        label: "ckBTC",
        link: {
          type: "doc",
          id: "defi/chain-key-tokens/ckbtc/overview",
        },
        items: ["defi/chain-key-tokens/ckbtc/using-ckbtc-in-dapps"],
      },
      {
        type: "category",
        label: "ckETH",
        link: {
          type: "doc",
          id: "defi/chain-key-tokens/cketh/overview",
        },
        items: ["defi/chain-key-tokens/cketh/using-cketh-in-dapps"],
      },
      {
        type: "category",
        label: "ckERC20",
        link: {
          type: "doc",
          id: "defi/chain-key-tokens/ckerc20/overview",
        },
        items: [
          "defi/chain-key-tokens/ckerc20/making-transactions",
          "defi/chain-key-tokens/ckerc20/using-ckerc20-in-dapps",
          "defi/chain-key-tokens/ckerc20/creating-new-ckerc20",
        ],
      },
    ],
  },
  {
    type: "category",
    label: "Rosetta",
    items: [
      {
        type: "category",
        label: "ICP Rosetta",
        link: {
          type: "doc",
          id: "defi/rosetta/icp_rosetta/index",
        },
        items: [
          "defi/rosetta/icp_rosetta/running-rosetta",
          {
            type: "doc",
            label: "Data API",
            id: "defi/rosetta/icp_rosetta/data_api/index",
          },
          {
            type: "category",
            label: "Construction API",
            link: {
              type: "doc",
              id: "defi/rosetta/icp_rosetta/construction_api/index",
            },
            items: [
              "defi/rosetta/icp_rosetta/construction_api/operations-flow",
              "defi/rosetta/icp_rosetta/construction_api/staking",
              "defi/rosetta/icp_rosetta/construction_api/voting",
            ],
          },
          {
            type: "doc",
            label: "Example scripts",
            id: "defi/rosetta/icp_rosetta/examples",
          },
        ],
      },
      {
        type: "category",
        label: "ICRC Rosetta",
        link: {
          type: "doc",
          id: "defi/rosetta/icrc_rosetta/index",
        },
        items: [
          "defi/rosetta/icrc_rosetta/running-rosetta",
          {
            type: "doc",
            label: "Data API",
            id: "defi/rosetta/icrc_rosetta/data_api/index",
          },
          {
            type: "doc",
            label: "Construction API",
            id: "defi/rosetta/icrc_rosetta/construction_api/index",
          },
          {
            type: "doc",
            label: "Example scripts",
            id: "defi/rosetta/icrc_rosetta/examples",
          },
        ],
      },
    ],
  },
];

module.exports = defiSidebar;

