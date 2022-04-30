// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  'developer-docs': [
    'developer-docs/ic-overview',
    {
      type: 'category',
      label: 'Quick start',
      link: {
        type: 'doc', id: 'developer-docs/quickstart/hello10mins'
      },
      items: [
        'developer-docs/quickstart/hello10mins',
        // 'developer-docs/quickstart/windows-wsl',
        'developer-docs/quickstart/cycles-faucet'
        // 'developer-docs/quickstart/local-quickstart',
        // 'developer-docs/quickstart/network-quickstart'
      ]
    },
    {
      type: 'category',
      label: 'Building on the IC',
      link: {
        type: 'doc', id: 'developer-docs/build/index',
      },
      items: [
        'developer-docs/build/install-upgrade-remove',
        {
          type: 'category',
          label: 'Project Setup',
          link: {
            // type: 'doc', id: 'developer-docs/build/project-setup/index',
            type: 'doc', id: 'developer-docs/build/project-setup/design-dapps',
          },
          items: [
            'developer-docs/build/project-setup/design-dapps',
            'developer-docs/build/project-setup/manage-projects',
            'developer-docs/build/project-setup/manage-canisters',
            'developer-docs/build/project-setup/default-wallet',
          ],
        },
        {
          type: 'category',
          label: 'Languages',
          link: {
            type: 'doc', id: 'developer-docs/build/languages/work-with-languages'
          },
          items: [
            // 'developer-docs/build/explore-templates',
            {
              type: 'category',
              label: 'Rust',
              link: {
                type: 'doc', id: 'developer-docs/build/languages/rust/rust-intro',
              }, 
              items: [
                'developer-docs/build/languages/rust/rust-quickstart',
                'developer-docs/build/languages/rust/rust-counter',
                'developer-docs/build/languages/rust/multiply-dependency',
                'developer-docs/build/languages/rust/rust-profile',
                'developer-docs/build/languages/rust/rust-optimize',
              ],
            },
            {
              type: 'category',
              label: 'Motoko',
              link: {
                // type: 'doc', id: 'developer-docs/build/languages/motoko/index',
                type: 'doc', id: 'developer-docs/build/languages/motoko/about-this-guide',
              },
              items: [
                'developer-docs/build/languages/motoko/about-this-guide',
                'developer-docs/build/languages/motoko/motoko-introduction',
                'developer-docs/build/languages/motoko/basic-concepts',
                'developer-docs/build/languages/motoko/mutable-state',
                'developer-docs/build/languages/motoko/local-objects-classes',
                'developer-docs/build/languages/motoko/actors-async',
                'developer-docs/build/languages/motoko/errors',
                'developer-docs/build/languages/motoko/pattern-matching',
                'developer-docs/build/languages/motoko/sharing',
                'developer-docs/build/languages/motoko/modules-and-imports',
                'developer-docs/build/languages/motoko/control-flow',
                'developer-docs/build/languages/motoko/structural-equality',
                'developer-docs/build/languages/motoko/actor-classes',
                'developer-docs/build/languages/motoko/caller-id',
                'developer-docs/build/languages/motoko/cycles',
                'developer-docs/build/languages/motoko/upgrades',
                'developer-docs/build/languages/motoko/compatibility',
                'developer-docs/build/languages/motoko/stablememory',
                'developer-docs/build/languages/motoko/heartbeats',
                'developer-docs/build/languages/motoko/language-manual',
                'developer-docs/build/languages/motoko/compiler-ref',
                'developer-docs/build/languages/motoko/motoko-grammar',
                'developer-docs/build/languages/motoko/overview',
                'developer-docs/build/languages/motoko/style',
              ]
            },
            {
              type: 'category',
              label: 'Candid',
              link: {
                type: 'doc', id: 'developer-docs/build/languages/candid/candid-intro',
              }, 
              items: [
                'developer-docs/build/languages/candid/candid-concepts',
                'developer-docs/build/languages/candid/candid-howto',
              ],
            },
          ]
        },
        {
          type: 'category',
          label: 'Backend Tutorials',
          link: {
            type: 'doc', id: 'developer-docs/build/backend/index'
          },
          items: [
            'developer-docs/build/backend/explore-templates',
            'developer-docs/build/backend/define-an-actor',
            'developer-docs/build/backend/hello-location',
            'developer-docs/build/backend/counter-tutorial',
            'developer-docs/build/backend/calculator',
            'developer-docs/build/backend/phonebook',
            'developer-docs/build/backend/multiple-actors',
            'developer-docs/build/backend/intercanister-calls',
            'developer-docs/build/backend/access-control',
            'developer-docs/build/backend/simple-cycles',
            'developer-docs/build/backend/reproducible-builds',
          ]
        },
        {
          type: 'category',
          label: 'Frontend Tutorials',
          link: {
            // type: 'doc', id: 'developer-docs/build/frontend/index',
            type: 'doc', id: 'developer-docs/build/frontend/webpack-config',
          },
          items: [
            'developer-docs/build/frontend/webpack-config',
            'developer-docs/build/frontend/custom-frontend',

          ],
        },
        // {
        //   type: 'category',
        //   label: 'Deployment & Scaling',
        //   link: {
        //     type: 'doc', id: 'developer-docs/build/deployment-scaling/index',
        //   },
        //   items: [
        //     'developer-docs/build/deployment-scaling/deploy',
        //     'developer-docs/build/deployment-scaling/scale'
        //   ],
        // },
        'developer-docs/build/troubleshooting',
      ]
    },
    {
      type: 'category',
      label: 'Integrate Functionality',
      link: {
        // type: 'doc', id: 'developer-docs/functionality/index'
        type: 'doc', id: 'developer-docs/functionality/internet-identity/integrate-identity'
      },
      items: [
        // 'developer-docs/functionality/index',
        'developer-docs/functionality/internet-identity/integrate-identity',
        {
          type: 'category',
          label: 'Rosetta',
          link: {
            // type: 'doc', id: 'developer-docs/functionality/rosetta/index'
            type: 'doc', id: 'developer-docs/functionality/rosetta/transfers'
          },
          items: [
            'developer-docs/functionality/rosetta/transfers',
            'developer-docs/functionality/rosetta/neuron-lifecycle',
            'developer-docs/functionality/rosetta/staking-support',
            'developer-docs/functionality/rosetta/staking-tutorial',
          ]
        },
        {
          type: 'category',
          label: 'Ledger',
          link: {
            type: 'doc', id: 'developer-docs/functionality/ledger/index'
          },
          items: [
            'developer-docs/functionality/ledger/ledger-local-setup',
            'developer-docs/functionality/ledger/deploy-new-token',
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Updates & Releases',
      link: {
        // type: 'doc', id: 'developer-docs/updates/index'
        type: 'doc', id: 'developer-docs/updates/release-notes/sdk-release-notes'
      },
      items: [
        {
          type: 'category',
          label: 'SDK Release Notes',
          link: {
            type: 'doc', id: 'developer-docs/updates/release-notes/sdk-release-notes',
          },
          items: [
            'developer-docs/updates/release-notes/release-notes',
            // 'developer-docs/updates/release-notes/0.9.3-rn',
            // 'developer-docs/updates/release-notes/0.9.2-rn',
            // 'developer-docs/updates/release-notes/0.9.0-rn',
            // 'developer-docs/updates/release-notes/0.8.4-rn',
            // 'developer-docs/updates/release-notes/0.8.2-rn',
            // 'developer-docs/updates/release-notes/0.8.1-rn',
            // 'developer-docs/updates/release-notes/0.8.0-rn',
            // 'developer-docs/updates/release-notes/0.7.7-rn',
            // 'developer-docs/updates/release-notes/0.7.2-rn',
            // 'developer-docs/updates/release-notes/0.7.1-rn',
            // 'developer-docs/updates/release-notes/0.7.0-rn',
            // 'developer-docs/updates/release-notes/0.6.26-rn',
            // 'developer-docs/updates/release-notes/0.6.25-rn',
            // 'developer-docs/updates/release-notes/0.6.24-rn',
            // 'developer-docs/updates/release-notes/0.6.23-rn',
            // 'developer-docs/updates/release-notes/0.6.22-rn',
            // 'developer-docs/updates/release-notes/0.6.21-rn',
            // 'developer-docs/updates/release-notes/0.6.20-rn',
            // 'developer-docs/updates/release-notes/0.6.20-rn',
            // 'developer-docs/updates/release-notes/0.6.20-rn',
          ]
        },
        'developer-docs/updates/computation-and-storage-costs',
        {
          type: 'category',
          label: 'Security Best Practices',
          link: {
            type: 'doc', id: 'developer-docs/updates/security/index'
          },
          items: [
            'developer-docs/updates/security/general-security-best-practices',
            'developer-docs/updates/security/web-app-development-security-best-practices',
            'developer-docs/updates/security/rust-canister-development-security-best-practices',
          ]
        },
      ]
    },
  'developer-docs/glossary',
  ],
  'references': [
    'references/index',
    // 'references/cli-reference/index',
    {
      type: 'category',
      label: 'DFX Commands & Envars',
      link: {
        type: 'doc', id: 'references/cli-reference/index'
      },
      items: [
        'references/cli-reference/dfx-parent',
        'references/cli-reference/dfx-build',
        'references/cli-reference/dfx-cache',
        'references/cli-reference/dfx-canister',
        'references/cli-reference/dfx-config',
        'references/cli-reference/dfx-deploy',
        'references/cli-reference/dfx-generate',
        'references/cli-reference/dfx-help',
        'references/cli-reference/dfx-identity',
        'references/cli-reference/dfx-ledger',
        'references/cli-reference/dfx-new',
        'references/cli-reference/dfx-ping',
        'references/cli-reference/dfx-replica',
        'references/cli-reference/dfx-start',
        'references/cli-reference/dfx-upgrade',
        'references/cli-reference/dfx-wallet',
        'references/cli-reference/dfx-envars',
      ]
    },
    {
      type: 'category',
      label: 'Motoko References',
      link: {
        type: 'doc', id: 'developer-docs/build/languages/motoko/language-manual',
      },
      items: [
        'references/motoko-ref/array',
        'references/motoko-ref/assoclist',
        'references/motoko-ref/blob',
        'references/motoko-ref/bool',
        'references/motoko-ref/buffer',
        'references/motoko-ref/certifieddata',
        'references/motoko-ref/char',
        'references/motoko-ref/debug',
        'references/motoko-ref/deque',
        'references/motoko-ref/error',
        'references/motoko-ref/float',
        'references/motoko-ref/func',
        'references/motoko-ref/hash',
        'references/motoko-ref/hashmap',
        'references/motoko-ref/heap',
        'references/motoko-ref/int',
        'references/motoko-ref/int8',
        'references/motoko-ref/int16',
        'references/motoko-ref/int32',
        'references/motoko-ref/int64',
        'references/motoko-ref/iter',
        'references/motoko-ref/itertype',
        'references/motoko-ref/list',
        'references/motoko-ref/nat8',
        'references/motoko-ref/nat16',
        'references/motoko-ref/nat32',
        'references/motoko-ref/nat64',
        'references/motoko-ref/option',
        'references/motoko-ref/prelude',
        'references/motoko-ref/principal',
        'references/motoko-ref/random',
        'references/motoko-ref/rbtree',
        'references/motoko-ref/result',
        'references/motoko-ref/stack',
        'references/motoko-ref/stdlib-intro',
        'references/motoko-ref/text',
        'references/motoko-ref/time',
        'references/motoko-ref/trie',
        'references/motoko-ref/triemap',
        'references/motoko-ref/trieset',
      ]
    },
    {
      type: 'link',
      label: 'Rust CDK References',
      href: 'https://docs.rs/ic-cdk/',
    },
    'references/candid-ref',
    'references/ledger',
    'references/ii-spec',
    'references/ic-interface-spec'
  ],
  'concepts': [
    'concepts/index',
    'concepts/what-is-IC',
    'concepts/nodes-subnets',
    'concepts/data-centers',
    'concepts/canisters-code',
    'concepts/trust-in-canisters',
    'concepts/tokens-cycles',
    'concepts/governance',
    'concepts/bitcoin-integration',
  ],
  'tokenomics': [
    'tokenomics/index',
    {
      type: 'category',
      label: 'Identity & Authentication',
      link: {
        type: 'doc', id: 'tokenomics/token-holders/index'
        // type: 'doc', id: 'tokenomics/token-holders/custody-options-intro'
      },
      items: [
        'tokenomics/identity-auth/what-is-ic-identity',
        'tokenomics/identity-auth/auth-how-to',
        'tokenomics/identity-auth/hello-guide'
      ]
    },
    {
      type: 'category',
      label: 'Token Holders',
      link: {
        // type: 'doc', id: 'tokenomics/token-holders/index'
        type: 'doc', id: 'tokenomics/token-holders/custody-options-intro'
      },
      items: [
        'tokenomics/token-holders/custody-options-intro',
        'tokenomics/token-holders/self-custody-quickstart',
        'tokenomics/token-holders/nns-app-quickstart',
        // 'tokenomics/token-holders/seed-donations',
      ]
    },
  ]
};

module.exports = sidebars;
