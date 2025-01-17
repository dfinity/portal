// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  developer_education: [
    {
      type: "doc",
      label: "Welcome to the World Computer",
      id: "developer-education/developer-concepts/network-overview",
    },
    {
      type: "category",
      label: "Developer concepts",
      items: [
        {
          type: "doc",
          label: "What are canisters?",
          id: "developer-education/developer-concepts/what-are-canisters",
        },
        {
          type: "doc",
          label: "Canister components",
          id: "developer-education/developer-concepts/inside-canisters",
        },
        {
          type: "doc",
          label: "Canister lifecycle",
          id: "developer-education/developer-concepts/canister-lifecycle",
        },
        {
          type: "doc",
          label: "Trust in canisters",
          id: "developer-education/developer-concepts/trust-in-canisters",
        },
        {
          type: "category",
          label: "Reverse gas model",
          items:[
            "developer-education/developer-concepts/gas-cost",
            "developer-education/developer-concepts/cost-estimations-and-examples"
          ]
        },
        {
          type: "doc",
          label: "Unique features of ICP",
          id: "developer-education/developer-concepts/unique-icp-features",
        },
      ],
    },
    {
      type: "category",
      label: "Developer playbook",
      items: [
        {
          type: "doc",
          label: "Developer environments",
          id: "developer-education/developer-playbook/developer-environments",
        },
        {
          type: "doc",
          label: "Application architecture considerations",
          id: "developer-education/developer-playbook/application-architectures",
        },
      {
        type: "category",
        label: "Developer best practices",
        items: [
          {
            type: "doc",
            label: "General",
            id: "developer-education/developer-playbook/developer-best-practices/general",
          },
          {
            type: "doc",
            label: "Idempotency",
            id: "developer-education/developer-playbook/developer-best-practices/idempotency",
          },
          {
            type: "doc",
            label: "Reproducible builds",
            id: "developer-education/developer-playbook/developer-best-practices/reproducible-builds",
          },
          {
            type: "doc",
            label: "Storage",
            id: "developer-education/developer-playbook/developer-best-practices/storage",
          },
          {
            type: "doc",
            label: "Troubleshooting",
            id: "developer-education/developer-playbook/developer-best-practices/troubleshooting",
          },
        ],
      },
    ],
    },
    {
      type: "category",
      label: "Message execution",
      items: [
        {
          type: "doc",
          label: "Ingress messages",
          id: "developer-education/message-execution/ingress-messages",
        },
        {
          type: "doc",
          label: "Async code & inter-canister calls",
          id: "developer-education/message-execution/async-code",
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
          id: "developer-education/system-canisters/index",
        },
        {
          type: "doc",
          label: "Management canister",
          id: "developer-education/system-canisters/management-canister",
        },
      ],
    },
    {
      type: "category",
      label: "Security",
      items: [
    {
      type: "category",
      label: "Security best practices",
      items: [
        {
          type: "doc",
          label: "What are security best practices?",
          id: "developer-education/security/overview",
        },
        {
          type: "doc",
          label: "Inter-canister calls",
          id: "developer-education/security/inter-canister-calls",
        },
        {
          type: "doc",
          label: "Identity & access management",
          id: "developer-education/security/iam",
        },
        {
          type: "doc",
          label: "Decentralization",
          id: "developer-education/security/decentralization",
        },
        {
          type: "doc",
          label: "Data integrity & authenticity",
          id: "developer-education/security/data-integrity-and-authenticity",
        },
        {
          type: "doc",
          label: "Data storage",
          id: "developer-education/security/data-storage",
        },
        {
          type: "doc",
          label: "HTTP outcalls",
          id: "developer-education/security/https-outcalls",
        },
        {
          type: "doc",
          label: "Denial of service",
          id: "developer-education/security/dos",
        },
        {
          type: "doc",
          label: "Canister upgrades",
          id: "developer-education/security/canister-upgrades",
        },
        {
          type: "doc",
          label: "Observability & monitoring",
          id: "developer-education/security/observability-and-monitoring",
        },
        {
          type: "doc",
          label: "Miscellaneous",
          id: "developer-education/security/misc",
        },
        {
          type: "doc",
          label: "Important resources",
          id: "developer-education/security/resources",
        },
      ],
    },
    {
      type: "doc",
      label: "Formal verification",
      id: "developer-education/security/formal-verification",
    },
    ],
  },
    {
      type: "doc",
      label: "Glossary",
      id: "developer-education/glossary/index",
    },
  ],

build: [
  {
    type: "category",
    label: "Getting started",
    items: [
      {
        type: "category",
        label: "Quick starts",
        items: [
          {
            type: "doc",
            label: "First smart contract",
            id: "building-dapps/getting-started/quickstart/first-smart-contract",
          },
          {
            type: "doc",
            label: "First web app",
            id: "building-dapps/getting-started/quickstart/first-web-app",
          },
        ],
      },
      {
        type: "doc",
        label: "Exploring examples",
        id: "building-dapps/getting-started/explore-examples",
      },
      {
        type: "doc",
        label: "Installing developer tools",
        id: "building-dapps/getting-started/install",
      },
      {
        type: "doc",
        label: "Creating a developer identity",
        id: "building-dapps/getting-started/identities",
      },
      {
        type: "doc",
        label: "Using tokens & cycles",
        id: "building-dapps/getting-started/tokens-and-cycles",
      },
      {
        type: "doc",
        label: "Writing canister code",
        id: "building-dapps/getting-started/write-canister-code",
      },
      {
        type: "doc",
        label: "Deploying & managing dapps",
        id: "building-dapps/getting-started/deploy-and-manage",
      },
    ],
    },
    {
      type: "category",
      label: "Developer tools",
      link: {
        type: "doc",
        id: "building-dapps/developer-tools/dev-tools-overview",
      },
      items: [
        {
          type: "category",
          label: "Canister development kits",
          link: {
            type: "doc",
            id: "building-dapps/developer-tools/cdks/index",
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
                  "building-dapps/developer-tools/cdks/rust/intro-to-rust",
                  "building-dapps/developer-tools/cdks/rust/project-organization",
                  "building-dapps/developer-tools/cdks/rust/stable-structures",
                  "building-dapps/developer-tools/cdks/rust/optimizing",
                  "building-dapps/developer-tools/cdks/rust/upgrading",
                  "building-dapps/developer-tools/cdks/rust/rust-limitations",
              {
                type: "category",
                label: "Interacting with Rust canisters",
                items: [
                  "building-dapps/developer-tools/cdks/rust/intercanister",
                  "building-dapps/developer-tools/cdks/rust/message-inspect",
                  "building-dapps/developer-tools/cdks/rust/candid",
                  "building-dapps/developer-tools/cdks/rust/generating-candid",
                ],
              },
              {
                type: "category",
                label: "Example workflows",
                items: [
                  "building-dapps/developer-tools/cdks/rust/access-control",
                  "building-dapps/developer-tools/cdks/rust/searching-records",
                  "building-dapps/developer-tools/cdks/rust/canister-state",
                  "building-dapps/developer-tools/cdks/rust/timers",
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
              id: "building-dapps/developer-tools/dfx/index",
            },
            items: [
              "building-dapps/developer-tools/dfx/dfx-parent",
              "building-dapps/developer-tools/dfx/dfx-bootstrap",
              "building-dapps/developer-tools/dfx/dfx-build",
              "building-dapps/developer-tools/dfx/dfx-cache",
              "building-dapps/developer-tools/dfx/dfx-canister",
              "building-dapps/developer-tools/dfx/dfx-completion",
              "building-dapps/developer-tools/dfx/dfx-cycles",
              "building-dapps/developer-tools/dfx/dfx-deploy",
              "building-dapps/developer-tools/dfx/dfx-deps",
              "building-dapps/developer-tools/dfx/dfx-generate",
              "building-dapps/developer-tools/dfx/dfx-help",
              "building-dapps/developer-tools/dfx/dfx-identity",
              "building-dapps/developer-tools/dfx/dfx-info",
              "building-dapps/developer-tools/dfx/dfx-killall",
              "building-dapps/developer-tools/dfx/dfx-ledger",
              "building-dapps/developer-tools/dfx/dfx-new",
              "building-dapps/developer-tools/dfx/dfx-nns",
              "building-dapps/developer-tools/dfx/dfx-ping",
              "building-dapps/developer-tools/dfx/dfx-quickstart",
              "building-dapps/developer-tools/dfx/dfx-replica",
              "building-dapps/developer-tools/dfx/dfx-schema",
              "building-dapps/developer-tools/dfx/dfx-sns",
              "building-dapps/developer-tools/dfx/dfx-start",
              "building-dapps/developer-tools/dfx/dfx-stop",
              "building-dapps/developer-tools/dfx/dfx-upgrade",
              "building-dapps/developer-tools/dfx/dfx-wallet",
              "building-dapps/developer-tools/dfx/dfx-envars",
              "building-dapps/developer-tools/dfx-json",
              "building-dapps/developer-tools/dfx-json-reference",
              {
                type: "category",
                label: "Advanced dfx workflows",
                items: [
                  "building-dapps/developer-tools/advanced-dfx/check-chunk-store",
                  "building-dapps/developer-tools/advanced-dfx/dfx-migration",
                  "building-dapps/developer-tools/advanced-dfx/init-args",
                  "building-dapps/developer-tools/advanced-dfx/networks-json",
                  "building-dapps/developer-tools/advanced-dfx/specifying-replica-version",
                ],
              },
            ],
          },
          {
            type: "category",
            label: "dfxvm",
            items: [
              "building-dapps/developer-tools/dfxvm/dfxvm-default",
              "building-dapps/developer-tools/dfxvm/dfxvm-install",
              "building-dapps/developer-tools/dfxvm/dfxvm-list",
              "building-dapps/developer-tools/dfxvm/dfxvm-self-uninstall",
              "building-dapps/developer-tools/dfxvm/dfxvm-self-update",
              "building-dapps/developer-tools/dfxvm/dfxvm-uninstall",
              "building-dapps/developer-tools/dfxvm/dfxvm-update",
            ],
          },
          {
            type: "category",
            label: "quill",
            items: [
              "building-dapps/developer-tools/quill/quill-parent",
              "building-dapps/developer-tools/quill/quill-account-balance",
              {
                type: "category",
                label: "quill ckbtc",
                link: {
                  type: "doc",
                  id: "building-dapps/developer-tools/quill/ckbtc/quill-ckbtc",
                },
                items: [
                  "building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-balance",
                  "building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-retrieve-btc",
                  "building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-retrieve-btc-status",
                  "building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-transfer",
                  "building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-update-balance",
                  "building-dapps/developer-tools/quill/ckbtc/quill-ckbtc-withdrawal-address",
                ],
              },
              "building-dapps/developer-tools/quill/quill-claim-neurons",
              "building-dapps/developer-tools/quill/quill-generate",
              "building-dapps/developer-tools/quill/quill-get-neuron-info",
              "building-dapps/developer-tools/quill/quill-get-proposal-info",
              "building-dapps/developer-tools/quill/quill-list-neurons",
              "building-dapps/developer-tools/quill/quill-list-proposals",
              "building-dapps/developer-tools/quill/quill-neuron-manage",
              "building-dapps/developer-tools/quill/quill-neuron-stake",
              "building-dapps/developer-tools/quill/quill-public-ids",
              "building-dapps/developer-tools/quill/quill-qr-code",
              "building-dapps/developer-tools/quill/quill-replace-node-provider-id",
              "building-dapps/developer-tools/quill/quill-scanner-qr-code",
              "building-dapps/developer-tools/quill/quill-send",
              {
                type: "category",
                label: "quill sns",
                link: {
                  type: "doc",
                  id: "building-dapps/developer-tools/quill/sns/quill-sns",
                },
                items: [
                  "building-dapps/developer-tools/quill/sns/quill-sns-balance",
                  "building-dapps/developer-tools/quill/sns/quill-sns-configure-dissolve-delay",
                  "building-dapps/developer-tools/quill/sns/quill-sns-disburse",
                  "building-dapps/developer-tools/quill/sns/quill-sns-disburse-maturity",
                  "building-dapps/developer-tools/quill/sns/quill-sns-follow-neuron",
                  "building-dapps/developer-tools/quill/sns/quill-sns-get-sale-participation",
                  "building-dapps/developer-tools/quill/sns/quill-sns-get-swap-refund",
                  "building-dapps/developer-tools/quill/sns/quill-sns-list-deployed-snses",
                  "building-dapps/developer-tools/quill/sns/quill-sns-make-proposal",
                  "building-dapps/developer-tools/quill/sns/quill-sns-make-upgrade-canister-proposal",
                  "building-dapps/developer-tools/quill/sns/quill-sns-neuron-permission",
                  "building-dapps/developer-tools/quill/sns/quill-sns-new-sale-ticket",
                  "building-dapps/developer-tools/quill/sns/quill-sns-pay",
                  "building-dapps/developer-tools/quill/sns/quill-sns-register-vote",
                  "building-dapps/developer-tools/quill/sns/quill-sns-split-neuron",
                  "building-dapps/developer-tools/quill/sns/quill-sns-stake-maturity",
                  "building-dapps/developer-tools/quill/sns/quill-sns-stake-neuron",
                  "building-dapps/developer-tools/quill/sns/quill-sns-status",
                  "building-dapps/developer-tools/quill/sns/quill-sns-transfer",
                ],
              },
              "building-dapps/developer-tools/quill/quill-transfer",
              "building-dapps/developer-tools/quill/quill-update-node-provider",
            ],
          },
          "building-dapps/developer-tools/ic-admin",
          "building-dapps/developer-tools/idl2json",
        ],
      },
      {
        type: "category",
        label: "Integrated development environments",
        items: [
          "building-dapps/developer-tools/ide/icp-ninja",
          "building-dapps/developer-tools/ide/vs-code",
          "building-dapps/developer-tools/ide/dev-containers",
        ],
      },
      {
        type: "category",
        label: "Packages",
        items: [
          "building-dapps/developer-tools/canbench",
          "building-dapps/developer-tools/canpack",
          "building-dapps/developer-tools/ic-js",
        ],
      },
    ],
    },
    {
      type: "category",
      label: "Application frontends",
      items: [
        "building-dapps/dapp-frontends/using-an-asset-canister",
        "building-dapps/dapp-frontends/uploading-serving-assets",
        "building-dapps/dapp-frontends/existing-frontend",
        "building-dapps/dapp-frontends/asset-certification",
        "building-dapps/dapp-frontends/asset-security",
        {
          type: "category",
          label: "Custom domains",
          items: [
            "building-dapps/dapp-frontends/custom-domains/using-custom-domains",
            "building-dapps/dapp-frontends/custom-domains/dns-setup",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "User authentication",
      items: [
        "building-dapps/authentication/overview",
        "building-dapps/authentication/integrate-internet-identity",
        "building-dapps/authentication/alternative-origins",
      ],
    },
    {
      type: "category",
      label: "Launching your app",
      items: [
        "building-dapps/launching-a-dapp/create-and-install",
        {
          type: "category",
          label: "Deploying canisters",
          link: {
            type: "doc",
            id: "building-dapps/launching-a-dapp/deploy/overview",
          },
          items: [
            {
              type: "category",
              label: "Subnets",
              items: [
                "building-dapps/launching-a-dapp/subnets/overview",
                "building-dapps/launching-a-dapp/subnets/subnet-types"
              ],
            },
            "building-dapps/launching-a-dapp/deploy/custom-networks",
          ],
        },
        "building-dapps/launching-a-dapp/resource-limits",
        {
          type: "category",
          label: "Testing canisters",
          link: {
            type: "doc",
            id: "building-dapps/launching-a-dapp/test/overview",
          },
          items: [
            "building-dapps/launching-a-dapp/test/pocket-ic"
          ],
        },

      ],
    },
    {
      type: "category",
      label: "Interacting with apps",
      items: [
        "building-dapps/interacting-with-dapps/query-calls",
        "building-dapps/interacting-with-dapps/update-calls",
        "building-dapps/interacting-with-dapps/advanced-calls",
        {
          type: "category",
          label: "Candid",
          items: [
            "building-dapps/interacting-with-dapps/candid/candid-concepts",
            "building-dapps/interacting-with-dapps/candid/using-candid",
            "building-dapps/interacting-with-dapps/candid/candid-tools",
          ],
        },
        {
          type: "category",
          label: "Agents",
          link: {
            type: "doc",
            id: "building-dapps/interacting-with-dapps/agents/overview",
          },
          items: [
            "building-dapps/interacting-with-dapps/agents/javascript-agent",
            "building-dapps/interacting-with-dapps/agents/nodejs",
            "building-dapps/interacting-with-dapps/agents/rust-agent",
          ],
        },
        "building-dapps/interacting-with-dapps/using-third-party-canisters",
      ],
    },
    {
      type: "category",
      label: "Managing applications",
      items: [
        "building-dapps/managing-dapps/control",
        "building-dapps/managing-dapps/delete",
        "building-dapps/managing-dapps/history",
        "building-dapps/managing-dapps/logs",
        "building-dapps/managing-dapps/recovery",
        "building-dapps/managing-dapps/snapshots",
        "building-dapps/managing-dapps/state",
        "building-dapps/managing-dapps/settings",
        "building-dapps/managing-dapps/storage",
        "building-dapps/managing-dapps/topping-up",
        "building-dapps/managing-dapps/trapping",
        "building-dapps/managing-dapps/upgrade",
      ],
    },
    {
      type: "category",
      label: "Using network features",
      items: [
        {
          type: "category",
          label: "Fetching external data",
          items: [
            {
              type: "category",
              label: "HTTP gateways & certification",
              items: [
                "building-dapps/using-network-features/using-external-data/http-gateways-certification/gateways",
                "building-dapps/using-network-features/using-external-data/http-gateways-certification/custom-http-canisters",
                "building-dapps/using-network-features/using-external-data/http-gateways-certification/serving-json-over-http",
                "building-dapps/using-network-features/using-external-data/http-gateways-certification/serving-static-assets-ic-assets",
                "building-dapps/using-network-features/using-external-data/http-gateways-certification/serving-static-assets-over-http",
              ],
            },
            {
              type: "category",
              label: "HTTPS outcalls",
              items: [
                "building-dapps/using-network-features/using-external-data/https-outcalls/overview",
                "building-dapps/using-network-features/using-external-data/https-outcalls/get",
                "building-dapps/using-network-features/using-external-data/https-outcalls/post"
              ],
            },
          ],
        },

        {
          type: "category",
          label: "Threshold signatures",
          items: [
            "building-dapps/using-network-features/signatures/t-ecdsa",
            "building-dapps/using-network-features/signatures/t-schnorr",
            "building-dapps/using-network-features/signatures/independently-verifying-ic-signatures",
          ],
        },
        {
          type: "category",
          label: "Verifiable data encryption",
          items: [
            "building-dapps/using-network-features/encryption/vetkeys",
            "building-dapps/using-network-features/encryption/using-vetkeys",
          ],
        },
        "building-dapps/using-network-features/randomness",
        "building-dapps/using-network-features/periodic-tasks-timers",
        "building-dapps/using-network-features/time-and-timestamps",
        "building-dapps/using-network-features/simd",
        {
          type: "category",
          label: "Verifiable credentials",
          items: [
            "building-dapps/using-network-features/verifiable-credentials/overview",
            "building-dapps/using-network-features/verifiable-credentials/how-it-works",
            "building-dapps/using-network-features/verifiable-credentials/issuer",
            "building-dapps/using-network-features/verifiable-credentials/relying-party",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Chain Fusion",
      link: {
        type: "doc",
        id: "building-dapps/chain-fusion/overview",
      },
      items: [
        "building-dapps/chain-fusion/supported-chains",
        {
          type: "category",
          label: "Bitcoin",
          link: {
            type: "doc",
            id: "building-dapps/chain-fusion/bitcoin/overview",
          },
          items: [
            "building-dapps/chain-fusion/bitcoin/using-btc/btc-comparison",
            "building-dapps/chain-fusion/bitcoin/using-btc/btc-dev-workflow",
            {
              type: "category",
              label: "Interacting with Bitcoin",
              items: [
                "building-dapps/chain-fusion/bitcoin/using-btc/generate-addresses",
                "building-dapps/chain-fusion/bitcoin/using-btc/create-transactions",
                "building-dapps/chain-fusion/bitcoin/using-btc/sign-transactions",
                "building-dapps/chain-fusion/bitcoin/using-btc/submit-transactions",
                "building-dapps/chain-fusion/bitcoin/using-btc/read-state",
                "building-dapps/chain-fusion/bitcoin/using-btc/ordinals",
                "building-dapps/chain-fusion/bitcoin/using-btc/runes",
                "building-dapps/chain-fusion/bitcoin/using-btc/local-development",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Ethereum & EVM chains",
          link: {
            type: "doc",
            id: "building-dapps/chain-fusion/ethereum/overview",
          },
          items: [
            "building-dapps/chain-fusion/ethereum/using-eth/eth-comparison",
            "building-dapps/chain-fusion/ethereum/using-eth/eth-dev-workflow",
            {
              type: "category",
              label: "Interacting with Ethereum",
              items: [
                "building-dapps/chain-fusion/ethereum/using-eth/generating-addresses",
                "building-dapps/chain-fusion/ethereum/using-eth/signing-transactions",
                "building-dapps/chain-fusion/ethereum/using-eth/submit-transactions",
              ],
            },
            {
              type: "category",
              label: "EVM RPC canister",
              link: {
                type: "doc",
                id: "building-dapps/chain-fusion/ethereum/evm-rpc/overview",
              },
              items: [
                "building-dapps/chain-fusion/ethereum/evm-rpc/how-it-works",
                "building-dapps/chain-fusion/ethereum/evm-rpc/evm-rpc-canister",
                "building-dapps/chain-fusion/ethereum/evm-rpc/costs",
                "building-dapps/chain-fusion/ethereum/evm-rpc/samples",
              ],
            },
          ],
        },
        "building-dapps/chain-fusion/examples",
      ],
    },
    {
      type: "category",
      label: "Governing applications",
      items: [
        {
          label: "What is an SNS?",
          type: "doc",
          id: "building-dapps/governing-dapps/overview",
        },
        {
          type: "category",
          label: "Before an SNS launch",
          link: {
            type: "doc",
            id: "building-dapps/governing-dapps/tokenomics/index",
          },
          items: [
            "building-dapps/governing-dapps/tokenomics/predeployment-considerations",
            "building-dapps/governing-dapps/tokenomics/tokenomics-intro",
            "building-dapps/governing-dapps/tokenomics/rewards",
            "building-dapps/governing-dapps/tokenomics/preparation",
            "building-dapps/governing-dapps/tokenomics/sns-checklist",
          ],
        },
        {
          type: "category",
          label: "Launching an SNS",
          link: {
            type: "doc",
            id: "building-dapps/governing-dapps/launching/index",
          },
          items: [
            "building-dapps/governing-dapps/launching/launch-summary-1proposal",
            "building-dapps/governing-dapps/launching/launch-steps-1proposal",
            "building-dapps/governing-dapps/launching/integrating",
          ],
        },
        {
          type: "category",
          label: "Testing an SNS",
          link: {
            type: "doc",
            id: "building-dapps/governing-dapps/testing/testing-before-launch",
          },
          items: [
            "building-dapps/governing-dapps/testing/testing-locally",
            "building-dapps/governing-dapps/testing/testing-on-mainnet",
          ],
        },
        {
          type: "category",
          label: "Managing an SNS",
          link: {
            type: "doc",
            id: "building-dapps/governing-dapps/managing/manage-sns-intro",
          },
          items: [
            "building-dapps/governing-dapps/managing/making-proposals",
            "building-dapps/governing-dapps/managing/cycles-usage",
            "building-dapps/governing-dapps/managing/sns-asset-canister",
            "building-dapps/governing-dapps/managing/managing-nervous-system-parameters",
          ],
        },
      ],
    },
  ],

rosetta_defi: [
      {
        type: "doc",
        label: "Rosetta & DeFi",
        id: "rosetta-defi/overview",
      },
      {
        type: "category",
        label: "ICP Rosetta implementation",
        link: {
          type: "doc",
          id: "rosetta-defi/rosetta/icp_rosetta/index",
        },
        items: [
          {
            type: "doc",
            label: "Data API",
            id: "rosetta-defi/rosetta/icp_rosetta/data_api/index",
            },
          {
            type: "category",
            label: "Construction API",
            link: {
              type: "doc",
              id: "rosetta-defi/rosetta/icp_rosetta/construction_api/index",
            },
            items: [
            "rosetta-defi/rosetta/icp_rosetta/construction_api/operations-flow",
            "rosetta-defi/rosetta/icp_rosetta/construction_api/staking",
            "rosetta-defi/rosetta/icp_rosetta/construction_api/voting",
            ],
            },
          ],
        },
        {
          type: "category",
          label: "ICRC Rosetta implementation",
          link: {
            type: "doc",
            id: "rosetta-defi/rosetta/icrc_rosetta/index",
          },
          items: [
            {
              type: "doc",
              label: "Data API",
              id: "rosetta-defi/rosetta/icrc_rosetta/data_api/index",
              },
            {
              type: "doc",
              label: "Construction API",
              id: "rosetta-defi/rosetta/icrc_rosetta/construction_api/index",
              },
          ],
        },
      "rosetta-defi/token-standards/index",
      "rosetta-defi/create",
      {
        type: "category",
        label: "Ledgers",
        items: [
          {
            type: "category",
            label: "ICP ledger",
            items: [
              "rosetta-defi/token-ledgers/setup/icp_ledger_setup",
              "rosetta-defi/token-ledgers/usage/icp_ledger_usage",
            ],
          },
          {
            type: "category",
            label: "ICRC ledger",
            items: [
              "rosetta-defi/token-ledgers/setup/icrc1_ledger_setup",
              "rosetta-defi/token-ledgers/usage/icrc1_ledger_usage"
            ],
          },
          "rosetta-defi/token-ledgers/cycles-ledger",
          "rosetta-defi/token-integrations/index",
        ],
        },
        "rosetta-defi/token-indexes/index",
        {
          type: "category",
          label: "Chain-key tokens",
          link: {
            type: "doc",
            id: "rosetta-defi/chain-key-tokens/overview",
          },
          items: [
            {
              type: "category",
              label: "ckBTC",
              link: {
                type: "doc",
                id: "rosetta-defi/chain-key-tokens/ckbtc/overview",
              },
              items: [
                "rosetta-defi/chain-key-tokens/ckbtc/making-transactions",
                "rosetta-defi/chain-key-tokens/ckbtc/using-ckbtc-in-dapps",
              ],
            },
            {
              type: "category",
              label: "ckETH",
              link: {
                type: "doc",
                id: "rosetta-defi/chain-key-tokens/cketh/overview",
              },
              items: [
                "rosetta-defi/chain-key-tokens/cketh/making-transactions",
                "rosetta-defi/chain-key-tokens/cketh/using-cketh-in-dapps",
              ],
            },
            {
              type: "category",
              label: "ckERC20",
              link: {
                type: "doc",
                id: "rosetta-defi/chain-key-tokens/ckerc20/overview",
              },
              items: [
                "rosetta-defi/chain-key-tokens/ckerc20/making-transactions",
                "rosetta-defi/chain-key-tokens/ckerc20/using-ckerc20-in-dapps",
                "rosetta-defi/chain-key-tokens/ckerc20/creating-new-ckerc20",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Cycles",
          items: [
            "rosetta-defi/cycles/cycles-wallet",
            "rosetta-defi/cycles/converting_icp_tokens_into_cycles",
          ]
        },
        "rosetta-defi/nft-collections",
        "rosetta-defi/account-trimming",
        ],


references: [
  {
    type: "category",
    label: "IC specification",
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
