// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const dotenv = require("dotenv");
const isDev = process.env.NODE_ENV === "development";
dotenv.config({ path: ".env.local" });

const versions = require("./versions.json");
const lightCodeTheme = require("./codeblock-theme");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const simplePlantUML = require("@akebifiky/remark-simple-plantuml");
const homeShowcaseProjectsPlugin = require("./plugins/home-showcase");
const icpPricePlugin = require("./plugins/icp-price");
const xdrPricePlugin = require("./plugins/xdr-price");
const icpXdrPricePlugin = require("./plugins/icp-xdr-price");
const tailwindPlugin = require("./plugins/tailwind");
const matomoPlugin = require("./plugins/matomo");
const customWebpack = require("./plugins/custom-webpack");
const roadmapDataPlugin = require("./plugins/roadmap-data");
const blogPostsPlugin = require("./plugins/blog-posts");
const deckRedirectPulgin = require("./plugins/deck-redirect");
const externalRedirectsPlugin = require("./plugins/external-redirects");
const whatIsIcpDataPlugin = require("./plugins/what-is-the-ic-cards");
const howItWorksCardsPlugin = require("./plugins/howitworks-cards");
const howItWorksArticlesPlugin = require("./plugins/howitworks-articles");
const math = require("remark-math");
const katex = require("rehype-katex");
const votingRewardsPlugin = require("./plugins/voting-rewards");
const {
  getRedirects,
  getSplatRedirects,
  getExternalRedirects,
  getExactUrlRedirects,
} = require("./plugins/utils/redirects");
const { menuDivider, intoColumns } = require("./plugins/utils/menu");

const isDeployPreview = !!process.env.PREVIEW_CANISTER_ID;

console.log("PREVIEW_CANISTER_ID:", process.env.PREVIEW_CANISTER_ID);

const navbarItems = [
  {
    type: "search",
    position: "right",
  },
  {
    type: "dropdown",
    className: "dropdown--custom dropdown--columns-2",
    position: "right",

    label: "Learn",
    items: intoColumns([
      [
        // column 1
        menuDivider("Start here"),
        {
          label: "The Basics",
          href: "/basics?source=nav",
        },
        {
          label: "What is ICP",
          href: "/what-is-the-ic?source=nav",
        },
        {
          label: "How it Works",
          href: "/how-it-works?source=nav",
        },
        {
          label: "Sustainability",
          href: "/capabilities/sustainability?source=nav",
        },
        {
          label: "Whitepaper",
          href: "https://internetcomputer.org/whitepaper.pdf",
        },
        {
          label: "ICP Wiki",
          href: "https://wiki.internetcomputer.org",
        },
        {
          label: "History of the Internet Computer",
          href: "https://wiki.internetcomputer.org/wiki/History",
        },
        {
          label: "Video Library",
          href: "/videos?source=nav",
        },
        {
          label: "Technical Roadmap",
          href: "/roadmap?source=nav",
        },
      ],
      [
        // column 2
        menuDivider("Capabilities"),
        {
          label: "Capabilities",
          href: "/capabilities?source=nav",
        },
        {
          label: "Bitcoin <> ICP",
          href: "/bitcoin-integration?source=nav",
        },
        {
          label: "Ethereum <> ICP",
          href: "/ethereum-integration?source=nav",
        },
        {
          label: "HTTPS Outcalls",
          href: "/https-outcalls?source=nav",
        },
        {
          label: "Identity on ICP",
          href: "/internet-identity?source=nav",
        },

        menuDivider("Tools"),
        {
          label: "Dashboard",
          href: "https://dashboard.internetcomputer.org",
        },

        {
          label: "Wallets",
          href: "/ecosystem?tag=Wallet&source=nav",
        },
        {
          label: "GitHub",
          href: "https://github.com/dfinity/ic",
        },
      ],
    ]),
  },

  {
    type: "dropdown",
    position: "right",
    className: "dropdown--custom dropdown--columns-2",
    label: "Use",
    items: intoColumns([
      [
        menuDivider("Step into Web3"),
        {
          label: "ICP Ecosystem",
          href: "/ecosystem?source=nav",
        },
        {
          label: "ICP Token",
          href: "/icp-tokens?source=nav",
        },
        {
          label: "For Enterprise",
          href: "/enterprise?source=nav",
        },
        {
          label: "Create an Internet Identity",
          href: "https://identity.ic0.app/",
        },
        {
          label: "Help & Support",
          href: "https://support.dfinity.org/hc/en-us ",
        },
      ],
      [
        menuDivider("Use Cases"),
        {
          label: "ckBTC",
          href: "/ckbtc?source=nav",
        },
        {
          label: "NFTs",
          href: "/nft?source=nav",
        },
        {
          label: "DeFi",
          href: "/defi?source=nav",
        },
        {
          label: "Social Media Dapps",
          href: "/social-media-dapps?source=nav",
        },
        {
          label: "SNS DAOs",
          href: "/sns?source=nav",
        },
        {
          label: "OpenChat",
          href: "/openchat?source=nav",
        },
      ],
    ]),
  },
  {
    type: "dropdown",
    className: "dropdown--custom dropdown--columns-2",
    position: "right",
    label: "Develop",
    items: intoColumns([
      [
        // column 1
        menuDivider("Start coding"),

        {
          label: "Developer Docs",
          to: "/docs/current/home/?source=nav",
        },
        { label: "Sample Code", to: "/samples?source=nav" },
        {
          label: "Motoko Docs",
          href: "/docs/current/motoko/main/motoko?source=nav",
        },
        {
          label: "Rust Docs",
          href: "/docs/current/developer-docs/backend/rust/?source=nav",
        },
        {
          label: "Solidity Docs",
          href: "https://docs.bitfinity.network/",
        },
        menuDivider("Tools"),

        { label: "Developer Tools", to: "/tooling?source=nav" },
        {
          label: "Motoko Playground",
          href: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
        },
      ],
      [
        // column 2
        menuDivider("Need Support"),
        {
          html: `<span class="dropdown__link--with-icon">Dev & Community Forum <img src="/img/navigation/forum.svg" loading="lazy" alt="" width="16" height="22" /></span>`,
          href: "https://forum.dfinity.org/",
        },
        {
          html: `<span class="dropdown__link--with-icon">Dev Discord <img src="/img/navigation/discord.svg" loading="lazy" alt="" width="16" height="22" /></span>`,
          href: "https://discord.gg/jnjVVQaE2C",
        },
        {
          html: `<span class="dropdown__link--with-icon">Dev Twitter <img src="/img/navigation/twitter.svg" loading="lazy" alt="" width="16" height="22" /></span>`,
          href: "https://twitter.com/dfinitydev",
        },
      ],
    ]),
  },
  {
    type: "dropdown",
    position: "right",
    label: "Participate",
    className: "dropdown--custom dropdown--columns-2",
    items: intoColumns([
      [
        menuDivider("Get Involved"),
        {
          label: "ICP Community",
          href: "/community?source=nav",
        },
        {
          label: "Become a Node Provider",
          href: "/node-providers?source=nav",
        },
        {
          label: "Staking & Governance (NNS)",
          href: "/nns?source=nav",
        },
        {
          label: "Roadmap",
          href: "/roadmap?source=nav",
        },
        {
          label: "Feedback Board",
          href: "https://dx.internetcomputer.org/",
        },
        {
          label: "Hackathons",
          href: "https://dfinity.org/hackathons",
        },
        {
          label: "ICP Careers",
          href: "http://careers.internetcomputer.org/",
        },
        {
          label: "DFINITY Foundation",
          href: "https://dfinity.org",
        },
        {
          label: "Upcoming events",
          href: "https://dfinity.org/events-and-news/#events",
        },
      ],
      [
        menuDivider("Join The Discussion"),
        {
          html: `<span class="dropdown__link--with-icon">Dev & Community Forum <img src="/img/navigation/forum.svg" loading="lazy" alt="" width="16" height="22" /></span>`,
          href: "https://forum.dfinity.org/",
        },
        {
          label: "Community Blog",
          href: "https://medium.com/dfinity",
        },

        menuDivider("Grants"),
        {
          label: "Developer Grants",
          href: "https://dfinity.org/grants",
        },
        {
          label: "Community Grants",
          href: "https://dfinity.org/community-grants",
        },
      ],
    ]),
  },
];

const subnavItems = [
  {
    type: "doc",
    position: "left",
    docId: "home",
    label: "Docs",
  },
  {
    type: "docSidebar",
    position: "left",
    sidebarId: "tutorials",
    label: "Tutorials",
  },
  {
    type: "docSidebar",
    position: "left",
    sidebarId: "guides",
    label: "Guides",
    activeBasePath: "/docs/current/developer-docs/",
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
    sidebarId: "motoko",
    label: "Motoko",
  },
  {
    position: "left",
    to: "blog",
    label: "Blog",
  },
  {
    type: "dropdown",
    position: "left",
    label: "Additional Resources",
    items: [
      {
        label: "Awesome Internet Computer",
        href: "https://github.com/dfinity/awesome-internet-computer#readme",
      },
      { label: "Sample Code", to: "/samples" },
      {
        label: "SDK Release Notes",
        type: "doc",
        docId: "other/updates/release-notes/release-notes",
      },
      { label: "Developer Tools", to: "/tooling" },
      { label: "Developer grants", href: "https://dfinity.org/grants" },
      {
        label: "Motoko Playground",
        href: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
      },
      {
        label: "Dev Forum",
        href: "https://forum.dfinity.org/",
      },
      {
        label: "Dev Discord",
        href: "https://discord.gg/jnjVVQaE2C",
      },
    ],
  },
];

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "Internet Computer",
  tagline:
    "World Computer blockchain that reimagines the internet as an infinite smart contract platform",
  url: isDeployPreview
    ? `https://${process.env.PREVIEW_CANISTER_ID}.ic0.app`
    : "https://internetcomputer.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon-32x32.png",
  organizationName: "dfinity",
  projectName: "portal",
  customFields: {
    searchCanisterId: "5qden-jqaaa-aaaam-abfpa-cai",
  },
  plugins: [
    ["docusaurus2-dotenv", { systemvars: true }],
    "docusaurus-plugin-sass",
    customWebpack,
    tailwindPlugin,
    icpPricePlugin,
    icpXdrPricePlugin,
    xdrPricePlugin,
    homeShowcaseProjectsPlugin,
    howItWorksArticlesPlugin,
    howItWorksCardsPlugin,
    votingRewardsPlugin,
    roadmapDataPlugin,
    whatIsIcpDataPlugin,
    matomoPlugin,
    blogPostsPlugin,
    deckRedirectPulgin,
    externalRedirectsPlugin({
      redirects: [...getExternalRedirects(), ...getExactUrlRedirects()],
    }),

    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "md"],
        redirects: getRedirects(),
        createRedirects: (existingPath) => getSplatRedirects(existingPath),
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          lastVersion: versions[0],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: false,
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
        blog: {
          path: "blog",
          blogSidebarCount: "ALL",
          postsPerPage: "ALL",
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
          content: "width=device-width, initial-scale=1, maximum-scale=5",
        },
      ],
      navbar: {
        hideOnScroll: true,

        logo: {
          alt: "DFINITY Logo",
          src: "/img/IC_logo_horizontal.svg",
        },
        // subnav redeclared to show up in mobile menu
        items: [...navbarItems, ...subnavItems],
      },
      subnav: {
        items: subnavItems,
      },

      // announcementBar:
      //   isDev || isDeployPreview
      //     ? {
      //         id: "local_dev",
      //         content: isDeployPreview
      //           ? `You are currently viewing a preview of this <a href="${
      //               process.env.PR_URL || "https://github.com/dfinity/portal"
      //             }">Pull Request</a>.`
      //           : 'You are currently locally editing the Developer Portal. Contributing guidelines are available <a href="https://github.com/dfinity/portal#contributing">here</a>.',
      //         textColor: "#091E42",
      //         isCloseable: false,
      //       }
      //     : undefined,

      footer: {
        links: [
          {
            items: [
              {
                label: "Internet Computer Association",
                href: "https://association.internetcomputer.org/",
              },
              {
                label: "Wiki",
                href: "https://wiki.internetcomputer.org/",
              },
              {
                label: "Node Providers",
                href: "/node-providers",
              },
              {
                label: "Dashboard",
                href: "https://dashboard.internetcomputer.org/",
              },
            ],
          },
          {
            items: [
              {
                label: "ICP Careers",
                href: "https://careers.internetcomputer.org/",
              },
              { label: "Developer Grants", href: "https://dfinity.org/grants" },
              {
                label: "Support & Feedback",
                href: "https://support.dfinity.org/hc/en-us",
              },
              {
                label: "Brand Materials",
                href: "https://dfinity.frontify.com/d/pD7yZhsmpqos",
              },
            ],
          },
          {
            title: "SocialMedia",
            items: [
              {
                label: "Distrikt",
                to: "https://distrikt.app/u/DFINITY",
                icon: `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.375 9.5H6.625C6.83211 9.5 7 9.66789 7 9.875V16.625C7 16.8321 7.16789 17 7.375 17H14.125C14.3321 17 14.5 17.1679 14.5 17.375V19.625C14.5 19.8321 14.3321 20 14.125 20H4.375C4.16789 20 4 19.8321 4 19.625V9.875C4 9.66789 4.16789 9.5 4.375 9.5Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.125 5H17.875C18.0821 5 18.25 5.16789 18.25 5.375V15.125C18.25 15.3321 18.0821 15.5 17.875 15.5H15.625C15.4179 15.5 15.25 15.3321 15.25 15.125V8.375C15.25 8.16789 15.0821 8 14.875 8H8.125C7.91789 8 7.75 7.83211 7.75 7.625V5.375C7.75 5.16789 7.91789 5 8.125 5Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.375 2H21.625C21.8321 2 22 2.16789 22 2.375V4.625C22 4.83211 21.8321 5 21.625 5H19.375C19.1679 5 19 4.83211 19 4.625V2.375C19 2.16789 19.1679 2 19.375 2Z' fill='white'/%3E%3C/svg%3E%0A`,
              },
              {
                label: "CoinMarketCap",
                to: "https://coinmarketcap.com/currencies/internet-computer/",
                icon: "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.1307 14.3432C19.9566 14.4632 19.7533 14.534 19.5423 14.5481C19.3313 14.5623 19.1204 14.5193 18.9318 14.4237C18.489 14.1735 18.2504 13.587 18.2504 12.7878V10.3382C18.2504 9.16231 17.7846 8.32567 17.0055 8.09854C15.6887 7.71328 14.7054 9.32619 14.3259 9.93283L11.9971 13.702V9.10193C11.9712 8.04104 11.6262 7.40565 10.9736 7.21589C10.5423 7.08939 9.89545 7.14114 9.26581 8.10141L4.05907 16.4592C3.36629 15.1338 3.00708 13.6594 3.01255 12.1639C3.01255 7.12676 7.03764 3.0298 11.9971 3.0298C16.9566 3.0298 20.9961 7.12676 20.9961 12.1639V12.1898C20.9961 12.1898 20.9961 12.207 20.9961 12.2156C21.045 13.1903 20.7287 13.9665 20.1336 14.3432H20.1307ZM23.0058 12.1668V12.1179C22.9655 5.97961 18.0434 1 11.9971 1C5.95086 1 1 6.00836 1 12.1639C1 18.3194 5.93361 23.3306 11.9971 23.3306C14.7781 23.3305 17.4533 22.2645 19.4723 20.3521C19.6683 20.1674 19.7836 19.913 19.7933 19.6439C19.803 19.3748 19.7062 19.1128 19.524 18.9145C19.4369 18.8181 19.3315 18.7399 19.2139 18.6843C19.0964 18.6287 18.969 18.597 18.8392 18.5908C18.7093 18.5847 18.5795 18.6043 18.4572 18.6485C18.335 18.6927 18.2227 18.7606 18.1268 18.8484C17.2575 19.673 16.2306 20.3133 15.1077 20.7311C13.9848 21.1489 12.7891 21.3355 11.5923 21.2796C10.3955 21.2238 9.22229 20.9267 8.14317 20.4061C7.06406 19.8856 6.10127 19.1523 5.3126 18.2504L9.99895 10.7177V14.1937C9.99895 15.8641 10.6458 16.4046 11.1892 16.5627C11.7326 16.7209 12.5635 16.6116 13.4347 15.1971L16.0222 11.0081C16.1027 10.873 16.1803 10.758 16.2493 10.6573V12.7878C16.2493 14.3489 16.8761 15.5967 17.9744 16.212C18.4738 16.4816 19.0365 16.6118 19.6036 16.5891C20.1707 16.5663 20.7212 16.3914 21.1973 16.0826C22.4049 15.2977 23.0633 13.8774 22.9943 12.1668H23.0058Z' fill='white'/%3E%3C/svg%3E%0A",
              },
              {
                label: "DSCVR",
                to: "https://dscvr.one/p/internet-computer",
                icon: "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_4579_44749)'%3E%3Cpath d='M15.5569 1.39645C14.4968 1.02636 13.3839 0.817527 12.2604 0.783161C12.1388 0.780518 12.0172 0.780518 11.8983 0.780518C11.1766 0.780518 10.4576 0.859822 9.75439 1.01579C9.74144 1.02293 9.72901 1.03006 9.71606 1.0372C9.72796 1.03006 9.73959 1.02293 9.75175 1.01579C6.75138 1.69252 4.52555 3.79675 3.4285 6.9055C2.38961 10.1438 3.2276 13.694 5.6041 16.1287C8.60183 19.1978 13.6403 20.0675 16.8654 16.8398C16.8659 16.8382 16.8667 16.8366 16.8673 16.835C19.6041 14.0934 19.6025 9.65051 16.8628 6.90815C14.1558 4.2012 11.0444 4.41004 7.84314 6.06751L7.64488 6.17061L7.81142 11.2831C7.82305 11.2485 7.83548 11.2157 7.84843 11.184C7.8368 11.217 7.82517 11.2498 7.81406 11.2831L7.91452 14.3787L8.01761 14.4765C8.8556 15.288 9.75439 15.563 10.5897 15.7427L10.4681 8.04485C10.4465 8.05542 10.4253 8.06653 10.4039 8.07763C10.425 8.0652 10.4465 8.05331 10.4681 8.04221C12.2974 7.44742 14.2087 7.82808 15.4115 9.43533C15.4136 9.43691 15.4154 9.4385 15.4176 9.44009C16.4295 10.7957 16.5736 12.6144 15.7869 14.1117C14.1214 17.2997 9.34201 17.1226 7.02101 14.7488C5.8896 13.5909 5.18114 12.0815 5.0146 10.4689C4.69209 7.41305 6.34164 4.48934 9.12524 3.18874L9.53234 3.06979C10.3042 2.86095 11.0999 2.75785 11.8983 2.75785C16.9341 2.75521 21.0157 6.83413 21.021 11.8673C21.021 13.3794 20.6456 14.8677 19.9292 16.1974C19.9168 16.222 19.9041 16.246 19.8917 16.2706C19.4777 17.0243 18.9577 17.7134 18.3484 18.3228C15.4009 21.2676 10.8329 21.7699 7.18227 19.8798C2.66982 17.5456 0.938326 12.285 2.46891 7.55845C2.56672 7.25709 2.41604 6.93194 2.12261 6.81034L2.03538 6.77333L1.89263 7.07469C1.73402 7.40777 1.58863 7.74878 1.46438 8.09772C-0.621338 13.8685 2.36582 20.234 8.13657 22.3197C8.17094 22.333 8.2053 22.3435 8.24231 22.3567C8.34303 22.3758 8.44348 22.3935 8.54393 22.4107C8.44216 22.3938 8.33986 22.376 8.23702 22.3567C14.0263 24.3764 20.3548 21.3231 22.3771 15.5365C24.3967 9.74726 21.3435 3.41873 15.5569 1.39645Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_4579_44749'%3E%3Crect width='22.2001' height='22.199' fill='white' transform='translate(0.799805 0.780518)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A",
              },
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
        additionalLanguages: ["rust"],
      },
      liveCodeBlock: {
        playgroundPosition: "bottom",
      },
    },
  themes: ["@docusaurus/theme-live-codeblock"],
  clientModules: [require.resolve("./static/load_moc.ts")],
};

module.exports = config;
