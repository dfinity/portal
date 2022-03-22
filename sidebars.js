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
        'developer-docs/quickstart/cycles-faucet',
        'developer-docs/quickstart/local-quickstart',
        'developer-docs/quickstart/network-quickstart'
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
