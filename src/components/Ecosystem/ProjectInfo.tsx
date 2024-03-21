import React, { useEffect, useRef } from "react";

import { ShowcaseProject } from "../ShowcasePage/ShowcaseProject";

import Tooltip from "../Common/Tooltip";

import Link from "@docusaurus/Link";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import YoutubeIcon from "@site/static/img/svgIcons/youtube.svg";
import TwitterIcon from "@site/static/img/svgIcons/twitter.svg";

export const ProjectInfo: React.FC<{
  project: ShowcaseProject;
}> = ({ project }) => {
  return (
    <div className="flex flex-col gap-4 h-full max-w-full">
      <div className="flex gap-2 items-center">
        <img
          src={project.logo}
          className="w-14 max-h-14"
          alt={`${project.name} logo`}
        ></img>
        <div className="flex flex-col justify-center flex-1">
          <h3 className="tw-heading-5 mb-0" style={{ wordBreak: "break-word" }}>
            {project.name}

            {project.usesInternetIdentity && (
              <Tooltip
                tooltip="Uses Internet Identity"
                className="text-center w-44"
              >
                <img
                  className="relative bottom-2 left-1 cursor-pointer"
                  src="/img/showcase/ii-badge.svg"
                  alt="The project uses Internet Identity"
                ></img>
              </Tooltip>
            )}
          </h3>
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
          aria-label={`Visit project ${project.name} website at ${project.website}`}
        >
          Try it
        </Link>
        {project.github && (
          <Link
            className="button-round-icon"
            href={project.github}
            aria-label={`Go to source code of project ${project.name}`}
          >
            <GithubIcon></GithubIcon>
          </Link>
        )}
        {project.youtube && (
          <Link
            className="button-round-icon"
            href={project.youtube}
            aria-label={`Go to source code of project ${project.name}`}
          >
            <YoutubeIcon></YoutubeIcon>
          </Link>
        )}
        {project.twitter && (
          <Link
            className="button-round-icon"
            href={project.twitter}
            aria-label={`Go to source code of project ${project.name}`}
          >
            <TwitterIcon></TwitterIcon>
          </Link>
        )}
      </div>
    </div>
  );
};
