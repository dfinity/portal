import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Hero from "@site/src/components/BitcoinIntegrationPage/Hero";
import HowItWorks from "@site/src/components/BitcoinIntegrationPage/HowItWorks";
import ReleaseTimeline from "@site/src/components/BitcoinIntegrationPage/ReleaseTimeline";
import BuildWithBitcoin from "@site/src/components/BitcoinIntegrationPage/BuildWithBitcoin";
import Head from "@docusaurus/Head";
import shareImage from "@site/static/img/shareImages/share-bitcoin-integration.jpeg";
import Videos from "@site/src/components/BitcoinIntegrationPage/Videos";

function BitcoinIntegration() {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();
  return (
    <Layout
      title="Bitcoin Integration"
      description="The Internet Computer enables direct integration with the Bitcoin network. By way of bridge-less communication with the Bitcoin network and a novel threshold ECDSA protocol, canisters on the Internet Computer can now securely receive, hold, and send bitcoins."
    >
      <Head>
        <meta property="og:image" content={shareImage} />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-bitcoin-integration.jpeg"
          }
        />
      </Head>
      <main className="text-black relative overflow-hidden">
        <Hero></Hero>
        <HowItWorks></HowItWorks>
        <ReleaseTimeline></ReleaseTimeline>
        <Videos></Videos>
        <BuildWithBitcoin></BuildWithBitcoin>
      </main>
    </Layout>
  );
}

export default BitcoinIntegration;
