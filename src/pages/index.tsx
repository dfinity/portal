import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import Layout from "@theme/Layout";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import Decks from "../components/LandingPage/Decks/Decks";
import FoundationSection from "../components/LandingPage/Foundation";
import { CardWithImage } from "../components/LandingPage/Hero/Cards";
import Hero from "../components/LandingPage/Hero/Hero";
import { NewsSection } from "../components/LandingPage/Hero/News";
import Highlights from "../components/LandingPage/Highlights/Highlights";
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import PreHero from "../components/LandingPage/PreHero";
import SectionsBar from "../components/LandingPage/SectionsBar";
import Sustainable from "../components/LandingPage/Sustainable/Sustainable";

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
        <Hero
          headlines={["BUILD THE FUTURE", "CYPHERSPACE AS CLOUD"]}
          aiPlaceholders={[
            "Is the Internet Computer decentralized?",
            "What can I do with ICP token?",
            "What is the first step to my ICP dapp?",
          ]}
        >
          <div className="container-10 grid grid-cols-1 md:grid-cols-2 gap-2">
            <CardWithImage
              href="https://deck.internetcomputer.org"
              image="/img/home/deck-astronaut.webp"
            >
              <div className="tw-heading-7 md:tw-heading-6 mb-2">
                Online Deck [ ICP hosted ]
              </div>
              <h2 className="tw-heading-5 md:tw-heading-4 mb-0">
                Cypherspace
                <br />
                as cloud 3.0
              </h2>
            </CardWithImage>
            <CardWithImage
              href="/ecosystem"
              image="/img/home/ecosystem-card.webp"
            >
              <div className="tw-heading-7 md:tw-heading-6 mb-2">Ecosystem</div>
              <h2 className="tw-heading-5 md:tw-heading-4 mb-0">
                Ecosystem links
              </h2>
            </CardWithImage>
            <CardWithImage
              href="https://deck.internetcomputer.org"
              image="/img/home/dashboard.svg"
            >
              <div className="tw-heading-7 md:tw-heading-6 mb-2">
                dashboard.internetcomputer.org
              </div>
              <h2 className="tw-heading-5 md:tw-heading-4 mb-0">Live stats</h2>
            </CardWithImage>
            <CardWithImage href="/icp-event" image="/img/home/events-card.webp">
              <div className="tw-heading-7 md:tw-heading-6 mb-2">
                Online Deck [ ICP hosted ]
              </div>
              <h2 className="tw-heading-5 md:tw-heading-4 mb-0">
                Cypherspace
                <br />
                as cloud 3.0
              </h2>
            </CardWithImage>
          </div>
          <NewsSection />
        </Hero>
        {/* <Decks className="container-10" /> */}
      </QueryClientProvider>

      <main className="w-full relative bg-[#F1EEF5] z-[0]">
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
