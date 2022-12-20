import React from "react";
import Layout from "@theme/Layout";
import Hero from "@site/src/components/BitcoinIntegrationPage/Hero";
import HowItWorks from "@site/src/components/BitcoinIntegrationPage/HowItWorks";
import ReleaseTimeline from "@site/src/components/BitcoinIntegrationPage/ReleaseTimeline";
import BuildWithBitcoin from "@site/src/components/BitcoinIntegrationPage/BuildWithBitcoin";
import Head from "@docusaurus/Head";
import Videos from "@site/src/components/BitcoinIntegrationPage/Videos";

function BitcoinIntegration() {
  return (
    <Layout
      title="Bitcoin Integration"
      description="The Internet Computer enables direct integration with the Bitcoin network. By way of bridge-less communication with the Bitcoin network and a novel threshold ECDSA protocol, canisters on the Internet Computer can now securely receive, hold, and send bitcoins."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-bitcoin-integration.jpeg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-bitcoin-integration.jpeg"
          }
        />
        <title>Bitcoin Integration</title>
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
