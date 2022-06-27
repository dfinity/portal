import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React, { useEffect } from "react";
// import Breadcrumbs from "../components/Common/Breadcrumbs";
// import DocBreadcrumbs from "../theme/DocBreadcrumbs";
import styles from "./basics.module.css";
import Hero from "../components/Basics/Hero";
import HostWeb from "../components/Basics/HostWeb";
import Ecosystem from "../components/Basics/Ecosystem";
import TrueScaling from "../components/Basics/TrueScaling";
import InternetIdentity from "../components/Basics/InternetIdentity";
import { useViewportScroll } from "framer-motion";
import Ecosystem2 from "../components/Basics/Ecosystem2";
import ItsGreen from "../components/Basics/ItsGreen";

const BasicsPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  const { scrollYProgress } = useViewportScroll();

  console.log(scrollYProgress);

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
