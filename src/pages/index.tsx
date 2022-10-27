import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Dashboard from "@site/src/components/LandingPage/Dashboard";
import ParticleBackground from "@site/src/components/LandingPage/ParticleBackgroundVanilla";
import SectionsBar from "@site/src/components/LandingPage/SectionsBar";
import StartBuildingSection from "@site/src/components/LandingPage/StartBuilding";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Layout from "@theme/Layout";
import React from "react";
import ItsGreenSection from "../components/Basics/ItsGreen";
import BasicsSection from "../components/LandingPage/Basics";
import FoundationSection from "../components/LandingPage/Foundation";
import HeroSection from "../components/LandingPage/HeroSection";
import NextGenSection from "../components/LandingPage/NextGen";
import ShowcaseSection from "../components/LandingPage/Showcase";
import SlidersSection from "../components/LandingPage/Sliders";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className="w-full relative overflow-hidden">
        <BrowserOnly>
          {() => (
            <ParticleBackground
              width={document.body.clientWidth}
              height={document.body.clientHeight * 2}
              particleCount={100}
              frameRate={30}
              centerX={document.body.clientWidth * 0.8}
              centerY={document.body.clientHeight * 0.4}
              duration={12500}
            />
          )}
        </BrowserOnly>
        <HeroSection></HeroSection>
        <BasicsSection></BasicsSection>
        <Dashboard />
        <ShowcaseSection></ShowcaseSection>

        <div className="overflow-hidden">
          <NextGenSection></NextGenSection>
          <ItsGreenSection id="sustainable" />
          <FoundationSection></FoundationSection>
        </div>
        <SlidersSection />
        <StartBuildingSection />
        <SectionsBar />
      </main>
    </Layout>
  );
}
