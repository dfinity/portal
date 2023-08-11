import Link from "@docusaurus/Link";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";

function Page() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>
      <div className="container-12 py-12">
        <Breadcrumbs
          links={[
            {
              text: "Inputs",
            },
          ]}
        ></Breadcrumbs>
      </div>
      <main className="container-12 py-10">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex flex-col gap-2 items-start w-full max-w-lg">
            <input
              type="text"
              className="input-text block w-full"
              placeholder="Regular input field"
            ></input>
          </div>
          <div className="bg-infinite p-8 w-full">
            <div className="flex flex-col gap-2 items-start w-full max-w-lg">
              <input
                type="text"
                className="input-text input-text-white block w-full"
                placeholder="White input field"
              ></input>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
