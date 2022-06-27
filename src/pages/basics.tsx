import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React, { useEffect } from "react";
import Ecosystem from "../components/Basics/Ecosystem";
import Ecosystem2 from "../components/Basics/Ecosystem2";
import Hero from "../components/Basics/Hero";
import HostWeb from "../components/Basics/HostWeb";
import InternetIdentity from "../components/Basics/InternetIdentity";
import ItsGreen from "../components/Basics/ItsGreen";
import TrueScaling from "../components/Basics/TrueScaling";
import styles from "./basics.module.css";

const BasicsPage: React.FC = () => {
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
        <Hero></Hero>
        <HostWeb></HostWeb>
        <Ecosystem></Ecosystem>
        <TrueScaling></TrueScaling>
        <InternetIdentity></InternetIdentity>
        <Ecosystem2></Ecosystem2>
        <ItsGreen></ItsGreen>
      </main>
    </Layout>
  );
};

export default BasicsPage;
