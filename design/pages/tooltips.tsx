import Link from "@docusaurus/Link";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import Tooltip from "@site/src/components/Common/Tooltip";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";

function Page() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>
      <div className="container-12 py-12">
        <Breadcrumbs
          links={[
            {
              text: "Tooltips",
            },
          ]}
        ></Breadcrumbs>
      </div>
      <main className="px-8 py-20">
        <div className="flex justify-between">
          <Tooltip
            tooltip="Tooltip respecting the viewport"
            className="w-52 whitespace-normal text-center"
          >
            <div className="button-primary">Left</div>
          </Tooltip>
          <Tooltip
            tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl."
            className="w-52 whitespace-normal text-center"
          >
            <div className="button-primary">Center</div>
          </Tooltip>
          <Tooltip
            tooltip="Tooltip respecting the viewport"
            className="w-52 whitespace-normal text-center"
          >
            <div className="button-primary">Right</div>
          </Tooltip>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
