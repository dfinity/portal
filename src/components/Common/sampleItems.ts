export type LinkTypes =
  | "action"
  | "motoko"
  | "rust"
  | "docs"
  | "livePreview"
  | "youtube"
  | "github"
  | "external";

export type LinkType = string | { text: string; to: string } | string[];

export type SampleItem = {
  index: number;
  title: string;
  image?: string;
  domains: SampleDomain[];
  level: SampleLevel;
  body: string;
  languages: SampleLanguage[];
  contentType: SampleContentType[];
  links: {
    action?: LinkType;
    motoko?: LinkType;
    rust?: LinkType;
    docs?: LinkType;
    livePreview?: LinkType;
    youtube?: LinkType;
    github?: LinkType;
    external?: LinkType;
  };
};

export type SampleLanguage =
  | "motoko"
  | "rust"
  | "javascript"
  | "typescript"
  | "other";
export type SampleLevel = "beginner" | "intermediate" | "advanced";
export type SampleDomain =
  | "Asynchronous DeFi"
  | "Multi-chain"
  | "Global"
  | "Website"
  | "Metaverse and NFTs"
  | "GameFi"
  | "SocialFi"
  | "Blue Sky"
  | "Public Good / Social Impact";
export type SampleContentType =
  | "code samples"
  | "documentation"
  | "live demos"
  | "tutorial"
  | "videos"
  | "community repo";

export const sampleItems: SampleItem[] = [
  {
    index: 0,
    title: "Bitcoin",
    image: "/img/samples/bitcoin.png",
    domains: ["Asynchronous DeFi"],
    languages: ["motoko", "rust"],
    level: "advanced",
    contentType: ["code samples", "documentation", "live demos", "tutorial"],
    body: "Deploy a canister on the Internet Computer that can send and receive Bitcoin.",
    links: {
      action: {
        text: "Get code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin",
      },
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/basic_bitcoin",
      rust: "https://github.com/dfinity/examples/tree/master/rust/basic_bitcoin",
      docs: "/docs/current/samples/deploying-your-first-bitcoin-dapp",
    },
  },
  {
    index: 1,
    title: "Threshold ECDSA",
    image: "/img/samples/t-ecdsa.png",
    domains: ["Global"],
    languages: ["motoko", "rust"],
    level: "advanced",
    contentType: ["code samples", "documentation", "live demos", "tutorial"],
    body: "Build a threshold ECDSA test key on a subnet.",
    links: {
      action: {
        text: "Get code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/threshold-ecdsa",
      },
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/threshold-ecdsa",
      rust: "https://github.com/dfinity/examples/tree/master/rust/threshold-ecdsa",
      docs: "/docs/current/samples/t-ecdsa-sample",
    },
  },
  {
    index: 2,
    title: "Canister HTTPS Outcalls",
    image: "/img/samples/https-outcalls.jpeg",
    domains: ["Global", "Website"],
    languages: ["rust", "motoko"],
    level: "intermediate",
    contentType: ["code samples", "documentation"],
    body: "Demonstrates how to build a dapp with canister outgoing HTTP calls.",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/send_http_get",
      },
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/send_http_get",
      docs: "docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-to-use",
      rust: "https://github.com/dfinity/examples/tree/master/rust/send_http_get",
    },
  },
  {
    index: 3,
    title: "Hello World",
    image: "/img/samples/helloWorld.png",
    domains: ["Website"],
    languages: ["motoko", "rust", "javascript"],
    level: "beginner",
    contentType: ["code samples", "documentation", "live demos"],
    body: "Deploy a dead simple dapp using two canisters serving a web page.",
    links: {
      action: {
        text: "Get code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/hello",
      },
      motoko: "https://github.com/dfinity/examples/tree/master/motoko/hello",
      rust: "https://github.com/dfinity/examples/tree/master/rust/hello",
      livePreview: "https://6lqbm-ryaaa-aaaai-qibsa-cai.ic0.app/",
      docs: "/docs/current/samples/hello",
    },
  },
  {
    index: 4,
    title: "Static Website",
    image: "/img/samples/staticWebsite.png",
    domains: ["Website", "Global"],
    languages: ["motoko", "rust", "javascript"],
    level: "beginner",
    contentType: ["documentation", "videos", "tutorial"],
    body: "Quickly set up a static website structure, add content and basic styling, and deploy on the IC.",
    links: {
      action: { text: "Docs", to: "/samples/host-a-website" },
      docs: "/docs/current/samples/host-a-website",
      youtube: "https://www.youtube.com/watch?v=JAQ1dkFvfPI",
    },
  },
  {
    index: 5,
    title: "Basic Dex",
    image: "/img/samples/basicDex.png",
    domains: ["Asynchronous DeFi", "Website"],
    languages: ["motoko", "rust", "javascript"],
    level: "intermediate",
    contentType: [
      "code samples",
      "documentation",
      "videos",
      "live demos",
      "tutorial",
    ],
    body: "Build dapp to enable DeFi applications on the IC.",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/defi",
      },
      motoko: "https://github.com/dfinity/examples/tree/master/motoko/defi",
      rust: "https://github.com/dfinity/examples/tree/master/rust/defi",
      livePreview: "https://gzz56-daaaa-aaaal-qai2a-cai.ic0.app/",
      docs: "/docs/current/samples/dex",
      youtube: "https://youtu.be/fLbaOmH24Gs",
    },
  },
  {
    index: 6,
    title: "NFT Minting",
    image: "/img/samples/nftMinting.png",
    domains: ["Metaverse and NFTs", "GameFi"],
    languages: ["rust"],
    level: "intermediate",
    contentType: ["code samples", "documentation", "tutorial", "videos"],
    body: "Create a user generated NFT and share it. This dapp uses the DIP721 NFT standard.",
    links: {
      rust: "https://github.com/dfinity/examples/tree/master/rust/dip721-nft-container",
      docs: "/docs/current/samples/nft",
      youtube: "https://youtu.be/1po3udDADp4",
    },
  },
  {
    index: 7,
    title: "Basic DAO",
    image: "/img/samples/basicDAO.png",
    domains: ["Global", "Asynchronous DeFi"],
    languages: ["motoko", "rust"],
    level: "intermediate",
    contentType: ["code samples", "documentation", "tutorial", "videos"],
    body: "Dapp initializes a set of accounts and corresponding tokens as well as enables  proposals for communal votes.",
    links: {
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/basic_dao",
      rust: "https://github.com/dfinity/examples/tree/master/rust/basic_dao",
      docs: "/docs/current/samples/dao",
      youtube: "https://youtu.be/3IcYlieA-EE",
    },
  },
  {
    index: 8,
    title: "Encrypted note-taking",
    image: "/img/samples/encryptedNoteTaking.png",
    domains: ["Website"],
    languages: ["motoko", "rust", "javascript"],
    level: "advanced",
    contentType: [
      "code samples",
      "documentation",
      "videos",
      "live demos",
      "tutorial",
    ],
    body: "Create, access and modify confidential notes from multiple devices using Internet Identity and end-to-end encryption.",
    links: {
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_motoko",
      rust: "https://github.com/dfinity/examples/tree/master/motoko/encrypted-notes-dapp/src/encrypted_notes_rust",
      livePreview: "https://cvhrw-2yaaa-aaaaj-aaiqa-cai.ic0.app/",
      docs: "/docs/current/samples/encrypted-notes",
      youtube: "https://youtu.be/DZQmtPSxvbs",
    },
  },
  {
    index: 9,
    title: "Token transfer",
    image: "/img/samples/tokenTransfer.png",
    domains: ["Global", "Asynchronous DeFi"],
    languages: ["motoko", "rust"],
    level: "advanced",
    contentType: ["code samples", "documentation"],
    body: "Create a dapp that can transfer tokens to its most active users.",
    links: {
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/ledger-transfer",
      rust: "https://github.com/dfinity/examples/tree/master/rust/tokens_transfer",
      docs: "/docs/current/samples/token-transfer",
    },
  },
  {
    index: 10,
    title: "Actor reference",
    image: "/img/samples/actorReference.png",
    domains: ["Website"],
    languages: ["motoko"],
    level: "advanced",
    contentType: ["code samples", "documentation"],
    body: "Learn how the IC management canister functions as an actor (reference).",
    links: {
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/actor_reference",
    },
  },
  {
    index: 11,
    title: "WebGL",
    image: "/img/samples/webgl.png",
    domains: ["GameFi", "Website", "Global"],
    languages: ["motoko", "rust", "javascript"],
    level: "beginner",
    contentType: ["documentation"],
    body: "Demonstrates how to deploy a web game on the IC.",
    links: {
      docs: "/docs/current/samples/host-a-webgame",
    },
  },
  {
    index: 12,
    title: "NNS Integration",
    image: "/img/samples/nns-proposal.jpg",
    domains: ["Website"],
    languages: ["motoko", "javascript"],
    level: "intermediate",
    contentType: ["code samples", "documentation", "live demos"],
    body: "Learn how to connect a canister to a neuron, to make a dapp that can submit proposals to the NNS.",
    links: {
      motoko:
        "https://github.com/InternetComputerOG/NNS-Proposal-Submission-Dapp",
      livePreview: "https://uf2fn-liaaa-aaaal-abeba-cai.ic0.app/",
    },
  },
  {
    index: 13,
    title: "IOS Integration",
    image: "/img/samples/default.gif",
    domains: ["Website"],
    languages: ["motoko", "javascript"],
    level: "intermediate",
    contentType: ["code samples", "documentation"],
    body: "Integrate with a native ios application enabling push notifications and authentication.",
    links: {
      action: {
        text: "Get Code",
        to: "https://github.com/dfinity/examples/tree/master/motoko/ios-notifications",
      },
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/ios-notifications",
      docs: "/docs/current/samples/ios-integration",
    },
  },
  {
    index: 14,
    title: "IC ETH Starter",
    image: "/img/samples/ic-eth-starter.png",
    domains: ["Multi-chain"],
    languages: ["motoko", "rust"],
    level: "advanced",
    contentType: ["code samples", "documentation"],
    body: "IC-ETH verifies ETH NFTs, supports main/test nets.",
    links: {
      github: "https://github.com/dfinity/ic-eth-starter",
      docs: "/docs/current/tutorials/developer-journey/level-5/5.2-ICP-ETH-tutorial",
      youtube: "https://www.youtube.com/watch?v=ZI5I36aioVw",
    },
  },

  {
    index: 15,
    title: "Add ERC-20 to IC ETH Starter",
    image: "/img/samples/ic-eth-starter-addition.png",
    domains: ["Multi-chain"],
    languages: ["motoko", "rust"],
    level: "advanced",
    contentType: ["code samples", "documentation", "community repo"],
    body: "How to Verify ERC-20 Ownership On-Chain",
    links: {
      github: "https://github.com/jennifertrin/erc20icp",
    },
  },

  {
    index: 16,
    title: "OISY",
    image: "/img/samples/oisy.png",
    domains: ["Multi-chain"],
    languages: ["rust"],
    level: "advanced",
    contentType: ["community repo"],
    body: "Oisy Wallet: Multichain, ICP-based, manages ETH/ERC20, extendable to BTC/IC.",
    links: {
      github: "https://github.com/dfinity/oisy-wallet",
    },
  },

  {
    index: 17,
    title: "PoS app for ckBTC",
    image: "/img/samples/pos-app-for-ckbtc.png",
    domains: ["Multi-chain"],
    languages: ["motoko"],
    level: "advanced",
    contentType: ["code samples", "documentation"],
    body: "Experimental app showcasing ckBTC use on Internet Computer for POS payments.",

    links: {
      motoko: "https://github.com/dfinity/examples/tree/master/motoko/ic-pos",
      docs: "/docs/current/samples/pos",
    },
  },

  {
    index: 18,
    title: "ICRC2 Swap Demo",
    image: "/img/samples/icrc2-swap-demo.png",
    domains: ["Multi-chain"],
    languages: ["motoko"],
    level: "advanced",
    contentType: ["code samples", "documentation"],
    body: "ICRC-2 Swap demo: Manages ICRC-2 tokens, unique in async Internet Computer design.",
    links: {
      motoko:
        "https://github.com/dfinity/examples/tree/master/motoko/icrc2-swap",
    },
  },

  {
    index: 19,
    title: "Multi-subnet Bitcoin Custody",
    image: "/img/samples/multi-subnet-bitcoin-custody.png",
    domains: ["Multi-chain"],
    languages: ["rust"],
    level: "advanced",
    contentType: ["community repo"],
    body: "Experimental Code: Not for live Bitcoin use",
    links: {
      github: "https://github.com/sardariuss/ic_btc_multisig",
      youtube: "https://www.youtube.com/watch?v=C_oW2RCjHKM",
    },
  },

  {
    index: 20,
    title: "ETH Payment Tutorials",
    image: "/img/samples/eth-payment-tutorial.png",
    domains: ["Multi-chain"],
    languages: ["rust"],
    level: "advanced",
    contentType: ["community repo"],
    body: "Build a decentralized e-commerce on ICP with ETH payments.",
    links: {
      github: "https://github.com/b3hr4d/eth_payment_tutorial",
    },
  },

  {
    index: 21,
    title: "B3 Wallet",
    image: "/img/samples/b3-wallet.png",
    domains: ["Multi-chain"],
    languages: ["rust"],
    level: "advanced",
    contentType: ["community repo"],
    body: "Decentralized multi-chain, multi-owner wallet, supports major blockchains.",
    links: {
      github: "https://github.com/B3Pay/b3-wallet",
    },
  },

  {
    index: 22,
    title: "ckBTC",
    image: "/img/samples/ckbtc.png",
    domains: ["Multi-chain"],
    languages: ["rust"],
    level: "advanced",
    contentType: ["documentation"],
    body: "GitHub repo about ckBTC for inspirational use",
    links: {
      github: "https://github.com/dfinity/ic/blob/master/rs/bitcoin/ckbtc",
      youtube: "https://www.youtube.com/watch?v=dCTlWP0vFiY",
    },
  },

  {
    index: 23,
    title: "ckETH",
    image: "/img/samples/cketh.png",
    domains: ["Multi-chain"],
    languages: ["rust"],
    level: "advanced",
    contentType: ["documentation"],
    body: "GitHub repo about ckETH for inspirational use",
    links: {
      github: "https://github.com/dfinity/ic/tree/master/rs/ethereum/cketh",
    },
  },
];
