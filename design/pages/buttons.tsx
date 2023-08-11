import Link from "@docusaurus/Link";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import ShareMeta from "@site/src/components/Common/ShareMeta";
import Layout from "@theme/Layout";
import React from "react";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import Breadcrumbs from "@site/src/components/Common/Breadcrumbs";

function Design() {
  return (
    <Layout title="Design showcase">
      <ShareMeta image="/img/shareImages/share-defi.jpg"></ShareMeta>
      <div className="container-12 py-12">
        <Breadcrumbs
          links={[
            {
              text: "Buttons",
            },
          ]}
        ></Breadcrumbs>
      </div>
      <main className="container-12 py-10">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex gap-2 items-start">
            <button className="button-primary cursor-pointer">
              Primary (button)
            </button>
            <Link className="button-primary" href="https://google.com">
              Primary (a)
            </Link>

            <Link
              className="button-primary button-with-icon"
              href="https://google.com"
            >
              With Icon (a) <LinkArrowRight />
            </Link>
          </div>
          <div className="flex gap-2 items-start">
            <button className="button-outline cursor-pointer">
              Outline (button)
            </button>
            <Link className="button-outline" href="https://google.com">
              Outline (a)
            </Link>
            <Link
              className="button-outline button-with-icon"
              href="https://google.com"
            >
              With Icon (a) <LinkArrowRight />
            </Link>
          </div>
          <div className="flex gap-2 items-start">
            <button className="button-fancy cursor-pointer">
              Fancy (button)
            </button>
            <Link className="button-fancy" href="https://google.com">
              Fancy (a)
            </Link>
            <Link
              className="button-fancy button-with-icon"
              href="https://google.com"
            >
              With Icon (a) <LinkArrowRight />
            </Link>
          </div>
          <div className="flex gap-2 items-start">
            <button className="button-primary button-small cursor-pointer">
              Small (button)
            </button>
            <Link
              className="button-primary button-small"
              href="https://google.com"
            >
              Small (a)
            </Link>
            {/* <Link
          className="button-primary button-small button-with-icon"
          href="https://google.com"
        >
          Small (a) <LinkArrowRight />
        </Link> */}
            <button className="button-outline button-small cursor-pointer">
              Small (button)
            </button>
            <Link
              className="button-outline button-small"
              href="https://google.com"
            >
              Small (a)
            </Link>
            <button className="button-fancy button-small cursor-pointer">
              Small (button)
            </button>
            <Link
              className="button-fancy button-small"
              href="https://google.com"
            >
              Small (a)
            </Link>
          </div>
          <div className="bg-infinite p-8 space-y-8">
            <div className="flex gap-2 items-start ">
              <button className="button-white cursor-pointer">
                White (button)
              </button>
              <Link className="button-white" href="https://google.com">
                White (a)
              </Link>
              <Link
                className="button-white button-with-icon"
                href="https://google.com"
              >
                With Icon (a) <LinkArrowRight />
              </Link>
            </div>
            <div className="flex gap-2 items-start ">
              <button className="button-outline-white cursor-pointer">
                Outline White (button)
              </button>
              <Link className="button-outline-white" href="https://google.com">
                Outline White (a)
              </Link>
              <Link
                className="button-outline-white button-with-icon"
                href="https://google.com"
              >
                With Icon (a) <LinkArrowRight />
              </Link>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <button className="button-round cursor-pointer">
              Round (button)
            </button>
            <Link className="button-round" href="https://google.com">
              Round (a)
            </Link>
          </div>
          <div className="">
            <div className="flex gap-2 items-center">
              <div className="tw-heading-7">Round icon button</div>
              <button className="button-round-icon cursor-pointer">
                <GithubIcon />
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="tw-heading-7">Round icon link</div>
              <Link className="button-round-icon" href="https://google.com">
                <GithubIcon />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Design;
