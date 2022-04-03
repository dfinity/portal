// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  'developer-docs': [
    'developer-docs/ic-overview',
    {
      type: 'category',
      label: 'Quick start',
      link: {
        type: 'doc', id: 'developer-docs/quickstart/index'
      },
      items: [
        'developer-docs/quickstart/hello20mins',
        'developer-docs/quickstart/cycles-faucet'
        // 'developer-docs/quickstart/local-quickstart',
        // 'developer-docs/quickstart/network-quickstart'
      ]
    },
    {
      type: 'category',
      label: 'Sample Code',
      link: {
        type: 'doc', id: 'developer-docs/samples/index'
      },
      items: [
        'developer-docs/samples/dao',
        'developer-docs/samples/dex',
        'developer-docs/samples/encrypted-notes',
        'developer-docs/samples/hackathon-projects',
        'developer-docs/samples/hello',
        'developer-docs/samples/host-a-website',
        'developer-docs/samples/nft',
        'developer-docs/samples/tokentransfer',
      ]
    },
    {
      type: 'category',
      label: 'Building on the IC',
      link: {
        type: 'doc', id: 'developer-docs/build/index'
      },
      items: [
        'developer-docs/build/design-dapps',
        'developer-docs/build/manage-projects',
        'developer-docs/build/manage-canisters',
        'developer-docs/build/default-wallet',
        {
          type: 'category',
          label: 'Languages',
          link: {
            type: 'doc', id: 'developer-docs/build/languages/index'
          },
          items: [
            // 'developer-docs/build/tutorials/explore-templates',
            {
              type: 'category',
              label: 'Motoko',
              link: {
                type: 'doc', id: 'developer-docs/build/languages/motoko/index',
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
          ]
        },
        {
          type: 'category',
          label: 'Tutorials',
          link: {
            type: 'doc', id: 'developer-docs/build/tutorials/index'
          },
          items: [
            'developer-docs/build/tutorials/explore-templates',
          ]
        },
        'developer-docs/build/troubleshooting',
      ]
    },
    {
      type: 'category',
      label: 'Integrate Functionality',
      link: {
        type: 'doc', id: 'developer-docs/functionality/index'
      },
      items: [
        // 'developer-docs/functionality/index',
        {
          type: 'category',
          label: 'Rosetta',
          link: {
            type: 'doc', id: 'developer-docs/functionality/rosetta/index'
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
      label: 'Good to know',
      link: {
        type: 'doc', id: 'developer-docs/good-to-know/index'
      },
      items: [
        'developer-docs/good-to-know/computation-and-storage-costs',
        {
          type: 'category',
          label: 'Security Best Practices',
          link: {
            type: 'doc', id: 'developer-docs/good-to-know/security/index'
          },
          items: [
            'developer-docs/good-to-know/security/general-security-best-practices',
            'developer-docs/good-to-know/security/web-app-development-security-best-practices',
            'developer-docs/good-to-know/security/rust-canister-development-security-best-practices',
          ]
        },
        {
          type: 'category',
          label: 'Token Holders',
          link: {
            type: 'doc', id: 'developer-docs/good-to-know/token-holders/index'
          },
          items: [
            'developer-docs/good-to-know/token-holders/custody-options-intro',
            'developer-docs/good-to-know/token-holders/self-custody-quickstart',
            'developer-docs/good-to-know/token-holders/nns-app-quickstart',
            // 'developer-docs/good-to-know/token-holders/seed-donations',
          ]
        },
      ]
    }
  ],
  'references': [
    'references/index',
    {
      type: 'category',
      label: 'Motoko References',
      items: [
        'references/motoko-ref/index'
      ]
    },
    {
      type: 'link',
      label: 'Rust CDK references',
      href: 'https://docs.rs/ic-cdk/',
    },
    {
      type: 'category',
      label: 'CLI References',
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
        'references/cli-reference/dfx-envars',
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
      ]
    },
    'references/ic-interface-spec',
    'references/ledger'
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
  'governance': [
    'governance/index'
  ]
};

module.exports = sidebars;
