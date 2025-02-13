import React, { useRef } from "react";

import AnimateSpawn from "../components/Common/AnimateSpawn";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import BeAPioneer from "@site/src/components/ETHDenver/BeAPioneer";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import IntraPageNav from "../components/Common/IntraPageNav";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import ShareMeta from "../components/Common/ShareMeta";
import TrySomeDapps from "@site/src/components/ETHDenver/TrySomeDapps";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import GradientBackground from "../components/ETHDenver/GradientBackground";
import CtaCard from "../components/ETHDenver/CtaCard";
import Hero from "../components/ETHDenver/Hero";
import MeetUs from "../components/ETHDenver/MeetUs";
import Bounties from "../components/ETHDenver/Bounties";
import JointTheMovement from "../components/ETHDenver/JointTheMovement";
import LearnMore from "../components/ETHDenver/LearnMore";



const MotionLink = motion(Link);
function EthDenverPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Internet Computer blockchain @ ETHDenver 2025"
      description={`Visit us @ ETHDenver 2025, February 23 - March 2, 2025. Lightning fast and fully onchain dapps running on the Internet Computer blockchain, the only true World Computer that enables a fully decentralized ecosystem.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-ethdenver-2.jpg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

        {/* Hero */}
        <Hero id="hero" heroRef={heroRef} />

        {/* Meet us */}
        <MeetUs id="meet-us" />

        {/* Bounties */}
        <Bounties id="bounties" />

        {/* Try some DAPPS */}
        <TrySomeDapps id="ecosystem" />

        {/* Join the movement */}
        <BackgroundPanel
          panelClassName="bg-[#0A0023]"
          outerClassName="pt-10 md:pt-20 md:pb-30"
          threshold={0.25}
        >
          <JointTheMovement id="internet-identity" />
        </BackgroundPanel>

        {/* Learn more */}
        <LearnMore id="learn-more" />
        
        {/* Be a pioneer */}
        <div className="pb-16 md:pb-40">
          <BeAPioneer
            id="start-building"
            title="Be a pioneer of Web3"
            body="Metaprotocols leverage Chain Fusion to offer decentralized cross-chain infrastructure enabling the transfer and creation of new assets on Bitcoin."
            cta="Build real Web3"
            ctaLink="/docs/current/home"
            cards={[
              {
                title: "Dev Forum",
                body: "Engage with the ICP community to shape future features, propose new ideas, and ask questions. ",
                link: "https://forum.dfinity.org",
              },
              {
                title: "Dev Docs",
                body: "Metaprotocols leverage Chain Fusion to offer decentralized cross-chain infrastructure enabling the transfer and creation of new assets on Bitcoin.",
                link: "/docs/current/home",
              },
              {
                title: "Sample Code",
                body: "From a simple DEX, to on-chain encrypted storage, NFT minting, and a basic DAO, learn how to build on the Internet Computer.",
                link: "/samples",
              },
              {
                title: "Motoko Playground",
                body: "Play around with Motoko, the native language of the Internet Computer, right in the browser without having to download the SDK.",
                link: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
              },
            ]}
          />
        </div>

        {/* On page nav */}
        <IntraPageNav
          hasHome={false}
          links={[
            { text: "Intro", to: "#intro" },
            { text: "Agenda", to: "#agenda" },
            { text: "Bounties", to: "#bounties" },
            { text: "Ecosystem", to: "#ecosystem" },
            { text: "Internet Identity", to: "#internet-identity" },
            { text: "Blockchain Singularity", to: "#learn-more" },
            { text: "Start building", to: "#start-building" },
          ]}
          label="Scroll to section"
        ></IntraPageNav>

      </main>
    </Layout>
  );
}

export default EthDenverPage;
