import Link from "@docusaurus/Link";
import roadmapData from "@site/.docusaurus/roadmap-data/default/roadmap-data.json";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { AnimatePresence, motion } from "framer-motion";
import React, { RefObject, useState, useEffect } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import ShareMeta from "../components/Common/ShareMeta";
import Overlay, {
  ArrowIconRight,
  DeployedIcon,
  InProgressIcon,
} from "../components/RoadmapPage/Overlay";
import { RootObject } from "../components/RoadmapPage/RoadmapTypes";
import BlobGradient from "@site/static/img/gradientBlurredCircle.webp";
import RightArrowIcon from "@site/static/img/svgIcons/rightArrowIcon.svg";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import Tooltip from "../components/Common/Tooltip";

const MotionLink = motion(Link);

const data = roadmapData as RootObject[];

const css = `
  @keyframes blob {
    0% {
      transform: rotate(0deg) translateY(-50%) scale(calc(.5 + var(--rnd1) * .5));
    }
    50% {
      transform: rotate(180deg) translateY(-50%) scale(calc(.5 + var(--rnd1) * 2));
    }
    100% {
      transform: rotate(360deg) translateY(-50%) scale(calc(.5 + var(--rnd1) * .5));
    }
  }
  .milestone-large .blobs {
    overflow: initial;
  }
  .blobs {
    transform: scale(1);
    filter: blur(0px);
    overflow: hidden;
    transition: 600ms transform cubic-bezier(0.3, 0.7, 0, 1), 600ms filter cubic-bezier(0.3, 0.7, 0, 1);
  }
  .milestone:hover .blobs {
    transform: scale(1.05);
    filter: blur(12px);
  }
  .milestone {
    transition: 400ms background-color linear;
  }
  .milestone:hover {
    background-color: color-mix(in srgb, var(--color) 70%, black);
  }

  .hover-effect:hover .arrow {
    fill: #181818;
  }
  
  .hover-effect:hover .circle {
    fill: white;
  }
`;

export const createId = (
  theme: string | number | null = null,
  milestone: string | number | null = "start",
  separator = "-"
) => {
  if (theme == null || milestone == null)
    throw Error("Missing theme or milestone");
  const encodedTheme = encodeURI(`${theme}`);
  const encodedMilestone = encodeURI(`${milestone}`);
  if (encodedTheme.includes(separator) || encodedMilestone.includes(separator))
    throw Error("Separator is not allowed in theme or milestone");
  return `${encodedTheme}${separator}${encodedMilestone}`;
};

export const CardBlobs: React.FC<{}> = ({}) => {
  /*
  background: `radial-gradient(
      circle at 50% 50%, hsl(from var(--color) h s calc(l + .2)) 0%, rgba(0, 0, 0, 0) 60%
    )`,
  */
  const styleCommon = {
    background: `radial-gradient(
      circle at 50% 50%, var(--color2) 0%, rgba(0, 0, 0, 0) 60%
    )`,
    transform: `translate(-50%, -50%)`,
    animation: `blob 10s infinite linear`,
    animationDelay: "calc(var(--rnd1) * -10s)",
  };

  return (
    <div
      className="blobs absolute inset-0 pointer-events-none"
      style={
        {
          "--rnd1": Math.random(),
          "--rnd2": -1 + Math.random() * 2,
        } as React.CSSProperties
      }
    >
      <i
        className="absolute top-1/2 left-1/2 w-2/3 aspect-square"
        style={
          {
            "--rnd1": Math.random(),
            "--rnd2": -1 + Math.random() * 2,
            ...styleCommon,
          } as React.CSSProperties
        }
      ></i>
      <i
        className="absolute bottom-1/2 right-1/2 w-2/3 aspect-square"
        style={
          {
            "--rnd1": Math.random(),
            "--rnd2": -1 + Math.random() * 2,
            ...styleCommon,
          } as React.CSSProperties
        }
      ></i>
      <i
        className="absolute bottom-1/2 right-1/2 w-2/3 aspect-square"
        style={
          {
            "--rnd1": Math.random(),
            "--rnd2": -1 + Math.random() * 2,
            ...styleCommon,
          } as React.CSSProperties
        }
      ></i>
    </div>
  );
};

const milestoneComponent = (
  milestone: any,
  index: number,
  color: string[],
  overlayTrigger = () => {}
) => {
  let isActiveMilestone = false;

  const style = {
    "--color": color[0],
    "--color2": color[1],
  } as React.CSSProperties;

  let wrapperClasses =
    "milestone relative snap-start text-white rounded-md shrink-0 grow-0  p-4 p-5 md:p-10 md:px-10 flex flex-col min-h-64 scroll-ml-[var(--offcut)] cursor-pointer";
  const isOrphan =
    milestone.name === "orphans_past" || milestone.name === "orphans_future";
  if (isOrphan) {
    wrapperClasses += ` border-2 border-solid border-[var(--color)] order-opacity-20`;
  } else {
    wrapperClasses += ` border-2 border-solid border-[var(--color)]`;
    style.width = `min(450px, 80vw)]`;
    style.flexBasis = `min(450px, 80vw)`;
  }

  if (milestone.status === "in_progress") {
    isActiveMilestone = true;
    wrapperClasses += ` bg-[var(--color)] w-[450px]`;
  }

  if (milestone.status === "deployed") {
    wrapperClasses += ` past-card order-2`;
  } else if (milestone.name === "orphans_past") {
    wrapperClasses += ` past-card order-1`;
  } else {
    wrapperClasses += ` order-3`;
  }

  if (milestone.name === "orphans_future") {
    wrapperClasses += ` order-4 mr-[100dvw]`;
  }

  return (
    <article
      key={milestone.name}
      className={wrapperClasses}
      style={style}
      onClick={overlayTrigger}
    >
      {isActiveMilestone && <CardBlobs></CardBlobs>}
      {(milestone.status === "deployed" ||
        milestone.name === "orphans_past") && (
        <div className="absolute w-[48px] right-5 top-5 md:right-10 md:top-10 z-10">
          <Tooltip tooltip="Deployed">
            <DeployedIcon glowing={true} isDark={true} />
          </Tooltip>
        </div>
      )}
      {milestone.status === "in_progress" && (
        <div className="absolute w-[48px] right-5 top-5 md:right-10 md:top-10 z-10">
          <Tooltip tooltip="In Progress">
            <InProgressIcon isDark={true} />
          </Tooltip>
        </div>
      )}
      {isOrphan ? (
        <div className={`grow flex flex-col justify-end`}>
          <div className="min-w-[140px]">
            <strong className="block text-[80px] font-light leading-none !text-right">
              {milestone.elements!.length}
            </strong>
            <strong className="block text-right">
              {milestone.name === "orphans_past"
                ? `Past feature${
                    milestone.elements && milestone.elements.length > 1
                      ? "s"
                      : ""
                  }`
                : `Future feature${
                    milestone.elements && milestone.elements.length > 1
                      ? "s"
                      : ""
                  }`}
            </strong>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full gap-8 md:gap-20 relative">
          <div className="grow flex flex-col justify-between">
            <header>
              <h2 className="mb-0 tw-heading-5">
                {milestone.milestone_id == "none"
                  ? milestoneName(milestone.name)
                  : milestone.milestone_id}
              </h2>
              <p className="text-xs mb-0">
                {milestone.eta && milestone.eta != "none" ? (
                  <span>
                    <span className="opacity-35">
                      {milestone.status === "deployed"
                        ? "Completed"
                        : "Due Date"}
                    </span>{" "}
                    {milestone.eta}
                  </span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </p>
            </header>
            <p className="mb-0 mt-3">{milestoneName(milestone.name)}</p>
          </div>
          <div className="self-end mt-24">
            <strong className="block text-[80px] font-light leading-none text-right">
              {milestone.elements!.length}
            </strong>
            <strong>Feature{milestone.elements!.length > 1 ? "s" : ""}</strong>
          </div>
        </div>
      )}
    </article>
  );
};

function milestoneName(name: string) {
  let title = name;
  if (name == "orphans_past") {
    title = "Previous Tasks";
  } else if (name == "orphans_future") {
    title = "Future";
  }
  return title;
}

function indexToColor(index: number, total: number, lightnessMod = 0) {
  const hueStart = -30;
  const hueRange = 200;
  const relativeIndex = index / total;
  const hue = (relativeIndex * -hueRange + hueStart) % 360;
  return `hsl(${hue.toFixed(2)} 40% ${25 + lightnessMod}%)`;
}

function scrollBy(ref: RefObject<T>, direction: 1) {
  const element = ref.current;
  element.scrollBy({
    left: (window.innerWidth / 4) * direction,
    behavior: "smooth",
  });
}

const RoadmapPage: React.FC = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayOpenAt, setOverlayOpenAt] = useState(null);
  const [overlayAnchor, setOverlayAnchor] = useState(null);
  const [overlayColor, setOverlayColor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollRefs = new Array(data.length)
    .fill("")
    .map((_) => React.useRef(null));

  function openOverlay(
    at: string,
    anchor: string | null = null,
    color: string | null = null,
    color2: string | null = null
  ) {
    document.body.style.overflow = "hidden";
    setOverlayOpenAt(at);
    setOverlayAnchor(anchor);
    setOverlayOpen(true);
    setOverlayColor(color);
    //update current url with output from createId as an anchor
    //window.location.hash = createId(at, anchor || "start");
    window.history.pushState(null, "", `#${createId(at, anchor || "start")}`);
    window.addEventListener("popstate", closeOverlay);
  }

  function closeOverlay() {
    document.body.style.overflow = "";
    setOverlayOpen(false);
    history.replaceState(null, "", " ");
    window.removeEventListener("popstate", closeOverlay);
  }

  const parseId = (id: string, separator = "-") => {
    const [theme, milestone] = id.split(separator);
    return { theme: decodeURI(theme), milestone: decodeURI(milestone) };
  };

  useEffect(() => {
    scrollRefs.forEach((ref) => {
      if (ref.current) {
        // Find all past cards (completed milestones)
        const pastCards = ref.current.getElementsByClassName("past-card");
        if (pastCards.length > 0) {
          // Calculate the total width of all past cards plus any gaps
          const totalPastWidth = Array.from(pastCards).reduce(
            (total: number, card: HTMLElement) => {
              const cardWidth = card.getBoundingClientRect().width;
              // Add 24px for the gap (md:gap-6 = 1.5rem = 24px)
              return total + cardWidth + 24;
            },
            0
          );

          // Scroll to show the first non-past card
          ref.current.scrollTo({
            left: totalPastWidth,
            behavior: "instant", // avoid animation on load
          });
        }
      }
    });

    if (window.location.hash) {
      const { theme, milestone } = parseId(window.location.hash.slice(1));
      const themeIndex = data.findIndex((t) => t.name === theme);
      console.log(themeIndex, theme, milestone);
      if (themeIndex >= 0) {
        openOverlay(theme, milestone, indexToColor(themeIndex, data.length));
      }
    }
  }, []);

  return (
    <Layout
      title="Roadmap"
      description="Explore the ICP roadmap, focussing on contributions by the DFINITY Foundation. The roadmap is split into nine workstreams, each highlighting past achievements, upcoming milestones, and features that are further into the future and not yet scoped in detail."
      editPath="https://github.com/dfinity/portal/tree/master/roadmap"
    >
      <style>{css}</style>
      <ShareMeta image="/img/shareImages/share-roadmap.webp"></ShareMeta>

      <main className={"w-full overflow-hidden bg-[#0a0023] text-white"}>
        <section className="relative pb-[50vw] md:pb-10">
          <DarkHeroStyles bgColor="#0a0023"></DarkHeroStyles>
          <div className="container-10 pt-12 mb-60 md:mb-52 md:pt-36 relative z-10">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">Roadmap</h1>
              <p className="tw-lead-sm md:tw-lead mb-6 md:w-8/10">
                Explore the ICP roadmap, focussing on contributions by the
                DFINITY Foundation. The roadmap is split into nine themes, each
                highlighting upcoming milestones, features that are further into
                the future and not yet scoped in detail, as well as past
                achievements.
              </p>
            </div>
          </div>

          <div className="container-12 relative">
            <div className="absolute w-[80%] sm:w-7/12 left-2/12 translate-y-3/12 sm:translate-y-6/12 -translate-x-[10%] bottom-1/2 md:left-0 md:w-4/12 md:bottom-0 md:translate-x-[175%] md:-translate-y-[35%]">
              <img
                className="w-full"
                src="/img/roadmap/roadmap.svg"
                alt="roadmap"
              />
            </div>
          </div>
        </section>

        <section className="-mt-20 md:-mt-32 relative  mb-28 md:mb-40">
          {data.map((theme, indexTheme) => (
            <article
              key={theme.name}
              id={theme.name}
              className="mt-16 md:mt-20  "
            >
              <header className="container-10">
                <h1
                  className="tw-heading-3 cursor-pointer hover-effect relative pr-6 md:pr-0"
                  onClick={() =>
                    openOverlay(
                      theme.name,
                      null,
                      indexToColor(indexTheme, data.length),
                      indexToColor(indexTheme, data.length, 15)
                    )
                  }
                >
                  {theme.name}
                  <i className="absolute  bottom-0 w-16 translate-y-[0.62ex] md:ml-3">
                    <ArrowIconRight />
                  </i>
                </h1>

                <p className="tw-paragraph max-w-2xl opacity-60 mt-2">
                  {theme.description}
                </p>
              </header>

              <div
                className="
                relative
                after:content-['']
                after:bg-[#0a0023]
                after:absolute
                after:bottom-0
                after:h-[30px]
                after:left-0
                after:right-0
              "
              >
                <section
                  ref={scrollRefs[indexTheme]}
                  data-scroll={indexTheme}
                  aria-label="milestones"
                  className="flex gap-2 md:gap-6 items-stretch overflow-x-auto snap-mandatory snap-x pt-10 pb-20 -mb-2 w-full hide-scrollbar box-border pl-[var(--offcut)] pr-[var(--offcut)]"
                  style={
                    {
                      scrollbarWidth: "none",
                      "--offcut":
                        "max(1.5rem, calc((100dvw - 1214px) / 2 + 50px))",
                    } as React.CSSProperties
                  }
                >
                  {theme.milestones.map((milestone, index) => {
                    const projectColor = indexToColor(indexTheme, data.length);
                    const projectColor2 = indexToColor(
                      indexTheme,
                      data.length,
                      15
                    );
                    return (
                      milestone.elements.length > 0 &&
                      milestoneComponent(
                        milestone,
                        index,
                        [projectColor, projectColor2],
                        () =>
                          openOverlay(
                            theme.name,
                            milestone.milestone_id,
                            projectColor,
                            indexToColor(indexTheme, data.length, 15)
                          )
                      )
                    );
                  })}
                </section>

                <button
                  data-slidecontrol
                  onClick={scrollBy.bind(null, scrollRefs[indexTheme], -1)}
                  className="absolute left-0 top-0 bottom-0 w-1/12 bg-transparent bg-gradient-to-r from-[#0a0023] to-transparent border-0 text-white hidden md:block"
                  aria-label="prev milestone"
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[130%] rotate-180">
                    <RightArrowIcon className="w-10 h-10" />
                  </span>
                </button>
                <button
                  data-slidecontrol
                  onClick={scrollBy.bind(null, scrollRefs[indexTheme], 1)}
                  className="absolute right-0 top-0 bottom-0 w-1/12 bg-transparent bg-gradient-to-l from-[#0a0023] to-transparent border-0 text-white hidden  md:block"
                  aria-label="next milestone"
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[130%]">
                    <RightArrowIcon className="w-10 h-10" />
                  </span>
                </button>
              </div>
            </article>
          ))}
        </section>
        <section className="text-white relative mb-48 z-1">
          <AnimateSpawn
            el={motion.img}
            variants={transitions.fadeIn}
            src={BlobGradient}
            alt=""
            className="max-w-none w-[1200px] md:w-[1200px] absolute top-[-200px] md:top-[-200px] left-1/2 -translate-x-1/2 z-[-1] !opacity-50"
          />
          <AnimateSpawn
            className="z-[2] container-12 text-center max-w-[740px] mb-12 md:mb-16 "
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-3 md:tw-heading-60 mb-3 md:mb-8"
              variants={transitions.item}
            >
              Get Involved
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-8"
              variants={transitions.item}
            ></motion.p>
            <p className="md:tw-lead tw-lead-sm text-center text-white mt-6">
              Share your ideas and feedback, request features, or dive into
              development to actively participate in our journey.
            </p>
          </AnimateSpawn>
          <AnimateSpawn
            className=" z-[2] container-12 text-black flex flex-col gap-2 md:flex-row md:items-start md:gap-5"
            variants={transitions.container}
          >
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-80 rounded-xl border-white border-solid border text-center flex-1"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">Forum Discussion</h3>

              <p className="tw-paragraph-sm mb-3 text-black-60">
                Join the conversation on the DFINITY Forum to share your
                feedback, gain insights, connect with the DFINITY Foundation and
                Community members, and contribute to enhancing the roadmap.
              </p>
              <Link
                className="link-external"
                href="https://forum.dfinity.org/c/roadmap/29"
              >
                Join the conversation
              </Link>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-80 rounded-xl border-white border-solid border text-center flex-1 md:mt-30"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">
                Community Submissions
              </h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Got ideas for features that could enhance your Internet Computer
                experience or help you realize your next big idea? Share them
                with us.
              </p>
              <Link
                className="link-external"
                href="https://dx.internetcomputer.org/"
              >
                Submit your suggestion
              </Link>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-80 rounded-xl border-white border-solid border text-center flex-1 md:mt-10"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">Developer Grants</h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Do you have innovative ideas for building on the Internet
                Computer and need funding to launch your project? The DFINITY
                Developer Grant Program provides support to promising developers
                around the globe.
              </p>
              <Link
                className="link-external"
                href="https://dfinity.org/grants/"
              >
                Apply for grants
              </Link>
            </motion.div>
          </AnimateSpawn>
        </section>
        {overlayOpen && (
          <Overlay
            onClose={closeOverlay}
            openAt={overlayOpenAt}
            data={data}
            anchor={overlayAnchor}
            color={overlayColor}
            color2={indexToColor(overlayOpenAt, data.length, 15)}
          ></Overlay>
        )}
      </main>
    </Layout>
  );
};

export default RoadmapPage;
