/*import FeaturesSection from "../components/LandingPage/FeaturesSection/FeaturesSection";
import FoundationSection from "../components/LandingPage/Foundation";
import GallerySection from "../components/LandingPage/Gallery";*/
import { CardsSection } from "../components/LandingPage/Hero/Cards";
import Hero from "../components/LandingPage/Hero/Hero";
// import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import Layout from "@theme/Layout";
// import IntroCards from "../components/LandingPage/Hero/IntroCards";
import NewsCards from "../components/LandingPage/Hero/NewsCards";
import { NewsSection } from "../components/LandingPage/Hero/News";
/*import {
  CollapsedVisionSection,
  VisionSection,
} from "../components/LandingPage/Hero/VisionSection";*/
import NewsletterSection from "../components/LandingPage/NewsletterSection/NewsletterSection";
import React from "react";
//import Sustainable from "../components/LandingPage/Sustainable/Sustainable";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="World Computer"
      description={siteConfig.tagline}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <div className="bg-[#1B025A]">
        <Hero></Hero>
        <NewsCards />
        <CardsSection />
        <NewsSection />
      </div>

      <main className="w-full relative bg-[#1B025A] z-[0]">
        <div className="overflow-hidden">
          <NewsletterSection formUrl="https://dfinity.us16.list-manage.com/subscribe/post?u=33c727489e01ff5b6e1fb6cc6&amp;id=7e9469a315&amp;f_id=00bac2e1f0">
            Sign up for email updates{" "}
            <span className="text-white-60">
              to keep up to date with the Internet Computer
            </span>
          </NewsletterSection>
        </div>
      </main>
    </Layout>
  );
}
