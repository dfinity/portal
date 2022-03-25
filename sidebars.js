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
    'concepts/index'
  ],
  'references': [
    {
      type: 'category',
      label: 'Motoko References',
      items: [
        'references/motoko-ref/index'
      ]
    },
    {
      type: 'link',
      label: 'Canister DK references',
      href: 'https://docs.rs/ic-cdk/',
    },
    'references/ic-protocol-spec'
  ],
  'samples': [
    'samples/index'
  ],
  'user-guides': [
    'user-guides/index'
  ]
};

module.exports = sidebars;
