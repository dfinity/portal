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
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import BasicsSection from "../components/LandingPage/Basics";
import FoundationSection from "../components/LandingPage/Foundation";
import HeroSection from "../components/LandingPage/HeroSection";
import NextGenSection from "../components/LandingPage/NextGen";
import PreHero from "../components/LandingPage/PreHero";
import ShowcaseSection from "../components/LandingPage/Showcase";
import SlidersSection from "../components/LandingPage/Sliders";
import Storage from "../components/LandingPage/Storage";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <PreHero debugForces={false} paintParticles={true}></PreHero>

      <main
        className="w-full relative bg-[#F1EEF5] z-[0]"
        style={{ marginTop: "calc(var(--ifm-navbar-height) * -1)" }}
      >
        <HeroSection></HeroSection>
        <BasicsSection></BasicsSection>
        <BackgroundPanel>
          <Dashboard />
          <Storage></Storage>
        </BackgroundPanel>
        <div className="overflow-hidden">
          
          <ShowcaseSection></ShowcaseSection>
          <NextGenSection></NextGenSection>
          <ItsGreenSection id="sustainable" />
          <FoundationSection></FoundationSection>
          <SlidersSection />
          <StartBuildingSection />
        </div>
      </main>
      <SectionsBar />
    </Layout>
  );
}
