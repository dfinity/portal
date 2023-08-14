import React from "react";
import ShareMeta from "../components/Common/ShareMeta";

const Page = () => {
  return (
    <ShareMeta image="/img/shareImages/share-deck-v7.jpg">
      <title>Build on the network. ICP | Internet Computer ∞</title>
      <meta
        name="description"
        content="What the World Computer does, and how it works, in 5 minutes"
      />
      <meta
        property="og:title"
        content="Build on the network. ICP | Internet Computer ∞"
      />
      <meta
        property="og:description"
        content="What the World Computer does, and how it works, in 5 minutes"
      />
      <meta http-equiv="refresh" content={`0; url=/icp-version-7.pdf`} />
    </ShareMeta>
  );
};

export default Page;
