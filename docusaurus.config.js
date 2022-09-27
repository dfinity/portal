// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const dotenv = require("dotenv");
const isDev = process.env.NODE_ENV === "development";
dotenv.config({ path: ".env.local" });

// @ts-ignore
const versions = require("./versions.json");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const simplePlantUML = require("@akebifiky/remark-simple-plantuml");
const showcaseProjectsPlugin = require("./plugins/showcase-projects");
const icpPricePlugin = require("./plugins/icp-price");
const tailwindPlugin = require("./plugins/tailwind");
const matomoPlugin = require("./plugins/matomo");
const keepSymlinks = require("./plugins/keep-symlinks");
const liveSessionsPlugin = require("./plugins/live-sessions");
const roadmapDataPlugin = require("./plugins/roadmap-data");
const whatIsIcpDataPlugin = require("./plugins/what-is-the-ic-cards");
const howItWorksCardsPlugin = require("./plugins/howitworks-cards");
const howItWorksArticlesPlugin = require("./plugins/howitworks-articles");
const math = require("remark-math");
const katex = require("rehype-katex");

const teamInformationPlugin = require("./plugins/team-information");
const votingRewardsPlugin = require("./plugins/voting-rewards");
const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === "deploy-preview";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Internet Computer Home",
  tagline:
    "Deploy smart contracts and build scalable dapps on the Internet Computer - the world’s fastest and most powerful open-source blockchain network",
  url: "https://internetcomputer.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon-32x32.png",
  organizationName: "dfinity",
  projectName: "portal",

  plugins: [
    require.resolve("docusaurus-lunr-search"),
    ["docusaurus2-dotenv", { systemvars: true }],
    "docusaurus-plugin-sass",
    keepSymlinks,
    tailwindPlugin,
    icpPricePlugin,
    showcaseProjectsPlugin,
    liveSessionsPlugin,
    howItWorksArticlesPlugin,
    howItWorksCardsPlugin,
    teamInformationPlugin,
    votingRewardsPlugin,
    roadmapDataPlugin,
    whatIsIcpDataPlugin,
    matomoPlugin,
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  presets: [
    [
      "classic",
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
              path: "current",
            },
          },

          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [math, simplePlantUML, require("remark-code-import")],
          rehypePlugins: [katex],
          editUrl: "https://github.com/dfinity/portal/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
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
    // NOTE: liveCodeBLock is enabled for possible future feature,
    // but to do that type preset- classic had to be disabled below
    // /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: "/img/share.jpg",
      colorMode: {
        disableSwitch: true,
        defaultMode: "light",
        respectPrefersColorScheme: false,
      },
      metadata: [
        {
          // ios safari zooms in when an input field is focused
          // maximum-scale=1 solves the issue
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
      ],
      navbar: {
        hideOnScroll: true,

        logo: {
          alt: "DFINITY Logo",
          src: "img/IC_logo_horizontal.svg",
          srcDark: "img/IC_logo_horizontal_white.svg",
        },
        items: [
          {
            type: "search",
            position: "right",
          },
          {
            type: "dropdown",
            position: "right",
            label: "Explore",
            items: [
              {
                label: "Basics",
                href: "/basics",
              },
              {
                label: "Web3 Ecosystem",
                href: "/showcase",
              },
              {
                label: "Bitcoin Integration",
                href: "/bitcoin-integration",
              },
              {
                label: "Videos",
                href: "/videos",
              },
              {
                label: "HTTPS Outcalls",
                href: "/https-outcalls",
              },
              {
                label: "Internet Identity",
                href: "https://identity.ic0.app/",
              },

              {
                label: "Dashboard",
                href: "https://dashboard.internetcomputer.org",
              },
              {
                label: "DFINITY Foundation",
                href: "https://dfinity.org",
              },
            ],
          },
          {
            type: "dropdown",
            position: "right",
            label: "Learn",
            items: [
              {
                label: "What is the IC",
                href: "/what-is-the-ic",
              },
              {
                label: "How it works",
                href: "/how-it-works",
              },
              {
                label: "Wiki",
                href: "https://wiki.internetcomputer.org",
              },
              {
                label: "Whitepaper",
                href: "https://internetcomputer.org/whitepaper.pdf",
              },
              {
                label: "Internet Computer Infographic",
                href: "https://internetcomputer.org/icig.pdf",
              },
            ],
          },
          {
            type: "dropdown",
            position: "right",
            label: "Develop",
            items: [
              {
                label: "Developers Home",
                to: "/developers",
              },
              {
                label: "Developer Docs",
                type: "doc",
                docId: "developer-docs/ic-overview",
              },
              { label: "Sample Code", to: "/samples" },
              { label: "Developer Tools", to: "/tooling" },
              { label: "Developer Grants", href: "https://dfinity.org/grants" },
              {
                label: "Motoko Playground",
                href: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
              },
              {
                label: "Dev Forum ",
                href: "https://forum.dfinity.org/",
              },
            ],
          },
          {
            type: "dropdown",
            position: "right",
            label: "Participate",
            items: [
              {
                label: "ICP tokens",
                href: "/icp-tokens",
              },
              {
                label: "Live sessions",
                href: "/live-sessions",
              },
              {
                label: "Roadmap",
                href: "/roadmap",
              },
              {
                label: "Network Nervous System",
                href: "/nns",
              },
              {
                label: "Staking & Governance",
                href: "https://internetcomputer.org/docs/current/tokenomics/token-holders/nns-app-quickstart/",
              },
              {
                label: "Node Providers",
                href: "https://wiki.internetcomputer.org/wiki/Internet_Computer_wiki#For_Node_Providers",
              },
              {
                label: "ICA",
                href: "https://association.internetcomputer.org/",
              },
            ],
          },

          {
            type: "docSidebar",
            position: "left",
            sidebarId: "developer-docs",
            label: "Developer Docs",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "references",
            label: "References",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "concepts",
            label: "Concepts",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "tokenomics",
            label: "DAOs & Tokenomics",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "samples",
            label: "Sample Code",
          },

          {
            html: '<img src="/img/svgIcons/ic0.svg" alt="Go to version hosted on the Internet Computer"/> <span>Switch to ic0</span>',
            position: "right",

            href: `https://${require("./canister_ids.json").portal.ic}.ic0.app`,
            className: "ic0-item",
          },
        ],
      },

      announcementBar:
        isDev || isDeployPreview
          ? {
              id: "local_dev",
              content: isDeployPreview
                ? `You are currently viewing a preview of this <a href="${
                    process.env.PR_URL || "https://github.com/dfinity/portal"
                  }">Pull Request</a>.`
                : 'You are currently locally editing the Developer Portal. Contributing guidelines are available <a href="https://github.com/dfinity/portal#contributing">here</a>.',
              textColor: "#091E42",
              isCloseable: false,
            }
          : undefined,

      footer: {
        links: [
          {
            items: [
              {
                label: "Internet Computer Association",
                to: "https://association.internetcomputer.org/",
              },
              {
                label: "Wiki",
                to: "https://wiki.internetcomputer.org/",
              },
              {
                label: "Dashboard",
                to: "https://dashboard.internetcomputer.org/",
              },
            ],
          },
          {
            items: [
              {
                label: "Brand Materials",
                to: "https://dfinity.frontify.com/d/XzkdhhDptijE/dfinity-brand-guide#/internet-computer/powered-by-crypto-badges",
              },
              {
                label: "Support & Feedback",
                to: "https://support.dfinity.org/hc/en-us",
              },
            ],
          },
          {
            title: "SocialMedia",
            items: [
              {
                label: "Youtube",
                to: "https://www.youtube.com/dfinity",
                icon: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='24' height='24' viewBox='0 0 310 310' style='enable-background:new 0 0 310 310;' xml:space='preserve'%3E%3Cg id='XMLID_822_'%3E%3Cpath id='XMLID_823_' fill='white' d='M297.917,64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359,0-61.369,5.776-72.517,19.938 C0,79.663,0,100.008,0,128.166v53.669c0,54.551,12.896,82.248,83.386,82.248h143.226c34.216,0,53.176-4.788,65.442-16.527 C304.633,235.518,310,215.863,310,181.835v-53.669C310,98.471,309.159,78.006,297.917,64.645z M199.021,162.41l-65.038,33.991 c-1.454,0.76-3.044,1.137-4.632,1.137c-1.798,0-3.592-0.484-5.181-1.446c-2.992-1.813-4.819-5.056-4.819-8.554v-67.764 c0-3.492,1.822-6.732,4.808-8.546c2.987-1.814,6.702-1.938,9.801-0.328l65.038,33.772c3.309,1.718,5.387,5.134,5.392,8.861 C204.394,157.263,202.325,160.684,199.021,162.41z'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A",
              },
              {
                label: "Medium",
                to: "https://medium.com/dfinity-network-blog",
                icon: "data:image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='m24 24h-24v-24h24zm-8.986-15.006v7.326c0 .198 0 .234-.127.362l-1.302 1.264v.27h6.32v-.27l-1.257-1.234c-.091-.07-.148-.178-.148-.3 0-.022.002-.043.005-.064v.002-9.07c-.003-.019-.005-.04-.005-.062 0-.121.058-.229.148-.298l.001-.001 1.286-1.234v-.27h-4.456l-3.176 7.924-3.609-7.924h-4.675v.271l1.502 1.813c.127.115.207.281.207.466 0 .022-.001.043-.003.064v-.003 7.126c.007.041.011.088.011.136 0 .222-.088.423-.231.571l-1.69 2.054v.27h4.8v-.27l-1.691-2.054c-.149-.154-.241-.363-.241-.595 0-.04.003-.079.008-.117v.004-6.16l4.215 9.195h.49z'/%3E%3C/svg%3E",
              },
              {
                label: "Reddit",
                to: "https://www.reddit.com/r/dfinity/",
                icon: "data:image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath fill-rule='nonzero' fill='white' d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm6.67-10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23L13 6.65l2.14.45a1 1 0 1 0 .13-.61L12.82 6a.31.31 0 0 0-.37.24l-.74 3.47a7.14 7.14 0 0 0-3.9 1.23 1.46 1.46 0 1 0-1.61 2.39 2.87 2.87 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 0 0 0-.44 1.46 1.46 0 0 0 .81-1.33zm-10 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.81 2.75a3.84 3.84 0 0 1-2.47.77 3.84 3.84 0 0 1-2.47-.77.27.27 0 0 1 .38-.38A3.27 3.27 0 0 0 12 16a3.28 3.28 0 0 0 2.09-.61.28.28 0 1 1 .39.4v-.04zm-.18-1.71a1 1 0 1 1 1-1 1 1 0 0 1-1.01 1.04l.01-.04z'/%3E%3C/g%3E%3C/svg%3E%0A",
              },
              {
                label: "Discord",
                to: "https://discord.com/invite/cA7y6ezyE2",
                icon: "data:image/svg+xml,%3Csvg width='24' height='18' viewBox='0 0 24 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.7158 17.2639C22.2578 17.12 24.0047 14.14 24.0047 14.14C24.0047 7.52221 21.0453 2.15813 21.0453 2.15813C18.0858 -0.0614848 15.2701 0.000170789 15.2701 0.000170789L14.9824 0.329003C18.4763 1.39771 20.0999 2.93911 20.0999 2.93911C17.9625 1.76764 15.8662 1.19219 13.9137 0.966116C12.434 0.801699 11.0159 0.842803 9.7622 1.00722L9.41282 1.04832C8.6935 1.10998 6.94658 1.37716 4.74751 2.3431C3.98709 2.69248 3.53495 2.93911 3.53495 2.93911C3.53495 2.93911 5.24076 1.3155 8.94013 0.246795L8.7346 0.000170789C8.7346 0.000170789 5.91898 -0.0614848 2.95949 2.15813C2.95949 2.15813 0 7.52221 0 14.14C0 14.14 1.72637 17.12 6.26836 17.2639C6.26836 17.2639 7.02879 16.339 7.64535 15.558C5.03524 14.7771 4.04875 13.1329 4.04875 13.1329L4.6242 13.4823L4.70641 13.5439L4.78691 13.5902L4.81088 13.6005L4.89138 13.6467C5.40518 13.9344 5.91898 14.1605 6.39167 14.3455C7.23431 14.6743 8.24136 15.0031 9.41282 15.2292C10.9542 15.5169 12.7628 15.6197 14.7358 15.2498C15.7017 15.0853 16.6882 14.7976 17.7158 14.366C18.4352 14.0989 19.2367 13.7084 20.0793 13.1535C20.0793 13.1535 19.0517 14.8387 16.3594 15.5991C16.976 16.3801 17.7158 17.2639 17.7158 17.2639ZM8.15915 7.66607C6.98768 7.66607 6.06284 8.69367 6.06284 9.94734C6.06284 11.201 7.00824 12.2286 8.15915 12.2286C9.33061 12.2286 10.2555 11.201 10.2555 9.94734C10.276 8.69367 9.33061 7.66607 8.15915 7.66607ZM15.6606 7.66607C14.4892 7.66607 13.5643 8.69367 13.5643 9.94734C13.5643 11.201 14.5097 12.2286 15.6606 12.2286C16.8321 12.2286 17.7569 11.201 17.7569 9.94734C17.7569 8.69367 16.8321 7.66607 15.6606 7.66607Z' fill='white'/%3E%3C/svg%3E%0A",
              },
              {
                label: "GitHub",
                to: "https://github.com/dfinity",
                icon: "data:image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 64 64' id='i-github' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-width='0' fill='white' d='M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z' /%3E%3C/svg%3E",
              },
              {
                label: "Twitter",
                to: "https://twitter.com/dfinity",
                icon: "data:image/svg+xml,%3Csvg width='24' height='20' viewBox='0 0 24 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 2.55699C23.117 2.94899 22.168 3.21299 21.172 3.33199C22.189 2.72299 22.97 1.75799 23.337 0.607986C22.386 1.17199 21.332 1.58199 20.21 1.80299C19.313 0.845986 18.032 0.247986 16.616 0.247986C13.437 0.247986 11.101 3.21399 11.819 6.29299C7.728 6.08799 4.1 4.12799 1.671 1.14899C0.381 3.36199 1.002 6.25699 3.194 7.72299C2.388 7.69699 1.628 7.47599 0.965 7.10699C0.911 9.38799 2.546 11.522 4.914 11.997C4.221 12.185 3.462 12.229 2.69 12.081C3.316 14.037 5.134 15.46 7.29 15.5C5.22 17.123 2.612 17.848 0 17.54C2.179 18.937 4.768 19.752 7.548 19.752C16.69 19.752 21.855 12.031 21.543 5.10599C22.505 4.41099 23.34 3.54399 24 2.55699Z' fill='white'/%3E%3C/svg%3E%0A",
              },
              {
                label: "IC Forum",
                to: "https://forum.dfinity.org/",
                icon: "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M2.08863 21.3024L7.37963 20.1264C8.82825 20.9008 10.446 21.3048 12.0886 21.3024C17.6116 21.3024 22.0886 16.8254 22.0886 11.3024C22.0886 5.77937 17.6116 1.30237 12.0886 1.30237C6.56563 1.30237 2.08863 5.77937 2.08863 11.3024C2.08616 12.945 2.49017 14.5628 3.26463 16.0114L2.08863 21.3024ZM13.1036 8.76534C13.9981 7.9495 14.8455 7.53567 15.6223 7.53567C17.4818 7.53567 18.9941 9.06685 19 10.9527C19 11.2247 18.9646 11.4907 18.9058 11.7449C18.9035 11.7546 18.8977 11.7763 18.8873 11.8075C18.5062 13.2627 17.1899 14.3403 15.6296 14.3461C14.3375 14.3461 13.0317 13.1057 12.0633 11.9866L12.0578 11.9933C12.0578 11.9933 11.6223 11.5026 11.1456 10.9764C11.1456 10.9764 10.6043 10.3497 10.0275 9.79993C9.87049 9.6504 9.28353 9.17699 8.58501 8.89833C8.54213 8.89211 8.50396 8.88975 8.47049 8.88975C7.35241 8.90158 6.44618 9.81791 6.44618 10.9412C6.44618 12.0763 7.35241 12.9926 8.47049 12.9926C8.76471 12.9926 9.28844 12.8389 10.0829 12.1176C10.5124 11.7275 10.8831 11.2959 11.1421 10.9767C11.6188 11.5028 12.0542 11.9935 12.0542 11.9935C11.7835 12.3246 11.4128 12.7384 10.9891 13.1227C10.0946 13.9385 9.24727 14.3524 8.47049 14.3524C6.60507 14.3524 5.09273 12.8212 5.09273 10.9353C5.09273 10.6633 5.12804 10.3973 5.18688 10.1431C5.19098 10.1256 5.20651 10.0691 5.24019 9.98785C5.65003 8.57662 6.94483 7.54136 8.47404 7.53567C9.76574 7.53567 11.071 8.7753 12.0354 9.89405L12.04 9.88858L12.0417 9.89052C12.3122 9.56013 12.6816 9.14808 13.1036 8.76534ZM15.6223 12.9983C15.6044 12.9983 15.5852 12.9976 15.5647 12.996C14.8431 12.7245 14.2315 12.2355 14.0702 12.0819C13.5124 11.5501 12.9877 10.9465 12.9538 10.9074C13.2126 10.5886 13.582 10.1589 14.0098 9.77037C14.8043 9.04321 15.3221 8.89541 15.6223 8.89541C16.7403 8.89541 17.6466 9.81174 17.6466 10.9469C17.6466 12.0701 16.7403 12.9864 15.6223 12.9983Z' fill='white'/%3E%3C/svg%3E",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Internet Computer`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      liveCodeBlock: {
        playgroundPosition: "bottom",
      },
    },
  themes: ["@docusaurus/theme-live-codeblock"],
  clientModules: [require.resolve("./static/load_moc.ts")],
};

module.exports = config;
