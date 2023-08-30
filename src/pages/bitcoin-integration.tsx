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

function BitcoinIntegration() {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(ref);

  return (
    <Layout
      title="Bitcoin <> ICP"
      description="ICP natively integrate with the Bitcoin network without intermediaries.
                   Chain-key Bitcoin (ckBTC), introduces speed, scalability and low
                   transaction fees to bitcoin for practical use."
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
