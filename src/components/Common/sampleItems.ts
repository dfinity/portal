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
    [key: string]:
      | string
      | string[]
      | {
          text: string;
          to: string;
        };
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
    image: require("../../../static/img/samples/bitcoin.png").default,
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
    image: require("../../../static/img/samples/t-ecdsa.png").default,
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
    image: require("../../../static/img/samples/https-outcalls.jpeg").default,
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
    image: require("../../../static/img/samples/helloWorld.png").default,
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
    image: require("../../../static/img/samples/staticWebsite.png").default,
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
    image: require("../../../static/img/samples/basicDex.png").default,
    domains: ["Asynchronous DeFi", "Website"],
    languages: ["motoko", "rust", "javascript"],
    level: "intermediate",
    contentType: ["code samples", "documentation", "videos", "live demos", "tutorial"],
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
    image: require("../../../static/img/samples/nftMinting.png").default,
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
    image: require("../../../static/img/samples/basicDAO.png").default,
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
    image: require("../../../static/img/samples/encryptedNoteTaking.png")
      .default,
    domains: ["Website"],
    languages: ["motoko", "rust", "javascript"],
    level: "advanced",
    contentType: ["code samples", "documentation", "videos", "live demos", "tutorial"],
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
    image: require("../../../static/img/samples/tokenTransfer.png").default,
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
    image: require("../../../static/img/samples/actorReference.png").default,
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
    image: require("../../../static/img/samples/webgl.png").default,
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
    image: require("../../../static/img/samples/nns-proposal.jpg").default,
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
    image: require("../../../static/img/samples/default.gif").default,
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
];
