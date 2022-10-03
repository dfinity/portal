export type CommunityProject = {
  description: string;
  name: string;
  image?: string;
  links: {
    github?: string;
    livePreview?: string;
    external?: string;
    otherLinks?: string[];
  };
  domains: string[];
};

const communityProjects: CommunityProject[] = [
  {
    name: "Spinner Cash",
    description: "Safeguard your financial privacy with zero-knowledge proofs",
    links: {
      github: "https://github.com/spinner-cash/spinner",
      livePreview: "https://spinner.cash",
      external: "https://supernova.devpost.com/submissions/327085-spinner-cash",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/spinner-cash.png",
  },
  {
    name: "Kontribute",
    description:
      "Kontribute brings readers, writers and NFTs together. Write some lore for your NFT collection or support your favourite writer by buying their NFTs - Web 3.0 creative writing with NFTs",
    links: {
      github: "https://github.com/teambonsai/bonsai_dapp",
      livePreview: "https://3ezq7-iqaaa-aaaal-aaacq-cai.raw.ic0.app/",
      external: "https://supernova.devpost.com/submissions/326818-kontribute",
      otherLinks: ["https://mobile.twitter.com/TeamBonsai_ICP"],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/kontribute.png",
  },
  {
    name: "dSquad",
    description:
      "A new chapter of the Internet is opening. Start by minting your avatar, then take part in the adventure and get rewarded as your explore a new wave of decentralized applications.",
    links: {
      github: "https://github.com/ICPSquad/Squad",
      livePreview: "https://x3ul6-2aaaa-aaaah-abjda-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/328183-dsquad",
      otherLinks: [
        "https://dsquad.gitbook.io/docs/",
        "https://entrepot.app/marketplace/icpsquad2",
        "https://twitter.com/dSquadNFT",
      ],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/dsquad.png",
  },
  {
    name: "ICTC",
    description:
      "IC Transaction Coordinator (ICTC) is a distributed transaction framework for Defi applications on IC network. It supports Motoko language. The core idea of ICTC is inspired by the DTC (Distributed Transaction Coordinator), which is commonly used in the financial sector.",
    links: {
      github: "https://github.com/iclighthouse/ICTC",
      livePreview: "https://cmqwp-uiaaa-aaaaj-aihzq-cai.raw.ic0.app",
      external: "https://supernova.devpost.com/submissions/328779-ictc",
      otherLinks: ["https://youtu.be/fxG4vunET8s"],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/ictc.png",
  },
  {
    name: "Proof of Personhood",
    description:
      "a Sybil-proof identity system powered by decentralized AI human detection.",
    links: {
      github: "https://github.com/AstroxNetwork/Proof-of-Personhood",
      livePreview: "http://thehuman.id/",
      external:
        "https://supernova.devpost.com/submissions/332526-proof-of-personhood",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/proof-of-personhood.png",
  },
  {
    name: "Kinic",
    description: "A search engine for web3.",
    links: {
      github: "https://github.com/wyattbenno777/kinic",
      livePreview: "https://kinic.io/",
      external: "https://supernova.devpost.com/submissions/327859-kinic",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/kinic.png",
  },
  {
    name: "Signals",
    description:
      "A unique SocialFi space for making connections, discovering events and creating decentralized communities. Signals is a DAO. The more you interact with it, the greater say you have in its governance.",
    links: {
      github: "https://github.com/bertiespell/Signals",
      livePreview: "https://2fydv-iqaaa-aaaak-qap6q-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/327368-signals",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/signals.png",
  },
  {
    name: "FaeFolk",
    description:
      "FaeFolk is an NFT-based role-playing game where you use your NFTs to craft tools & equipment, train your skills and ultimately fight your way through dungeons and find treasure.",
    links: {
      github: "https://github.com/ICCards/faefolk",
      livePreview: "https://ge5fs-qyaaa-aaaap-qam6a-cai.raw.ic0.app/",
      external: "https://supernova.devpost.com/submissions/326797-faefolk",
      otherLinks: ["https://github.com/ICCards/Server"],
    },
    domains: ["GameFi"],
    image: "/img/community-projects/faefolk.png",
  },
  {
    name: "Saga Tarot",
    description:
      "Open source tarot ecosystem on the IC. Nobody owns Tarot. Everybody owns Web3.",
    links: {
      github: "https://github.com/sagacards/bazaar",
      livePreview: "https://l2jyf-nqaaa-aaaah-qadha-cai.raw.ic0.app/",
      external: "https://supernova.devpost.com/submissions/334420-saga-tarot",
      otherLinks: [
        "https://bazaar.saga.cards",
        "https://table.saga.cards",
        "https://directory.saga.cards",
        "https://www.npmjs.com/settings/opentarot/packages",
        "https://github.com/sagacards/legends-nft",
      ],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/saga-tarot.png",
  },
  {
    name: "Enoki DEX",
    description:
      "Completely Async and Scalable DEX: Swap, Earn, and be a Market Maker",
    links: {
      github: "https://github.com/enoki-dex",
      livePreview: "https://5ba5l-caaaa-aaaag-qaoja-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/334178-enoki-dex",
      otherLinks: ["https://enoki.ooo"],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/enoki-dex.png",
  },
  {
    name: "ICMaps",
    description:
      "ICMaps brings maps to the internet computer. With the ICMaps frontend you can install your own map server provided by ICMaps on Canister and integrate maps into Web3, Web2 and even desktop GIS apps.",
    links: {
      github: "https://github.com/stumpigit/icmaps",
      livePreview: "https://discord.gg/PruV4RxD9S",
      external: "https://supernova.devpost.com/submissions/326804-icmaps",
      otherLinks: ["https://icmaps.org"],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/icmaps.png",
  },
  {
    name: "CanDB",
    description:
      "Meet CanDB, the first flexible and truly horizontally scalable NoSQL database built for the Internet Computer.\n\nhttps://www.canscale.dev",
    links: {
      github: "https://github.com/canscale/supernova-candb-demo",
      livePreview: "https://pliqr-fqaaa-aaaan-qalpq-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/327567-candb",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/candb.jpeg",
  },
  {
    name: "STKRS",
    description:
      "Stkrs is the social identity app for Web 3.0. Users can express themselves, trust others online, and revolutionize our governance, all while being anon and maintaining privacy.",
    links: {
      github: "https://github.com/arjunpat/stkrs.me",
      livePreview: "https://priqv-iqaaa-aaaak-ab4rq-cai.ic0.app/#/",
      external: "https://supernova.devpost.com/submissions/333208-stkrs",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/stkrs.png",
  },
  {
    name: "Paws Arena - Multiplayer PVP Play to Earn",
    description:
      "This is the cutest, most fun and competitive turn-based play to earn multiplayer game on the ICP. Players will fight in the arena and earn $PAW Tokens which will be used to buy in-game items.",
    links: {
      github: "https://github.com/icla692/paws_arena_ickitties",
      livePreview: "https://knbkj-fiaaa-aaaan-qaadq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/333263-paws-arena-multiplayer-pvp-play-to-earn",
      otherLinks: [
        "https://linktr.ee/ickitties",
        "https://twitter.com/ICKitties/status/1469684414359683077?s=20&t=4ES-GxYs0keCC_mjVCGWVA",
      ],
    },
    domains: ["GameFi"],
    image:
      "/img/community-projects/paws-arena-multiplayer-pvp-play-to-earn.jpg",
  },
  {
    name: "IC Avatar Creator",
    description:
      "The IC Avatar Creator allows users to create and manage avatars for the open metaverse. The project includes GLB avatars that are minted to the Internet Computer using the DIP721v2 token standard.",
    links: {
      github: "https://github.com/AtlasFoundation/AvatarCreator-IC-Project",
      external:
        "https://supernova.devpost.com/submissions/331595-ic-avatar-creator",
      otherLinks: ["https://www.npmjs.com/package/avatarcreator"],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/ic-avatar-creator.jpg",
  },
  {
    name: "metamob",
    description:
      "Create, donate, vote, sign and fund extraordinary mobilizations!",
    links: {
      github: "https://github.com/av1ctor/metamob",
      livePreview: "https://wbpm2-ciaaa-aaaan-qajta-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/327261-metamob",
      otherLinks: ["https://github.com/av1ctor/mo-table"],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/metamob.png",
  },
  {
    name: "FoxIC",
    description: "A tool allowing MetaMask users to enter IC ecosystem",
    links: {
      github: "https://github.com/AstroxNetwork/FoxIC",
      livePreview: "https://ip5qp-gaaaa-aaaah-ablla-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/334321-foxic",
      otherLinks: ["https://github.com/AstroxNetwork/ICSnap"],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/foxic.jpg",
  },
  {
    name: "GalacticWar",
    description:
      "GalacticWar is a novel protocol that mixes NFT, Gaming and DEFI .",
    links: {
      github: "https://github.com/harshu4/GalacticWar",
      livePreview: "https://rlx5r-ziaaa-aaaal-qa7qq-cai.raw.ic0.app/",
      external: "https://supernova.devpost.com/submissions/334597-galacticwar",
      otherLinks: [
        "https://uqnba-7yaaa-aaaal-qa7pq-cai.raw.ic0.app/",
        "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=tdja5-gyaaa-aaaag-aaoeq-cai",
      ],
    },
    domains: ["GameFi"],
    image: "/img/community-projects/galacticwar.png",
  },
  {
    name: "DeTi: Decentralized Time Travel",
    description: "Run code on your canister in the future!",
    links: {
      github: "https://github.com/akshay-rakheja/supernova2022",
      livePreview: "https://fl5mh-daaaa-aaaap-qalja-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/332847-deti-decentralized-time-travel",
      otherLinks: [
        "https://d7hzd-wiaaa-aaaap-qamba-cai.ic0.app/",
        "https://npmjs.com/package/@raydeck/useplug",
      ],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/deti:-decentralized-time-travel.png",
  },
  {
    name: "NFT Exchange",
    description: "The NFT Exchange for Web 3.0",
    links: {
      github: "https://github.com/IC-Difinity-Project",
      livePreview: "https://eytcp-gaaaa-aaaap-aagna-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/333058-nft-exchange",
      otherLinks: [
        "https://docs.google.com/presentation/d/104xr9WEgrpsZqwqPxQBZA-PNJUYNMei3kbQ7aqJz16I/edit?usp=sharing",
      ],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/nft-exchange.jpg",
  },
  {
    name: "iLearnX Beyond Web3 (By Yaruhito Project)",
    description:
      "We offer all-in-one Web3developer learning platform: roadmap, course materials, learning community, support system&hackathon opportunity hosted on ICP for aspired Web3 developers/challengers.",
    links: {
      github: "https://github.com/AcmeGamer/IPEX",
      livePreview: "https://aac5l-aiaaa-aaaam-qaqla-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/334237-ilearnx-beyond-web3-by-yaruhito-project",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image:
      "/img/community-projects/ilearnx-beyond-web3-(by-yaruhito-project).png",
  },
  {
    name: "Cronacle + Freeos: A cross-chain oracle for a democratic UBI",
    description:
      "Freeos, a democratic UBI—where participants steer the economy through a democratically elected monetary policy each week—connects to a novel type of decentralised, cross-chain oracle called Cronacle",
    links: {
      github: "https://github.com/orgs/FreeosDAO/repositories",
      livePreview: "https://xwqat-7aaaa-aaaad-qafaq-cai.raw.ic0.app",
      external:
        "https://supernova.devpost.com/submissions/329755-cronacle-freeos-a-cross-chain-oracle-for-a-democratic-ubi",
      otherLinks: [
        "https://medium.com/freedao/freeos-supernova-guide-2577d747b423",
        "https://www.protonscan.io/account/cronacle?loadContract=true&tab=Tables&account=cronacle&scope=cronacle&limit=100&table=prices",
      ],
    },
    domains: ["Public Good / Social Impact"],
    image:
      "/img/community-projects/cronacle-+-freeos:-a-cross-chain-oracle-for-a-democratic-ubi.jpg",
  },
  // {
  //   name: "HashMix ICP",
  //   description:
  //     "HashMix ICP - Boosted Internet Computer Blockchain Staking, Governance & DeFi Infrastructures",
  //   links: {
  //     github: "https://github.com/HashMixProject",
  //     livePreview: "http://app.supernova.hashmix.org/",
  //     external: "https://supernova.devpost.com/submissions/329835-hashmix-icp",
  //     otherLinks: ["http://supernova.hashmix.org/"],
  //   },
  //   domains: ["Asynchronous DeFi"],
  //   image: "/img/community-projects/hashmix-icp.jpeg",
  // },
  {
    name: "NnsDAO Protocol",
    description:
      "NnsDAO is a boundaryless autonomous organization, which provides some basic modular programmable services for building the world of DAOn.",
    links: {
      github: "https://github.com/NnsDao/nnsdao_sdk",
      livePreview: "https://h637e-ziaaa-aaaaj-aaeaa-cai.raw.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/326858-nnsdao-protocol",
      otherLinks: ["https://github.com/NnsDao/nomos-v1"],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/nnsdao-protocol.png",
  },
  {
    name: "པ་ཀྲ་ཧེ་། Bazahei: The first ICP-XRP cross-chain NFT",
    description:
      "We pioneer a general cross-chain NFT solution from IC to XRP to promote the regional and under-represented culture.",
    links: {
      github: "https://github.com/Itoka-DAO/IC-XRP",
      livePreview: "https://aack7-jaaaa-aaaai-acl6a-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/329724-bazahei-the-first-icp-xrp-cross-chain-nft",
      otherLinks: [
        "https://github.com/Itoka-DAO/xrp_server",
        "https://github.com/Itoka-DAO/icxrp",
      ],
    },
    domains: ["Metaverse and NFTs"],
    image:
      "/img/community-projects/bazahei:-the-first-icp-xrp-cross-chain-nft.png",
  },
  {
    name: "SIGMA DEFI",
    description:
      "SIGMA DEFI is a DeFi service and tool for developers and investors interested in IC,providing services without coding1. Multi sender2. Create DIP 203. Generate NFT and mint4. Fiat Gateways",
    links: {
      github: "https://github.com/TheVanquiser/SIGMADEFI",
      external: "https://supernova.devpost.com/submissions/329753-sigma-defi",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/sigma-defi.png",
  },
  {
    name: "IC Web3D Engine",
    description:
      "A lightweight game engine fully deployed on the IC.Users can easily create their own decentralized games or other 3D application scenarios on the IC with some simple operations",
    links: {
      github: "https://github.com/IC-Web3D-Engine",
      livePreview: "https://q7vk3-myaaa-aaaak-qarcq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/334588-ic-web3d-engine",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/ic-web3d-engine.png",
  },
  {
    name: "Texas Hold'em",
    description:
      'There is a famous saying in Texas Hold\'em: "Victory comes not from your opponent making more mistakes, but from you making fewer".',
    links: {
      github: "https://github.com/NnsDao/ICTexas-UI",
      livePreview: "https://lm5fh-ayaaa-aaaah-aafua-cai.raw.ic0.app/#/",
      external:
        "https://supernova.devpost.com/submissions/334184-texas-hold-em",
      otherLinks: [],
    },
    domains: ["GameFi"],
    image: "/img/community-projects/texas-hold'em.png",
  },
  {
    name: "MUSALL",
    description:
      "Music ownership is broken! At MUSALL we aim to change ownership to a shared model. Musicians create a contract that is fair and transparent. Fans purchase said contracts. All earn through royalties.",
    links: {
      github: "https://github.com/fowlerlee/musall",
      external: "https://supernova.devpost.com/submissions/334192-musall",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/musall.png",
  },
  {
    name: "News Bias Check",
    description:
      "Decentralised application to help combat fake news and reduce bias in information consumption. Chrome extension that uses backend on IC network shows bias/accuracy info about all news articles online.",
    links: {
      github: "https://github.com/jayshreeanand/news-bias-check",
      livePreview: "https://77oii-eaaaa-aaaal-aaydq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/334583-news-bias-check",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/news-bias-check.jpeg",
  },
  // {
  //   name: "Dfinity DDoS Defender",
  //   description:
  //     "A configurable tool for monitoring cycle's value and protecting canister from DDoS attack.",
  //   links: {
  //     github: "https://github.com/DfinityDDoSDefender",
  //     external:
  //       "https://supernova.devpost.com/submissions/326894-dfinity-ddos-defender",
  //     otherLinks: [],
  //   },
  //   domains: ["Blue Sky"],
  //   image: "/img/community-projects/dfinity-ddos-defender.png",
  // },
  {
    name: "Questions & Answers",
    description: "Ask Questions.. Share Answers.. Earn Coins..",
    links: {
      github: "https://github.com/7flash/internet-computer-dapp",
      livePreview: "https://u75p2-siaaa-aaaap-aafaq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/327670-questions-answers",
      otherLinks: ["https://youtu.be/lBz4g-gow2E"],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/questions-and-answers.jpg",
  },
  {
    name: "Cratch",
    description: "The Future of Content Creation",
    links: {
      github: "https://github.com/skidrow8852/Cratch_Platform_V1",
      livePreview: "https://cratch.io/",
      external: "https://supernova.devpost.com/submissions/330315-cratch",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/cratch.png",
  },
  {
    name: "Leap",
    description:
      "Leap is a market for information. Existing online forums have little incentives for users to provide high-quality answers. Leap allows users to reward others financially to get great answers quickly.",
    links: {
      github: "https://github.com/Matlor/Information-Market",
      external: "https://supernova.devpost.com/submissions/334221-leap",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/leap.gif",
  },
  {
    name: "MetaBio",
    description:
      "MetaBio is a Web3 application to connect gardeners, farmers to crypto world. We aim to be the leading Web3 application for gardening communities and their data to enterprise or biology experts.",
    links: {
      github: "https://github.com/viefam/metabio-ic",
      livePreview: "https://testflight.apple.com/join/M6DTlUAc",
      external: "https://supernova.devpost.com/submissions/329759-metabio",
      otherLinks: [
        "https://drive.google.com/file/d/1Ky1aIM3PbbabwFdjyUjXSkz2edAbHbKc/view",
      ],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/metabio.png",
  },
  {
    name: "Donainvest",
    description:
      "Donainvest is a donation-investment platform on which the market cap is in proportion to the social impact and social workers are able to continuously fundraise without crypto-related licenses.",
    links: {
      github: "https://github.com/kentomisawa/donainvest",
      livePreview:
        "https://xd.adobe.com/view/da9964cd-a5e2-4ee0-bd15-c4898d792175-8fca/",
      external: "https://supernova.devpost.com/submissions/334181-donainvest",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/donainvest.gif",
  },
  {
    name: "IC1101 iUSD",
    description: "MakerDAO with no jokes.",
    links: {
      github: "https://github.com/ic1101-iusd",
      livePreview: "https://mk2a2-miaaa-aaaak-aavra-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/329970-ic1101-iusd",
      otherLinks: [
        "https://docs.google.com/presentation/d/1cHaNDOccipyeUVnzGdDNQi1p8BO2KupqpuSSfZJRJaE/edit?usp=sharing",
      ],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/ic1101-iusd.jpeg",
  },
  {
    name: "Secure Canister Communication on the IC Blockchain",
    description:
      "We provide a framework where sensitive messages can be securely passed between canisters, i.e to avoid man-in-the-middle attacks. Our solution allows secrets to be securely communicated.",
    links: {
      github:
        "https://github.com/MaithreyaSitaraman/secure_canister_communication_IC_blockchain",
      external:
        "https://supernova.devpost.com/submissions/333088-secure-canister-communication-on-the-ic-blockchain",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image:
      "/img/community-projects/secure-canister-communication-on-the-ic-blockchain.png",
  },
  {
    name: "Exponent",
    description:
      "Exponent is a suite of products that make NFTs easy for creators and game developers. Exponent currently consists of an NFT canister standard (next gen. EXT standard) and a CLI tool for developers.",
    links: {
      github: "https://github.com/Toniq-Labs/exponent-cli",
      external: "https://supernova.devpost.com/submissions/334153-exponent",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/exponent.gif",
  },
  // {
  //   name: "4EVERLAND",
  //   description:
  //     "4EVERLAND is a Web 3.0 cloud computing platform that integrates storage, computing, and network core capabilities.",
  //   links: {
  //     github: "https://github.com/4everland/dashboard-website/tree/test",
  //     livePreview: "https://hb.4everland.app/index.html#/overview",
  //     external: "https://supernova.devpost.com/submissions/326853-4everland",
  //     otherLinks: [],
  //   },
  //   domains: ["Blue Sky"],
  //   image: "/img/community-projects/4everland.png",
  // },
  {
    name: "Ontics",
    description:
      "Authoritative source of release images of all blockchain technologies",
    links: {
      github: "https://github.com/KOSASIH/Ontics",
      external: "https://supernova.devpost.com/submissions/326882-ontics",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/ontics.png",
  },
  {
    name: "planzApp",
    description:
      "A DApp that enables users to make everyday plans within a smart, connected and decentralized economy",
    links: {
      github: "https://github.com/SuperNova-Planzapp/planzapp_reactjs",
      livePreview: "https://gr2u7-rqaaa-aaaap-qam5q-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/326834-planzapp",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/planzapp.jpeg",
  },
  {
    name: "Landlord",
    description:
      "Landlord is a DApp where users can trade and invest in real-estate easily & securely. It eliminates the risk of real-estate scam, and creates a safe heaven where sellers can sell, buyers can buy etc.",
    links: {
      github: "https://github.com/landlord-limited",
      external: "https://supernova.devpost.com/submissions/327503-landlord",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/landlord.jpg",
  },
  {
    name: "DeSu - Decentralized Survey App",
    description:
      "A decentralized platform for conducting paid and unpaid surveys that incentivizes the traditional survey-taking process and has something in store for both the parties in it.",
    links: {
      github:
        "https://github.com/decentrazone/DeSu-Decentralised-Survey-Platform-Supernova/",
      livePreview: "https://i3h6n-siaaa-aaaap-aahaq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/333957-desu-decentralized-survey-app",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/desu-decentralized-survey-app.png",
  },
  {
    name: "ICES",
    description:
      "a storage and analysis service for canister's event logs on IC",
    links: {
      github: "https://github.com/icpfans-xyz/ices",
      livePreview: "https://ices.one/",
      external: "https://supernova.devpost.com/submissions/334450-ices",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/ices.png",
  },
  {
    name: "dfxIoT",
    description:
      "Connecting real-world data into Internet Computer using verifiable and trusted IoT Devices and incentivize data-providers with tokens",
    links: {
      github: "https://github.com/marspoolxyz/dfx2IoT",
      livePreview:
        "https://docs.google.com/presentation/d/10-LrMCVAyKQaRLiBvnQ2mJ6oyzoAopacayWexG3GJs8/edit?usp=sharing",
      external: "https://supernova.devpost.com/submissions/334289-dfxiot",
      otherLinks: ["https://bit.ly/SuperNova_dfxIoT"],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/dfxiot.jpeg",
  },
  // {
  //   name: "tripX",
  //   description:
  //     "tripX is web3 app that empowering people to do trip to tourism destination while they can earn crypto for it.",
  //   links: {
  //     github: "https://github.com/waynedmustt/tripx",
  //     external: "https://supernova.devpost.com/submissions/333519-tripx",
  //     otherLinks: [],
  //   },
  //   domains: ["GameFi"],
  //   image: "/img/community-projects/tripx.png",
  // },
  {
    name: "Dear Diary",
    description:
      "Dear Diary is the first decentralized market place that will allow users to sell their diaries as NFTs. It is developed on Web3 on the Internet Computer, Motoko backend and React.js frontend.",
    links: {
      github: "https://github.com/nahrinoda/dear-diary",
      external: "https://supernova.devpost.com/submissions/327321-dear-diary",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/dear-diary.png",
  },
  {
    name: "Sustainations DAO",
    description:
      "The first SDG (Sustainable Development Goals) DAO on Dfinity. \n💚 SUSTAINATIONS is a global DAO of change-makers, and builders who work together to write a greener future for the Earth.",
    links: {
      github: "http://github.com/triipme/sustainations_dao",
      livePreview: "https://youtu.be/pe84UGSXOuk",
      external:
        "https://supernova.devpost.com/submissions/329671-sustainations-dao",
      otherLinks: ["http://sustainations.com/"],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/sustainations-dao.jpeg",
  },
  // {
  //   name: "Octan Finance",
  //   description: "Bring UTXO-assets into ICP's DeFi ecosystem",
  //   links: {
  //     github: "https://github.com/Octan-Finance",
  //     external:
  //       "https://supernova.devpost.com/submissions/327371-octan-finance",
  //     otherLinks: [],
  //   },
  //   domains: ["Blue Sky"],
  //   image: "/img/community-projects/octan-finance.png",
  // },
  {
    name: "Tourapin",
    description: "Vacation guides by your favorite travel influencers",
    links: {
      github: "https://github.com/BreeDay/Tourapin",
      external: "https://supernova.devpost.com/submissions/334356-tourapin",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/tourapin.png",
  },
  // {
  //   name: "AGRACIA",
  //   description:
  //     "AGRACIA- A DECENTRALISED AGRI SUPPLY CHAIN MECHANISM DAPP BUILD ON IC !!",
  //   links: {
  //     github: "https://github.com/SuperNovaHack/FRontenD-DEv-can",
  //     livePreview: "https://gdzli-daaaa-aaaag-aanua-cai.raw.ic0.app",
  //     external: "https://supernova.devpost.com/submissions/327192-agracia",
  //     otherLinks: ["https://github.com/SuperNovaHack/SC-canister"],
  //   },
  //   domains: ["Public Good / Social Impact"],
  //   image: "/img/community-projects/agracia.png",
  // },
  {
    name: "IC Birds",
    description:
      "Play with you IC Birds nfts on our decentralized games. Collect tokens and improve your birds skills to beat your best score and grind the leaderboard !",
    links: {
      github: "https://github.com/leo-ship-it/icbirds-public",
      livePreview: "https://yqtpa-pqaaa-aaaan-qadba-cai.ic0.app/home",
      external: "https://supernova.devpost.com/submissions/328423-ic-birds",
      otherLinks: [],
    },
    domains: ["GameFi"],
    image: "/img/community-projects/ic-birds.png",
  },
  {
    name: "Candid+",
    description:
      "Candid+ is the better Candid UI with test cases and logging. To build the hub for IC developers and enterprises, we will integrate the entire lifecycle of the development for canisters.",
    links: {
      github: "https://github.com/Astrapolis/ICHub",
      livePreview: "https://4cmdj-pqaaa-aaaal-qa62a-cai.ic0.app",
      external: "https://supernova.devpost.com/submissions/330304-candid",
      otherLinks: ["http://hub.icp.xyz"],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/candid+.jpg",
  },
  {
    name: "Honest Ticket Machine",
    description:
      "We’re building the tools to empower creators to work without fear of copyright and encourage collaboration rather than competition over IP.",
    links: {
      github: "https://github.com/Amata-World-Hackathons/honest-ticket-machine",
      livePreview: "https://mymdv-biaaa-aaaan-qam2q-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/333151-honest-ticket-machine",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/honest-ticket-machine.png",
  },
  {
    name: "Splash",
    description: "Figma for Web3",
    links: {
      github: "https://github.com/gupnik/splash",
      livePreview: "https://d6uqw-tyaaa-aaaap-aag5q-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/331672-splash",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/splash.png",
  },
  {
    name: "icApps",
    description: "Internet Computer projects community portal 🌀",
    links: {
      github: "https://github.com/tomkoom/icApps",
      livePreview: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/#/",
      external: "https://supernova.devpost.com/submissions/328318-icapps",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/icapps.png",
  },
  // {
  //   name: "Open Free Dollar (OFD)",
  //   description:
  //     "Open Free Dollar (OFD) enables  financial inclusion and trade to billions of users while enabling developers to run millions of Dapps on the internet computer .",
  //   links: {
  //     github: "https://github.com/Open-Free-Dollar-OFC",
  //     external:
  //       "https://supernova.devpost.com/submissions/330336-open-free-dollar-ofd",
  //     otherLinks: [],
  //   },
  //   domains: ["Public Good / Social Impact"],
  //   image: "/img/community-projects/open-free-dollar-(ofd).png",
  // },
  {
    name: "Ceto",
    description:
      "The first order book trading platform of fractional noun-fungible tokens(F-NFTs) and a professional marketplace for crypto collectibles.",
    links: {
      github: "https://github.com/Ceto-Labs",
      livePreview: "https://4jz7p-7yaaa-aaaai-qhobq-cai.raw.ic0.app/",
      external: "https://supernova.devpost.com/submissions/326863-ceto",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/ceto.jpg",
  },
  {
    name: "Symposium Futura",
    description:
      "a community owned blog that curates and incentivizes exceptional content on philosophy, scientific inquiry, and the future of tech",
    links: {
      github: "https://github.com/mourginakis/symposium_futura",
      livePreview: "https://mzgdj-vqaaa-aaaag-qanaa-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/330681-symposium-futura",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/symposium-futura.png",
  },
  // {
  //   name: "ICStable",
  //   description: "DUSD: A stablecoin on IC",
  //   links: {
  //     github: "https://github.com/iclighthouse/ICStable",
  //     livePreview: "https://pd5s3-6aaaa-aaaaj-aincq-cai.raw.ic0.app",
  //     external: "https://supernova.devpost.com/submissions/329749-icstable",
  //     otherLinks: ["https://youtu.be/8cSUJ_FffJo"],
  //   },
  //   domains: ["Asynchronous DeFi"],
  //   image: "/img/community-projects/icstable.png",
  // },
  {
    name: "ICLand",
    description:
      "ICLand powers tokenized communities by connecting web3 identities to social spaces & delivering key token data to communities. First tools: Discord token holder verification; sales & listings bot.",
    links: {
      github: "https://github.com/renartlabsicp",
      livePreview: "https://kwuck-oaaaa-aaaad-qcsja-cai.ic.fleek.co/",
      external: "https://supernova.devpost.com/submissions/334115-icland",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/icland.png",
  },
  {
    name: "Mixverse",
    description: "Curate your space, Enjoy metaverse!",
    links: {
      github: "https://github.com/mix-labs/",
      livePreview:
        "https://drive.google.com/file/d/1F7BRVkyRiKCV9xZ_Vdsl3TF2JqjCq_os/view",
      external: "https://supernova.devpost.com/submissions/334372-mixverse",
      otherLinks: ["https://mixverse.vercel.app/"],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/mixverse.png",
  },
  {
    name: "Metaspeare",
    description:
      "Allowing users to mix NFTs to mint a new one with properties from the parent NFTs genome.",
    links: {
      github: "https://github.com/BreeDay/Metaspeare",
      external: "https://supernova.devpost.com/submissions/334594-metaspeare",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/metaspeare.png",
  },
  {
    name: "Meta Yield - liquid staking crowdfunding platform for ICP.",
    description:
      "Meta Yield fundraising mechanism leverages staking, ICP backers only exchange their future Neuron rewards for a project’s token and get to keep their ICP, thus de-risking the crowdfunding process.",
    links: {
      github: "https://github.com/Narwallets/meta-yield-ic",
      external:
        "https://supernova.devpost.com/submissions/326851-meta-yield-liquid-staking-crowdfunding-platform-for-icp",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image:
      "/img/community-projects/meta-yield-liquid-staking-crowdfunding-platform-for-icp..png",
  },
  // {
  //   name: "Particl Protocol",
  //   description:
  //     "Particl Protocol solves the NFTs ownership and fractioning problems by allowing users to control their NFTs at a binary level in a seamless way.",
  //   links: {
  //     github: "https://github.com/particl-protocol/particl",
  //     livePreview: "https://z6xoi-5qaaa-aaaag-qaoqa-cai.ic0.app/",
  //     external:
  //       "https://supernova.devpost.com/submissions/330778-particl-protocol",
  //     otherLinks: [],
  //   },
  //   domains: ["Metaverse and NFTs"],
  //   image: "/img/community-projects/particl-protocol.png",
  // },
  {
    name: "Bonsai ICP",
    description: "A GameFi in Internet Computer platform",
    links: {
      github: "https://github.com/conglt10/bonsai-icp",
      external: "https://supernova.devpost.com/submissions/333311-bonsai-icp",
      otherLinks: [],
    },
    domains: ["GameFi"],
    image: "/img/community-projects/bonsai-icp.png",
  },
  {
    name: "C3-Protocol (Co-Created Collectibles)",
    description:
      "CCC is a platform for on-chain creation and collaboration. It takes advantage of Dfinity’s low threshold in order to introduce Web2 creators to Web3.",
    links: {
      github: "https://github.com/C3-Protocol/CoCreate",
      external:
        "https://supernova.devpost.com/submissions/334205-c3-protocol-co-created-collectibles",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/c3-protocol-(co-created-collectibles).png",
  },
  {
    name: "iCAN",
    description:
      "What is iCAN? -- The best easy-to-use Canister Management Platform on IC.",
    links: {
      github: "https://github.com/PrimLabs/iCAN",
      external: "https://supernova.devpost.com/submissions/329653-ican",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/ican.jpg",
  },
  {
    name: "ICX",
    description: "Web2sites Organizing-Tool for web2.5ers built by web3ers.",
    links: {
      github: "https://github.com/Mulander-J/icx",
      livePreview: "https://jeksq-wyaaa-aaaal-qaw3a-cai.ic0.app",
      external: "https://supernova.devpost.com/submissions/326854-icx",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/icx.png",
  },
  {
    name: "Cash Cow",
    description:
      'Lending & Borrowing DeFi Dapp built on ICP with Motoko "Moo"-ving at the speed of business',
    links: {
      github: "https://github.com/lucylow/Cash_Cow",
      livePreview: "https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/333891-cash-cow",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/cash-cow.gif",
  },
  // {
  //   name: "NOWA Metaverse",
  //   description:
  //     "NOWA Metaverse is not just another HYPEverse, it is a beautiful long-term project for testing and implementing alternative Flow Economic and Trinity Governance models in real life, using gamification!",
  //   links: {
  //     github: "https://github.com/Prana-Tree/nowa_invites",
  //     livePreview: "https://es7e3-taaaa-aaaan-qakqq-cai.raw.ic0.app/",
  //     external:
  //       "https://supernova.devpost.com/submissions/332339-nowa-metaverse",
  //     otherLinks: [],
  //   },
  //   domains: ["Metaverse and NFTs"],
  //   image: "/img/community-projects/nowa-metaverse.png",
  // },
  {
    name: "SMORF",
    description:
      "simple dao factory for small self-managed organisations & communities (up to 1000 members).",
    links: {
      github: "https://github.com/ioustamora/smorf",
      external: "https://supernova.devpost.com/submissions/329999-smorf",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/smorf.png",
  },
  // {
  //   name: "EX3 orderswap",
  //   description: "Dfinity DEFI orderbook AMM",
  //   links: {
  //     github: "https://github.com/Deland-Labs",
  //     external:
  //       "https://supernova.devpost.com/submissions/334393-ex3-orderswap",
  //     otherLinks: [],
  //   },
  //   domains: ["Asynchronous DeFi"],
  //   image: "/img/community-projects/ex3-orderswap.png",
  // },
  {
    name: "DECOLLAB",
    description:
      "DECOLLAB offers a singular, streamlined platform for coders to seamlessly work on projects together quickly and effectively.",
    links: {
      github: "https://github.com/ashwinr000/DECOLLAB",
      external: "https://supernova.devpost.com/submissions/334270-decollab",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/decollab.png",
  },
  {
    name: "Arena Project",
    description:
      "The project sets out to create a game that hosts its entire backend and executes logic within the IC. The project continues to expand and game-agnostic, engine features can be used by other games.",
    links: {
      github: "https://github.com/wasolomon98/ArenaProject",
      external:
        "https://supernova.devpost.com/submissions/334296-arena-project",
      otherLinks: [],
    },
    domains: ["GameFi"],
    image: "/img/community-projects/arena-project.gif",
  },
  {
    name: "PRESTO: Escrow, Title, & Trust dApp",
    description:
      "Presto is an Internet Computer dApp for creating and managing escrows & trusts and for registering ownership of any type of property on-chain.",
    links: {
      github: "https://github.com/hafezrouzati/presto",
      livePreview: "https://3us5k-qyaaa-aaaak-qap3a-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/330797-presto-escrow-title-trust-dapp",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/presto:-escrow-title-and-trust-dapp.png",
  },
  {
    name: "CyclesDAO frontend",
    description:
      "The CyclesDAO is a configurable canister that allows to decentralize the powering-up of your canisters by giving to people who send cycles rewards and power in the governance.",
    links: {
      github: "https://github.com/sardariuss/CyclesDAO",
      external:
        "https://supernova.devpost.com/submissions/328532-cyclesdao-frontend",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/cyclesdao-frontend.png",
  },
  {
    name: "Veta",
    description: "Bringing data ownership back to its user",
    links: {
      github: "https://github.com/sworks89/veta",
      livePreview: "http://veta.icp.xyz/",
      external: "https://supernova.devpost.com/submissions/334489-veta",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/veta.jpg",
  },
  {
    name: "dfx agent",
    description:
      "A easy way to learn & execute internet computer dfx commands.",
    links: {
      github: "https://github.com/samshi/dfx-agent",
      external: "https://supernova.devpost.com/submissions/333096-dfx-agent",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/dfx-agent.png",
  },
  {
    name: "DaoWorld",
    description:
      "First #Dao management tool on IC, welcome any project that needs funds, community, and governance.",
    links: {
      github: "https://github.com/ic-daow/daow",
      livePreview: "https://e6np3-zyaaa-aaaah-aapaq-cai.raw.ic0.app",
      external: "https://supernova.devpost.com/submissions/330705-daoworld",
      otherLinks: [
        "https://twitter.com/DfinityDaoWorld",
        "https://www.youtube.com/watch?v=0R1dziSG6K0",
      ],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/daoworld.gif",
  },
  {
    name: "DeSwap Orderbook",
    description: "An Order Matching Engine Module for Dex in Motoko.",
    links: {
      github: "https://github.com/iclighthouse/DeSwap-Orderbook",
      livePreview: "https://pk6zh-iiaaa-aaaaj-ainda-cai.raw.ic0.app",
      external:
        "https://supernova.devpost.com/submissions/334440-deswap-orderbook",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/deswap-orderbook.png",
  },
  {
    name: "Doap",
    description:
      "Bringing POAP (proof of participation) to the Internet Computer",
    links: {
      github: "https://github.com/picsoung/doap-dfinity",
      external: "https://supernova.devpost.com/submissions/334336-doap",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
  },
  {
    name: "dface.cam",
    description:
      "Unity OpenCV dlib app with AI metaverse NPCs on the IC blockchain",
    links: {
      github: "https://github.com/yosun/dfacecam",
      livePreview: "https://xwbiq-aaaaa-aaaak-ab6kq-cai.raw.ic0.app/",
      external: "https://supernova.devpost.com/submissions/334397-dface-cam",
      otherLinks: [
        "https://drive.google.com/drive/folders/1ubDYFSxOL1yR9-zERNZLWhuGUC4z_KfI?usp=sharing",
      ],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/dface.cam.gif",
  },
  {
    name: "Dmail Network",
    description:
      "Construct DID in Web 3.0, Not Just an Email. Will be a basic infrastructure tool, flow portal and DID for users to come into the Web 3.0 era.",
    links: {
      github: "https://github.com/dmailofficial/dmail",
      livePreview: "https://evyc3-ziaaa-aaaak-aam5a-cai.ic0.app/inbox",
      external:
        "https://supernova.devpost.com/submissions/326888-dmail-network",
      otherLinks: [
        "https://dmail.ai/",
        "https://dmail.ai/presale",
        "https://twitter.com/dmailofficial",
        "https://discord.gg/QbvaeqwMFg",
        "https://medium.com/@dmail_official",
      ],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/dmail-network.png",
  },
  // {
  //   name: "Smartie-NFT",
  //   description: "Bringing value back to the art of learning.",
  //   links: {
  //     github: "https://github.com/RES-lab/smartie-nft",
  //     external: "https://supernova.devpost.com/submissions/328365-smartie-nft",
  //     otherLinks: [],
  //   },
  //   domains: ["Metaverse and NFTs"],
  //   image: "/img/community-projects/smartie-nft.gif",
  // },
  {
    name: "ICP.NET",
    description: "C#/.NET candid and http agent library",
    links: {
      github: "https://github.com/Gekctek/ICP.NET",
      livePreview:
        "https://f76k2-siaaa-aaaal-aaoba-cai.raw.ic0.app/d/icp-for-dotnet-developers",
      external: "https://supernova.devpost.com/submissions/329814-icp-net",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/icp.net.gif",
  },
  {
    name: "Candid Intellij Plugin",
    description:
      "A Candid language plugin that provide a complete support to efficiently edit .did files.",
    links: {
      github: "https://github.com/Alaanor/candid-intellij-plugin",
      external:
        "https://supernova.devpost.com/submissions/331891-candid-intellij-plugin",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/candid-intellij-plugin.png",
  },
  // {
  //   name: "Makabaka",
  //   description:
  //     "Build Web3 trusted foundation applications that allow a secure and compliant way to experience decentralized live services, NFT gifts, and more.",
  //   links: {
  //     github: "https://github.com/helloHC/makabaka",
  //     livePreview: "https://benha-kaaaa-aaaal-qaxnq-cai.ic0.app/",
  //     external: "https://supernova.devpost.com/submissions/334231-makabaka",
  //     otherLinks: [],
  //   },
  //   domains: ["SocialFi"],
  //   image: "/img/community-projects/makabaka.jpg",
  // },
  {
    name: "MOPS",
    description: "Motoko package manager with on-chain package registry",
    links: {
      github: "https://github.com/ZenVoich/mops",
      livePreview: "https://distrikt.app/u/mops",
      external: "https://supernova.devpost.com/submissions/327907-mops",
      otherLinks: ["http://mops.one/", "https://twitter.com/mops_one"],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/mops.png",
  },
  {
    name: "Sand Bless Unction",
    description: "Bless your artwork using owned crypto-marks.",
    links: {
      github: "https://github.com/branciard/sandblessunction",
      livePreview: "https://qob3k-7yaaa-aaaao-aahdq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/333601-sand-bless-unction",
      otherLinks: ["http://www.sandblessunction.com"],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/sand-bless-unction.png",
  },
  {
    name: "EONIA",
    description:
      "EONIA is a decentralized real estate platform that allows users to buy sell and tokenize their real estate platform.  Introducing 3d scanning with mobile to upload 3d models of the property.",
    links: {
      github: "https://github.com/mdgolammafuz/EONIA",
      external: "https://supernova.devpost.com/submissions/334586-eonia",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/eonia.png",
  },
  // {
  //   name: "Finterest",
  //   description:
  //     "The first borrowing and lending protocol on the IC utilizing native Bitcoin integration",
  //   links: {
  //     github: "https://github.com/torates/fICP",
  //     livePreview: "https://tyhcm-sqaaa-aaaah-abjya-cai.raw.ic0.app/",
  //     external: "https://supernova.devpost.com/submissions/329712-finterest",
  //     otherLinks: [
  //       "https://github.com/FinterestICP/finterest-pricefeeds",
  //       "https://youtu.be/9vhFuKWVbwo",
  //     ],
  //   },
  //   domains: ["Asynchronous DeFi"],
  //   image: "/img/community-projects/finterest.png",
  // },
  // {
  //   name: "Droid Wars",
  //   description: "Play to earn droid parts",
  //   links: {
  //     github: "https://github.com/cryptosebek/droid-wars",
  //     external: "https://supernova.devpost.com/submissions/334044-droid-wars",
  //     otherLinks: [],
  //   },
  //   domains: ["GameFi"],
  //   image: "/img/community-projects/droid-wars.jpg",
  // },
  {
    name: "Blotch",
    description:
      "Blotch is the first social media fully on ICP that supports rich content (no IPFS or Arweave). With dynamic canister creation and tokenized reporting, Blotch is both scalable and empowers all users.",
    links: {
      github: "https://github.com/am0rlock/blotch",
      livePreview: "http://blotch.one",
      external: "https://supernova.devpost.com/submissions/334149-blotch",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/blotch.png",
  },
  {
    name: "Dev-Pouch",
    description:
      "Dev-Pouch is a simple desktop IC wallet based on the Tauri framework.",
    links: {
      github: "https://github.com/GLicDEV/dev-pouch",
      external: "https://supernova.devpost.com/submissions/326893-dev-pouch",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/dev-pouch.gif",
  },
  {
    name: "Ant Kingdoms, Free play-and-earn NFT Game",
    description:
      "Ant Kingdoms Free play-and-earn NFT Game is a decentralized game built and runs on Internet Computer.",
    links: {
      github: "https://github.com/NFPTU/dfinity-fu",
      livePreview: "https://fpi33-7qaaa-aaaai-acatq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/326844-ant-kingdoms-free-play-and-earn-nft-game",
      otherLinks: ["https://dfinity-fu.gitbook.io/gamefi-ant"],
    },
    domains: ["GameFi"],
    image:
      "/img/community-projects/ant-kingdoms-free-play-and-earn-nft-game.png",
  },
  {
    name: "Flippy (NFT Barter)",
    description:
      'Wouldn\'t it be cool if we could trade NFTs as we did with trading cards when we were kids? "Flippy" is the first platform in the Internet Computer ecosystem that enables the direct exchanges of NFTs.',
    links: {
      github: "https://github.com/Japan-DfinityInfoHub/nft-barter",
      livePreview: "https://a2tci-laaaa-aaaap-qamkq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/333202-flippy-nft-barter",
      otherLinks: [
        "https://github.com/Japan-DfinityInfoHub/generative-art-nft",
      ],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/flippy-(nft-barter).png",
  },
  {
    name: "Petcare Solution",
    description:
      "An Integrated platform for medical and non medical needs of pet owners",
    links: {
      github: "https://github.com/Nitheesh-Skumar/Supernova-Pettamo",
      livePreview: "https://pettamo.on.fleek.co/",
      external:
        "https://supernova.devpost.com/submissions/334525-petcare-solution",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/petcare-solution.png",
  },
  {
    name: "PartyBoard",
    description:
      "WEB3 Metaverse&NFT Social App with inbuilt Game-Fi elements, Social-Fi Protocol, Decentralized Social Audio.",
    links: {
      github: "https://github.com/Pabsysop",
      livePreview: "https://www.partyboard.org/media/partyboard.v8.apk",
      external: "https://supernova.devpost.com/submissions/334470-partyboard",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/partyboard.jpg",
  },
  {
    name: "Fundnation",
    description:
      "Fast, secure, decentralized and affordable crowdfunding application powered by internet computer blockchain.",
    links: {
      github: "https://github.com/Fundnation/Fund-Raiser",
      livePreview: "https://jwj2d-5aaaa-aaaap-aahha-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/334360-fundnation",
      otherLinks: [
        "https://www.figma.com/file/pEOaBWUsrs3vFoPAwZao8c/Fundnation?node-id=3%3A4",
        "https://www.figma.com/proto/pEOaBWUsrs3vFoPAwZao8c/Fundnation?page-id=488%3A33640&node-id=499%3A25174&viewport=566%2C498%2C0.06&scaling=min-zoom&starting-point-node-id=499%3A25174&show-proto-sidebar=1",
      ],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/fundnation.png",
  },
  {
    name: "FIP Coin",
    description: "Free economy for free people",
    links: {
      github: "https://github.com/0xpranav/FIP-Coin",
      external: "https://supernova.devpost.com/submissions/333098-fip-coin",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/fip-coin.png",
  },
  {
    name: "InfinitySwap Canister SDK",
    description:
      "An enhanced CDK for Rust Canisters, providing:(1) A framework to test inter-canister communications(2 Compose canister APIs using rust traits.(3) Versioned state management for canister upgrades",
    links: {
      github: "https://github.com/infinity-swap/canister-sdk",
      external:
        "https://supernova.devpost.com/submissions/333189-infinityswap-canister-sdk",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/infinityswap-canister-sdk.png",
  },
  {
    name: "Finivest",
    description:
      "Finivest is a money market providing alternative investment and trading strategies to DeFi users on the IC",
    links: {
      github: "https://github.com/HenricoW/findex",
      external: "https://supernova.devpost.com/submissions/333166-finivest",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/finivest.png",
  },
  // {
  //   name: "World-Tree Protocol Stack for ICP",
  //   description:
  //     "Dante Network is a middleware to empower multi-chain ecosystems to interconnect and interoperate with each other in web3.",
  //   links: {
  //     github: "https://github.com/dantenetwork/Demo-Show",
  //     livePreview: "https://isdiw-ziaaa-aaaai-acklq-cai.ic0.app/",
  //     external:
  //       "https://supernova.devpost.com/submissions/332103-world-tree-protocol-stack-for-icp",
  //     otherLinks: ["https://github.com/dantenetwork/canister_contracts"],
  //   },
  //   domains: ["Blue Sky"],
  //   image: "/img/community-projects/world-tree-protocol-stack-for-icp.png",
  // },
  // {
  //   name: "MatJ",
  //   description:
  //     "MatJ is a online scientific computing platform, which aims to provide open source scientific computing and numerical analysis tools compatible with MATLAB syntax",
  //   links: {
  //     github: "https://github.com/samshi/matj",
  //     livePreview: "https://uqs7z-qiaaa-aaaak-qacra-cai.ic0.app/",
  //     external: "https://supernova.devpost.com/submissions/328357-matj",
  //     otherLinks: [],
  //   },
  //   domains: ["Public Good / Social Impact"],
  //   image: "/img/community-projects/matj.png",
  // },
  {
    name: "ic-py",
    description: "ic-py: Python Agent Library for the Internet Computer",
    links: {
      github: "https://github.com/rocklabs-io/ic-py",
      external: "https://supernova.devpost.com/submissions/333069-ic-py",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/ic-py.png",
  },
  {
    name: "Polaris",
    description:
      "Polaris, a fully transparent internet computer based social trading platform.",
    links: {
      github: "https://github.com/nijna/polaris",
      livePreview:
        "https://drive.google.com/file/d/1gA5d96LHaxe8AZoxJxM1x--1TGEmGf8S/view?usp=sharing",
      external: "https://supernova.devpost.com/submissions/329392-polaris",
      otherLinks: [
        "https://www.figma.com/proto/ec5UGtfRODHZBSGZWc6mJP/Supernova?page-id=204%3A3819&node-id=204%3A10590&viewport=3793%2C1286%2C0.12&scaling=scale-down&starting-point-node-id=204%3A10590",
      ],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/polaris.png",
  },
  // {
  //   name: "KawaK",
  //   description:
  //     "Insight is the precondition to growth. KawaK is a meritocratic writing tool that empowers individuals regardless off their background. A community united by the intent of making a point.",
  //   links: {
  //     github: "https://github.com/kawak-org/kawak2022/tree/testing",
  //     livePreview: "https://3ysab-rqaaa-aaaan-qaewq-cai.ic0.app/",
  //     external: "https://supernova.devpost.com/submissions/332413-kawak",
  //     otherLinks: [
  //       "https://www.figma.com/file/aMmchtOgxxjqUftsPuxlKc/Kawak?node-id=0%3A1",
  //     ],
  //   },
  //   domains: ["Public Good / Social Impact"],
  //   image: "/img/community-projects/kawak.jpeg",
  // },
  {
    name: "Refound - Mint the art of journalism back to life",
    description:
      "Refound is an NFT marketplace where journalists and photographers can share first person, creative content from the frontlines swiftly, raise awareness, and sell directly to businesses.",
    links: {
      github: "https://github.com/web3abel/refound-icp",
      livePreview: "https://www.beautiful.ai/player/-N591OF3bb8pBBT-ocWM",
      external:
        "https://supernova.devpost.com/submissions/334332-refound-mint-the-art-of-journalism-back-to-life",
      otherLinks: ["https://superlative-fenglisu-972af1.netlify.app"],
    },
    domains: ["Public Good / Social Impact"],
    image:
      "/img/community-projects/refound-mint-the-art-of-journalism-back-to-life.jpeg",
  },
  {
    name: "NiftiOS",
    description:
      "NiftiOS is operating system for the creators to bridge web3 to the posibilites that web3 world brings. \nEnd users don't even need a wallet untill they are ready to do so.",
    links: {
      github: "https://github.com/grmkris/nft-links",
      livePreview: "https://www.niftios.xyz/",
      external: "https://supernova.devpost.com/submissions/334268-niftios",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/niftios.png",
  },
  // {
  //   name: "DBLOGIT",
  //   description:
  //     "A decentralized blogging platform built on the internet computer, we are solving a major problem which is spreading of fake news, here our algorithm will curtail these problem, users can earn & stake",
  //   links: {
  //     github: "https://github.com/DblogIT/frontend",
  //     livePreview: "https://iqoey-qqaaa-aaaak-ab4bq-cai.ic0.app/",
  //     external: "https://supernova.devpost.com/submissions/329900-dblogit",
  //     otherLinks: [],
  //   },
  //   domains: ["Public Good / Social Impact"],
  //   image: "/img/community-projects/dblogit.png",
  // },
  // {
  //   name: "SWAPP by Celestium Labs",
  //   description: "SWAPP IC NFT's with friends in a trustless matter!",
  //   links: {
  //     github: "https://github.com/Celestium-Labs/SWAPP",
  //     livePreview: "https://swapp.duelaliens.com/",
  //     external:
  //       "https://supernova.devpost.com/submissions/331289-swapp-by-celestium-labs",
  //     otherLinks: [],
  //   },
  //   domains: ["Asynchronous DeFi"],
  //   image: "/img/community-projects/swapp-by-celestium-labs.jpg",
  // },
  // {
  //   name: "IC War Alpha",
  //   description: "Space shooter with upgradable NFTs",
  //   links: {
  //     github: "https://github.com/waylad/war-alpha/tree/ic",
  //     livePreview: "https://ic.waralpha.io/",
  //     external: "https://supernova.devpost.com/submissions/333803-ic-war-alpha",
  //     otherLinks: [],
  //   },
  //   domains: ["GameFi"],
  //   image: "/img/community-projects/ic-war-alpha.png",
  // },
  {
    name: "Tingram",
    description: "Tingram - your social contacts!",
    links: {
      github: "https://github.com/tingramtingram/dfinity",
      livePreview: "https://m3h3q-wyaaa-aaaap-qabla-cai.ic0.app",
      external: "https://supernova.devpost.com/submissions/326827-tingram",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/tingram.jpeg",
  },
  // {
  //   name: "NFTOFU",
  //   description: "NFTOFU is the one-stop NFT portal on IC ecosystem",
  //   links: {
  //     github: "https://github.com/nftofuio",
  //     livePreview: "https://supernova.nftofu.io/",
  //     external: "https://supernova.devpost.com/submissions/334447-nftofu",
  //     otherLinks: [],
  //   },
  //   domains: ["Blue Sky"],
  //   image: "/img/community-projects/nftofu.png",
  // },
  {
    name: "LFICO Protocol and Sulfur Network",
    description:
      "License-Free Initial Coin Offering Protocol And Compliance and Verification Sharing Network",
    links: {
      github: "https://github.com/kentomisawa/sulfur",
      livePreview: "https://github.com/kentomisawa/lfico",
      external:
        "https://supernova.devpost.com/submissions/333978-lfico-protocol-and-sulfur-network",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/lfico-protocol-and-sulfur-network.gif",
  },
  {
    name: "glue",
    description:
      "glue allows nft projects to add holder verification to their discord communities. it's easy to use, easy to setup and easily extendable.",
    links: {
      github: "https://github.com/glue-org",
      livePreview:
        "https://discord.com/api/oauth2/authorize?client_id=974260670675697714&permissions=268435456&scope=applications.commands%20bot",
      external: "https://supernova.devpost.com/submissions/327051-glue",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/glue.png",
  },
  {
    name: "Ukrainian Magicals",
    description:
      "We create new vision of NFTs with AR Storytellings, AR Face Lenses and Application for it minting, usage and selling",
    links: {
      github:
        "https://github.com/insky/ukrainian-magicals-internet-computer-nft",
      livePreview: "https://dydxz-fqaaa-aaaag-aanla-cai.ic0.app",
      external:
        "https://supernova.devpost.com/submissions/332052-ukrainian-magicals",
      otherLinks: ["https://ukrainianmagicals.fun/"],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/ukrainian-magicals.png",
  },
  {
    name: "On-chain System of Record with Public Notary",
    description:
      "We use IC's low cost on-chain storage and inter-canister async calls features to make a cheap and scalable System of Record with Public Notary with features of Oracle, billing and Decrypt+Share.",
    links: {
      github: "https://github.com/amirhyoussefi/ic-sorn",
      external:
        "https://supernova.devpost.com/submissions/334423-on-chain-system-of-record-with-public-notary",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image:
      "/img/community-projects/on-chain-system-of-record-with-public-notary.png",
  },
  // {
  //   name: "ICTree - social media, decentralized, run fully on-chain",
  //   description:
  //     "ICTree - social media, decentralized, run fully on-chain, allowing user to create personalized, easily customizable page - contains all the important links you want to share to the world!",
  //   links: {
  //     github: "https://github.com/ntthuytien/ictree",
  //     livePreview: "https://ova6s-nqaaa-aaaaj-aisca-cai.ic0.app/",
  //     external:
  //       "https://supernova.devpost.com/submissions/333268-ictree-social-media-decentralized-run-fully-on-chain",
  //     otherLinks: [],
  //   },
  //   domains: ["Public Good / Social Impact"],
  //   image:
  //     "/img/community-projects/ictree-social-media-decentralized-run-fully-on-chain.png",
  // },
  {
    name: "Social Review",
    description:
      "Decentralized app to collect, validate and reward reviews for various businesses/products. It lets businesses setup a feedback page to encourage interaction and reward tokens to loyal customers.",
    links: {
      github: "https://github.com/sanjivcodes/social_reviews",
      livePreview: "https://7elun-6yaaa-aaaal-aayba-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/334576-social-review",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/social-review.jpg",
  },
  {
    name: "KVERSO",
    description:
      "KVERSO is a large-scale virtual 3D Metaverse platform based on IC. With 3D Avatars customization, Pet System(KUNO), NFT PFPs(KABI), DIY display features, UGC+PGC, and dress-up functions.",
    links: {
      github: "https://github.com/KVERSO",
      livePreview: "http://www.kverso.com/gallery",
      external: "https://supernova.devpost.com/submissions/334448-kverso",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/kverso.jpg",
  },
  // {
  //   name: "UnfoldVR",
  //   description:
  //     "UnfoldVR is a VR native app, integrated with IC using WebRTC, that aims to become the Creative Metaverse. A place where people create and discover 3D NFTs and can interact with others in real-time.",
  //   links: {
  //     github: "https://github.com/RP3a/unfold-dapp",
  //     livePreview: "https://jmorc-qiaaa-aaaam-aaeda-cai.ic0.app/",
  //     external: "https://supernova.devpost.com/submissions/329656-unfoldvr",
  //     otherLinks: [
  //       "https://x7sao-6qaaa-aaaaj-ad4wq-cai.ic0.app/",
  //       "http://bit.ly/3b2EZms",
  //     ],
  //   },
  //   domains: ["Metaverse and NFTs"],
  //   image: "/img/community-projects/unfoldvr.png",
  // },
  {
    name: "Dwitter",
    description:
      "Dwitter is a platform for an interaction between users and celebrities with paid posts and tokenomics",
    links: {
      github: "https://github.com/azhuravel/Dwitter-Dfinity",
      livePreview: "https://oqjv5-vqaaa-aaaai-ack5a-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/333285-dwitter",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/dwitter.png",
  },
  {
    name: "Thoth Spell Minter",
    description:
      "Thoth is a generalized tool putting the power of creating complex AI systems into the hands of anyone.",
    links: {
      github: "https://github.com/AtlasFoundation/Thoth/tree/supernova",
      livePreview: "https://f4zho-laaaa-aaaam-qaquq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/334383-thoth-spell-minter",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/thoth-spell-minter.jpg",
  },
  {
    name: "Supernova Deployer",
    description:
      "An add-on for the Unity3D game engine to help videogame developers deploy NFT for ICP as easily and quickly as possible",
    links: {
      github: "https://github.com/Doc-Failure/Supernova_Deployer",
      external:
        "https://supernova.devpost.com/submissions/332358-supernova-deployer",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/supernova-deployer.png",
  },
  // {
  //   name: "Embark",
  //   description:
  //     "Embark integrates Trade and DeFi, combining “Code Is Law” and legal property protection so that any good becomes financially usable as collateral, opening finance for everyone.",
  //   links: {
  //     github: "https://github.com/DevOps-Manager/decentralised_credit",
  //     livePreview: "https://vimeo.com/722838000",
  //     external: "https://supernova.devpost.com/submissions/329756-embark",
  //     otherLinks: ["http://decentralised.trade", "https://vimeo.com/722818696"],
  //   },
  //   domains: ["Asynchronous DeFi"],
  //   image: "/img/community-projects/embark.jpeg",
  // },
  {
    name: "Nifties",
    description:
      "A place for the ones who dream.A place where they called 'home' when they're climbing the hill and reaching for the heights.A place to help them chase all the lights and shine.",
    links: {
      github: "https://github.com/o-0-labs",
      livePreview: "https://www.niftiesx.xyz",
      external: "https://supernova.devpost.com/submissions/327541-nifties",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/nifties.jpeg",
  },
  {
    name: "blank space",
    description:
      "A space to write, create, think and collaborate on documents with multiple peers across the globe through the IC blockchain.",
    links: {
      github: "https://github.com/mhmemon444/blankspace",
      livePreview: "https://gxneu-6qaaa-aaaal-qax6q-cai.ic0.app/",
      external: "https://supernova.devpost.com/submissions/329795-blank-space",
      otherLinks: ["https://www.blankspace.live/"],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/blank-space.jpeg",
  },
  {
    name: "FarmDAO",
    description: "Onchain-offchain loans for emerging market agro-processing",
    links: {
      github: "https://github.com/farmdao",
      livePreview: "http://farmdao-app.live/",
      external: "https://supernova.devpost.com/submissions/327515-farmdao",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/farmdao.png",
  },
  {
    name: "Metablok",
    description:
      "Metablok is a metaverse shopping& game platform where different brands  that want to sell  in the open-air mall and transfer their real-world products in 3D metaverse and offer them for sale with ICP.",
    links: {
      github: "http://github.com/hasimsait/dfx_deploy",
      livePreview: "https://yp5qx-fyaaa-aaaag-qaovq-cai.raw.ic0.app/",
      external: "https://supernova.devpost.com/submissions/330362-metablok",
      otherLinks: [
        "https://metablok.space/",
        "https://github.com/BeytullahCetin/Metablok-OpenMetaMall",
      ],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/metablok.png",
  },
  // {
  //   name: "Save Soil & Farmers",
  //   description:
  //     "52% of agricultural soil is already degraded, thousands of farmers are committing suicide due to soil depletion. It is estimated that soil extinction is costing the world up to US$ 10.6 trillion/year",
  //   links: {
  //     github: "https://github.com/Prana-Tree/savesoil_dao",
  //     livePreview: "https://www.consciousplanet.org/",
  //     external:
  //       "https://supernova.devpost.com/submissions/334129-save-soil-farmers",
  //     otherLinks: [],
  //   },
  //   domains: ["Public Good / Social Impact"],
  //   image: "/img/community-projects/save-soil-and-farmers.png",
  // },
  {
    name: "NFTs on Videate",
    description:
      "Videate is an open video platform that I was awarded a DFNINITY grant for and am in the process of building. For the hackathon, I added NFT purchasing and transferring for all videos on the platform.",
    links: {
      github: "https://github.com/mymikemiller/videate",
      external:
        "https://supernova.devpost.com/submissions/334186-nfts-on-videate",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/nfts-on-videate.png",
  },
  {
    name: "MantaDocs",
    description:
      "MantaDocs is a knowledge workspace that lets you create, organize and collaborate on rich documents. From planning your next vacation, to sharing ideas across your team. MantaDocs has you covered.",
    links: {
      github: "https://github.com/jnlewis/manta-ic",
      external: "https://supernova.devpost.com/submissions/334201-mantadocs",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/mantadocs.png",
  },
  // {
  //   name: "Decium",
  //   description: "A Decentralized web3 blogging platform.",
  //   links: {
  //     github: "https://github.com/Quatre-Finance/decium",
  //     external: "https://supernova.devpost.com/submissions/327825-decium",
  //     otherLinks: [],
  //   },
  //   domains: ["SocialFi"],
  //   image: "/img/community-projects/decium.jpg",
  // },
  {
    name: "WEB3 Empowered Marketing Advisor",
    description:
      "Get a Marketing Advise from over 200 Marketing Expert, based on your situation, product and target group with an exact guideline how to do your marketing. Fully on Web3 build on the Internet Computer.",
    links: {
      github: "https://github.com/MCikus/supernova-submission",
      livePreview: "http://ufostart-supernova.icp.xyz/landing",
      external:
        "https://supernova.devpost.com/submissions/334198-web3-empowered-marketing-advisor",
      otherLinks: ["http://ufostart-supernova.icp.xyz"],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/web3-empowered-marketing-advisor.png",
  },
  {
    name: "Generalized DEX",
    description:
      "A new type of swappable DEX, which is gasless, feeless, debtless short-able, and extremely extensible to various logic",
    links: {
      github: "https://github.com/kentomisawa/generalized-dex",
      livePreview:
        "https://docs.google.com/document/d/1QqzhxLDBoQcvZSrotmO9biPbV5w3oI-xnofYA0aFVQk/edit?usp=sharing",
      external:
        "https://supernova.devpost.com/submissions/331056-generalized-dex",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/generalized-dex.gif",
  },
  {
    name: "Mini Desktop",
    description: "A desktop that knows no bounds.",
    links: {
      github: "https://github.com/amitsingh19975/destop-on-blockchain",
      external: "https://supernova.devpost.com/submissions/333334-mini-desktop",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/mini-desktop.png",
  },
  {
    name: "Q messaging system",
    description:
      "Q is an uncensored open source messaging system.Q is written in the Motoko language of internet computer ICP.One of the aims is to give a unified identity to the multitude of anonymous people.",
    links: {
      github: "https://github.com/metaquid/Q-messaging-system",
      livePreview: "https://meize-wiaaa-aaaan-qamyq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/334359-q-messaging-system",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/q-messaging-system.png",
  },
  {
    name: "Dynamic Rarity NFTs",
    description: "Dynamically changing rarities",
    links: {
      github: "https://github.com/barolukluk/dynamic_rarity_nfts",
      livePreview: "https://x7qdv-qyaaa-aaaan-qacgq-cai.raw.ic0.app",
      external:
        "https://supernova.devpost.com/submissions/334490-dynamic-rarity-nfts",
      otherLinks: ["https://bootcamp-faucet.vercel.app/"],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/dynamic-rarity-nfts.gif",
  },
  {
    name: "BTC Lending Protocol",
    description:
      "Access your Bitcoin's value today.\n\nA port of Ethereum's Liquity and Solana's Hedge onto the IC. Instead of using ICP as the primary hedging token, native Bitcoin is used.",
    links: {
      github: "https://github.com/dangdennis/btc-lending-protocol",
      external:
        "https://supernova.devpost.com/submissions/334250-btc-lending-protocol",
      otherLinks: [],
    },
    domains: ["Asynchronous DeFi"],
    image: "/img/community-projects/btc-lending-protocol.png",
  },
  {
    name: "IC metamask",
    description: "IC metamask",
    links: {
      github: "https://github.com/aewc/ic-signer/tree/supernova",
      external: "https://supernova.devpost.com/submissions/328278-ic-metamask",
      otherLinks: [],
    },
    domains: ["Public Good / Social Impact"],
    image: "/img/community-projects/ic-metamask.gif",
  },
  {
    name: "Invoices as NFTs",
    description:
      "Invoices as NFTs is a quick demo that deals with enabling Premium features on your dApp without dealing with the ledger, via an invoice canister.",
    links: {
      github: "https://github.com/GLicDEV/invoices_as_nft",
      livePreview: "https://t5izh-jqaaa-aaaai-qngjq-cai.ic0.app/",
      external:
        "https://supernova.devpost.com/submissions/334600-invoices-as-nfts",
      otherLinks: [],
    },
    domains: ["Metaverse and NFTs"],
    image: "/img/community-projects/invoices-as-nfts.gif",
  },
  {
    name: "My Status",
    description:
      'My Status is a social media platform that allows users to share daily events of their lives with friends in the form of "statuses".',
    links: {
      github: "https://github.com/aymanfmustafa/My-Status",
      livePreview: "https://testflight.apple.com/join/cKTspEFY",
      external: "https://supernova.devpost.com/submissions/327580-my-status",
      otherLinks: [],
    },
    domains: ["SocialFi"],
    image: "/img/community-projects/my-status.jpg",
  },
  {
    name: "LaunchTrail",
    description:
      "Bring 100% verifiability to Internet Computer projects and make them more secure and dependable.",
    links: {
      github: "https://github.com/spinner-cash/launchtrail",
      external: "https://supernova.devpost.com/submissions/327084-launchtrail",
      otherLinks: [],
    },
    domains: ["Blue Sky"],
    image: "/img/community-projects/launchtrail.png",
  },
];

export default communityProjects;
