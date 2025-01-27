// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  developer_education: [
    {
      type: "doc",
      label: "Welcome to the Internet Computer",
      id: "concepts/network-overview",
    },
    {
      type: "category",
      label: "Concepts",
      items: [
        {
          type: "doc",
          label: "What are canisters?",
          id: "concepts/what-are-canisters",
        },
        {
          type: "doc",
          label: "Canister components",
          id: "concepts/inside-canisters",
        },
        {
          type: "doc",
          label: "Canister lifecycle",
          id: "concepts/canister-lifecycle",
        },
        {
          type: "doc",
          label: "Trust in canisters",
          id: "concepts/trust-in-canisters",
        },
        {
          type: "category",
          label: "Reverse gas model",
          items:[
            "concepts/gas-cost",
            "concepts/cost-estimations-and-examples"
          ]
        },
        {
          type: "doc",
          label: "Application architecture considerations",
          id: "concepts/application-architectures",
        },
        {
          type: "category",
          label: "Message execution",
          items: [
            {
              type: "doc",
              label: "Ingress messages",
              id: "concepts/message-execution/ingress-messages",
            },
            {
              type: "doc",
              label: "Async code & inter-canister calls",
              id: "concepts/message-execution/async-code",
            },
          ],
        },
      ],
    },
      {
        type: "category",
        label: "Best practices",
        items: [
          {
            type: "doc",
            label: "General",
            id: "concepts/developer-best-practices/general",
          },
          {
            type: "doc",
            label: "Idempotency",
            id: "concepts/developer-best-practices/idempotency",
          },
          {
            type: "doc",
            label: "Reproducible builds",
            id: "concepts/developer-best-practices/reproducible-builds",
          },
          {
            type: "doc",
            label: "Storage",
            id: "concepts/developer-best-practices/storage",
          },
          {
            type: "doc",
            label: "Troubleshooting",
            id: "concepts/developer-best-practices/troubleshooting",
          },
        ],
      },
    {
      type: "category",
      label: "System canisters",
      items: [
        {
          type: "doc",
          label: "List of system canisters",
          id: "concepts/system-canisters/index",
        },
        {
          type: "doc",
          label: "Management canister",
          id: "concepts/system-canisters/management-canister",
        },
      ],
    },
    {
      type: "category",
      label: "Security",
      items: [
    {
      type: "category",
      label: "Best practices",
      items: [
        {
          type: "doc",
          label: "What are security best practices?",
          id: "concepts/security/overview",
        },
        {
          type: "doc",
          label: "Inter-canister calls",
          id: "concepts/security/inter-canister-calls",
        },
        {
          type: "doc",
          label: "Identity & access management",
          id: "concepts/security/iam",
        },
        {
          type: "doc",
          label: "Decentralization",
          id: "concepts/security/decentralization",
        },
        {
          type: "doc",
          label: "Data integrity & authenticity",
          id: "concepts/security/data-integrity-and-authenticity",
        },
        {
          type: "doc",
          label: "Data storage",
          id: "concepts/security/data-storage",
        },
        {
          type: "doc",
          label: "HTTP outcalls",
          id: "concepts/security/https-outcalls",
        },
        {
          type: "doc",
          label: "Denial of service",
          id: "concepts/security/dos",
        },
        {
          type: "doc",
          label: "Canister upgrades",
          id: "concepts/security/canister-upgrades",
        },
        {
          type: "doc",
          label: "Observability & monitoring",
          id: "concepts/security/observability-and-monitoring",
        },
        {
          type: "doc",
          label: "Miscellaneous",
          id: "concepts/security/misc",
        },
        {
          type: "doc",
          label: "Important resources",
          id: "concepts/security/resources",
        },
      ],
    },
    {
      type: "doc",
      label: "Formal verification",
      id: "concepts/security/formal-verification",
    },
    ],
  },
    {
      type: "doc",
      label: "Glossary",
      id: "concepts/glossary/index",
    },
  ],

build: [
  {
    type: "category",
    label: "Quick start",
    items: [
      {
        type: "doc",
        label: "First smart contract",
        id: "building-apps/getting-started/quickstart/first-smart-contract",
      },
      {
        type: "doc",
        label: "First web app",
        id: "building-apps/getting-started/quickstart/first-web-app",
      },
    ],
  },
  {
    type: "category",
    label: "Essentials",
    items: [

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
      {
        type: "doc",
        label: "Writing canister code",
        id: "building-apps/getting-started/write-canister-code",
      },
      {
        type: "doc",
        label: "Deploying & managing canisters",
        id: "building-apps/getting-started/deploy-and-manage",
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
              type: "category",
              label: "Rust",
              items: [
                  "building-apps/developer-tools/cdks/rust/intro-to-rust",
                  "building-apps/developer-tools/cdks/rust/project-organization",
                  "building-apps/developer-tools/cdks/rust/stable-structures",
                  "building-apps/developer-tools/cdks/rust/optimizing",
                  "building-apps/developer-tools/cdks/rust/upgrading",
                  "building-apps/developer-tools/cdks/rust/rust-limitations",
              {
                type: "category",
                label: "Interacting with Rust canisters",
                items: [
                  "building-apps/developer-tools/cdks/rust/intercanister",
                  "building-apps/developer-tools/cdks/rust/message-inspect",
                  "building-apps/developer-tools/cdks/rust/candid",
                  "building-apps/developer-tools/cdks/rust/generating-candid",
                ],
              },
              {
                type: "category",
                label: "Example workflows",
                items: [
                  "building-apps/developer-tools/cdks/rust/access-control",
                  "building-apps/developer-tools/cdks/rust/searching-records",
                  "building-apps/developer-tools/cdks/rust/canister-state",
                  "building-apps/developer-tools/cdks/rust/timers",
                ],
              },
            ],
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
          {
            type: "category",
            label: "quill",
            items: [
              "building-apps/developer-tools/quill/quill-parent",
              "building-apps/developer-tools/quill/quill-account-balance",
              {
                type: "category",
                label: "quill ckbtc",
                link: {
                  type: "doc",
                  id: "building-apps/developer-tools/quill/ckbtc/quill-ckbtc",
                },
                items: [
                  "building-apps/developer-tools/quill/ckbtc/quill-ckbtc-balance",
                  "building-apps/developer-tools/quill/ckbtc/quill-ckbtc-retrieve-btc",
                  "building-apps/developer-tools/quill/ckbtc/quill-ckbtc-retrieve-btc-status",
                  "building-apps/developer-tools/quill/ckbtc/quill-ckbtc-transfer",
                  "building-apps/developer-tools/quill/ckbtc/quill-ckbtc-update-balance",
                  "building-apps/developer-tools/quill/ckbtc/quill-ckbtc-withdrawal-address",
                ],
              },
              "building-apps/developer-tools/quill/quill-claim-neurons",
              "building-apps/developer-tools/quill/quill-generate",
              "building-apps/developer-tools/quill/quill-get-neuron-info",
              "building-apps/developer-tools/quill/quill-get-proposal-info",
              "building-apps/developer-tools/quill/quill-list-neurons",
              "building-apps/developer-tools/quill/quill-list-proposals",
              "building-apps/developer-tools/quill/quill-neuron-manage",
              "building-apps/developer-tools/quill/quill-neuron-stake",
              "building-apps/developer-tools/quill/quill-public-ids",
              "building-apps/developer-tools/quill/quill-qr-code",
              "building-apps/developer-tools/quill/quill-replace-node-provider-id",
              "building-apps/developer-tools/quill/quill-scanner-qr-code",
              "building-apps/developer-tools/quill/quill-send",
              {
                type: "category",
                label: "quill sns",
                link: {
                  type: "doc",
                  id: "building-apps/developer-tools/quill/sns/quill-sns",
                },
                items: [
                  "building-apps/developer-tools/quill/sns/quill-sns-balance",
                  "building-apps/developer-tools/quill/sns/quill-sns-configure-dissolve-delay",
                  "building-apps/developer-tools/quill/sns/quill-sns-disburse",
                  "building-apps/developer-tools/quill/sns/quill-sns-disburse-maturity",
                  "building-apps/developer-tools/quill/sns/quill-sns-follow-neuron",
                  "building-apps/developer-tools/quill/sns/quill-sns-get-sale-participation",
                  "building-apps/developer-tools/quill/sns/quill-sns-get-swap-refund",
                  "building-apps/developer-tools/quill/sns/quill-sns-list-deployed-snses",
                  "building-apps/developer-tools/quill/sns/quill-sns-make-proposal",
                  "building-apps/developer-tools/quill/sns/quill-sns-make-upgrade-canister-proposal",
                  "building-apps/developer-tools/quill/sns/quill-sns-neuron-permission",
                  "building-apps/developer-tools/quill/sns/quill-sns-new-sale-ticket",
                  "building-apps/developer-tools/quill/sns/quill-sns-pay",
                  "building-apps/developer-tools/quill/sns/quill-sns-register-vote",
                  "building-apps/developer-tools/quill/sns/quill-sns-split-neuron",
                  "building-apps/developer-tools/quill/sns/quill-sns-stake-maturity",
                  "building-apps/developer-tools/quill/sns/quill-sns-stake-neuron",
                  "building-apps/developer-tools/quill/sns/quill-sns-status",
                  "building-apps/developer-tools/quill/sns/quill-sns-transfer",
                ],
              },
              "building-apps/developer-tools/quill/quill-transfer",
              "building-apps/developer-tools/quill/quill-update-node-provider",
            ],
          },
          "building-apps/developer-tools/ic-admin",
          "building-apps/developer-tools/idl2json",
        ],
      },
      {
        type: "category",
        label: "Integrated development environments",
        items: [
          "building-apps/developer-tools/ide/icp-ninja",
          "building-apps/developer-tools/ide/vs-code",
          "building-apps/developer-tools/ide/dev-containers",
        ],
      },
      {
        type: "category",
        label: "Packages",
        items: [
          "building-apps/developer-tools/canbench",
          "building-apps/developer-tools/canpack",
          "building-apps/developer-tools/ic-js",
        ],
      },
    ],
    },
    {
      type: "doc",
      label: "Create canisters",
      id: "building-apps/creating-dapps/create-and-install",
    },
    {
      type: "category",
      label: "Deploy & test",
      items: [
        "building-apps/creating-dapps/deploy/overview",
        "building-apps/creating-dapps/deploy/custom-networks",
        {
          type: "category",
          label: "Subnets",
          items: [
            "building-apps/creating-dapps/subnets/overview",
            "building-apps/creating-dapps/subnets/subnet-types"
          ],
        },
         {
          type: "category",
          label: "Testing canisters",
          link: {
            type: "doc",
            id: "building-apps/creating-dapps/test/overview",
          },
          items: [
            "building-apps/creating-dapps/test/pocket-ic"
          ],
        },
        "building-apps/creating-dapps/using-third-party-canisters",
      ],
    },
    {
      type: "category",
      label: "Interact with canisters",
      items: [
        "building-apps/calling-dapps/query-calls",
        "building-apps/calling-dapps/update-calls",
        "building-apps/calling-dapps/advanced-calls",
        {
          type: "category",
          label: "Candid",
          items: [
            "building-apps/calling-dapps/candid/candid-concepts",
            "building-apps/calling-dapps/candid/using-candid",
            "building-apps/calling-dapps/candid/candid-tools",
          ],
        },
        {
          type: "category",
          label: "Agents",
          link: {
            type: "doc",
            id: "building-apps/calling-dapps/agents/overview",
          },
          items: [
            "building-apps/calling-dapps/agents/javascript-agent",
            "building-apps/calling-dapps/agents/nodejs",
            "building-apps/calling-dapps/agents/rust-agent",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Management & settings",
      items: [
        "building-apps/managing-dapps/control",
        "building-apps/managing-dapps/delete",
        "building-apps/managing-dapps/history",
        "building-apps/managing-dapps/logs",
        "building-apps/managing-dapps/recovery",
        "building-apps/managing-dapps/resource-limits",
        "building-apps/managing-dapps/snapshots",
        "building-apps/managing-dapps/state",
        "building-apps/managing-dapps/settings",
        "building-apps/managing-dapps/storage",
        "building-apps/managing-dapps/topping-up",
        "building-apps/managing-dapps/trapping",
        "building-apps/managing-dapps/upgrade",
      ],
    },
    {
      type: "category",
      label: "Application frontends",
      items: [
        "building-apps/dapp-frontends/using-an-asset-canister",
        "building-apps/dapp-frontends/uploading-serving-assets",
        "building-apps/dapp-frontends/existing-frontend",
        "building-apps/using-network-features/using-http/http-certification/ic-asset-certification-library",
        "building-apps/dapp-frontends/asset-security",
        {
          type: "category",
          label: "Custom domains",
          items: [
            "building-apps/dapp-frontends/custom-domains/using-custom-domains",
            "building-apps/dapp-frontends/custom-domains/dns-setup",
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
            "building-apps/using-network-features/using-http/http-certification/gateways",
            {
              type: "category",
              label: "HTTP certification",
              items: [
                {
                  type: "doc",
                  id: "building-apps/using-network-features/using-http/http-certification/ic-asset-certification-library",
                  label: "The asset certification library",
                },
                {
                  type: "doc",
                  id: "building-apps/using-network-features/using-http/http-certification/example-canister-serving-assets",
                  label: "Example canister serving assets",
                },
                {
                  type: "doc",
                  id: "building-apps/using-network-features/using-http/http-certification/custom-http-canisters",
                  label: "Custom HTTP canisters",
                },
                {
                  type: "doc",
                  id: "building-apps/using-network-features/using-http/http-certification/serving-json-over-http",
                  label: "Serving JSON over HTTP",
                },
                {
                  type: "doc",
                  id: "building-apps/using-network-features/using-http/http-certification/serving-static-assets-over-http",
                  label: "Serving static assets over HTTP (custom)",
                },
              ],
            },
            {
              type: "category",
              label: "HTTPS outcalls",
              items: [
                "building-apps/using-network-features/using-http/https-outcalls/overview",
                "building-apps/using-network-features/using-http/https-outcalls/get",
                "building-apps/using-network-features/using-http/https-outcalls/post"
              ],
            },
          ],
        },

        {
          type: "category",
          label: "Threshold signatures",
          items: [
            "building-apps/using-network-features/signatures/t-ecdsa",
            "building-apps/using-network-features/signatures/t-schnorr",
            "building-apps/using-network-features/signatures/independently-verifying-ic-signatures",
          ],
        },
        {
          type: "category",
          label: "Verifiable encryption",
          items: [
            "building-apps/using-network-features/encryption/vetkeys",
            "building-apps/using-network-features/encryption/using-vetkeys",
          ],
        },
        "building-apps/using-network-features/randomness",
        "building-apps/using-network-features/periodic-tasks-timers",
        "building-apps/using-network-features/time-and-timestamps",
        "building-apps/using-network-features/simd",
        {
          type: "category",
          label: "Verifiable credentials",
          items: [
            "building-apps/using-network-features/verifiable-credentials/overview",
            "building-apps/using-network-features/verifiable-credentials/how-it-works",
            "building-apps/using-network-features/verifiable-credentials/issuer",
            "building-apps/using-network-features/verifiable-credentials/relying-party",
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
      label: "Governing applications",
      items: [
        {
          label: "What is an SNS?",
          type: "doc",
          id: "building-apps/governing-dapps/overview",
        },
        {
          type: "category",
          label: "Before an SNS launch",
          link: {
            type: "doc",
            id: "building-apps/governing-dapps/tokenomics/index",
          },
          items: [
            "building-apps/governing-dapps/tokenomics/predeployment-considerations",
            "building-apps/governing-dapps/tokenomics/tokenomics-intro",
            "building-apps/governing-dapps/tokenomics/rewards",
            "building-apps/governing-dapps/tokenomics/preparation",
            "building-apps/governing-dapps/tokenomics/sns-checklist",
          ],
        },
        {
          type: "category",
          label: "Launching an SNS",
          link: {
            type: "doc",
            id: "building-apps/governing-dapps/launching/index",
          },
          items: [
            "building-apps/governing-dapps/launching/launch-summary-1proposal",
            "building-apps/governing-dapps/launching/launch-steps-1proposal",
            "building-apps/governing-dapps/launching/integrating",
          ],
        },
        {
          type: "category",
          label: "Testing an SNS",
          link: {
            type: "doc",
            id: "building-apps/governing-dapps/testing/testing-before-launch",
          },
          items: [
            "building-apps/governing-dapps/testing/testing-locally",
            "building-apps/governing-dapps/testing/testing-on-mainnet",
          ],
        },
        {
          type: "category",
          label: "Managing an SNS",
          link: {
            type: "doc",
            id: "building-apps/governing-dapps/managing/manage-sns-intro",
          },
          items: [
            "building-apps/governing-dapps/managing/making-proposals",
            "building-apps/governing-dapps/managing/cycles-usage",
            "building-apps/governing-dapps/managing/sns-asset-canister",
            "building-apps/governing-dapps/managing/managing-nervous-system-parameters",
          ],
        },
      ],
    },
  ],

rosetta_defi: [
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
      "defi/create",
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
        {
          type: "category",
          label: "Cycles",
          items: [
            "defi/cycles/cycles-wallet",
            "defi/cycles/converting_icp_tokens_into_cycles",
          ]
        },
        "defi/nft-collections",
        "defi/account-trimming",
        ],


specifications: [
  {
    type: "category",
    label: "IC specifications",
    items: [
      "specifications/ic-interface-spec",
      "specifications/http-gateway-protocol-spec"
    ],
  },
  {
    type: "category",
    label: "Feature specifications",
    items: [
      "specifications/asset-canister",
      "specifications/bitcoin-how-it-works",
      "specifications/ckbtc-reference",
      "specifications/candid-ref",
      "specifications/https-outcalls-how-it-works",
      "specifications/ii-spec",
      "specifications/icrc1-standard",
      "specifications/ledger",
      "specifications/supported-signatures",
      "specifications/t-sigs-how-it-works",
      "specifications/vc-spec",
      "specifications/vetkeys-overview"
    ],
  },
  {
    type: "doc",
    label: "Dashboard API reference",
    id: "specifications/dashboard-apis"
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
