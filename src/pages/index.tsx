import React, { useEffect } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Features from "@site/src/components/LandingPage/Features";
import SectionsBar from "@site/src/components/LandingPage/SectionsBar";
import HeroSection from "@site/src/components/LandingPage/HeroSection";
import Dashboard from "@site/src/components/LandingPage/Dashboard";
import styles from "./index.module.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ParticleBackground from "@site/src/components/LandingPage/ParticleBackground";
import ICPToken from "@site/src/components/LandingPage/ICPToken";
import Showcase from "@site/src/components/LandingPage/Showcase";
import StartBuilding from "@site/src/components/LandingPage/StartBuilding";
import Foundation from "@site/src/components/LandingPage/Foundation";
import BackgroundGradient from "@site/static/img/bgGradient.png";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ifm-color-primary",
      "#3b00b9"
    );
  }, []);
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.main}>
        <div className={styles.BGGradient}>
          <img src={BackgroundGradient} alt="" />
        </div>
        <BrowserOnly>
          {() => (
            <div className={styles.particleBackground}>
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
            </div>
          )}
        </BrowserOnly>
        <HeroSection />
        <Dashboard />
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
