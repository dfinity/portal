import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Features from "@site/src/components/LandingPage/Features";
import SectionsBar from "@site/src/components/LandingPage/SectionsBar";
import HeroSection from "@site/src/components/LandingPage/HeroSection";
import Dashboard from "@site/src/components/LandingPage/Dashboard";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ParticleBackground from "@site/src/components/LandingPage/ParticleBackground";
import ICPToken from "@site/src/components/LandingPage/ICPToken";
import Showcase from "@site/src/components/LandingPage/Showcase";
import StartBuilding from "@site/src/components/LandingPage/StartBuilding";
import Foundation from "@site/src/components/LandingPage/Foundation";
import BackgroundGradient from "@site/static/img/bgGradient.png";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Sliders from "../components/LandingPage/Sliders";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className="w-full relative overflow-hidden">
        <img
          src={BackgroundGradient}
          className="absolute pointer-events-none max-w-none w-[600px] -right-[300px] top-[100px] sm:w-[800px] sm:-right-[370px] sm:top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[-200px] md:top-[-200px] z-[-1000]"
          alt=""
        />
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
              pixelDensity={1}
            />
          )}
        </BrowserOnly>
        <HeroSection />
        <Dashboard />
        <Sliders />
        <Features />
        <Showcase />
        <Foundation />
        <ICPToken />
        <StartBuilding />
        <SectionsBar />
      </main>
    </Layout>
  );
}
