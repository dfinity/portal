import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Header from "@site/src/components/DevelopersHome/Header";
import SampleCode from "@site/src/components/DevelopersHome/SampleCode";
import Canisters from "@site/src/components/DevelopersHome/Canisters";
import DappStart from "@site/src/components/DevelopersHome/DappStart";
import Contribute from "@site/src/components/DevelopersHome/Contribute";
import AnnouncementBar from "@site/src/components/DevelopersHome/AnnouncementBar";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";

function Developers(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className="w-full overflow-hidden">
        <div className="mt-8 mx-auto mb-0 w-9/10 lg:w-[1110px] lg:mt-[104px] lg:mb-6">
          <AnnouncementBar
            text={"Voting for Supernova Community Choice Award"}
            link={"https://dfinity.org/supernova"}
          />
        </div>
        <Header />
        <SampleCode />
        <Canisters />
        <DappStart />
        <Contribute />
      </main>
    </Layout>
  );
}

export default Developers;
