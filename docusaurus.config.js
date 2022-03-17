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
          versions: {
            current: {
              label: "Current 🚧"
            }
          },

          sidebarPath: require.resolve('./sidebars.js'),
          // TODO: Please change this to your repo.
          editUrl: 'https://github.com/dfinity/portal/edit/master/',
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
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'developer-docs',
            label: 'Developer Docs',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'concepts',
            label: 'Concepts',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'references',
            label: 'References',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'user-guides',
            label: 'User guides',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'showcase',
            label: 'Showcase',
          },

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
            title: 'Developers',
            items: [
              {
                label: 'FAQ',
                href: 'https://dfinity.org/faq',
              },
              {
                label: 'Data Centers',
                href: 'https://internetcomputer.org/',
              },
            ],
          },
          {
            title: 'Ecosystem',
            items: [
              {
                label: 'Beacon Fund',
                href: 'https://dfinity.org/ecosystem/fund'
              },
              {
                label: 'Fellowship',
                href: 'https://dfinity.org/ecosystem/fellowship'
              },
              {
                label: 'Enterprise',
                href: 'https://smartcontracts.org/#'
              },
            ]
          },
          {
            title: 'Team',
            items: [
              {
                label: 'Foundation',
                href: 'https://dfinity.org/foundation'
              },
              {
                label: 'Events',
                href: 'https://dfinity.org/foundation#events'
              },
              {
                label: 'Careers',
                href: 'https://dfinity.org/careers'
              },
            ]
          },
          {
            title: 'Media',
            items: [
              {
                label: 'Featured Videos',
                href: 'https://dfinity.org/media'
              },
              {
                label: 'Featured Stories',
                href: 'https://dfinity.org/media#featured-stories'
              },
              {
                label: 'Newsletter',
                href: 'https://dfinity.org/newsletter'
              },
            ]
          },
          {
            title: 'Media',
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
            items: [
              {
                label: 'GitHub',
                to: 'https://github.com/dfinity',
              },
              {
                label: 'Medium',
                href: 'https://medium.com/dfinity-network-blog',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/dfinity',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/dfinity',
              },
            ],
          },
          {
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/dfinity/',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/dfinity',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/dfinity/',
              },
              {
                label: 'Forum',
                href: 'https://forum.dfinity.org/',
              },
            ],
          },
          {
            items: [
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/dfinity.org',
              },
              {
                label: 'The Reboot',
                href: 'https://thereboot.com/',
              }
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
