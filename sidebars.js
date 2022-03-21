// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  'developer-docs': [
    'developer-docs/ic-overview',
    'developer-docs/quick-start',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'developer-docs/guides/environment-setup'
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
