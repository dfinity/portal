import Link from "@docusaurus/Link";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";

function DefiPage() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>

      <main className="text-black relative overflow-hidden container-12 py-20 ">
        <h1 className="tw-heading-60 mb-20">Design library</h1>
        <div className="grid grid-cols-4 gap-5">
          <Link href="/buttons" className="button-outline text-center">
            Buttons
          </Link>
          <Link href="/links" className="button-outline  text-center">
            Links
          </Link>
          <Link href="/typography" className="button-outline  text-center">
            Typography
          </Link>
          <Link href="/input" className="button-outline  text-center">
            Input fields
          </Link>
          <Link href="/checklist" className="button-outline  text-center">
            Checklists
          </Link>

          <Link href="/on-page-nav" className="button-outline  text-center">
            On-page navigation
          </Link>
          <Link href="/on-chain-badge" className="button-outline  text-center">
            On-chain badge
          </Link>
          <Link href="/tooltips" className="button-outline  text-center">
            Tooltips
          </Link>
        </div>
      </main>
    </Layout>
  );
}

export default DefiPage;
