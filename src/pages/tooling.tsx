import React from "react";
import Layout from "@theme/Layout";
import BGCircle from "@site/static/img/purpleBlurredCircle.webp";
import BGCircleCommunity from "@site/static/img/samples/purplePinkBlur.png";
import PlusIcon from "@site/static/img/svgIcons/plus.svg";
import {
  dfinityToolingItems,
  communityToolingItems,
} from "@site/src/components/Common/toolingItems";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import clsx from "clsx";
import Head from "@docusaurus/Head";
import { useQueryParam } from "@site/src/utils/use-query-param";
import {
  DocsLink,
  ExternalLink,
  GitHubLink,
  LivePreviewLink,
  MotokoLink,
  RustLink,
  YoutubeLink,
} from "@site/src/components/Common/CardIcons";
import ShareMeta from "../components/Common/ShareMeta";

function Samples(): JSX.Element {
  const [numberOfItems, setNumberOfItems] = React.useState(40);
  const [numberOfCommunityItems, setNumberOfCommunityItems] =
    React.useState(40);
  const [queryTag, setQueryTag, queryTagInitialized] =
    useQueryParam<string>("tag");

  let filteredDfinityTools = dfinityToolingItems;
  let filteredCommunityTools = communityToolingItems;
  let totalToolsNumber =
    filteredCommunityTools.length + filteredDfinityTools.length;
  const tags = Object.keys(
    [...dfinityToolingItems, ...communityToolingItems].reduce((tags, p) => {
      if (!p.tags) return tags;
      for (const tag of p.tags) {
        tags[tag] = true;
      }
      return tags;
    }, {})
  );
  if (queryTagInitialized && queryTag?.length > 0) {
    filteredDfinityTools = dfinityToolingItems.filter((p) =>
      p.tags.find((tag) => tag == queryTag)
    );

    filteredCommunityTools = communityToolingItems.filter((p) =>
      p.tags.find((tag) => tag == queryTag)
    );
    totalToolsNumber =
      filteredCommunityTools.length + filteredDfinityTools.length;
  }

  function ToolCard({ title, description, tags, links }) {
    return (
      <div className="relative rounded-xl bg-white h-full" key={title}>
        <div className="h-full py-6 px-4 flex flex-col relative">
          <p className="tw-heading-5 mb-3 mx-2">{title}</p>
          <div className="flex flex-row gap-1 flex-wrap mb-3">
            {tags.map((tag) => (
              <button
                key={tag}
                className="tw-title-navigation-on-page font-circular capitalize text-infinite bg-white rounded-full border-infinite border-solid border py-1 px-2 hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors"
                onClick={() => setQueryTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="tw-paragraph mt-0 text-black-60 mb-auto mx-2 overflow-hidden">
            {description}
          </p>
          <div className={"flex flex-row gap-2 mt-4 mx-2"}>
            {links.motoko && <MotokoLink to={links.motoko} />}
            {links.rust && <RustLink to={links.rust} />}
            {links.livePreview && <LivePreviewLink to={links.livePreview} />}
            {links.docs && <DocsLink to={links.docs} />}
            {links.youtube && <YoutubeLink to={links.youtube} />}
            {links.github && <GitHubLink to={links.github} />}
            {links.external && <ExternalLink to={links.external} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout
      title={"Developer Tools"}
      description={
        "Explore developer tools by DFINITY and the community, and use them to improve and ease your development journey."
      }
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-tooling.jpeg"></ShareMeta>

      <main className="w-full overflow-hidden">
        <AnimateSpawn variants={transitions.container}>
          <section className="max-w-page w-9/10 mx-auto relative mt-20 md:mt-40 lg:mb-30">
            <img
              className="absolute pointer-events-none max-w-none w-[800px] -right-[320px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-350px] z-[-1000]"
              src={BGCircle}
              alt=""
            />
            <div className="max-w-page md:w-10/12 md:ml-1/12 mb-12 md:mb-16 md:pr-2/10">
              <motion.p
                variants={transitions.item}
                className="tw-heading-3 md:tw-heading-2"
              >
                Developer tools
              </motion.p>
              <motion.p
                variants={transitions.item}
                className="tw-lead-sm md:tw-lead mb-0"
              >
                Explore developer tools by DFINITY and the community, and use
                them to improve and ease your development journey.
              </motion.p>
            </div>

            <motion.div
              className="max-w-page md:w-10/12 md:ml-1/12 flex gap-10 md:gap-20 flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-5">
                  <span className="tw-heading-5 mr-2">Tools</span>
                  <span className="tw-paragraph rounded-xl bg-white px-2 py-0.5">
                    {totalToolsNumber}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap flex-1 items-center">
                  <button
                    className={clsx(
                      "inline-block font-circular rounded-xl border border-infinite border-solid tw-title-navigation py-[10px] px-4 capitalize hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors",
                      !queryTag
                        ? "text-white bg-infinite"
                        : "text-black bg-white"
                    )}
                    onClick={() => setQueryTag(undefined)}
                  >
                    All Tools
                  </button>
                  {tags.map((tag) => (
                    <button
                      className={clsx(
                        "inline-block font-circular rounded-xl border border-infinite border-solid tw-title-navigation py-[10px] px-4 capitalize hover:no-underline hover:bg-infinite hover:border-infinite hover:text-white transition-colors",
                        tag === queryTag
                          ? "text-white bg-infinite"
                          : "text-black bg-white"
                      )}
                      key={tag}
                      onClick={() => setQueryTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="mt-12 md:ml-1/12"
            >
              <p className="tw-heading-6 md:tw-heading-5">Tools by DFINITY</p>

              {filteredDfinityTools.length === 0 && (
                <p className="tw-paragraph text-black-60">
                  No tools by DFINITY available
                </p>
              )}
            </motion.div>
            <motion.div
              variants={transitions.item}
              className={clsx(
                "relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 auto-rows-fr transition-opacity",
                filteredDfinityTools.length === 0 ? "" : "mt-11 mb-20"
              )}
            >
              {filteredDfinityTools.slice(0, numberOfItems).map((tool) => (
                <ToolCard
                  title={tool.title}
                  description={tool.description}
                  tags={tool.tags}
                  links={tool.links}
                />
              ))}
            </motion.div>
            {filteredDfinityTools.length > numberOfItems && (
              <div
                className="flex mt-20 items-center justify-center tw-heading-6 text-infinite hover:text-black-60"
                onClick={() => setNumberOfItems(numberOfItems + 40)}
              >
                <div className="inline-block mr-2 h-6">
                  <PlusIcon />
                </div>
                <p className="mb-0">Load more</p>
              </div>
            )}

            <motion.div
              variants={transitions.item}
              className="mt-10 flex flex-col md:flex-row items-center relative"
            >
              <img
                className="absolute pointer-events-none max-w-none w-[800px] -right-[320px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-350px] z-[-1000]"
                src={BGCircleCommunity}
                alt=""
              />
              <div className="md:w-2/3 md:ml-1/12">
                <p className="md:w-6/10 tw-heading-6 md:tw-heading-5">
                  Community tools
                </p>
                <p className="md:w-6/10 tw-paragraph">
                  The Internet Computer has many tools built by the community.
                  Check out the repos and get building!
                </p>
                {/*<p className="inline-flex tw-title-navigation-on-page border-black-60 border-2 border-solid py-2 px-3 rounded-xl hover:text-white hover:bg-infinite transition-colors">
                  Submit your Repo
                </p>*/}
              </div>
              <div className="w-full md:w-4/10 md:mr-1/12">
                <p className="mt-6 md:mt-0 tw-paragraph-sm text-black-60">
                  Disclamer: Please use the following tools at your own risk and
                  always do your own research.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="relative my-14 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 auto-rows-fr transition-opacity"
            >
              {filteredCommunityTools
                .slice(0, numberOfCommunityItems)
                .map((tool) => (
                  <ToolCard
                    title={tool.title}
                    description={tool.description}
                    tags={tool.tags}
                    links={tool.links}
                  />
                ))}
            </motion.div>
            {filteredCommunityTools.length > numberOfCommunityItems && (
              <div
                className="flex mt-20 items-center justify-center tw-heading-6 text-infinite hover:text-black-60"
                onClick={() =>
                  setNumberOfCommunityItems(numberOfCommunityItems + 40)
                }
              >
                <div className="inline-block mr-2 h-6">
                  <PlusIcon />
                </div>
                <p className="mb-0">Load more</p>
              </div>
            )}
          </section>
        </AnimateSpawn>
      </main>
    </Layout>
  );
}

export default Samples;
