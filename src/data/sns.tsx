import snsDataJson from "@site/.docusaurus/sns-data/default/sns-data.json";
import React from "react";
import { DaoCardProps } from "../components/SnsPage/DaoCard";

export const snsData = snsDataJson as any as {
  name: string;
  description: string;
  url: string;
  logo: string;
  rootCanisterId: string;
  proposalCount: number;
  icpRaised: number;
  participants: number;
}[];

export const openChatDao = snsData.find(
  (dao) => dao.rootCanisterId === "3e3x2-xyaaa-aaaaq-aaalq-cai"
);
export const sonicDao = snsData.find(
  (dao) => dao.rootCanisterId === "qtooy-2yaaa-aaaaq-aabvq-cai"
);
export const goldDao = snsData.find(
  (dao) => dao.rootCanisterId === "tw2vt-hqaaa-aaaaq-aab6a-cai"
);

export const extraMetadata: Record<string, Partial<DaoCardProps>> = {
  "jmod6-4iaaa-aaaaq-aadkq-cai": {
    // waterneuron
    twitter: "https://x.com/WaterNeuron",
  },
  "ormnc-tiaaa-aaaaq-aadyq-cai": {
    // KongSwap
    twitter: "https://x.com/KongSwapX",
  },
  "tw2vt-hqaaa-aaaaq-aab6a-cai": {
    // Gold DAO
    twitter: "https://x.com/TheGoldDAO",
    description: (
      <>
        The Gold DAO represents a groundbreaking fusion of traditional gold and
        modern blockchain technology, allowing anyone in the world to access
        physical gold instantaneously, without depending on banks.
      </>
    ),
  },

  "qtooy-2yaaa-aaaaq-aabvq-cai": {
    // Sonic
    name: "Sonic",
    twitter: "https://twitter.com/sonic_ooo",
    description: (
      <>
        The open DeFi suite on the Internet Computer blockchain governed by the
        people for the people. Sonic unleashes the potential of crypto trading
        through innovative DeFi products.
      </>
    ),
  },

  "3e3x2-xyaaa-aaaaq-aaalq-cai": {
    // OpenChat
    twitter: "https://twitter.com/OpenChat",
    name: "OpenChat raises 1M ICP in 6 hours",
    description: (
      <>
        OpenChat was the first project to launch an SNS DAO on the Internet
        Computer, marking a significant milestone in the world of blockchain and
        social media as an open internet service.{" "}
      </>
    ),
  },

  "zxeu2-7aaaa-aaaaq-aaafa-cai": {
    // Dragginz
    twitter: "https://twitter.com/dragginzgame",
    description: (
      <>
        A virtual pets game from the creators of Neopets. Non-profit, 100%
        onchain baby dragons, crowdsourced world building, magic spells, and a
        prince in disguise!
      </>
    ),
  },

  "7jkta-eyaaa-aaaaq-aaarq-cai": {
    // Kinic
    twitter: "https://twitter.com/kinic_app",
    description: (
      <>
        The first and only dedicated search engine for Web3 content that runs on
        100% onchain. Trustless SEO backed by ZKML enables transparent results,
        instead of ad-based content .
      </>
    ),
  },

  "67bll-riaaa-aaaaq-aaauq-cai": {
    // DOLR_AI
    twitter: "https://x.com/DOLR_AI",
    description: (
      <>
        A decentralized short-video social media platform governed by the people
        for the people. Monetized time on social media.
      </>
    ),
  },

  "4m6il-zqaaa-aaaaq-aaa2a-cai": {
    // IC Ghost
    twitter: "https://twitter.com/ghost_icp",
    description: (
      <>
        The first decentralized meme coin on the Internet Computer. GHOST is
        powered by the community and owd by the community.
      </>
    ),
  },

  "x4kx5-ziaaa-aaaaq-aabeq-cai": {
    // Decide AI
    twitter: "https://x.com/DecideAI_",
    description: (
      <>
        A decentralized crowdwork platform that supports dapps by handling
        resource-intensive tasks such as content moderation, user verification
        and data labeling.
      </>
    ),
  },

  "xjngq-yaaaa-aaaaq-aabha-cai": {
    // BOOM DAO
    twitter: "https://twitter.com/boomdaosns",
    description: (
      <>
        A collaborative hub for all things Web3 gaming. Plus an all-in-one web3
        game platform and protocol running 100% onchain on the Internet
        Computer.
      </>
    ),
  },

  "uly3p-iqaaa-aaaaq-aabma-cai": {
    // Catalyze
    twitter: "https://twitter.com/catalyze_one",
    description: (
      <>
        A one-stop social-fi application for organising Web3 experiences and
        building community. Event management, crowdsourcing, chat function, and
        reward tooling.
      </>
    ),
  },

  "u67kc-jyaaa-aaaaq-aabpq-cai": {
    // ICX
    twitter: "https://twitter.com/icxdao",
    description: (
      <>
        A decentralized social network with the functionalities you love on
        platforms like Twitter, but with privacy, ownership, and
        community-driven governance.
      </>
    ),
  },

  "rzbmc-yiaaa-aaaaq-aabsq-cai": {
    // Nuance
    twitter: "https://twitter.com/nuancedapp",
    description: (
      <>
        The world's first publishing platform built entirely onchain. In the
        same way DeFi has taken the middleman out of finance, Nuance does the
        same for the written word.
      </>
    ),
  },

  "extk7-gaaaa-aaaaq-aacda-cai": {
    // Neutrinite
    twitter: "https://twitter.com/ICPCoins",
    description: (
      <>
        Neutrinite SNS DAO for ICPCoins. This platform is dedicated to securely
        sourcing data from DEXes, DAOs, and other DeFi applications.
      </>
    ),
  },

  "ecu3s-hiaaa-aaaaq-aacaq-cai": {
    // Trax
    twitter: "https://twitter.com/onlyontrax",
    description: (
      <>A decentralised music platform own and governed by artists and fans.</>
    ),
  },
};

export function dashboardUrlFromRootCanisterId(rootCanisterId: string) {
  return `https://dashboard.internetcomputer.org/sns/${rootCanisterId}`;
}
