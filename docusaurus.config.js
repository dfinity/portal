// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const versions = require('./versions.json');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const isDev = process.env.NODE_ENV === 'development';
const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === 'deploy-preview';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Internet Computer',
  tagline: 'If you’ve landed here, you’re interested in learning more about the Internet Computer. You’re in the right place — take a look below for where to get started!',
  url: 'https://smartcontracts.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-32x32.png',
  organizationName: 'dfinity',
  projectName: 'portal', 

  plugins: [require.resolve('docusaurus-lunr-search')],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          lastVersion: versions[0],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          versions: isDev || isDeployPreview ? {
            current: {
              label: "Current 🚧"
            }
          } : {},

          sidebarPath: require.resolve('./sidebars.js'),
          // TODO: Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // TODO: Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // TODO: Remove when ready to integrate internationalization
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: isDeployPreview
  //   ? // Deploy preview: keep it fast!
  //     ['en']
  //   : ['en', 'fr'],
  // },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Internet Computer',
        logo: {
          alt: 'DFINITY Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},

          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          // TODO: remove when integrating i18n
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },

      announcementBar: isDev || isDeployPreview ? {
        id: 'local_dev',
        content:
          'You are currently locally editing the Developer Portal. Contributing guidelines are available <a href="https://github.com/dfinity/portal#contributing">here</a>.',
        textColor: '#091E42',
        isCloseable: false,
      } : undefined,

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DFINITY Foundation.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
