// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

build: [
  {
    type: "category",
    label: "Getting started",
    items: [
      {
        type: "doc",
        label: "Quick start",
        id: "building-apps/getting-started/first-smart-contract",
      },
      {
        type: "doc",
        label: "Development workflow",
        id: "building-apps/getting-started/development-workflow",
      },
      {
        type: "doc",
        label: "Installing the IC SDK",
        id: "building-apps/getting-started/install",
      },
      {
        type: "doc",
        label: "Developer identities",
        id: "building-apps/getting-started/identities",
      },
      {
        type: "doc",
        label: "Using tokens & cycles",
        id: "building-apps/getting-started/tokens-and-cycles",
      },
    ],
  },
  {
    type: "category",
    label: "Essentials",
    items: [
      {
        type: "doc",
        label: "Network overview",
        id: "building-apps/essentials/network-overview",
      },
      {
        type: "category",
        label: "Fees",
        items:[
          "building-apps/essentials/gas-cost",
          "building-apps/essentials/cost-estimations-and-examples"
        ]
      },
      {
        type: "doc",
        label: "Canister smart contracts",
        id: "building-apps/essentials/canisters",
      },
      {
        type: "doc",
        label: "Message execution",
        id: "building-apps/essentials/message-execution",
      },
    ],
    },
    {
      type: "category",
      label: "Developer tools",
      link: {
        type: "doc",
        id: "building-apps/developer-tools/dev-tools-overview",
      },
      items: [
        {
          type: "category",
          label: "Canister development kits",
          link: {
            type: "doc",
            id: "building-apps/developer-tools/cdks/index",
          },
          items: [
            {
              type: "doc",
              label: "Motoko",
              id: "motoko/main/getting-started/motoko-introduction",
            },
            {
              type: "doc",
              label: "Rust",
              id: "building-apps/developer-tools/cdks/rust/intro-to-rust",
            },
            ],
          },
          {
          type: "category",
          label: "Command-line tools",
          items: [
          {
            type: "category",
            label: "dfx",
            link: {
              type: "doc",
              id: "building-apps/developer-tools/dfx/index",
            },
            items: [
              "building-apps/developer-tools/dfx/dfx-parent",
              "building-apps/developer-tools/dfx/dfx-bootstrap",
              "building-apps/developer-tools/dfx/dfx-build",
              "building-apps/developer-tools/dfx/dfx-cache",
              "building-apps/developer-tools/dfx/dfx-canister",
              "building-apps/developer-tools/dfx/dfx-completion",
              "building-apps/developer-tools/dfx/dfx-cycles",
              "building-apps/developer-tools/dfx/dfx-deploy",
              "building-apps/developer-tools/dfx/dfx-deps",
              "building-apps/developer-tools/dfx/dfx-generate",
              "building-apps/developer-tools/dfx/dfx-help",
              "building-apps/developer-tools/dfx/dfx-identity",
              "building-apps/developer-tools/dfx/dfx-info",
              "building-apps/developer-tools/dfx/dfx-killall",
              "building-apps/developer-tools/dfx/dfx-ledger",
              "building-apps/developer-tools/dfx/dfx-new",
              "building-apps/developer-tools/dfx/dfx-nns",
              "building-apps/developer-tools/dfx/dfx-ping",
              "building-apps/developer-tools/dfx/dfx-quickstart",
              "building-apps/developer-tools/dfx/dfx-replica",
              "building-apps/developer-tools/dfx/dfx-schema",
              "building-apps/developer-tools/dfx/dfx-sns",
              "building-apps/developer-tools/dfx/dfx-start",
              "building-apps/developer-tools/dfx/dfx-stop",
              "building-apps/developer-tools/dfx/dfx-upgrade",
              "building-apps/developer-tools/dfx/dfx-wallet",
              "building-apps/developer-tools/dfx/dfx-envars",
              "building-apps/developer-tools/dfx-json",
              "building-apps/developer-tools/dfx-json-reference",
              {
                type: "category",
                label: "Advanced dfx workflows",
                items: [
                  "building-apps/developer-tools/advanced-dfx/check-chunk-store",
                  "building-apps/developer-tools/advanced-dfx/dfx-migration",
                  "building-apps/developer-tools/advanced-dfx/init-args",
                  "building-apps/developer-tools/advanced-dfx/networks-json",
                  "building-apps/developer-tools/advanced-dfx/specifying-replica-version",
                ],
              },
            ],
          },
          {
            type: "category",
            label: "dfxvm",
            items: [
              "building-apps/developer-tools/dfxvm/dfxvm-default",
              "building-apps/developer-tools/dfxvm/dfxvm-install",
              "building-apps/developer-tools/dfxvm/dfxvm-list",
              "building-apps/developer-tools/dfxvm/dfxvm-self-uninstall",
              "building-apps/developer-tools/dfxvm/dfxvm-self-update",
              "building-apps/developer-tools/dfxvm/dfxvm-uninstall",
              "building-apps/developer-tools/dfxvm/dfxvm-update",
            ],
          },
        ],
      },
       "building-apps/developer-tools/ide/icp-ninja",
      {
        type: "category",
        label: "Other",
        items: [
          "building-apps/developer-tools/ic-js",
        ],
      },
      ],
    },
    {
      type: "category",
      label: "Developing canisters",
      items:
      [
        "building-apps/developing-canisters/what-is-a-canister",
        "building-apps/developing-canisters/write",
        "building-apps/developing-canisters/create",
        "building-apps/developing-canisters/compile",
        "building-apps/developing-canisters/install",
        "building-apps/developing-canisters/deploy",
      ]
    },
    {
      type: "category",
      label: "Interact with canisters",
      items: [
        {
          type: "category",
          label: "Candid",
          items: [
            "building-apps/interact-with-canisters/candid/candid-concepts",
            "building-apps/interact-with-canisters/candid/using-candid",
            "building-apps/interact-with-canisters/candid/candid-tools",
          ],
        },
        "building-apps/interact-with-canisters/query-calls",
        "building-apps/interact-with-canisters/update-calls",
        "building-apps/interact-with-canisters/advanced-calls",
        {
          type: "category",
          label: "Agents",
          link: {
            type: "doc",
            id: "building-apps/interact-with-canisters/agents/overview",
          },
          items: [
            "building-apps/interact-with-canisters/agents/javascript-agent",
            "building-apps/interact-with-canisters/agents/rust-agent",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Advanced",
      items:
      [
         {
          type: "category",
          label: "Testing canisters",
          link: {
            type: "doc",
            id: "building-apps/advanced/test/overview",
          },
          items: [
            "building-apps/advanced/test/pocket-ic"
          ],
        },
        "building-apps/advanced/using-third-party-canisters",
        "building-apps/advanced/benchmarking",
        {
          type: "category",
          label: "Canister optimization",
          items: [
            "building-apps/advanced/optimize/motoko",
            "building-apps/advanced/optimize/rust",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Canister management",
      items: [
        "building-apps/canister-management/control",
        "building-apps/canister-management/delete",
        "building-apps/canister-management/history",
        "building-apps/canister-management/logs",
        "building-apps/canister-management/recovery",
        "building-apps/canister-management/resource-limits",
        "building-apps/canister-management/snapshots",
        "building-apps/canister-management/state",
        "building-apps/canister-management/settings",
        "building-apps/canister-management/storage",
        "building-apps/canister-management/topping-up",
        "building-apps/canister-management/trapping",
        "building-apps/canister-management/upgrade",
      ],
    },
    {
      type: "category",
      label: "Frontends",
      items: [
        "building-apps/frontends/using-an-asset-canister",
        "building-apps/frontends/uploading-serving-assets",
        "building-apps/frontends/existing-frontend",
        "building-apps/network-features/using-http/http-certification/ic-asset-certification-library",
        "building-apps/frontends/asset-security",
        {
          type: "category",
          label: "Custom domains",
          items: [
            "building-apps/frontends/custom-domains/using-custom-domains",
            "building-apps/frontends/custom-domains/dns-setup",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "User authentication",
      items: [
        "building-apps/authentication/overview",
        "building-apps/authentication/integrate-internet-identity",
        "building-apps/authentication/alternative-origins",
      ],
    },
    {
      type: "category",
      label: "Network features",
      items: [
        {
          type: "category",
          label: "Using HTTP",
          items: [
            "building-apps/network-features/using-http/http-certification/gateways",
            {
              type: "category",
              label: "HTTP certification",
              items: [
                {
                  type: "doc",
                  id: "building-apps/network-features/using-http/http-certification/ic-asset-certification-library",
                  label: "The asset certification library",
                },
                {
                  type: "doc",
                  id: "building-apps/network-features/using-http/http-certification/example-canister-serving-assets",
                  label: "Example canister serving assets",
                },
                {
                  type: "doc",
                  id: "building-apps/network-features/using-http/http-certification/custom-http-canisters",
                  label: "Custom HTTP canisters",
                },
                {
                  type: "doc",
                  id: "building-apps/network-features/using-http/http-certification/serving-json-over-http",
                  label: "Serving JSON over HTTP",
                },
                {
                  type: "doc",
                  id: "building-apps/network-features/using-http/http-certification/serving-static-assets-over-http",
                  label: "Serving static assets over HTTP (custom)",
                },
              ],
            },
            {
              type: "category",
              label: "HTTPS outcalls",
              items: [
                "building-apps/network-features/using-http/https-outcalls/overview",
                "building-apps/network-features/using-http/https-outcalls/get",
                "building-apps/network-features/using-http/https-outcalls/post"
              ],
            },
          ],
        },

        {
          type: "category",
          label: "Threshold signatures",
          items: [
            "building-apps/network-features/signatures/t-ecdsa",
            "building-apps/network-features/signatures/t-schnorr",
            "building-apps/network-features/signatures/independently-verifying-ic-signatures",
          ],
        },
        {
          type: "category",
          label: "Verifiable encryption",
          items: [
            "building-apps/network-features/encryption/vetkeys",
            "building-apps/network-features/encryption/using-vetkeys",
          ],
        },
        "building-apps/network-features/randomness",
        "building-apps/network-features/periodic-tasks-timers",
        "building-apps/network-features/time-and-timestamps",
        "building-apps/network-features/simd",
        {
          type: "category",
          label: "Verifiable credentials",
          items: [
            "building-apps/network-features/verifiable-credentials/overview",
            "building-apps/network-features/verifiable-credentials/how-it-works",
            "building-apps/network-features/verifiable-credentials/issuer",
            "building-apps/network-features/verifiable-credentials/relying-party",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Chain Fusion",
      link: {
        type: "doc",
        id: "building-apps/chain-fusion/overview",
      },
      items: [
        "building-apps/chain-fusion/supported-chains",
        {
          type: "category",
          label: "Bitcoin",
          link: {
            type: "doc",
            id: "building-apps/chain-fusion/bitcoin/overview",
          },
          items: [
            "building-apps/chain-fusion/bitcoin/using-btc/btc-comparison",
            "building-apps/chain-fusion/bitcoin/using-btc/btc-dev-workflow",
            {
              type: "category",
              label: "Interacting with Bitcoin",
              items: [
                "building-apps/chain-fusion/bitcoin/using-btc/generate-addresses",
                "building-apps/chain-fusion/bitcoin/using-btc/create-transactions",
                "building-apps/chain-fusion/bitcoin/using-btc/sign-transactions",
                "building-apps/chain-fusion/bitcoin/using-btc/submit-transactions",
                "building-apps/chain-fusion/bitcoin/using-btc/read-state",
                "building-apps/chain-fusion/bitcoin/using-btc/ordinals",
                "building-apps/chain-fusion/bitcoin/using-btc/runes",
                "building-apps/chain-fusion/bitcoin/using-btc/local-development",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Ethereum & EVM chains",
          link: {
            type: "doc",
            id: "building-apps/chain-fusion/ethereum/overview",
          },
          items: [
            "building-apps/chain-fusion/ethereum/using-eth/eth-comparison",
            "building-apps/chain-fusion/ethereum/using-eth/eth-dev-workflow",
            {
              type: "category",
              label: "Interacting with Ethereum",
              items: [
                "building-apps/chain-fusion/ethereum/using-eth/generating-addresses",
                "building-apps/chain-fusion/ethereum/using-eth/signing-transactions",
                "building-apps/chain-fusion/ethereum/using-eth/submit-transactions",
              ],
            },
            {
              type: "category",
              label: "EVM RPC canister",
              link: {
                type: "doc",
                id: "building-apps/chain-fusion/ethereum/evm-rpc/overview",
              },
              items: [
                "building-apps/chain-fusion/ethereum/evm-rpc/how-it-works",
                "building-apps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister",
                "building-apps/chain-fusion/ethereum/evm-rpc/costs",
                "building-apps/chain-fusion/ethereum/evm-rpc/samples",
              ],
            },
          ],
        },
        "building-apps/chain-fusion/examples",
      ],
    },
    {
      type: "category",
      label: "Best practices",
      items: [
        {
          type: "doc",
          label: "General",
          id: "building-apps/best-practices/general",
        },
        {
          type: "doc",
          label: "Idempotency",
          id: "building-apps/best-practices/idempotency",
        },
        {
          type: "doc",
          label: "Reproducible builds",
          id: "building-apps/best-practices/reproducible-builds",
        },
        {
          type: "doc",
          label: "Storage",
          id: "building-apps/best-practices/storage",
        },
        {
          type: "doc",
          label: "Troubleshooting",
          id: "building-apps/best-practices/troubleshooting",
        },
        {
          type: "doc",
          label: "Trust in canisters",
          id: "building-apps/best-practices/trust-in-canisters",
        },
        {
          type: "doc",
          label: "Application architecture considerations",
          id: "building-apps/best-practices/application-architectures",
        },
      {
        type: "category",
        label: "Security",
        items: [
          {
            type: "doc",
            label: "What are security best practices?",
            id: "building-apps/best-practices/security/overview",
          },
          {
            type: "doc",
            label: "Inter-canister calls",
            id: "building-apps/best-practices/security/inter-canister-calls",
          },
          {
            type: "doc",
            label: "Identity & access management",
            id: "building-apps/best-practices/security/iam",
          },
          {
            type: "doc",
            label: "Decentralization",
            id: "building-apps/best-practices/security/decentralization",
          },
          {
            type: "doc",
            label: "Data integrity & authenticity",
            id: "building-apps/best-practices/security/data-integrity-and-authenticity",
          },
          {
            type: "doc",
            label: "Data storage",
            id: "building-apps/best-practices/security/data-storage",
          },
          {
            type: "doc",
            label: "HTTP outcalls",
            id: "building-apps/best-practices/security/https-outcalls",
          },
          {
            type: "doc",
            label: "Denial of service",
            id: "building-apps/best-practices/security/dos",
          },
          {
            type: "doc",
            label: "Canister upgrades",
            id: "building-apps/best-practices/security/canister-upgrades",
          },
          {
            type: "doc",
            label: "Observability & monitoring",
            id: "building-apps/best-practices/security/observability-and-monitoring",
          },
          {
            type: "doc",
            label: "Miscellaneous",
            id: "building-apps/best-practices/security/misc",
          },
          {
            type: "doc",
            label: "Important resources",
            id: "building-apps/best-practices/security/resources",
          },
        ],
      },
      {
        type: "doc",
        label: "Formal verification",
        id: "building-apps/best-practices/security/formal-verification",
      },
    ],
  },
    {
      type: "category",
      label: "Governing applications",
      items: [
        {
          label: "What is an SNS?",
          type: "doc",
          id: "building-apps/governing-apps/overview",
        },
        {
          type: "category",
          label: "Before an SNS launch",
          link: {
            type: "doc",
            id: "building-apps/governing-apps/tokenomics/index",
          },
          items: [
            "building-apps/governing-apps/tokenomics/predeployment-considerations",
            "building-apps/governing-apps/tokenomics/tokenomics-intro",
            "building-apps/governing-apps/tokenomics/rewards",
            "building-apps/governing-apps/tokenomics/preparation",
            "building-apps/governing-apps/tokenomics/sns-checklist",
          ],
        },
        {
          type: "category",
          label: "Launching an SNS",
          link: {
            type: "doc",
            id: "building-apps/governing-apps/launching/index",
          },
          items: [
            "building-apps/governing-apps/launching/launch-summary-1proposal",
            "building-apps/governing-apps/launching/launch-steps-1proposal",
            "building-apps/governing-apps/launching/integrating",
          ],
        },
        {
          type: "category",
          label: "Testing an SNS",
          link: {
            type: "doc",
            id: "building-apps/governing-apps/testing/testing-before-launch",
          },
          items: [
            "building-apps/governing-apps/testing/testing-locally",
            "building-apps/governing-apps/testing/testing-on-mainnet",
          ],
        },
        {
          type: "category",
          label: "Managing an SNS",
          link: {
            type: "doc",
            id: "building-apps/governing-apps/managing/manage-sns-intro",
          },
          items: [
            "building-apps/governing-apps/managing/making-proposals",
            "building-apps/governing-apps/managing/cycles-usage",
            "building-apps/governing-apps/managing/sns-asset-canister",
            "building-apps/governing-apps/managing/managing-nervous-system-parameters",
          ],
        },
      ],
    },
  ],

defi: [
      {
        type: "doc",
        label: "Developing DeFi applications",
        id: "defi/overview",
      },
      {
        type: "category",
        label: "ICP Rosetta implementation",
        link: {
          type: "doc",
          id: "defi/rosetta/icp_rosetta/index",
        },
        items: [
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
          ],
        },
        {
          type: "category",
          label: "ICRC Rosetta implementation",
          link: {
            type: "doc",
            id: "defi/rosetta/icrc_rosetta/index",
          },
          items: [
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
          ],
        },
      "defi/token-standards/index",
      {
        type: "category",
        label: "Creating tokens",
        items: [
          {
            type: "doc",
            label: "Fungible tokens",
            id: "defi/create",
          },
          {
            type: "doc",
            label: "Non-fungible tokens",
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
              "defi/token-ledgers/usage/icrc1_ledger_usage"
            ],
          },
          "defi/token-ledgers/cycles-ledger",
          "defi/token-integrations/index",
          "defi/account-trimming",
        ],
        },
        "defi/token-indexes/index",
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
              items: [
                "defi/chain-key-tokens/ckbtc/using-ckbtc-in-dapps",
              ],
            },
            {
              type: "category",
              label: "ckETH",
              link: {
                type: "doc",
                id: "defi/chain-key-tokens/cketh/overview",
              },
              items: [
                "defi/chain-key-tokens/cketh/using-cketh-in-dapps",
              ],
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
        ],


references: [
  {
    type: "category",
    label: "IC specifications",
    items: [
      "references/ic-interface-spec",
      "references/http-gateway-protocol-spec"
    ],
  },
  {
    type: "category",
    label: "Feature specifications",
    items: [
      "references/asset-canister",
      "references/bitcoin-how-it-works",
      "references/ckbtc-reference",
      "references/candid-ref",
      "references/https-outcalls-how-it-works",
      "references/ii-spec",
      "references/icrc1-standard",
      "references/ledger",
      "references/supported-signatures",
      "references/t-sigs-how-it-works",
      "references/vc-spec",
      "references/vetkeys-overview"
    ],
  },
  {
    type: "doc",
    label: "Dashboard API reference",
    id: "references/dashboard-apis"
  },
  {
    type: "category",
    label: "System canisters",
    items: [
      {
        type: "doc",
        label: "List of system canisters",
        id: "references/system-canisters/index",
      },
      {
        type: "doc",
        label: "Management canister",
        id: "references/system-canisters/management-canister",
      },
    ],
  },
  {
    type: "doc",
    label: "Glossary",
    id: "references/glossary/index",
  },
],

devjourney: [
    {
      type: "category",
      label: "Developer Ladder",
      link: {
        type: "doc",
        id: "tutorials/developer-journey/index",
      },
      items: [
        {
          type: "category",
          label: "Level 0: Pre-flight operations",
          items: [
            "tutorials/developer-journey/level-0/ic-overview",
            "tutorials/developer-journey/level-0/ic-terms",
            "tutorials/developer-journey/level-0/dev-env",
            "tutorials/developer-journey/level-0/intro-canisters",
            "tutorials/developer-journey/level-0/intro-languages",
            "tutorials/developer-journey/level-0/intro-dfx",
      ],
    },
      {
        type: "category",
        label: "Level 1: Space cadet",
        items: [
          "tutorials/developer-journey/level-1/1.1-live-demo",
          "tutorials/developer-journey/level-1/1.2-motoko-lvl1",
          "tutorials/developer-journey/level-1/1.3-first-dapp",
          "tutorials/developer-journey/level-1/1.4-using-cycles",
          "tutorials/developer-journey/level-1/1.5-deploying-canisters",
          "tutorials/developer-journey/level-1/1.6-managing-canisters",
      ],
    },
    {
      type: "category",
      label: "Level 2: Space explorer",
      items: [
        "tutorials/developer-journey/level-2/2.1-storage-persistence",
        "tutorials/developer-journey/level-2/2.2-advanced-canister-calls",
        "tutorials/developer-journey/level-2/2.3-third-party-canisters",
        "tutorials/developer-journey/level-2/2.4-intro-candid",
        "tutorials/developer-journey/level-2/2.5-unit-testing",
        "tutorials/developer-journey/level-2/2.6-motoko-lvl2",
      ],
    },
    {
      type: "category",
      label: "Level 3: Space engineer",
      items: [
        "tutorials/developer-journey/level-3/3.1-package-managers",
        "tutorials/developer-journey/level-3/3.2-https-outcalls",
        "tutorials/developer-journey/level-3/3.3-certified-data",
        "tutorials/developer-journey/level-3/3.4-intro-to-agents",
        "tutorials/developer-journey/level-3/3.5-identities-and-auth",
        "tutorials/developer-journey/level-3/3.6-motoko-lvl3",
    ],
    },
    {
      type: "category",
      label: "Level 4: Space pilot",
      items: [
        "tutorials/developer-journey/level-4/4.1-icp-ledger",
        "tutorials/developer-journey/level-4/4.2-icrc-tokens",
        "tutorials/developer-journey/level-4/4.3-ckbtc-and-bitcoin",
        "tutorials/developer-journey/level-4/4.4-nns-governance",
        "tutorials/developer-journey/level-4/4.5-using-quill",
        "tutorials/developer-journey/level-4/4.6-motoko-lvl4",
    ],
    },
    {
      type: "category",
      label: "Level 5: Internet Computer astronaut",
      items: [
        "tutorials/developer-journey/level-5/5.1-vetKeys-tutorial",
        "tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial",
        "tutorials/developer-journey/level-5/5.3-token-swap-tutorial",
        "tutorials/developer-journey/level-5/5.4-NFT-tutorial",
        "tutorials/developer-journey/level-5/5.5-auction-tutorial",
        "tutorials/developer-journey/level-5/5.6-next-steps",
    ],
    },
  ],
  },
],

hackathon: [
  {
    type: "category",
    label: "Hackathon prep course",
    link: {
      type: "doc",
      id: "tutorials/hackathon-prep-course/index",
    },
    items: [
      "tutorials/hackathon-prep-course/what-is-icp",
      "tutorials/hackathon-prep-course/deploying-first-fullstack-dapp",
      "tutorials/hackathon-prep-course/exploring-the-backend",
      "tutorials/hackathon-prep-course/exploring-the-frontend",
      "tutorials/hackathon-prep-course/integrating-with-tokens",
      "tutorials/hackathon-prep-course/authentication",
      "tutorials/hackathon-prep-course/obtaining-cycles",
      "tutorials/hackathon-prep-course/managing-canisters",
      "tutorials/hackathon-prep-course/sample-starter-projects",
      "tutorials/hackathon-prep-course/resources",
    ],
  },
],

  motoko: [
    "motoko/tutorial",
    {
      type: "category",
      label: "Motoko language book",
      items: [
        {
          type: "link",
          label: "1. Introduction",
          href: "https://motoko-book.dev/introduction.html",
        },
        {
          type: "link",
          label: "2. Common programming concepts",
          href: "https://motoko-book.dev/common-programming-concepts.html",
        },
        {
          type: "link",
          label: "3. Internet Computer programming concepts",
          href: "https://motoko-book.dev/internet-computer-programming-concepts.html",
        },
        {
          type: "link",
          label: "4. Advanced types",
          href: "https://motoko-book.dev/advanced-types.html",
        },
        {
          type: "link",
          label: "5. The base library",
          href: "https://motoko-book.dev/base-library.html",
        },
        {
          type: "link",
          label: "6. Advanced concepts",
          href: "https://motoko-book.dev/advanced-concepts.html",
        },
      ],
    },
    {
      type: "autogenerated",
      dirName: "motoko/main",
    },
  ],
}

/**
 * Add UI tests in development mode
 */
if (process.env.NODE_ENV === "development") {
  sidebars["__ui_tests_internal__"] = [
    {
      type: "autogenerated",
      dirName: "tests",
    },
  ];
}

module.exports = sidebars;
