import React from "react";
import Layout from "@theme/Layout";
import Header from "@site/src/components/DevelopersHome/Header";
import SampleCode from "@site/src/components/DevelopersHome/SampleCode";
import DappStart from "@site/src/components/DevelopersHome/DappStart";
import Contribute from "@site/src/components/DevelopersHome/Contribute";
import ShareMeta from "../components/Common/ShareMeta";

function Developers(): JSX.Element {
  return (
    <Layout
      title={"Developers Home"}
      description={
        "Learn how to build infinitely scalable dapps on the Internet Computer. Explore the possibilities of web 3.0 and learn how to make it reality."
      }
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-developers.jpeg"></ShareMeta>

      <main className="w-full overflow-hidden">
        <Header />
        <SampleCode />
        <DappStart />
        <Contribute />
      </main>
    </Layout>
  );
}

export default Developers;
