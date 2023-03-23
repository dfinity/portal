import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import Layout from "@theme/Layout";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ItsGreenSection from "../components/Basics/ItsGreen";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import BasicsSection from "../components/LandingPage/Basics";
import FoundationSection from "../components/LandingPage/Foundation";
import HeroSection from "../components/LandingPage/HeroSection";
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import NextGenSection from "../components/LandingPage/NextGen";
import PreHero from "../components/LandingPage/PreHero";
import SectionsBar from "../components/LandingPage/SectionsBar";
import ShowcaseSection from "../components/LandingPage/Showcase";
import SlidersSection from "../components/LandingPage/Sliders";
import Storage from "../components/LandingPage/Storage";

const queryClient = new QueryClient();

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <QueryClientProvider client={queryClient}>
        <PreHero></PreHero>
      </QueryClientProvider>

      <main
        className="w-full relative bg-[#F1EEF5] z-[0]"
        style={{ marginTop: "calc(var(--ifm-navbar-height) * -1)" }}
      >
        <HeroSection></HeroSection>
        <div className="overflow-hidden">
          {/* 
            Update the list of showcase projects here: /plugins/home-showcase.js 
          */}
          <ShowcaseSection
            className="pb-[320px]"
            lines={[
              "Defi",
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
            subheading="There are hundreds of projects like these..."
            linePostfix="fully on-chain"
          ></ShowcaseSection>
        </div>
        <BackgroundPanel
          panelClassName="bg-gradient-to-bl from-[#e07934] via-[#964680] to-[#4421a0]"
          id="comparison"
        >
          <Storage></Storage>
        </BackgroundPanel>
        <div className="overflow-hidden">
          <NextGenSection></NextGenSection>
          <ItsGreenSection id="sustainable" />
          <FoundationSection></FoundationSection>
          <SlidersSection />
          <StartBuildingSection
            id="startBuilding"
            title="Start building on the Internet Computer"
            body=" Start a DAO, create a token, build dapps and host assets with the full tech stack entirely on chain."
            cta="BUILD REAL WEB3"
            ctaLink="/developers"
            cards={[
              {
                title: "Dev Forum",
                body: "Engage with the ICP community to shape future features, propose new ideas, and ask questions. ",
                link: "https://forum.dfinity.org",
              },
              {
                title: "Dev Docs",
                body: "Get to know the concepts,  architecture and technical breakthroughs that enable the ICP. Plus step-by-step guides on how to stake your tokens, and more.",
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
          <NewsletterSection />
        </div>
      </main>
      <SectionsBar />
    </Layout>
  );
}
