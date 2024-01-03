import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { useEffect } from "react";
import ShareMeta from "../components/Common/ShareMeta";

const IcpNewsletterRedirectPage: React.FC = () => {
  const metaDescription =
    "Stay informed with the latest on the Internet Computer. Browse the previous Newsletters for current updates.";
  const title = "ICP News & Updates Mailing";
  const { siteConfig } = useDocusaurusContext();

  const redirectTo =
    "https://us16.campaign-archive.com/home/?u=33c727489e01ff5b6e1fb6cc6&id=7e9469a315";

  useEffect(() => {
    // redirect with JS as well, just in case...
    window.location.href = redirectTo;
  }, []);

  return (
    <>
      <ShareMeta image="/img/shareImages/share-icp-newsletter-2.jpg"></ShareMeta>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={metaDescription} />

        <meta name="twitter:site" content={siteConfig.url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />

        {/* add a small delay of 1 second to prevent anecdotal security warning */}
        <meta httpEquiv="refresh" content={`1; url=${redirectTo}`} />
      </Head>

      <main className="fixed inset-0 flex justify-center items-center">
        {/* spinner in the center of screen */}
        <div className="spinner">
          <span className="bounce1" />
          <span className="bounce2" />
          <span className="bounce3" />
        </div>
      </main>
    </>
  );
};

export default IcpNewsletterRedirectPage;
