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
import PreHero from "../components/LandingPage/PreHero";
import ShowcaseSection from "../components/LandingPage/Showcase";
import SlidersSection from "../components/LandingPage/Sliders";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <PreHero debugForces={false} paintParticles={true}></PreHero>

      <main
        className="w-full relative overflow-hidden bg-[#F1EEF5] z-[0]"
        style={{ marginTop: "calc(var(--ifm-navbar-height) * -1)" }}
      >
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
