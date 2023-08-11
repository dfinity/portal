import Link from "@docusaurus/Link";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";

function Design() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>
      <main>
        <div className="container-12 py-12">
          <Breadcrumbs
            links={[
              {
                text: "Page 1",
                href: "/breadcrumbs",
              },
              {
                text: "Page 2",
                href: "/breadcrumbs",
              },
              {
                text: "Breadcrumbs",
              },
            ]}
          ></Breadcrumbs>
        </div>
        <div className="bg-infinite">
          <div className="container-12 py-12">
            <Breadcrumbs
              theme="dark"
              links={[
                {
                  text: "Page 1",
                  href: "/breadcrumbs",
                },
                {
                  text: "Page 2",
                  href: "/breadcrumbs",
                },
                {
                  text: "Breadcrumbs",
                },
              ]}
            ></Breadcrumbs>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Design;
