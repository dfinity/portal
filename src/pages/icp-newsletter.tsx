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

const IcpNewsletterRedirectPage: React.FC = () => {
  return (
    <Layout
      title="ICP News & Updates Mailing"
      description="Stay informed with the latest on the Internet Computer. Browse the previous Newsletters for current updates."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-icp-newsletter.jpg"></ShareMeta>
      <Head>
        <meta
          httpEquiv="refresh"
          content="0; url=https://us16.campaign-archive.com/home/?u=33c727489e01ff5b6e1fb6cc6&id=7e9469a315"
        />
      </Head>
      <main className="w-full overflow-hidden">
        <div className="container-10 py-30 md:py-40 tw-lead">
          Please wait while you are redirected to the ICP Newsletter archive.
        </div>
      </main>
    </Layout>
  );
};

export default IcpNewsletterRedirectPage;
