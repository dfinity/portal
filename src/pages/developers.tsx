import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Header from "@site/src/components/DevelopersHome/Header";
import SampleCode from "@site/src/components/DevelopersHome/SampleCode";
import Canisters from "@site/src/components/DevelopersHome/Canisters";
import DappStart from "@site/src/components/DevelopersHome/DappStart";
import Contribute from "@site/src/components/DevelopersHome/Contribute";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Head from "@docusaurus/Head";
import shareImage from "@site/static/img/shareImages/share-developers.jpeg";

function Developers(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Head>
        <meta property="og:image" content={shareImage} />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-developers.jpeg"
          }
        />
      </Head>
      <main className="w-full overflow-hidden">
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
