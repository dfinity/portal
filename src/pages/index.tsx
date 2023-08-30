import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import Layout from "@theme/Layout";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import CommunityStories from "../components/LandingPage/CommunityStories/CommunityStories";
import Decks from "../components/LandingPage/Decks/Decks";
import FoundationSection from "../components/LandingPage/Foundation";
import Highlights from "../components/LandingPage/Highlights/Highlights";
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import PreHero from "../components/LandingPage/PreHero";
import SectionsBar from "../components/LandingPage/SectionsBar";
import ShowcaseSection from "../components/LandingPage/Showcase";
import Sustainable from "../components/LandingPage/Sustainable/Sustainable";
import Vision from "../components/LandingPage/Vision/Vision";

const queryClient = new QueryClient();

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <QueryClientProvider client={queryClient}>
        <PreHero
          headline={
            <>
              Cypherspace
              <br />
              as cloud
            </>
          }
          subheadline="INTERNET COMPUTER"
          cta="Explore The Power Of ICP"
          ctaLink="/what-is-the-ic"
          cards={[
            {
              caption: "Unstoppable Software",
              title: "Cloud 3.0",
              link: "/enterprise",
            },
            {
              caption: "Open Internet Services",
              title: "Web 3.0",
              link: "/openchat",
            },
            {
              caption: "Internet Identity",
              title: "Web3 ID",
              link: "/internet-identity",
            },
          ]}
        ></PreHero>
      </QueryClientProvider>

      <main
        className="w-full relative bg-[#F1EEF5] z-[0]"
        style={{ marginTop: "calc(var(--ifm-navbar-height) * -1)" }}
      >
        <Decks />
        <Vision />
        <CommunityStories></CommunityStories>
        <div className="overflow-hidden">
          {/* 
            Update the list of showcase projects here: /plugins/home-showcase.js 
          */}
          <ShowcaseSection
            className="pb-[320px]"
            lines={[
              "DeFi",
              "Metaverse",
              "Social media",
              "Social networking",
              "Multi-chain dapps",
              "Enterprise services",
              "R&D infrastructure",
              "Fundraising",
              "Publishing",
              "Messaging ",
              "Gaming",
              "NFTs",
            ]}
            subheading="Featuring a few web3 project teams reinventing the internet on the ICP blockchain."
            linePostfix="on true Web3"
          ></ShowcaseSection>
        </div>
        <BackgroundPanel
          panelClassName="bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0]"
          id="comparison"
          threshold={0}
          rootMargin="-30% 0px"
        >
          <Highlights />
        </BackgroundPanel>
        <div className="overflow-hidden">
          <Sustainable id="sustainable"></Sustainable>
          <StartBuildingSection
            id="startBuilding"
            title="Become a Web3 pioneer"
            body="Start a DAO, create a token, build dapps and host assets with the full stack entirely on-chain."
            cta="BUILD REAL WEB3"
            ctaLink="/developers"
            cards={[
              {
                title: "Dev forum",
                body: "Engage with the ICP community to shape future features, propose new ideas, and ask questions.",
                link: "https://forum.dfinity.org",
              },
              {
                title: "Dev docs",
                body: "Get to know the concepts,  architecture and technical breakthroughs that enable the ICP. Plus step-by-step guides on how to stake your tokens, and more.",
                link: "/docs/current/home",
              },
              {
                title: "Sample code",
                body: "From a simple DEX, to on-chain encrypted storage, NFT minting, and a basic DAO, learn how to build on the Internet Computer.",
                link: "/samples",
              },
              {
                title: "Motoko playground",
                body: "Play around with Motoko, the native language of the Internet Computer, right in the browser without having to download the SDK.",
                link: "https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/",
              },
            ]}
          />
          <FoundationSection></FoundationSection>

          <NewsletterSection />
        </div>
      </main>
      <SectionsBar />
    </Layout>
  );
}
