import Head from "@docusaurus/Head";
import BuildWithBitcoin from "@site/src/components/BitcoinIntegrationPage/BuildWithBitcoin";
import Hero from "@site/src/components/BitcoinIntegrationPage/Hero";
import HowItWorks from "@site/src/components/BitcoinIntegrationPage/HowItWorks";
import Videos from "@site/src/components/BitcoinIntegrationPage/Videos";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Layout from "@theme/Layout";
import React, { useRef } from "react";
import Content from "../components/BitcoinIntegrationPage/Content";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import ShareMeta from "../components/Common/ShareMeta";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

function BitcoinIntegration() {
  resetNavBarStyle();
  const ref = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(ref);

  return (
    <Layout
      title="Bitcoin on ICP"
      description="The Internet Computer (ICP) cryptographically integrates with the
      Bitcoin network, unleashing a plethora of opportunities to securely
      execute bitcoin transactions 100% on chain."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-bitcoin-integration.jpeg"></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <Hero ref={ref}></Hero>
        <HowItWorks></HowItWorks>
        <Content></Content>
        {/* <ReleaseTimeline></ReleaseTimeline> */}
        <Videos></Videos>
        <BuildWithBitcoin></BuildWithBitcoin>
      </main>
    </Layout>
  );
}

export default BitcoinIntegration;
