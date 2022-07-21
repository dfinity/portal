import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "@site/src/pages/developers.module.css";
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
      <main className={styles.main}>
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
