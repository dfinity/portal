// @ts-check

const defiSidebar = require('./docs/defi/sidebar');

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  build: [
    {
      type: "category",
      label: "Getting started",
      items: [
        "building-apps/getting-started/quickstart",
        "building-apps/getting-started/app-architecture",
        "building-apps/getting-started/install",
        "building-apps/getting-started/identities",
        "building-apps/getting-started/tokens-and-cycles",
      ],
    },
    {
      type: "category",
      label: "ICP essentials",
      items: [
        {
          type: "doc",
          label: "Network architecture",
          id: "building-apps/essentials/network-overview",
        },
        {
          type: "doc",
          label: "Fee breakdown",
          id: "building-apps/essentials/gas-cost",
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
              id: "motoko/home",
            },
            {
              type: "category",
              label: "Rust",
              link: {
                type: "doc",
                id: "building-apps/developer-tools/cdks/rust/intro-to-rust",
              },
              items: [
                "building-apps/developer-tools/cdks/rust/rust-limitations",
                "building-apps/developer-tools/cdks/rust/generating-candid",
                "building-apps/developer-tools/cdks/rust/intercanister",
                "building-apps/developer-tools/cdks/rust/canister-state",
                "building-apps/developer-tools/cdks/rust/stable-structures",
                "building-apps/developer-tools/cdks/rust/upgrading",
                "building-apps/developer-tools/cdks/rust/message-inspect",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "CLI",
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
        "building-apps/developer-tools/icp-ninja",
      ],
    },
    {
      type: "category",
      label: "Developing canisters",
      items: [
        "building-apps/developing-canisters/write",
        "building-apps/developing-canisters/create",
        "building-apps/developing-canisters/compile",
        "building-apps/developing-canisters/install",
        {
          type: "category",
          label: "Deploy",
          link: {
            type: "doc",
            id: "building-apps/developing-canisters/deploy",
          },
          items: [
            "building-apps/developing-canisters/custom-networks",
            "building-apps/developing-canisters/deploy-specific-subnet",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Interacting with canisters",
      items: [
        {
          type: "category",
          label: "Candid",
          link: {
            type: "doc",
            id: "building-apps/interact-with-canisters/candid/candid-concepts",
          },
          items: [
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
      label: "Testing canisters",
      link: {
        type: "doc",
        id: "building-apps/test/overview",
      },
      items: ["building-apps/test/pocket-ic"],
    },
    {
      type: "category",
      label: "Canister management",
      items: [
        "building-apps/canister-management/backtraces",
        "building-apps/canister-management/control",
        "building-apps/canister-management/delete",
        "building-apps/canister-management/history",
        "building-apps/canister-management/logs",
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
      label: "Building frontends",
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
      label: "Advanced development",
      items: [
        "building-apps/advanced/canister-migration",
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
        "building-apps/advanced/canister-access-logs",
      ],
    },
    {
      type: "category",
      label: "User authentication",
      items: [
        "building-apps/authentication/overview",
        "building-apps/authentication/integrate-internet-identity",
        "building-apps/authentication/integrate-misc-wallets",
        "building-apps/authentication/alternative-origins",
        "building-apps/authentication/independently-verifying-ic-signatures",
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
            "building-apps/network-features/using-http/gateways",
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
                {
                  type: "doc",
                  id: "building-apps/network-features/using-http/http-certification/upgrading-http-query-calls-to-update-calls",
                  label: "Upgrading HTTP query calls to update calls",
                },
                {
                  type: "doc",
                  id: "building-apps/network-features/using-http/http-certification/skipping-certification-for-http-responses",
                  label: "Skipping certification for HTTP responses",
                },
              ],
            },
            {
              type: "category",
              label: "HTTPS outcalls",
              link: {
                type: "doc",
                id: "building-apps/network-features/using-http/https-outcalls/overview",
              },
              items: [
                "building-apps/network-features/using-http/https-outcalls/get",
                "building-apps/network-features/using-http/https-outcalls/post",
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
          ],
        },
        {
          type: "category",
          label: "vetKeys",
          items: [
            "building-apps/network-features/vetkeys/introduction",
            "building-apps/network-features/vetkeys/api",
            "building-apps/network-features/vetkeys/dkms",
            "building-apps/network-features/vetkeys/encrypted-onchain-storage",
            "building-apps/network-features/vetkeys/bls-signatures",
            "building-apps/network-features/vetkeys/identity-based-encryption",
            "building-apps/network-features/vetkeys/timelock-encryption",
            "building-apps/network-features/vetkeys/verifiable-random-function",
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
          type: "doc",
          label: "Bitcoin",
          id: "build-on-btc/index",
        },
        {
          type: "doc",
          label: "Dogecoin",
          id: "building-apps/chain-fusion/dogecoin/overview",
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
              ],
            },
          ],
        },
        {
          type: "doc",
          label: "Solana",
          id: "building-apps/chain-fusion/solana/overview",
        },
        "building-apps/chain-fusion/examples",
      ],
    },
    {
      type: "category",
      label: "Security",
      link: {
        type: "doc",
        id: "building-apps/security/overview",
      },
      items: [
        {
          type: "category",
          label: "Security best practices",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "building-apps/security/overview",
            },
            {
              type: "doc",
              label: "Inter-canister calls",
              id: "building-apps/security/inter-canister-calls",
            },
            {
              type: "doc",
              label: "Identity & access management",
              id: "building-apps/security/iam",
            },
            {
              type: "doc",
              label: "Decentralization",
              id: "building-apps/security/decentralization",
            },
            {
              type: "doc",
              label: "Data integrity & authenticity",
              id: "building-apps/security/data-integrity-and-authenticity",
            },
            {
              type: "doc",
              label: "Data storage",
              id: "building-apps/security/data-storage",
            },
            {
              type: "doc",
              label: "HTTP outcalls",
              id: "building-apps/security/https-outcalls",
            },
            {
              type: "doc",
              label: "Denial of service",
              id: "building-apps/security/dos",
            },
            {
              type: "doc",
              label: "Canister upgrades",
              id: "building-apps/security/canister-upgrades",
            },
            {
              type: "doc",
              label: "Observability & monitoring",
              id: "building-apps/security/observability-and-monitoring",
            },
            {
              type: "doc",
              label: "Miscellaneous",
              id: "building-apps/security/misc",
            },
            {
              type: "doc",
              label: "Important resources",
              id: "building-apps/security/resources",
            },
          ],
        },
        {
          type: "doc",
          label: "Formal verification",
          id: "building-apps/security/formal-verification",
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
          id: "building-apps/best-practices/general",
        },
        {
          type: "doc",
          label: "Application architecture considerations",
          id: "building-apps/best-practices/application-architectures",
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
      ],
    },
    {
      type: "category",
      label: "Governing applications",
      items: [
        {
          type: "category",
          label: "Network Nervous System (NNS)",
          items: [
            {
              type: "category",
              label: "Using the NNS dapp",
              items: [
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-app-quickstart",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-send-and-receive-tokens",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-importing-tokens",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-staking-a-neuron",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-voting-on-proposals",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-following-other-neurons",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-confirm-following",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-advanced-neuron-operations",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-making-neurons-public",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-manage-quill-neurons",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-sns-topic-following",
                "building-apps/governing-apps/nns/using-the-nns-dapp/nns-dapp-additional-features",
              ],
            },
            {
              type: "category",
              label: "Concepts",
              items: [
                {
                  type: "category",
                  label: "Neurons",
                  items: [
                    "building-apps/governing-apps/nns/concepts/neurons/becoming-a-known-neuron",
                  ],
                },
                {
                  type: "category",
                  label: "Proposals",
                  items: [
                    "building-apps/governing-apps/nns/concepts/proposals/verify-proposals",
                    "building-apps/governing-apps/nns/concepts/proposals/proposal-submit",
                  ],
                },
              ],
            },
          ],
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
          items: ["building-apps/governing-apps/testing/testing-locally"],
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
          ],
        },
      ],
    },
  ],

  defi: defiSidebar,

  btc: [
    "build-on-btc/index",
    "build-on-btc/btc-dev-workflow",
    "build-on-btc/btc-dev-env",
    "build-on-btc/using-regtest",
    "build-on-btc/btc-api",
    {
      type: "category",
      label: "Bitcoin transactions",
      items: [
        "build-on-btc/btc-transactions/generate-addresses",
        "build-on-btc/btc-transactions/create-transactions",
        "build-on-btc/btc-transactions/sign-transactions",
        "build-on-btc/btc-transactions/submit-transactions",
      ],
    },
    "build-on-btc/read-state",
    "build-on-btc/ordinals",
    "build-on-btc/runes",
    "build-on-btc/brc20",
  ],

  references: [
    {
      type: "category",
      label: "IC specifications",
      items: [
        "references/ic-interface-spec",
        "references/http-gateway-protocol-spec",
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
        "references/ledger",
        "references/t-sigs-how-it-works",
        "references/vc-spec",
        "references/vetkeys-overview",
      ],
    },
    "references/cycles-cost-formulas",
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
          label: "Exchange rate canister",
          id: "references/system-canisters/xrc",
        },
        {
          type: "doc",
          label: "Management canister",
          id: "references/system-canisters/management-canister",
        },
      ],
    },
    "references/async-code",
    "references/advanced-ingress-messages",
    "references/execution-errors",
    "references/message-execution-properties",
    "references/using-hsm-with-identities",
    {
      type: "doc",
      label: "Dashboard API reference",
      id: "references/dashboard-apis",
    },
    {
      type: "doc",
      label: "Glossary",
      id: "references/glossary",
    },
  ],

  devjourney: [
    {
      type: "category",
      label: "Developer Liftoff",
      link: {
        type: "doc",
        id: "tutorials/developer-liftoff/index",
      },
      items: [
        {
          type: "category",
          label: "Level 0: Pre-flight operations",
          items: [
            "tutorials/developer-liftoff/level-0/ic-overview",
            "tutorials/developer-liftoff/level-0/ic-terms",
            "tutorials/developer-liftoff/level-0/intro-canisters",
            "tutorials/developer-liftoff/level-0/intro-languages",
            "tutorials/developer-liftoff/level-0/tooling",
            "tutorials/developer-liftoff/level-0/first-dapp",
          ],
        },
        {
          type: "category",
          label: "Level 1: Space cadet",
          items: [
            "tutorials/developer-liftoff/level-1/1.1-motoko-lvl1",
            "tutorials/developer-liftoff/level-1/1.2-dev-env",
            "tutorials/developer-liftoff/level-1/1.3-intro-dfx",
            "tutorials/developer-liftoff/level-1/1.4-using-cycles",
            "tutorials/developer-liftoff/level-1/1.5-deploying-canisters",
            "tutorials/developer-liftoff/level-1/1.6-managing-canisters",
          ],
        },
        {
          type: "category",
          label: "Level 2: Space explorer",
          items: [
            "tutorials/developer-liftoff/level-2/2.1-storage-persistence",
            "tutorials/developer-liftoff/level-2/2.2-advanced-canister-calls",
            "tutorials/developer-liftoff/level-2/2.3-third-party-canisters",
            "tutorials/developer-liftoff/level-2/2.4-intro-candid",
            "tutorials/developer-liftoff/level-2/2.5-unit-testing",
            "tutorials/developer-liftoff/level-2/2.6-motoko-lvl2",
          ],
        },
        {
          type: "category",
          label: "Level 3: Space engineer",
          items: [
            "tutorials/developer-liftoff/level-3/3.1-package-managers",
            "tutorials/developer-liftoff/level-3/3.2-https-outcalls",
            "tutorials/developer-liftoff/level-3/3.3-certified-data",
            "tutorials/developer-liftoff/level-3/3.4-intro-to-agents",
            "tutorials/developer-liftoff/level-3/3.5-identities-and-auth",
            "tutorials/developer-liftoff/level-3/3.6-motoko-lvl3",
          ],
        },
        {
          type: "category",
          label: "Level 4: Space pilot",
          items: [
            "tutorials/developer-liftoff/level-4/4.1-icp-ledger",
            "tutorials/developer-liftoff/level-4/4.2-icrc-tokens",
            "tutorials/developer-liftoff/level-4/4.3-ckbtc-and-bitcoin",
            "tutorials/developer-liftoff/level-4/4.4-nns-governance",
            "tutorials/developer-liftoff/level-4/4.5-using-quill",
            "tutorials/developer-liftoff/level-4/4.6-motoko-lvl4",
          ],
        },
        {
          type: "category",
          label: "Level 5: Internet Computer astronaut",
          items: [
            "tutorials/developer-liftoff/level-5/5.1-vetKeys-tutorial",
            "tutorials/developer-liftoff/level-5/5.2-ICP-ETH-tutorial",
            "tutorials/developer-liftoff/level-5/5.3-token-swap-tutorial",
            "tutorials/developer-liftoff/level-5/5.4-NFT-tutorial",
            "tutorials/developer-liftoff/level-5/5.5-auction-tutorial",
            "tutorials/developer-liftoff/level-5/5.6-next-steps",
          ],
        },
      ],
    },
  ],

  devjourneyRust: [
    {
      type: "category",
      label: "Developer Liftoff: Rust",
      link: {
        type: "doc",
        id: "tutorials/developer-liftoff-rust/index",
      },
      items: [
        {
          type: "category",
          label: "Level 0: Pre-flight operations",
          items: [
            "tutorials/developer-liftoff-rust/level-0/ic-overview",
            "tutorials/developer-liftoff-rust/level-0/ic-terms",
            "tutorials/developer-liftoff-rust/level-0/intro-canisters",
            "tutorials/developer-liftoff-rust/level-0/intro-languages",
            "tutorials/developer-liftoff-rust/level-0/tooling",
            "tutorials/developer-liftoff-rust/level-0/first-dapp",
          ],
        },
        {
          type: "category",
          label: "Level 1: Space cadet",
          items: [
            "tutorials/developer-liftoff-rust/level-1/1.1-rust-lvl1",
            "tutorials/developer-liftoff-rust/level-1/1.2-rust-dev-env",
            "tutorials/developer-liftoff-rust/level-1/1.3-intro-dfx",
            "tutorials/developer-liftoff-rust/level-1/1.4-using-cycles",
            "tutorials/developer-liftoff-rust/level-1/1.5-deploying-canisters",
            "tutorials/developer-liftoff-rust/level-1/1.6-managing-canisters",
          ],
        },
        {
          type: "category",
          label: "Level 2: Space explorer",
          items: [
            "tutorials/developer-liftoff-rust/level-2/2.1-canister-calls",
            "tutorials/developer-liftoff-rust/level-2/2.2-storage-memory",
            "tutorials/developer-liftoff-rust/level-2/2.3-canister-state",
            "tutorials/developer-liftoff-rust/level-2/2.4-stable-memory",
            "tutorials/developer-liftoff-rust/level-2/2.5-upgrading-rust",
            "tutorials/developer-liftoff-rust/level-2/2.6-rust-lvl2",
          ],
        },
        {
          type: "category",
          label: "Level 3: Space engineer",
          items: [
            "tutorials/developer-liftoff-rust/level-3/3.1-testing-rust",
            "tutorials/developer-liftoff-rust/level-3/3.2-logging-history",
            "tutorials/developer-liftoff-rust/level-3/3.3-canister-snapshots",
            "tutorials/developer-liftoff-rust/level-3/3.4-identity-auth",
            "tutorials/developer-liftoff-rust/level-3/3.5-access-control",
            "tutorials/developer-liftoff-rust/level-3/3.6-rust-lvl3",
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
        "tutorials/hackathon-prep-course/hello-world",
        "tutorials/hackathon-prep-course/static-website",
        "tutorials/hackathon-prep-course/first-fullstack-dapp",
        "tutorials/hackathon-prep-course/evm-block-explorer",
        "tutorials/hackathon-prep-course/create-deploy-token",
        "tutorials/hackathon-prep-course/authentication",
        "tutorials/hackathon-prep-course/setup-dev-env",
        "tutorials/hackathon-prep-course/managing-canisters",
        "tutorials/hackathon-prep-course/advanced-features",
        "tutorials/hackathon-prep-course/resources",
      ],
    },
  ],

  motoko: [
    {
      type: "autogenerated",
      dirName: "motoko",
    },
  ],
};

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
