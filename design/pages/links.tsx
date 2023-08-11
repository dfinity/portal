import Link from "@docusaurus/Link";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";

function DefiPage() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>

      <main className="container-12 py-20">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex flex-col gap-2 items-start ">
            <Link href="" className="link-primary">
              Primary link
            </Link>
            <Link href="" className="link-primary link-with-icon">
              <LinkArrowRight /> Primary link with icon
            </Link>
            <Link href="" className="link-primary link-with-icon">
              Primary link with icon <LinkArrowUpRight />{" "}
            </Link>
          </div>

          <div className="flex flex-col gap-2 items-start bg-infinite p-8">
            <Link href="" className="link-white">
              White link
            </Link>
            <Link href="" className="link-white link-with-icon">
              <LinkArrowRight /> White link with icon
            </Link>
            <Link href="" className="link-white link-with-icon">
              White link with icon <LinkArrowUpRight />{" "}
            </Link>
          </div>

          <div className="mt-10">
            <h2 className="tw-heading-6 mb-2">Body link (subtle)</h2>
            <p className="md:w-6/10 m-0 tw-paragraph">
              Lorem ipsum dolor sit amet{" "}
              <Link href="" className="link-subtle">
                consectetur
              </Link>{" "}
              adipisicing elit. Qui illum laboriosam ratione similique
              temporibus reprehenderit, enim delectus in, quo magnam modi
              accusamus iste, omnis ut. Rerum iusto aperiam officiis tempore?
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default DefiPage;
