// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  tutorials: [
        {
          type: "doc",
          label: "Tutorials introduction",
          id: "tutorials/index",
        },
         {
          type: "category",
          label: "Developer journey",
          link: {
            type: "doc",
            id: "tutorials/developer-journey/index",
          },
          items: [
            {
              type: "category",
              label: "Level 0: Pre-flight operations",
              link: {
                type: "doc",
                id: "tutorials/developer-journey/level-0/index",
            },
              items: [
                "tutorials/developer-journey/level-0/ic-overview",
                "tutorials/developer-journey/level-0/ic-terms",
                "tutorials/developer-journey/level-0/dev-env",
                "tutorials/developer-journey/level-0/intro-canisters",
                "tutorials/developer-journey/level-0/intro-languages",
                "tutorials/developer-journey/level-0/intro-dfx"
              ],
            },
            {
              type: "category",
              label: "Level 1: Space cadet",
              link: {
                type: "doc",
                id: "tutorials/developer-journey/level-1/index",
            },
              items: [
                "tutorials/developer-journey/level-1/1.1-live-demo",
                "tutorials/developer-journey/level-1/1.2-motoko-lvl1",
                "tutorials/developer-journey/level-1/1.3-first-dapp",
                "tutorials/developer-journey/level-1/1.4-using-cycles",
                "tutorials/developer-journey/level-1/1.5-deploying-canisters",
                "tutorials/developer-journey/level-1/1.6-managing-canisters",
              ],
            },
          ],
        },
          {
            type: "category",
            label: "Sample projects",
            link: {
              type: "doc",
              id: "samples/overview",
            },
            items: [
              "samples/hello",
              "samples/actor-classes",
              "samples/actor-reference",
              "samples/calculator",
              "samples/cert-var",
              "samples/counter",
              "samples/dao",
              "samples/dex",
              "samples/deploying-your-first-bitcoin-dapp",
              "samples/echo",
              "samples/encrypted-notes",
              "samples/factorial",
              "samples/game-of-life",
              "samples/hackathon-projects",
              "samples/http-counter",
              "samples/host-a-website",
              "samples/host-a-webgame",
              "samples/token-transfer",
              "samples/internet-identity-sample",
              "samples/invoice-canister",
              "samples/ios-integration",
              "samples/minimal-counter-dapp",
              "samples/nft",
              "samples/nft-wallet",
              "samples/periodic-tasks",
              "samples/persistent-storage",
              "samples/phonebook",
              "samples/pub-sub",
              "samples/qr-code",
              "samples/quicksort",
              "samples/random-maze",
              "samples/sending-and-receiving-cycles",
              "samples/simple-to-do",
              "samples/superheros",
              "samples/t-ecdsa-sample",
              "samples/whoami",
              "samples/vetkd-encrypted-notes"
            ],
            },

  ],


  guides: [
    {
      type: "category",
      label: "Introduction",
      link: {
        type: "doc",
        id: "developer-docs/index",
      },
      items: [
        {
          type: "category",
          label: "How the IC works",
          link: {
            type: "doc",
            id: "concepts/index",
        },
          items: [
            "concepts/what-is-IC",
            "concepts/canisters-code",
            "concepts/data-centers",
            "developer-docs/gas-cost",
            "concepts/governance",
            "concepts/nodes-subnets",
            "concepts/tokens-cycles",
            "concepts/trust-in-canisters",
            "references/glossary"
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Getting started",
      link: {
        type: "doc",
        id: "developer-docs/setup/index",
    },
      items: [
        {
          type: "doc",
          label: "Installing the IC SDK",
          id: "developer-docs/setup/install/index",
        },
        {
            type: "category",
            label: "Acquiring and managing cycles",
            link: {
              type: "doc",
              id: "developer-docs/setup/cycles/index",
          },
              items: [
                "developer-docs/setup/cycles/cycles-wallet",
                "developer-docs/setup/cycles/converting_icp_tokens_into_cycles",
                "developer-docs/setup/cycles/cycles-faucet",
                "developer-docs/setup/cycles/cycles_management_services",
            ],
          },
          {
            type: "doc",
            label: "Local deployment",
            id: "developer-docs/setup/deploy-locally",
          },
          {
            type: "doc",
            label: "Mainnet deployment",
            id: "developer-docs/setup/deploy-mainnet",
          },
          {
            type: "doc",
            label: "Managing canisters",
            id: "developer-docs/setup/manage-canisters",
          },
          {
            type: "doc",
            label: "Managing projects",
            id: "developer-docs/setup/manage-projects",
          },
          {
            type: "doc",
            label: "Pulling canister dependencies",
            id: "developer-docs/setup/pulling-canister-dependencies",
          },
          {
            type: "doc",
            label: "Using Visual Studio Code",
            id: "developer-docs/setup/vs-code",
          },
        ],
      },
  {
    type: "category",
    label: "Designing a dapp",
        items: [
          "developer-docs/backend/choosing-language",
          "developer-docs/backend/design-dapps",
          "developer-docs/backend/resource-limits",
        ]
  },
  {
    type: "category",
    label: "Building backend canisters",
        items: [
          {
            type: "category",
            label: "Building canisters with Motoko",
            link: {
              type: "doc",
              id: "developer-docs/backend/motoko/index",
          },
              items: [
                "developer-docs/backend/motoko/infrastructure",
                "developer-docs/backend/motoko/explore-templates",
                "developer-docs/backend/motoko/dev-env",
                "developer-docs/backend/motoko/at-a-glance",
                "developer-docs/backend/motoko/deploying",
                "developer-docs/backend/motoko/upgrading",
                "developer-docs/backend/motoko/intercanister-calls",
                "developer-docs/backend/motoko/optimizing",
                "developer-docs/backend/motoko/phonebook",
                "developer-docs/backend/motoko/calculator",
                "developer-docs/backend/motoko/counter-tutorial",
                "developer-docs/backend/motoko/hello-location",
                "developer-docs/backend/motoko/simple-cycles",
                "developer-docs/backend/motoko/define-an-actor",
                "developer-docs/backend/motoko/multiple-actors",
                "developer-docs/backend/motoko/access-control",
                "developer-docs/backend/motoko/candid-ui",
                "developer-docs/backend/motoko/scalability-cancan",
                "developer-docs/backend/motoko/sample-apps",
                "developer-docs/backend/motoko/mo-doc",
              ],
            },
            {
              type: "category",
              label: "Building canisters with Rust",
              link: {
                type: "doc",
                id: "developer-docs/backend/rust/index",
              },
                items: [
                  "developer-docs/backend/rust/infrastructure",
                  "developer-docs/backend/rust/project-organization",
                  "developer-docs/backend/rust/dev-env",
                  "developer-docs/backend/rust/quickstart",
                  "developer-docs/backend/rust/deploying",
                  "developer-docs/backend/rust/intercanister",
                  "developer-docs/backend/rust/upgrading",
                  "developer-docs/backend/rust/optimizing",
                  "developer-docs/backend/rust/counter",
                  "developer-docs/backend/rust/timers",
                  "developer-docs/backend/rust/stable-structures",
                  "developer-docs/backend/rust/searching-records",
                  "developer-docs/backend/rust/access-control",
                  "developer-docs/backend/rust/candid",
                  "developer-docs/backend/rust/samples",
              ],
            },
            {
              type: "category",
              label: "Candid UI",
              link: {
                type: "doc",
                id: "developer-docs/backend/candid/index",
              },
                items: [
                  "developer-docs/backend/candid/candid-concepts",
                  "developer-docs/backend/candid/candid-howto",
              ],
            },
            {
              type: "doc",
              label: "Periodic tasks",
              id: "developer-docs/backend/periodic-tasks",
            },
            {
              type: "doc",
              label: "Reproducible canister builds",
              id: "developer-docs/backend/reproducible-builds",
            },
            {
              type: "doc",
              label: "Troubleshooting resources",
              id: "developer-docs/backend/troubleshooting",
            },
          ],
        },
    {
      type: "category",
      label: "Building frontend canisters",
      link: {
          type: "doc",
          id: "developer-docs/frontend/index",
          },
          items: [
            "developer-docs/frontend/custom-frontend",
            "developer-docs/frontend/add-stylesheet",
          ],
        },
    {
      type: "category",
      label: "Running in production",
      link: {
          type: "doc",
          id: "developer-docs/production/index",
      },
          items: [
            {
              type: "category",
              label: "Custom domains",
              link: {
                type: "doc",
                id: "developer-docs/production/custom-domain/custom-domain",
            },
              items: [
                "developer-docs/production/custom-domain/dns-setup",
              ],
            },
            {
              type: "doc",
              label: "Deploying and upgrading canisters",
              id: "developer-docs/production/deploying-and-upgrading",
            },
            {
              type: "doc",
              label: "Instruction limits",
              id: "developer-docs/production/instruction-limits",
            },
            {
              type: "doc",
              label: "Large web assembly modules",
              id: "developer-docs/production/larger-wasm",
            },
            {
              type: "doc",
              label: "Sharing links to dapps",
              id: "developer-docs/production/social-sharing",
            },
                        {
              type: "doc",
              label: "Topping up canisters",
              id: "developer-docs/production/topping-up-canister",
            },
              ],
      },
    {
      type: "category",
      label: "Using external agents",
      link: {
          type: "doc",
          id: "developer-docs/agents/index",
          },
          items: [
            "developer-docs/agents/javascript-intro",
            "developer-docs/agents/nodejs",
            "developer-docs/agents/ic-agent-dfinity",
          ],
    },
    {
      type: "category",
      label: "Advanced features",
      link: {
          type: "doc",
          id: "developer-docs/integrations/index",
      },
          items: [
            {
              type: "doc",
              label: "Composite queries",
              id: "developer-docs/integrations/composite-query/composite-query",
            },
            {
              type: "category",
              label: "HTTPS outcalls",
              link: {
                type: "doc",
                id: "developer-docs/integrations/https-outcalls/index",
            },
                items: [
                  "developer-docs/integrations/https-outcalls/https-outcalls-how-it-works",
                  "developer-docs/integrations/https-outcalls/https-outcalls-how-to-use",
                  "developer-docs/integrations/https-outcalls/https-outcalls-get",
                  "developer-docs/integrations/https-outcalls/https-outcalls-post",
              ],
            },
            {
              type: "category",
              label: "Internet Identity (II)",
              link: {
                type: "doc",
                id: "references/ii-spec",
              },
              items: [
                  "developer-docs/integrations/internet-identity/alternative-origins",
                  "developer-docs/integrations/internet-identity/integrate-identity",
              ],
            },
            {
              type: "category",
              label: "Threshold ECDSA",
              link: {
                type: "doc",
                id: "developer-docs/integrations/t-ecdsa/index",
            },
                items: [
                  "developer-docs/integrations/t-ecdsa/t-ecdsa-how-it-works",
              ],
            },
             {
              type: "category",
              label: "vetKeys",
              link: {
                type: "doc",
                id: "developer-docs/integrations/vetkeys/index",
            },
                items: [
                  "developer-docs/integrations/vetkeys/technology-overview",
                  "developer-docs/integrations/vetkeys/using-vetkeys",
              ],
            },
          ],
    },
    {
      type: "category",
      label: "Ledgers and tokens",
          items: [
            {
              type: "category",
              label: "ICP ledger",
              link: {
                type: "doc",
                id: "developer-docs/integrations/ledger/index",
            },
                items: [
                  "developer-docs/integrations/ledger/collecting-dust",
                  "developer-docs/integrations/ledger/deploy-new-token",
                  "developer-docs/integrations/ledger/interact-with-ledger",
                  "developer-docs/integrations/ledger/ledger-local-setup",
              ],
            },
            {
              type: "category",
              label: "ICRC-1 token standard",
              link: {
                type: "doc",
                id: "developer-docs/integrations/icrc-1/index",
            },
                items: [
                  "developer-docs/integrations/icrc-1/deploy-new-token",
              ],
            },
            {
              type: "doc",
              label: "Exchange rate canister",
              id: "developer-docs/integrations/exchange-rate/exchange-rate-canister",
            },
            {
              type: "category",
              label: "Rosetta API",
              link: {
                type: "doc",
                id: "developer-docs/integrations/rosetta/index",
            },
                items: [
                  "developer-docs/integrations/rosetta/hotkeys",
                  "developer-docs/integrations/rosetta/neuron-lifecycle",
                  "developer-docs/integrations/rosetta/staking-support",
                  "developer-docs/integrations/rosetta/staking-tutorial",
                  "developer-docs/integrations/rosetta/transfers",
              ],
            },
            {
              type: "category",
              label: "Self-custody for digital assets",
              link: {
                type: "doc",
                id: "tokenomics/token-holders/custody-options-intro",
              },
              items: [
                  "tokenomics/token-holders/self-custody-quickstart",
              ],
            },
          ],
    },
    {
      type: "category",
      label: "Bitcoin integration",
      link: {
        type: "doc",
        id: "developer-docs/integrations/bitcoin/index",
    },
      items: [
        "developer-docs/integrations/bitcoin/bitcoin-how-it-works",
        "developer-docs/integrations/bitcoin/ckbtc",
        "developer-docs/integrations/bitcoin/local-development",
      ],
    },
    {
    type: "category",
    label: "Network Nervous System (NNS)",
    link: {
      type: "doc",
      id: "tokenomics/nns/nns-intro",
    },
    items: [
        "tokenomics/token-holders/nns-app-quickstart",
        "tokenomics/nns/neurons-fund",
        "tokenomics/nns/nns-staking-voting-rewards",
    ],
    },
    {
        type: "category",
        label: "Service Nervous System (SNS)",
        link: {
            type: "doc",
            id: "developer-docs/integrations/sns/index",
        },
            items: [
              {
                type: "category",
                label: "Introduction to the SNS",
                items: [
                  "developer-docs/integrations/sns/introduction/sns-intro-high-level",
                  "developer-docs/integrations/sns/introduction/sns-architecture",
                  "developer-docs/integrations/sns/introduction/sns-launch",
                  "developer-docs/integrations/sns/introduction/dao-alternatives",
                ],
              },
              {
                type: "category",
                label: "Preparing an SNS launch",
                link: {
                  type: "doc",
                  id: "developer-docs/integrations/sns/tokenomics/index",
              },
                items: [
                  "developer-docs/integrations/sns/tokenomics/sns-checklist",
                  "developer-docs/integrations/sns/tokenomics/predeployment-considerations",
                  "developer-docs/integrations/sns/tokenomics/tokenomics-intro",
                  "developer-docs/integrations/sns/tokenomics/rewards",
                  "developer-docs/integrations/sns/tokenomics/preparation",
                ],
              },
              {
                type: "category",
                label: "Integrating with an SNS",
                link: {
                  type: "doc",
                  id: "developer-docs/integrations/sns/integrating/index",
              },
                items: [
                  "developer-docs/integrations/sns/integrating/ledger-integration",
                  "developer-docs/integrations/sns/integrating/index-integration",
                  "developer-docs/integrations/sns/integrating/frontend-integration",
                ],
              },
              {
                type: "category",
                label: "Testing an SNS",
                link: {
                  type: "doc",
                  id: "developer-docs/integrations/sns/testing/testing-before-launch",
                },
                items: [
                  "developer-docs/integrations/sns/testing/testing-locally",
                  "developer-docs/integrations/sns/testing/testing-on-mainnet",
                ],
              },
              {
                type: "category",
                label: "Launching an SNS",
                link: {
                  type: "doc",
                  id: "developer-docs/integrations/sns/launching/index",
                },
                items: [
                  "developer-docs/integrations/sns/launching/launch-summary-1proposal",
                  "developer-docs/integrations/sns/launching/launch-steps-1proposal",
                  "developer-docs/integrations/sns/launching/launch-summary",
                  "developer-docs/integrations/sns/launching/launch-steps",
                ],
              },
              {
                type: "category",
                label: "Managing an SNS",
                link: {
                  type: "doc",
                  id: "developer-docs/integrations/sns/managing/manage-sns-intro",
              },
                items: [
                  "developer-docs/integrations/sns/managing/making-proposals",
                  "developer-docs/integrations/sns/managing/cycles-usage",
                  "developer-docs/integrations/sns/managing/sns-asset-canister",
                  "developer-docs/integrations/sns/managing/managing-nervous-system-parameters",
                ],
              },
            ],
      },
      {
        type: "category",
        label: "Use cases",
        link: {
            type: "doc",
            id: "developer-docs/use-cases/index",
        },
            items: [
              {
                type: "doc",
                label: "NFT development",
                id: "developer-docs/use-cases/considerations-for-nft-devs",
              },
      ],
    },
    {
      type: "category",
      label: "Security best practices",
      link: {
          type: "doc",
          id: "developer-docs/security/index",
  },
          items: [
            {
              type: "doc",
              label: "General",
              id: "developer-docs/security/general-security-best-practices",
            },
            {
              type: "doc",
              label: "General",
              id: "developer-docs/security/rust-canister-development-security-best-practices",
            },
            {
              type: "doc",
              label: "General",
              id: "developer-docs/security/web-app-development-security-best-practices",
            },
    ],
  },
  ],

  references: [
    "references/index",
    {
      type: "category",
      label: "Internet Computer specification",
      items: [
        "references/http-gateway-protocol-spec",
        "references/ic-interface-spec",
        "references/id-encoding-spec",
      ]
    },
    {
      type: "category",
      label: "Internet Computer SDK",
      items: [
        {
          type: "category",
          label: "dfx command line tool",
          link: {
            type: "doc",
            id: "references/cli-reference/index",
          },
          items: [
            "references/cli-reference/dfx-parent",
            "references/cli-reference/dfx-bootstrap",
            "references/cli-reference/dfx-build",
            "references/cli-reference/dfx-cache",
            "references/cli-reference/dfx-canister",
            "references/cli-reference/dfx-deploy",
            "references/cli-reference/dfx-deps",
            "references/cli-reference/dfx-generate",
            "references/cli-reference/dfx-help",
            "references/cli-reference/dfx-identity",
            "references/cli-reference/dfx-info",
            "references/cli-reference/dfx-ledger",
            "references/cli-reference/dfx-new",
            "references/cli-reference/dfx-nns",
            "references/cli-reference/dfx-ping",
            "references/cli-reference/dfx-quickstart",
            "references/cli-reference/dfx-replica",
            "references/cli-reference/dfx-schema",
            "references/cli-reference/dfx-sns",
            "references/cli-reference/dfx-start",
            "references/cli-reference/dfx-stop",
            "references/cli-reference/dfx-upgrade",
            "references/cli-reference/dfx-wallet",
            "references/cli-reference/dfx-envars",
          ],
        },
        {
          type: "category",
          label: "quill command line tool",
          link: {
            type: "doc",
            id: "references/quill-cli-reference/index",
          },
          items: [
            "references/quill-cli-reference/quill-parent",
            "references/quill-cli-reference/quill-account-balance",
            {
              type: "category",
              label: "quill ckbtc",
              link: {
                type: "doc",
                id: "references/quill-cli-reference/ckbtc/quill-ckbtc",
              },
              items: [
                "references/quill-cli-reference/ckbtc/quill-ckbtc-balance",
                "references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc",
                "references/quill-cli-reference/ckbtc/quill-ckbtc-retrieve-btc-status",
                "references/quill-cli-reference/ckbtc/quill-ckbtc-transfer",
                "references/quill-cli-reference/ckbtc/quill-ckbtc-update-balance",
                "references/quill-cli-reference/ckbtc/quill-ckbtc-withdrawal-address",
              ]
            },
            "references/quill-cli-reference/quill-claim-neurons",
            "references/quill-cli-reference/quill-generate",
            "references/quill-cli-reference/quill-get-neuron-info",
            "references/quill-cli-reference/quill-get-proposal-info",
            "references/quill-cli-reference/quill-list-neurons",
            "references/quill-cli-reference/quill-list-proposals",
            "references/quill-cli-reference/quill-neuron-manage",
            "references/quill-cli-reference/quill-neuron-stake",
            "references/quill-cli-reference/quill-public-ids",
            "references/quill-cli-reference/quill-qr-code",
            "references/quill-cli-reference/quill-replace-node-provider-id",
            "references/quill-cli-reference/quill-scanner-qr-code",
            "references/quill-cli-reference/quill-send",
            {
              type: "category",
              label: "quill sns",
              link: {
                type: "doc",
                id: "references/quill-cli-reference/sns/quill-sns",
              },
              items: [
                "references/quill-cli-reference/sns/quill-sns-balance",
                "references/quill-cli-reference/sns/quill-sns-configure-dissolve-delay",
                "references/quill-cli-reference/sns/quill-sns-disburse",
                "references/quill-cli-reference/sns/quill-sns-disburse-maturity",
                "references/quill-cli-reference/sns/quill-sns-follow-neuron",
                "references/quill-cli-reference/sns/quill-sns-get-sale-participation",
                "references/quill-cli-reference/sns/quill-sns-get-swap-refund",
                "references/quill-cli-reference/sns/quill-sns-list-deployed-snses",
                "references/quill-cli-reference/sns/quill-sns-make-proposal",
                "references/quill-cli-reference/sns/quill-sns-make-upgrade-canister-proposal",
                "references/quill-cli-reference/sns/quill-sns-neuron-permission",
                "references/quill-cli-reference/sns/quill-sns-new-sale-ticket",
                "references/quill-cli-reference/sns/quill-sns-pay",
                "references/quill-cli-reference/sns/quill-sns-register-vote",
                "references/quill-cli-reference/sns/quill-sns-split-neuron",
                "references/quill-cli-reference/sns/quill-sns-stake-maturity",
                "references/quill-cli-reference/sns/quill-sns-stake-neuron",
                "references/quill-cli-reference/sns/quill-sns-status",
                "references/quill-cli-reference/sns/quill-sns-transfer",
              ]
            },
            "references/quill-cli-reference/quill-transfer",
            "references/quill-cli-reference/quill-update-node-provider",
          ],
        },
        {
          type: "doc",
          label: "dfx.json schema",
          id: "references/dfx-json-reference",
        },
      ]
    },
    {
      type: "category",
      label: "Languages",
      items: [
        "references/candid-ref",
        {
          type: "link",
          label: "Motoko base library",
          href: "/docs/current/motoko/main/base/",
        },
        {
          type: "link",
          label: "Rust CDK references",
          href: "https://docs.rs/ic-cdk/",
        },
      ]
    },
    {
      type: "category",
      label: "Core services",
      items: [
        {
          type: "doc",
          label: "Asset canister",
          id: "references/asset-canister",
        },
        {
          type: "doc",
          label: "Internet Identity",
          id: "references/ii-spec",
        },
        {
          type: "doc",
          label: "Ledger canister",
          id: "references/ledger",
        },
      ]
    },

    "references/glossary",

  ],
  motoko: [
    {
      type: "category",
      label: "Motoko developer guide",
      link: {
        type: "doc",
        id: "motoko/main/about-this-guide",
      },
      items: [
        "motoko/version",
        "motoko/main/overview",
        "motoko/main/basic-concepts",
        "motoko/main/base-intro",
        "motoko/main/language-manual",
        "motoko/main/style",
        "motoko/main/motoko-grammar",
        "motoko/main/actors-async",
        "motoko/main/actor-classes",
        "motoko/main/caller-id",
        "motoko/main/compatibility",
        "motoko/main/compiler-ref",
        "motoko/main/control-flow",
        "motoko/main/cycles",
        "motoko/main/errors",
        "motoko/main/heartbeats",
        "motoko/main/local-objects-classes",
        "motoko/main/message-inspection",
        "motoko/main/modules-and-imports",
        "motoko/main/mutable-state",
        "motoko/main/pattern-matching",
        "motoko/main/sharing",
        "motoko/main/stablememory",
        "motoko/main/structural-equality",
        "motoko/main/timers",
        "motoko/main/upgrades",
      ]
    },
    {
      type: "category",
      label: "Motoko base library reference",
      link: {
        type: "doc",
        id: "motoko/main/base/index",
      },
      items: [
        "motoko/main/base/Array",
        "motoko/main/base/AssocList",
        "motoko/main/base/Blob",
        "motoko/main/base/Bool",
        "motoko/main/base/Buffer",
        "motoko/main/base/CertifiedData",
        "motoko/main/base/Char",
        "motoko/main/base/Debug",
        "motoko/main/base/Deque",
        "motoko/main/base/Error",
        "motoko/main/base/ExperimentalCycles",
        "motoko/main/base/ExperimentalInternetComputer",
        "motoko/main/base/ExperimentalStableMemory",
        "motoko/main/base/Float",
        "motoko/main/base/Func",
        "motoko/main/base/Hash",
        "motoko/main/base/HashMap",
        "motoko/main/base/Heap",
        "motoko/main/base/Int",
        "motoko/main/base/Int8",
        "motoko/main/base/Int16",
        "motoko/main/base/Int32",
        "motoko/main/base/Int64",
        "motoko/main/base/Iter",
        "motoko/main/base/IterType",
        "motoko/main/base/List",
        "motoko/main/base/Nat",
        "motoko/main/base/Nat8",
        "motoko/main/base/Nat16",
        "motoko/main/base/Nat32",
        "motoko/main/base/Nat64",
        "motoko/main/base/Option",
        "motoko/main/base/Order",
        "motoko/main/base/Prelude",
        "motoko/main/base/Principal",
        "motoko/main/base/Random",
        "motoko/main/base/RBTree",
        "motoko/main/base/Result",
        "motoko/main/base/Stack",
        "motoko/main/base/Text",
        "motoko/main/base/Time",
        "motoko/main/base/Timer",
        "motoko/main/base/Trie",
        "motoko/main/base/TrieMap",
        "motoko/main/base/TrieSet",
      ],
    },
  ],

};

module.exports = sidebars;
