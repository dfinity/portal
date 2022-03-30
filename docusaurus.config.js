// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// @ts-ignore
const versions = require('./versions.json');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const isDev = process.env.NODE_ENV === 'development';
const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === 'deploy-preview';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Internet Computer Developer Centre',
  tagline: 'If you’ve landed here, you’re interested in learning more about the Internet Computer. You’re in the right place — take a look below for where to get started!',
  url: 'https://smartcontracts.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-32x32.png',
  organizationName: 'dfinity',
  projectName: 'portal',

  plugins: [
    require.resolve('docusaurus-lunr-search'),
    [
      "docusaurus2-dotenv",
      { systemvars: true },
    ],
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          lastVersion: versions[0],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
          versions: {
            current: {
              label: "Current 🚧",
              path: 'current'
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
            sidebarId: 'references',
            label: '📖 References',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'concepts',
            label: '💡 Concepts',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'governance',
            label: '🗳️ Governance',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'showcases',
            label: '🎭 Showcases',
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
          isDeployPreview ? `You are currently viewing a preview of this <a href="${process.env.PR_URL || 'https://github.com/dfinity/portal'}">Pull Request</a>.`:
            'You are currently locally editing the Developer Portal. Contributing guidelines are available <a href="https://github.com/dfinity/portal#contributing">here</a>.',
        textColor: '#091E42',
        isCloseable: false,
      } : undefined,

      footer: {
        links: [
          {
            title: 'Developers',
            items: [
              {
                label: 'FAQ',
                to: 'https://dfinity.org/faq',
              },
              {
                label: 'Data Centers',
                to: 'https://internetcomputer.org/',
              },
            ],
          },
          {
            title: 'Ecosystem',
            items: [
              {
                label: 'Beacon Fund',
                to: 'https://dfinity.org/ecosystem/fund'
              },
              {
                label: 'Fellowship',
                to: 'https://dfinity.org/ecosystem/fellowship'
              },
              {
                label: 'Enterprise',
                to: 'https://smartcontracts.org/#'
              },
            ]
          },
          {
            title: 'Team',
            items: [
              {
                label: 'Foundation',
                to: 'https://dfinity.org/foundation'
              },
              {
                label: 'Events',
                to: 'https://dfinity.org/foundation#events'
              },
              {
                label: 'Careers',
                to: 'https://dfinity.org/careers'
              },
            ]
          },
          {
            title: 'Media',
            items: [
              {
                label: 'Featured Videos',
                to: 'https://dfinity.org/media'
              },
              {
                label: 'Featured Stories',
                to: 'https://dfinity.org/media#featured-stories'
              },
              {
                label: 'Newsletter',
                to: 'https://dfinity.org/newsletter'
              },
            ]
          },
          {
            title: 'Media',
            items: [
              {
                label: 'Stack Overflow',
                to: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                to: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                to: 'https://twitter.com/docusaurus',
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
                to: 'https://medium.com/dfinity-network-blog',
              },
              {
                label: 'Twitter',
                to: 'https://twitter.com/dfinity',
              },
              {
                label: 'Youtube',
                to: 'https://www.youtube.com/dfinity',
              },
            ],
          },
          {
            items: [
              {
                label: 'Telegram',
                to: 'https://t.me/dfinity/',
              },
              {
                label: 'LinkedIn',
                to: 'https://www.linkedin.com/company/dfinity',
              },
              {
                label: 'Reddit',
                to: 'https://www.reddit.com/r/dfinity/',
              },
              {
                label: 'Forum',
                to: 'https://forum.dfinity.org/',
              },
            ],
          },
          {
            items: [
              {
                label: 'Facebook',
                to: 'https://www.facebook.com/dfinity.org',
              },
              {
                label: 'The Reboot',
                to: 'https://thereboot.com/',
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
