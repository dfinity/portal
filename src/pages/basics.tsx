import Layout from "@theme/Layout";
import React from "react";
import Ecosystem from "../components/Basics/Ecosystem";
import Ecosystem2 from "../components/Basics/Ecosystem2";
import Hero from "../components/Basics/Hero";
import HostWeb from "../components/Basics/HostWeb";
import InternetIdentity from "../components/Basics/InternetIdentity";
import ItsGreen from "../components/Basics/ItsGreen";
import TrueScaling from "../components/Basics/TrueScaling";
import Head from "@docusaurus/Head";
import BackgroundPanel from "../components/LandingPage/BackgroundPanel";
import ShareMeta from "../components/Common/ShareMeta";

const BasicsPage: React.FC = () => {
  return (
    <Layout
      title="Basics"
      description="The Internet Computer is the first truly web-speed blockchain that is able to serve web pages on its own. Thanks to novel chain-key cryptography it is able to scale to infinitely many services that live on-chain."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-basics.jpeg"></ShareMeta>

      <main className="w-full overflow-hidden">
        <Hero></Hero>
        <HostWeb></HostWeb>
        <Ecosystem></Ecosystem>
        <TrueScaling></TrueScaling>
        <BackgroundPanel
          panelClassName="bg-infinite"
          outerClassName="pt-0 md:pt-20 md:pb-30"
          threshold={0.35}
        >
          <InternetIdentity></InternetIdentity>
        </BackgroundPanel>
        <Ecosystem2></Ecosystem2>
        <ItsGreen></ItsGreen>
      </main>
    </Layout>
  );
};

export default BasicsPage;
