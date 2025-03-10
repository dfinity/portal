import React, { useRef } from "react";

import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import BeAPioneer from "@site/src/components/ETHDenver/BeAPioneer";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import IntraPageNav from "../components/Common/IntraPageNav";
import Layout from "@theme/Layout";
import ShareMeta from "../components/Common/ShareMeta";
import TrySomeDapps from "@site/src/components/ETHDenver/TrySomeDapps";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import Hero from "../components/ETHDenver/Hero";
import MeetUs from "../components/ETHDenver/MeetUs";
import Bounties from "../components/ETHDenver/Bounties";
import JointTheMovement from "../components/ETHDenver/JointTheMovement";
import LearnMore from "../components/ETHDenver/LearnMore";
import OnStage from "../components/ETHDenver/OnStage";



function EthDenverPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  return (
    <Layout
      title="Internet Computer blockchain @ ETHDenver 2025"
      description={`Visit us @ ETHDenver 2025, February 23 - March 2, 2025. Lightning fast and fully onchain dapps running on the Internet Computer blockchain, the only true World Computer that enables a fully decentralized ecosystem.`}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-ethdenver.jpg"></ShareMeta>

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

        {/* On Stage */}
        <OnStage id="on-stage" />

        {/* Bounties */}
        <Bounties id="bounties" />

        {/* Try some DAPPS */}
        <TrySomeDapps id="ecosystem" />

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
            title="Developer Documentation"
            body="Start a DAO, create a token, build dapps and host assets with the full stack entirely on-chain."
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
                body: "Leverage Chain Fusion and offer decentralized cross-chain infrastructure. Enable the transfer and creation of new assets on Bitcoin, Ethereum and more.",
                link: "/docs/current/developer-docs/multi-chain/overview",
              },
              {
                title: "Sample Code",
                body: "From a simple DEX, to on-chain encrypted storage, NFT minting, and a basic DAO, learn how to build on the Internet Computer.",
                link: "/samples",
              }
            ]}
          />
        </div>
      </main>
    </Layout>
  );
}

export default EthDenverPage;
