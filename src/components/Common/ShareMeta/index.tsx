import Head from "@docusaurus/Head";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

const ShareMeta: React.FC<{
  image?: string;
}> = ({ image = "/img/share.jpg" }) => {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();

  const shareImageUrl = `${siteConfig.url}${image}`;
  const pageUrl = `${siteConfig.url}${location.pathname}`;

  const host = new URL(siteConfig.url).host;

  return (
    <Head>
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={shareImageUrl} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={host} />
      <meta property="twitter:url" content={pageUrl} />
      <meta name="twitter:image" content={shareImageUrl} />
    </Head>
  );
};

export default ShareMeta;
