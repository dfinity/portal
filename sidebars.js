// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  'developer-docs': [
    'developer-docs/ic-overview',
    {
      type: 'category',
      label: 'Quickstart',
      items: [
        'developer-docs/quickstart/hello20mins',
        'developer-docs/quickstart/cycles-faucet',
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
  'showcase': [
    'showcase/index'
  ],
  'user-guides': [
    'user-guides/index'
  ]
};

module.exports = sidebars;
