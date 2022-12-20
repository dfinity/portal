import React from "react";
import Layout from "@theme/Layout";
import Header from "@site/src/components/DevelopersHome/Header";
import SampleCode from "@site/src/components/DevelopersHome/SampleCode";
import Canisters from "@site/src/components/DevelopersHome/Canisters";
import DappStart from "@site/src/components/DevelopersHome/DappStart";
import Contribute from "@site/src/components/DevelopersHome/Contribute";
import Head from "@docusaurus/Head";

function Developers(): JSX.Element {
  return (
    <Layout
      title={"Developers Home"}
      description={
        "Learn how to build infinitely scalable dapps on the Internet Computer. Explore the possibilities of web 3.0 and learn how to make it reality."
      }
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <Head>
        <meta
          property="og:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-developers.jpeg"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://internetcomputer.org/img/shareImages/share-developers.jpeg"
          }
        />
        <title>Developers Home</title>
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
