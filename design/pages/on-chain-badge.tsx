import Link from "@docusaurus/Link";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import { OnChainBadge } from "@site/src/components/Common/OnChainBadge/OnChainBadge";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";

function Page() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>
      <DarkHeroStyles />
      <main className="container-12  bg-infinite py-10">
        <div className=" py-12">
          <Breadcrumbs
            theme="dark"
            links={[
              {
                text: "On chain badge",
              },
            ]}
          ></Breadcrumbs>
        </div>
        <div className="flex flex-col gap-6 justify-center items-center py-20">
          <OnChainBadge />
        </div>
      </main>
    </Layout>
  );
}

export default Page;
