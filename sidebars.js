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
        'developer-docs/functionality/index',
      ]
    },
    {
      type: 'category',
      label: 'Good to know',
      link: {
        type: 'doc', id: 'developer-docs/good-to-know/security/introduction'
      },
      items: [
        {
          type: 'category',
          label: 'Security',
          link: {
            type: 'doc', id: 'developer-docs/good-to-know/security/introduction'
          },
          items: [
            'developer-docs/good-to-know/security/introduction',
            'developer-docs/good-to-know/security/general-security-best-practices',
            'developer-docs/good-to-know/security/web-app-development-security-best-practices',
            'developer-docs/good-to-know/security/rust-canister-development-security-best-practices',
          ]
        },
      ]
    }
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
    'references/ic-interface-spec'
  ],
  'samples': [
    'samples/index'
  ],
  'user-guides': [
    'user-guides/index'
  ]
};

module.exports = sidebars;
