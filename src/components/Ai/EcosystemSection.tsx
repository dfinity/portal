import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import showcaseData from "../../../showcase.json";
import Tooltip from "../Common/Tooltip";
import TwitterIcon from "@site/static/img/svgIcons/twitter.svg";
import YoutubeIcon from "@site/static/img/svgIcons/youtube.svg";
import GithubIcon from "@site/static/img/svgIcons/github.svg";

const selectedProjectIds = [
  'elnaai',
  'seers',
  'anda',
  'alice',
  'kinic',
  'onicai',
  'decideai',
  'pickpump'
]
const projects = selectedProjectIds
  .map(id => showcaseData.find(p => p.id === id))
  .filter((p): p is typeof showcaseData[0] => p !== undefined);

const EcosystemSection: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <section id={id} className="relative container-12 mt-12 mb-24 sm:mt-52 md:mt-40">
      <AnimateSpawn variants={transitions.item}>
        <motion.h2 className="tw-heading-4 md:tw-heading-60 text-left text-center my-12 mb-8 md:mb-16 md:w-5/10 md:mx-auto text-balance">
          AI Agent Ecosystem on ICP
        </motion.h2>
        <AnimateSpawn
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
          variants={transitions.container}
        >
          {projects?.map((project) => (

            <div className="rounded-xl bg-white-80 flex px-6 py-8 backdrop-blur-2xl">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-4 h-full max-w-full max-w-sm">
                  <div className="flex gap-2 items-center">
                    <img
                      src={project.logo}
                      className="w-14 h-14 object-contain"
                      alt={`${project.name} logo`}
                    ></img>
                    <div className="flex-1">
                      <div>
                        <h3
                          className="tw-heading-5 mb-0 pr-6"
                          style={{ wordBreak: "break-word" }}
                        >
                          {project.name}
                          {project.usesInternetIdentity && (
                            <i className="inline-block ml-1 mb-1 cursor-pointer">
                              <Tooltip
                                tooltip="Uses Internet Identity"
                                className="text-center w-44"
                              >
                                <img
                                  className=""
                                  src="/img/showcase/ii-badge.svg"
                                  alt="The project uses Internet Identity"
                                ></img>
                              </Tooltip>
                            </i>
                          )}
                        </h3>
                      </div>
                      {project.stats && (
                        <p className="tw-paragraph-sm text-black-60 mb-0">
                          {project.stats}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 tw-paragraph text-black-60 break-words">
                    {project.description}
                  </div>
                  <div className="flex gap-3">
                    <Link
                      className="button-round"
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit project ${project.name} website at ${project.website}`}
                    >
                      Try it
                    </Link>
                    {project.github && (
                      <Link
                        className="button-round-icon"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Go to source code of project ${project.name}`}
                      >
                        <GithubIcon></GithubIcon>
                      </Link>
                    )}
                    {project.youtube && (
                      <Link
                        className="button-round-icon"
                        href={project.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Go to source code of project ${project.name}`}
                      >
                        <YoutubeIcon></YoutubeIcon>
                      </Link>
                    )}
                    {project.twitter && (
                      <Link
                        className="button-round-icon"
                        href={project.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Go to source code of project ${project.name}`}
                      >
                        <TwitterIcon></TwitterIcon>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

          ))}
        </AnimateSpawn>

        <div className="relative -mt-96 mb-10 md:mb-40">
          <AnimateSpawn
            className="mt-96 pt-12 md:pt-24 text-center flex flex-col items-center gap-6"
            variants={transitions.item}
          >
            <Link className="button-primary" href="/ecosystem?tag=AI">
              Go to Ecosystem showcase
            </Link>
          </AnimateSpawn>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default EcosystemSection;
