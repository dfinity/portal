// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  "developer-docs": [
    "developer-docs/ic-overview",
    {
      type: "category",
      label: "Quick start",
      link: {
        type: "doc",
        id: "developer-docs/quickstart/hello10mins",
      },
      items: [
        "developer-docs/quickstart/hello10mins",
        // 'developer-docs/quickstart/windows-wsl',
        "developer-docs/quickstart/cycles-faucet",
        "developer-docs/quickstart/local-quickstart",
        "developer-docs/quickstart/network-quickstart",
      ],
    },
    {
      type: "category",
      label: "Building on the IC",
      link: {
        type: "doc",
        id: "developer-docs/build/index",
      },
      items: [
        "developer-docs/build/install-upgrade-remove",
        {
          type: "category",
          label: "Project Setup",
          link: {
            // type: 'doc', id: 'developer-docs/build/project-setup/index',
            type: "doc",
            id: "developer-docs/build/project-setup/design-dapps",
          },
          items: [
            "developer-docs/build/project-setup/design-dapps",
            "developer-docs/build/project-setup/manage-projects",
            "developer-docs/build/project-setup/manage-canisters",
            "developer-docs/build/project-setup/cycles-wallet",
          ],
        },
        "developer-docs/build/using-an-agent",
        {
          type: "category",
          label: "Languages",
          link: {
            type: "doc",
            id: "developer-docs/build/languages/work-with-languages",
          },
          items: [
            // 'developer-docs/build/explore-templates',
            {
              type: "category",
              label: "Rust",
              link: {
                type: "doc",
                id: "developer-docs/build/languages/rust/rust-intro",
              },
              items: [
                "developer-docs/build/languages/rust/rust-quickstart",
                "developer-docs/build/languages/rust/rust-counter",
                "developer-docs/build/languages/rust/multiply-dependency",
                "developer-docs/build/languages/rust/rust-profile",
                "developer-docs/build/languages/rust/rust-optimize",
              ],
            },
            {
              type: "category",
              label: "Motoko",
              link: {
                // type: 'doc', id: 'developer-docs/build/languages/motoko/index',
                type: "doc",
                id: "developer-docs/build/languages/motoko/motoko",
              },
              items: [
                "developer-docs/build/languages/motoko/about-this-guide",
                "developer-docs/build/languages/motoko/motoko-introduction",
                "developer-docs/build/languages/motoko/basic-concepts",
                "developer-docs/build/languages/motoko/base-intro",
                "developer-docs/build/languages/motoko/mutable-state",
                "developer-docs/build/languages/motoko/local-objects-classes",
                "developer-docs/build/languages/motoko/actors-async",
                "developer-docs/build/languages/motoko/errors",
                "developer-docs/build/languages/motoko/pattern-matching",
                "developer-docs/build/languages/motoko/sharing",
                "developer-docs/build/languages/motoko/message-inspection",
                "developer-docs/build/languages/motoko/modules-and-imports",
                "developer-docs/build/languages/motoko/control-flow",
                "developer-docs/build/languages/motoko/structural-equality",
                "developer-docs/build/languages/motoko/actor-classes",
                "developer-docs/build/languages/motoko/caller-id",
                "developer-docs/build/languages/motoko/cycles",
                "developer-docs/build/languages/motoko/upgrades",
                "developer-docs/build/languages/motoko/compatibility",
                "developer-docs/build/languages/motoko/stablememory",
                "developer-docs/build/languages/motoko/heartbeats",
                "developer-docs/build/languages/motoko/language-manual",
                "developer-docs/build/languages/motoko/compiler-ref",
                "developer-docs/build/languages/motoko/motoko-grammar",
                "developer-docs/build/languages/motoko/overview",
                "developer-docs/build/languages/motoko/style",
              ],
            },
            {
              type: "category",
              label: "Candid",
              link: {
                type: "doc",
                id: "developer-docs/build/languages/candid/candid-intro",
              },
              items: [
                "developer-docs/build/languages/candid/candid-concepts",
                "developer-docs/build/languages/candid/candid-howto",
              ],
            },
            {
              type: "category",
              label: "Other Languages",
              link: {
                type: "doc",
                id: "developer-docs/build/languages/other-languages/other-languages-intro",
              },
              items: [
                "developer-docs/build/languages/other-languages/clang-supported-languages",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Backend Tutorials",
          link: {
            type: "doc",
            id: "developer-docs/build/backend/index",
          },
          items: [
            "developer-docs/build/backend/explore-templates",
            "developer-docs/build/backend/define-an-actor",
            "developer-docs/build/backend/hello-location",
            "developer-docs/build/backend/counter-tutorial",
            "developer-docs/build/backend/calculator",
            "developer-docs/build/backend/phonebook",
            "developer-docs/build/backend/multiple-actors",
            "developer-docs/build/backend/intercanister-calls",
            "developer-docs/build/backend/access-control",
            "developer-docs/build/backend/simple-cycles",
            "developer-docs/build/backend/reproducible-builds",
            "developer-docs/build/backend/candid-ui",
          ],
        },
        {
          type: "category",
          label: "Frontend Tutorials",
          link: {
            // type: 'doc', id: 'developer-docs/build/frontend/index',
            type: "doc",
            id: "developer-docs/build/frontend/webpack-config",
          },
          items: [
            "developer-docs/build/frontend/webpack-config",
            "developer-docs/build/frontend/custom-frontend",
          ],
        },
        "developer-docs/build/troubleshooting",
      ],
    },
    {
      type: "category",
      label: "Deployment & Scaling",
      link: {
        type: 'doc', id: 'developer-docs/deploy/deploy',
      },
      items: [
        'developer-docs/deploy/deploy',
        'developer-docs/deploy/larger-wasm',
        'developer-docs/deploy/staging-environment',
        'developer-docs/deploy/custom-domain',
        'developer-docs/deploy/computation-and-storage-costs',
        // 'developer-docs/deploy/advanced-deployment'
      ],
    },
    {
      type: "category",
      label: "Integrate Functionality",
      link: {
        // type: 'doc', id: 'developer-docs/functionality/index'
        type: "doc",
        id: "developer-docs/functionality/bitcoin/index",
      },
      items: [
        // 'developer-docs/functionality/index',
        {
          type: 'category',
          label: 'Bitcoin Integration',
          link: {
            type: "doc",
            id: "developer-docs/functionality/bitcoin/index"
          },
          items: [
            'developer-docs/functionality/bitcoin/bitcoin-how-it-works',
            'developer-docs/functionality/bitcoin/local-development',
          ]
        },
        {
          type: 'category',
          label: 'Threshold ECDSA',
          link: {
            type: "doc",
            id: "developer-docs/functionality/t-ecdsa/index"
          },
          items: [
            'developer-docs/functionality/t-ecdsa/t-ecdsa-how-it-works'
          ]
        },
        "developer-docs/functionality/internet-identity/integrate-identity",
        {
          type: "category",
          label: "ICP Ledger",
          link: {
            type: "doc",
            id: "developer-docs/functionality/ledger/index",
          },
          items: [
            "developer-docs/functionality/ledger/interact-with-ledger",
            "developer-docs/functionality/ledger/ledger-local-setup",
            "developer-docs/functionality/ledger/deploy-new-token",
          ],
        },
        // {
        //   type: 'category',
        //   label: 'Using the SNS',
        //   items: [
        //     'developer-docs/functionality/sns',
        //   ]
        // },
        {
          type: "category",
          label: "Rosetta",
          link: {
            type: "doc",
            id: "developer-docs/functionality/rosetta/index",
          },
          items: [
            "developer-docs/functionality/rosetta/transfers",
            "developer-docs/functionality/rosetta/neuron-lifecycle",
            "developer-docs/functionality/rosetta/staking-support",
            "developer-docs/functionality/rosetta/staking-tutorial",
            "developer-docs/functionality/rosetta/hotkeys",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Updates & Releases",
      link: {
        // type: 'doc', id: 'developer-docs/updates/index'
        type: "doc",
        id: "developer-docs/updates/release-notes/sdk-release-notes",
      },
      items: [
        {
          type: "category",
          label: "SDK Release Notes",
          link: {
            type: "doc",
            id: "developer-docs/updates/release-notes/sdk-release-notes",
          },
          items: ["developer-docs/updates/release-notes/release-notes"],
        },
      ],
    },
    "developer-docs/glossary",
  ],
  references: [
    "references/index",
    {
      type: "category",
      label: "DFX Commands & Envars",
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
        "references/cli-reference/dfx-generate",
        "references/cli-reference/dfx-help",
        "references/cli-reference/dfx-identity",
        "references/cli-reference/dfx-ledger",
        "references/cli-reference/dfx-new",
        "references/cli-reference/dfx-ping",
        "references/cli-reference/dfx-replica",
        "references/cli-reference/dfx-start",
        "references/cli-reference/dfx-stop",
        "references/cli-reference/dfx-upgrade",
        "references/cli-reference/dfx-wallet",
        "references/cli-reference/dfx-envars",
      ],
    },
    {
      type: "doc",
      label: "dfx.json schema",
      id: "references/dfx-json-reference"
    },
    {
      type: "category",
      label: "Motoko References",
      link: {
        type: "doc",
        id: "references/motoko-ref/index",
      },
      items: [
        "references/motoko-ref/Array",
        "references/motoko-ref/AssocList",
        "references/motoko-ref/Blob",
        "references/motoko-ref/Bool",
        "references/motoko-ref/Buffer",
        "references/motoko-ref/CertifiedData",
        "references/motoko-ref/Char",
        "references/motoko-ref/Debug",
        "references/motoko-ref/Deque",
        "references/motoko-ref/Error",
        "references/motoko-ref/ExperimentalCycles",
        "references/motoko-ref/ExperimentalInternetComputer",
        "references/motoko-ref/ExperimentalStableMemory",
        "references/motoko-ref/Float",
        "references/motoko-ref/Func",
        "references/motoko-ref/Hash",
        "references/motoko-ref/HashMap",
        "references/motoko-ref/Heap",
        "references/motoko-ref/Int",
        "references/motoko-ref/Int8",
        "references/motoko-ref/Int16",
        "references/motoko-ref/Int32",
        "references/motoko-ref/Int64",
        "references/motoko-ref/Iter",
        "references/motoko-ref/IterType",
        "references/motoko-ref/List",
        "references/motoko-ref/Nat",
        "references/motoko-ref/Nat8",
        "references/motoko-ref/Nat16",
        "references/motoko-ref/Nat32",
        "references/motoko-ref/Nat64",
        "references/motoko-ref/Option",
        "references/motoko-ref/Order",
        "references/motoko-ref/Prelude",
        "references/motoko-ref/Principal",
        "references/motoko-ref/Random",
        "references/motoko-ref/RBTree",
        "references/motoko-ref/Result",
        "references/motoko-ref/Stack",
        "references/motoko-ref/Text",
        "references/motoko-ref/Time",
        "references/motoko-ref/Trie",
        "references/motoko-ref/TrieMap",
        "references/motoko-ref/TrieSet",
      ],
    },
    {
      type: "link",
      label: "Rust CDK References",
      href: "https://docs.rs/ic-cdk/",
    },
    // {
    //   type: 'link',
    //   label: 'SNS References',
    //   href: 'https://docs.rs/ic-sns/',
    // },
    "references/candid-ref",
    "references/ledger",
    "references/ii-spec",
    "references/ic-interface-spec",
    "references/id-encoding-spec",
    {
      type: "category",
      label: "Quill Commands",
      link: {
        type: "doc",
        id: "references/quill-cli-reference/index",
      },
      items: [
        "references/quill-cli-reference/quill-parent",
        "references/quill-cli-reference/quill-account-balance",
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
        "references/quill-cli-reference/quill-transfer",
        "references/quill-cli-reference/quill-update-node-provider",
      ],
    },
    {
      type: "category",
      label: "Security Best Practices",
      link: {
        type: "doc",
        id: "references/security/index",
      },
      items: [
        "references/security/general-security-best-practices",
        "references/security/web-app-development-security-best-practices",
        "references/security/rust-canister-development-security-best-practices",
      ],
    },
  ],
  concepts: [
    "concepts/index",
    "concepts/what-is-IC",
    "concepts/nodes-subnets",
    "concepts/data-centers",
    "concepts/canisters-code",
    "concepts/trust-in-canisters",
    "concepts/tokens-cycles",
    "concepts/governance",
    "concepts/bitcoin-integration",
  ],
  tokenomics: [
    "tokenomics/index",
    {
      type: "category",
      label: "Identity & Authentication",
      link: {
        type: "doc",
        id: "tokenomics/identity-auth/what-is-ic-identity",
      },
      items: [
        "tokenomics/identity-auth/what-is-ic-identity",
        "tokenomics/identity-auth/auth-how-to",
        "tokenomics/identity-auth/hello-guide",
      ],
    },
    {
      type: "category",
      label: "Token Holders",
      link: {
        // type: 'doc', id: 'tokenomics/token-holders/index'
        type: "doc",
        id: "tokenomics/token-holders/custody-options-intro",
      },
      items: [
        "tokenomics/token-holders/custody-options-intro",
        "tokenomics/token-holders/self-custody-quickstart",
        "tokenomics/token-holders/nns-app-quickstart",
        // 'tokenomics/token-holders/seed-donations',
      ],
    },
  ],
  samples: [
    // 'samples/overview',
    "samples/deploying-your-first-bitcoin-dapp",
    "samples/t-ecdsa-sample",
    "samples/http-requests-exchange-rates",
    "samples/hello",
    "samples/host-a-website",
    "samples/dex",
    "samples/nft",
    "samples/dao",
    "samples/encrypted-notes",
    "samples/token-transfer",
    "samples/host-unity-webgl",
    "samples/hackathon-projects",
  ],
};

module.exports = sidebars;
