import Head from "@docusaurus/Head";
import React from "react";
import Redirect from "../components/Common/Redirect";
import ShareMeta from "../components/Common/ShareMeta";

const Page = () => {
  return (
    <ShareMeta image="/img/shareImages/share-deck-v7.jpg">
      <title>Build on the network. ICP | Internet Computer ∞</title>
      <meta
        name="description"
        content="What the World Computer does, and how it works, in 5 minutes"
      />
      <Redirect to="/icp-version-7.pdf" />
    </ShareMeta>
  );
};

export default Page;
