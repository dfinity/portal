import BlobBlue from "@site/static/img/purpleBlurredCircle.png";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

import transitions from "@site/static/transitions.json";

import AnimateSpawn from "../components/Common/AnimateSpawn";
import useGlobalData from "@docusaurus/useGlobalData";
import { ShowcaseProject } from "../components/ShowcasePage/ShowcaseProject";
import Project from "../components/ShowcasePage/Project";
import { useQueryParam } from "../utils/use-query-param";
import clsx from "clsx";
import Link from "@docusaurus/Link";

function sortDesktopProjects(projects: ShowcaseProject[]): ShowcaseProject[] {
  const small = projects.filter((p) => p.display !== "Large");
  const large = projects.filter((p) => p.display === "Large");
  const sorted: ShowcaseProject[] = [];

  while (true) {
    const isLastLarge = sorted[sorted.length - 1]?.display === "Large";

    if (isLastLarge) {
      if (small.length >= 3) {
        sorted.push(...small.splice(0, 3));
      } else if (small.length < 3 && large.length > 0) {
        sorted.push(...large.splice(0, large.length));
      } else {
        sorted.push(...small.splice(0, 3));
      }
    } else if (large.length > 0) {
      sorted.push(...large.splice(0, 1));
    } else {
      sorted.push(...small.splice(0, small.length));
    }

    if (small.length === 0 && large.length === 0) break;
  }

  return sorted;
}

function ShowcasePage(): JSX.Element {
  const [queryTag, setQueryTag, queryTagInitialized] = useQueryParam("tag");
  const filtersRef = useRef<HTMLDivElement>();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ifm-color-primary",
      "#3b00b9"
    );
  }, []);

  const projects = useGlobalData()["showcase-projects"]
    .default as ShowcaseProject[];

  const tags = Object.keys(
    projects.reduce((tags, p) => {
      if (!p.tags) return tags;
      for (const tag of p.tags) {
        tags[tag.toLowerCase()] = true;
      }
      return tags;
    }, {})
  );

  let filteredProjects = projects;
  if (queryTagInitialized && queryTag?.length > 0) {
    filteredProjects = filteredProjects.filter((p) =>
      p.tags.find((tag) => tag.toLowerCase() == queryTag)
    );
  }

  let sortedProjects = sortDesktopProjects(filteredProjects);

  return (
    <Layout
      title="Showcase"
      description="Explore a showcase of curated projects built by the Internet Computer ecosystem. This continually growing list features the newest projects, all built with blockchain. Try out decentralized social media, dapps and more. Only possible on the IC. "
    >
      <main className="text-black relative overflow-hidden">
        <AnimateSpawn variants={transitions.container}>
          <motion.img
            src={BlobBlue}
            alt=""
            className="absolute pointer-events-none max-w-none w-[800px] -right-[370px] top-[-100px] md:w-[1500px]  md:right-[-700px] 2xl:left-1/2 translate-x-[200px] md:top-[-200px] z-[1000]"
            variants={transitions.item}
          />
          <section className="max-w-page relative px-6 pt-12 mb-10 md:mb-20 md:px-12.5 md:mx-auto  md:pt-48 overflow-hidden">
            <div className="md:w-7/10 lg:w-6/10 md:ml-1/12" ref={filtersRef}>
              <motion.h1
                className="tw-heading-3 md:tw-heading-2"
                variants={transitions.item}
              >
                Explore the Internet Computer Ecosystem
              </motion.h1>
            </div>
          </section>

          <section className="max-w-page px-6 mb-12 md:mb-20 md:px-12.5 md:mx-auto">
            <motion.div
              className="flex gap-10 md:gap-20 flex-col md:flex-row"
              variants={transitions.item}
            >
              <div className="flex gap-3 flex-wrap flex-1">
                <button
                  className={clsx(
                    "capitalize font-circular text-navigation cursor-pointer border-infinite-60 border border-solid py-2 px-4 rounded-xl hover:text-white hover:bg-infinite-60 transition-colors",
                    !queryTag
                      ? "text-white bg-infinite-60"
                      : "text-black bg-transparent"
                  )}
                  onClick={() => setQueryTag(undefined)}
                >
                  All projects
                </button>
                {tags.map((tag) => (
                  <button
                    className={clsx(
                      "capitalize font-circular text-navigation cursor-pointer border-infinite-60 border border-solid py-2 px-4 rounded-xl hover:text-white hover:bg-infinite-60 transition-colors",
                      tag.toLowerCase() === queryTag?.toLowerCase()
                        ? "text-white bg-infinite-60"
                        : "text-black bg-transparent"
                    )}
                    key={tag}
                    onClick={() => setQueryTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-black-60 tw-paragraph-sm md:w-3/12">
                <strong className="text-black ">Do your own research:</strong>{" "}
                All of these dapps are using the novel Internet Computer
                blockchain. Use the following projects at your own risk. As
                always, do your own research.
              </p>
            </motion.div>
          </section>
        </AnimateSpawn>

        <section className="max-w-page px-6 md:px-12.5 md:mx-auto">
          <AnimateSpawn
            el={motion.span}
            className="tw-heading-4 mb-4 block"
            variants={transitions.item}
          >
            {sortedProjects.length} project
            {sortedProjects.length > 1 ? "s " : " "}
            {!queryTag ? (
              `featured`
            ) : (
              <>
                in <span className="capitalize">{queryTag}</span>
              </>
            )}
          </AnimateSpawn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-3 transition-opacity">
            {sortedProjects.map((project) => (
              <Project
                large={project.display === "Large"}
                project={project}
                key={project.website}
                onTagClick={(tag) => {
                  filtersRef.current.scrollIntoView({ behavior: "smooth" });
                  setQueryTag(tag.toLowerCase());
                }}
              ></Project>
            ))}
          </div>
        </section>
        <section className="max-w-page relative px-6 pt-12 md:px-12.5 md:mx-auto py-20 md:py-40 overflow-hidden">
          <motion.h2
            className="tw-heading-3 md:tw-heading-2 md:w-8/12 mb-10"
            variants={transitions.item}
          >
            Start Building On The Internet Computer?
          </motion.h2>
          <div className="flex gap-3 sm:gap-8 flex-col sm:flex-row items-start">
            <Link to="/developers" className="button-primary">
              Start Coding
            </Link>
            <Link href="https://dfinity.org/grants" className="button-outline">
              Developer Grants
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ShowcasePage;
