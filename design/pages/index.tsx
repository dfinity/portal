import Link from "@docusaurus/Link";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";

function DefiPage() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>

      <main className="text-black relative overflow-hidden container-12 py-30 grid grid-cols-4 gap-5">
        <Link href="/buttons" className="button-outline text-center">
          Buttons
        </Link>
        <Link href="/links" className="button-outline  text-center">
          Links
        </Link>
        <Link href="/typography" className="button-outline  text-center">
          Typography
        </Link>
      </main>
    </Layout>
  );
}

export default DefiPage;
