import Layout from "@theme/Layout";
import React from "react";
import Ecosystem from "../components/Basics/Ecosystem";
import Ecosystem2 from "../components/Basics/Ecosystem2";
import Hero from "../components/Basics/Hero";
import HostWeb from "../components/Basics/HostWeb";
import InternetIdentity from "../components/Basics/InternetIdentity";
import ItsGreen from "../components/Basics/ItsGreen";
import TrueScaling from "../components/Basics/TrueScaling";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Head from "@docusaurus/Head";

const BasicsPage: React.FC = () => {
  resetNavBarStyle();
  return (
    <Layout
      title={"Basics"}
      description={
        "The Internet Computer is the first truly web-speed blockchain that is able to serve web pages on its own. Thanks to novel chain-key cryptography it is able to scale to infinitely many services that live on-chain."
      }
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-basics.jpeg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-basics.jpeg"
          }
        />
        <title>Basics</title>
      </Head>
      <main className="w-full overflow-hidden">
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
