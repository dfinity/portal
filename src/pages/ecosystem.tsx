import Layout from "@theme/Layout";
import React, { useEffect, useRef } from "react";

import Link from "@docusaurus/Link";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import showcaseData from "../../showcase.json";
import ShareMeta from "../components/Common/ShareMeta";
import Tooltip from "../components/Common/Tooltip";
import { ShowcaseProject } from "../components/ShowcasePage/ShowcaseProject";
import { useQueryParam } from "../utils/use-query-param";

import GithubIcon from "@site/static/img/svgIcons/github.svg";
import YoutubeIcon from "@site/static/img/svgIcons/youtube.svg";
import TwitterIcon from "@site/static/img/svgIcons/twitter.svg";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";

const Pill: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ children, isActive, onClick }) => {
  return (
    <button
      className={clsx(
        "whitespace-nowrap rounded-full inline-flex group gap-2 px-4 py-2 appearance-none border-solid border border-white/50 tw-title-navigation font-circular hover:text-infinite  hover:bg-white  hover:border-transparent",
        isActive
          ? "text-infinite bg-white border-transparent"
          : "text-white bg-transparent border-white"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PillSecondaryLabel: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
}> = ({ children, isActive }) => {
  return (
    <span
      className={
        isActive
          ? "text-infinite/60"
          : "text-white/50 group-hover:text-infinite/60"
      }
    >
      {children}
    </span>
  );
};

function sortDesktopProjects(
  projects: ShowcaseProject[]
): Array<ShowcaseProject | "promo"> {
  const small: Array<ShowcaseProject | "promo"> = projects.filter(
    (p) => p.display !== "Large"
  );
  const large = projects.filter((p) => p.display === "Large");
  const sorted: Array<ShowcaseProject | "promo"> = [];
  const columns = 4;

  const promoSlots = [8 - 1, 20 - 3, 32 - 2, 48 - 4, 64 - 1];

  for (const slot of promoSlots) {
    if (small.length >= slot) {
      small.splice(slot, 0, "promo");
    }
  }

  while (true) {
    const last = sorted[sorted.length - 1];
    let isLastLarge = typeof last !== "string" && last?.display === "Large";

    if (isLastLarge) {
      if (small.length >= columns) {
        sorted.push(...small.splice(0, columns));
      } else if (small.length < columns && large.length > 0) {
        sorted.push(...large.splice(0, large.length));
      } else {
        sorted.push(...small.splice(0, columns));
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

const LargeProjectMedia: React.FC<{
  project: ShowcaseProject;
}> = ({ project }) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const [shown, setShown] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    if (inView && !shown) {
      setShown(true);
    }
  }, [inView]);

  useEffect(() => {
    if (!videoRef.current) return;
    // start playing the video when it comes in view
    if (shown && inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [shown, inView]);

  return (
    <div ref={ref} className="flex min-h-full relative">
      <div className="z-[-1] animate-pulse absolute inset-0 bg-blue mr-px"></div>
      {shown ? (
        <video
          loop
          muted
          playsInline
          className={clsx("w-full object-cover object-center")}
          ref={videoRef}
        >
          <source src={project.video} type={project.videoContentType} />
        </video>
      ) : (
        <div className="aspect-video w-full"></div>
      )}
    </div>
  );
};

const ProjectInfo: React.FC<{
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

const SmallCard = ({ project }: { project: ShowcaseProject }) => {
  return (
    <div className="rounded-xl bg-white-80 flex px-6 py-8 backdrop-blur-2xl">
      <div className="flex flex-col gap-2">
        <ProjectInfo project={project}></ProjectInfo>
      </div>
    </div>
  );
};

const PromoCard = () => {
  return (
    <div className="rounded-xl  text-white flex px-6 py-8 backdrop-blur-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6]">
      <div className="flex flex-col gap-2">
        <h3 className="tw-title-sm mb-0">Submit your project</h3>
        <p className="tw-paragraph text-white/60 flex-1 mb-12">
          See a project missing? All community members are invited to submit
          their projects to this page.
        </p>
        <Link
          className="button-white text-center"
          href="https://github.com/dfinity/portal/tree/master#showcase-submission-guidelines"
        >
          Submit now
        </Link>
      </div>
    </div>
  );
};

const LargeCard = ({ project }: { project: ShowcaseProject }) => {
  return (
    <div className="md:col-span-2 lg:col-span-4 rounded-xl  bg-white-80 flex flex-col md:flex-row backdrop-blur-2xl">
      <div className="md:w-6/12 lg:w-9/12 flex-shrink-0 rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden">
        {project.video ? (
          <LargeProjectMedia project={project}></LargeProjectMedia>
        ) : (
          <div className="flex w-full h-full relative">
            <div className="z-[-1] animate-pulse absolute inset-0 bg-blue mr-px"></div>
            <img
              loading="lazy"
              alt={`${project.name} screenshot`}
              src={project.screenshots[0]}
              className="object-cover object-center"
            ></img>
          </div>
        )}
      </div>
      <div className="md:w-6/12 lg:w-3/12 flex-shrink-0 flex flex-col py-8 px-6 md:pl-5 md:pr-8">
        <ProjectInfo project={project}></ProjectInfo>
      </div>
    </div>
  );
};

const projects = showcaseData as ShowcaseProject[];
const tags = Object.entries(
  projects.reduce((tags, p) => {
    if (!p.tags) return tags;
    for (const tag of p.tags) {
      tags[tag] = (tags[tag] || 0) + 1;
    }
    return tags;
  }, {} as Record<string, number>)
);

function ShowcasePage(): JSX.Element {
  const [queryTag, setQueryTag, queryTagInitialized] =
    useQueryParam<string>("tag");
  const [filteredProjects, setFilteredProjects] =
    React.useState<Array<ShowcaseProject | "promo">>(projects);
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);

  useEffect(() => {
    let filteredProjects = projects;
    if (queryTagInitialized && queryTag?.length > 0) {
      filteredProjects = filteredProjects.filter((p) =>
        p.tags.find((tag) => tag == queryTag)
      );
    }
    setFilteredProjects(sortDesktopProjects(filteredProjects));
  }, [queryTagInitialized, queryTag]);

  return (
    <Layout
      title="ICP Ecosystem"
      description="Explore a showcase of curated projects built by the Internet Computer ecosystem. This continually growing list features the newest projects, all built with blockchain. Try out decentralized social media, dapps and more. Only possible on the IC. "
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-showcase.jpg"></ShareMeta>
      <main
        className="overflow-hidden relative"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <section
          className="overflow-hidden bg-infinite text-white pt-20"
          ref={heroRef}
        >
          <div className="container-10 pt-20 md:pt-30 pb-60 md:pb-60 relative">
            <div className="blob blob-white blob-x-5 md:blob-x-9 blob-y-8 blob-md md:blob-lg"></div>

            <h1 className="md:tw-heading-2 mb-8 md:mb-10 relative">
              Enter the <br className="md:hidden" /> ICP ecosystem
            </h1>
            <div className="flex overflow-auto -mx-6 px-6 pb-4 md:mx-0 md:overflow-visible md:m-0 md:p-0 md:flex-wrap gap-3 relative ecosystem-pills-scrollbar ">
              {/* <button className="rounded-full px-3 appearance-none border-solid border border-[#d2d2d2] hover:text-white  hover:bg-infinite  hover:border-transparent flex items-center">
            <SearchIcon />
          </button> */}
              <Pill isActive={!queryTag} onClick={() => setQueryTag(undefined)}>
                All projects
                <PillSecondaryLabel isActive={!queryTag}>
                  {projects.length}
                </PillSecondaryLabel>
              </Pill>
              {tags.map(([tag, count]) => (
                <Pill
                  isActive={tag === queryTag}
                  onClick={() => setQueryTag(tag)}
                  key={tag}
                >
                  {tag}
                  <PillSecondaryLabel isActive={tag === queryTag}>
                    {count}
                  </PillSecondaryLabel>
                </Pill>
              ))}
            </div>
          </div>
        </section>
        <section className="container-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative -mt-48 md:-mt-40">
          {filteredProjects.map((project, index) =>
            project === "promo" ? (
              <PromoCard key={`promo_${index}`} />
            ) : project.display === "Large" ? (
              <LargeCard project={project} key={project.website} />
            ) : (
              <SmallCard project={project} key={project.website} />
            )
          )}
        </section>

        <section className="container-10 py-20 md:pt-20 md:pb-30 flex flex-col gap-12 md:gap-0 md:flex-row md:justify-between">
          <div className="md:w-4/10">
            <h2 className="tw-heading-6 mb-3">Submit your project</h2>
            <p className="tw-paragraph mb-4">
              See a project missing? All community members are invited to submit
              their projects to this page.
            </p>
            <p className="mb-0">
              <Link
                href="https://github.com/dfinity/portal/tree/master#showcase-submission-guidelines"
                className="link-primary link-with-icon"
              >
                Submit your project
                <LinkArrowUpRight />
              </Link>
            </p>
          </div>
          <div className="tw-paragraph-sm text-black-60 md:w-3/10">
            <span className="text-black">Do your own research:</span> All of
            these dapps are using the novel Internet Computer blockchain. Use
            the following projects at your own risk. As always, do your own
            research.
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ShowcasePage;
