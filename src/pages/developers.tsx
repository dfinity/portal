import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "@site/src/pages/developers.module.css";
import Header from "@site/src/components/DevelopersHome/Header";
import SampleCode from "@site/src/components/DevelopersHome/SampleCode";
import Canisters from "@site/src/components/DevelopersHome/Canisters";
import DappStart from "@site/src/components/DevelopersHome/DappStart";
import Contribute from "@site/src/components/DevelopersHome/Contribute";
import AnnouncementBar from "@site/src/components/DevelopersHome/AnnouncementBar";

function Developers(): JSX.Element {
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
        <div className={styles.announcementBar}>
          <AnnouncementBar
            text={"Voting for Supernova Community Choice Award"}
            link={
              "https://dfinity.org/supernova"
            }
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
