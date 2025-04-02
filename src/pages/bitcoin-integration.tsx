import BuildWithBitcoin from "@site/src/components/BitcoinIntegrationPage/BuildWithBitcoin";
import React, { useRef } from "react";
import Layout from "@theme/Layout";
import Hero from "@site/src/components/BitcoinIntegrationPage/Hero";
import HowItWorks from "@site/src/components/BitcoinIntegrationPage/HowItWorks";
import Videos from "@site/src/components/BitcoinIntegrationPage/Videos";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import ShareMeta from "../components/Common/ShareMeta";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import Content from "../components/BitcoinIntegrationPage/Content";
import News from "../components/BitcoinIntegrationPage/News";

function BitcoinIntegration() {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(ref);

  return (
    <Layout
      title="Build on Bitcoin"
      description="Leveraging Chain Fusion technology, ICP canister smart contracts can directly read and write to the Bitcoin network. This establishes ICP as the industry's premier orchestration layer, enabling dapps to natively interact with the Bitcoin blockchain."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-bitcoin-integration.webp"></ShareMeta>

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
        <News />
      </main>
    </Layout>
  );
}

export default BitcoinIntegration;
