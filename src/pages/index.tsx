import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import Layout from "@theme/Layout";
import React from "react";

import FeaturesSection from "../components/LandingPage/FeaturesSection/FeaturesSection";
import FoundationSection from "../components/LandingPage/Foundation";
import GallerySection from "../components/LandingPage/Gallery";
import { CardsSection } from "../components/LandingPage/Hero/Cards";
import Hero from "../components/LandingPage/Hero/Hero";
import IntroCards from "../components/LandingPage/Hero/IntroCards";
import { NewsSection } from "../components/LandingPage/Hero/News";
import {
  CollapsedVisionSection,
  VisionSection,
} from "../components/LandingPage/Hero/VisionSection";
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import SectionsBar from "../components/LandingPage/SectionsBar";
import Sustainable from "../components/LandingPage/Sustainable/Sustainable";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <Hero
        headline={<>COMPUTE ON BLOCKCHAIN</>}
        aiPlaceholders={[
          "Is the Internet Computer decentralized?",
          "What can I do with ICP token?",
          "What is the first step to my ICP dapp?",
        ]}
      >
        <CardsSection />
        <NewsSection />
        <VisionSection>
          Step into the era of blockchain as a limitless smart contract cloud
          that hosts everything on-chain: data, content, computations, and user
          experiences. Forget legacy IT and build tamperproof and unstoppable
          Web3 social media, gaming, virtual reality, decentralized finance, and
          enterprise infrastructure. Join the movement and realize the
          game-changing Internet Computer paradigm of full stack
          decentralization and seamless multi-chain today.
          <CollapsedVisionSection>
            You will be in good company. The Internet Computer network's ICP
            protocol was created by the crypto industry’s largest R&D operation
            in a multi-year international effort – it’s the product of more than
            1,000 person years of research and development at the DFINITY
            Foundation, including work by world famous cryptographers and
            engineers focused on a singular vision: deliver infinite blockchain
            that can be used as an alternative to traditional IT.
          </CollapsedVisionSection>
        </VisionSection>
        <IntroCards />
      </Hero>

      <main className="w-full relative bg-[#F1EEF5] z-[0]">
        <div className="overflow-hidden">
          <GallerySection />
          <FeaturesSection />
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

          <NewsletterSection formUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0">
            Sign up for email updates{" "}
            <span className="text-white-60">
              to keep up to date with the Internet Computer
            </span>
          </NewsletterSection>
        </div>
      </main>
      <SectionsBar />
    </Layout>
  );
}
