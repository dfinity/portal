import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Hero from "@site/src/components/BitcoinIntegrationPage/Hero";
import HowItWorks from "@site/src/components/BitcoinIntegrationPage/HowItWorks";
import ReleaseTimeline from "@site/src/components/BitcoinIntegrationPage/ReleaseTimeline";
import BuildWithBitcoin from "@site/src/components/BitcoinIntegrationPage/BuildWithBitcoin";

function BitcoinIntegration() {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className="text-black relative overflow-hidden">
        <Hero></Hero>
        <HowItWorks></HowItWorks>
        <ReleaseTimeline></ReleaseTimeline>
        <BuildWithBitcoin></BuildWithBitcoin>
      </main>
    </Layout>
  );
}

export default BitcoinIntegration;
