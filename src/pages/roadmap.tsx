import Layout from "@theme/Layout";
import React, { useEffect, useRef, useState } from "react";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import data, { RoadmapItem, RoadmapItemLink } from "../../roadmap/roadmapData";
import OpenOverlayIcon from "../../static/img/plus.svg";
import Link from "@docusaurus/Link";
import ExternalLinkIcon from "../../static/img/external-link.svg";
import CommunityIcon from "../../static/img/community-icon.svg";
import { AnimatePresence, motion } from "framer-motion";
import BlobPurple from "@site/static/img/purpleBlurredCircle.png";
import BlobGradient from "@site/static/img/gradientBlurredCircle.png";
import completedRoadmapItems from "@site/roadmap/completed";
import GithubIcon from "@site/static/img/token-holders/social/github.svg";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";

const MotionLink = motion(Link);

const ItemCardLink: React.FC<{
  link: RoadmapItemLink;
  defaultLabel: string;
}> = ({ link, defaultLabel }) => {
  if (!link) return null;
  if (Array.isArray(link)) {
    return (
      <>
        {link.map((link) => (
          <Link className="link-primary" href={link.url} key={link.text}>
            {link.text}
            <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
          </Link>
        ))}
      </>
    );
  }
  if (typeof link === "string") {
    return (
      <Link className="link-primary" href={link}>
        {defaultLabel}
        <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
      </Link>
    );
  }
  return (
    <Link className="link-primary" href={link.url} key={link.text}>
      {link.text}
      <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
    </Link>
  );
};

const ItemCard: React.FC<{ item: RoadmapItem; deployed: boolean }> = ({
  item,
  deployed,
}) => {
  return (
    <div className="border-black-20 border-solid border rounded-xl px-6 py-4 md:py-8 pb-6 flex flex-col gap-2 md:gap-3">
      <h4 className="tw-heading-6 md:tw-heading-5 mb-0 relative flex items-center gap-4">
        <span className="flex-1">{item.name}</span>
        {item.is_community && (
          <CommunityIcon className="text-infinite"></CommunityIcon>
        )}
      </h4>
      {item.description && (
        <p className="tw-paragraph-sm md:tw-paragraph text-black-60 mb-0 prose prose-a:underline prose-a:text-infinite hover:prose-a:no-underline hover:prose-a:text-black">
          {item.description}
        </p>
      )}
      <ItemCardLink
        link={item.proposal}
        defaultLabel="Motion Proposal"
      ></ItemCardLink>
      <ItemCardLink link={item.forum} defaultLabel="Forum Link"></ItemCardLink>

      {item.eta && (
        <span className="mt-1 md:mt-2 tw-paragraph-sm md:tw-paragraph text-black-60">
          {deployed ? "Deployed " : "Expected "}
          {item.eta}
        </span>
      )}
    </div>
  );
};

const OverlayGroup: React.FC<{
  items: RoadmapItem[];
  pillClassName: string;
  pill: React.ReactNode;
  aside?: React.ReactNode;
  deployed: boolean;
}> = ({ items, pill, pillClassName, aside, deployed }) => {
  return (
    <div>
      <div className="md:hidden mb-6">{aside}</div>
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center mb-6 gap-6 sticky top-6 z-[1]">
        <span
          className={`${pillClassName} rounded-full tw-title-navigation text-white py-2 px-4 inline-flex items-center gap-2`}
        >
          {pill}
        </span>
        <span className="hidden md:block">{aside}</span>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.name} item={item} deployed={deployed}></ItemCard>
        ))}
      </div>
    </div>
  );
};

const Overlay: React.FC<{
  onClose: () => void;
  openAt: number;
}> = ({ onClose, openAt }) => {
  const overlayRef = useRef<HTMLDivElement>();
  useEffect(() => {
    overlayRef.current.scrollTop =
      document
        .querySelector(`#roadmap_domain_${openAt}`)
        .getBoundingClientRect().top - 48;
  }, []);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 overflow-auto bg-white-60 z-[2000]"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={overlayRef}
    >
      <div
        className="relative container-10 !px-0 md:px-6 md:py-12 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-right pointer-events-none sticky top-6 pr-6 md:top-20 z-10 md:pr-8">
          <button
            className="pointer-events-auto right-8 w-10 h-10 rounded-full border-none bg-white-80 backdrop-blur-2xl"
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6.66688L12.6669 2L14 3.33312L9.33312 8L14 12.6669L12.6669 14L8 9.33312L3.33312 14L2 12.6669L6.66688 8L2 3.33312L3.33312 2L8 6.66688Z"
                fill="#181818"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:gap-12 -mt-10">
          {data.map((domain, index) => (
            <div
              className="bg-white flex flex-col md:rounded-xl md:overflow-hidden"
              id={`roadmap_domain_${index}`}
            >
              <img
                src={domain.image.overlay}
                alt=""
                className="w-full h-[200px] object-cover md:h-auto"
              />
              <div className="p-6 pb-16 md:p-12">
                <h2 className="tw-heading-4 md:tw-heading-60 mb-3 text-infinite">
                  {domain.name}
                </h2>
                <p className="tw-paragraph md:tw-lead-sm text-black-60 mb-8 md:mb-16">
                  {domain.description}
                </p>
                <div className="space-y-8 md:space-y-16">
                  {domain.groups.pending?.length && (
                    <OverlayGroup
                      deployed={false}
                      pillClassName="bg-black-60 backdrop-blur-2xl"
                      items={domain.groups.pending}
                      pill={
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="2.5" cy="8" r="1.5" fill="white" />
                            <circle cx="8" cy="8" r="1.5" fill="white" />
                            <circle cx="13.5" cy="8" r="1.5" fill="white" />
                          </svg>
                          Pending
                        </>
                      }
                      aside={
                        <span className="tw-paragraph text-black-60 flex gap-2 items-center h-6">
                          <CommunityIcon></CommunityIcon>
                          Community requests
                        </span>
                      }
                    ></OverlayGroup>
                  )}
                  {domain.groups.inProgress?.length && (
                    <OverlayGroup
                      deployed={false}
                      pillClassName="bg-razzmatazz"
                      items={domain.groups.inProgress}
                      pill={
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3C8.98891 3 9.95561 3.29324 10.7779 3.84265C11.6001 4.39206 12.241 5.17295 12.6194 6.08658C12.9978 7.00021 13.0969 8.00555 12.9039 8.97545C12.711 9.94536 12.2348 10.8363 11.5355 11.5355C10.8363 12.2348 9.94536 12.711 8.97545 12.9039C8.00555 13.0969 7.00021 12.9978 6.08658 12.6194C5.17295 12.241 4.39206 11.6001 3.84265 10.7779C3.29324 9.95561 3 8.98891 3 8H5C5 8.59334 5.17595 9.17336 5.50559 9.66671C5.83524 10.1601 6.30377 10.5446 6.85195 10.7716C7.40013 10.9987 8.00333 11.0581 8.58527 10.9424C9.16721 10.8266 9.70176 10.5409 10.1213 10.1213C10.5409 9.70176 10.8266 9.16721 10.9424 8.58527C11.0581 8.00333 10.9987 7.40013 10.7716 6.85195C10.5446 6.30377 10.1601 5.83524 9.66671 5.50559C9.17336 5.17595 8.59334 5 8 5V3Z"
                              fill="white"
                            />
                          </svg>
                          In Progress
                        </>
                      }
                    ></OverlayGroup>
                  )}
                  {domain.groups.deployed?.length && (
                    <OverlayGroup
                      deployed={true}
                      pillClassName="bg-infinite"
                      items={domain.groups.deployed}
                      pill={
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 7.99943L6.84682 12L13 5.59977L11.4617 4L6.84682 8.80045L4.53829 6.39966L3 7.99943Z"
                              fill="white"
                            />
                          </svg>
                          Deployed
                        </>
                      }
                    ></OverlayGroup>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const RoadmapPage: React.FC = () => {
  resetNavBarStyle();

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayOpenAt, setOverlayOpenAt] = useState(0);

  function openOverlay(at: number) {
    document.body.style.overflow = "hidden";
    setOverlayOpenAt(at);
    setOverlayOpen(true);
  }

  function closeOverlay() {
    document.body.style.overflow = "";
    setOverlayOpen(false);
  }

  // useEffect(() => {
  //   openOverlay(0);
  // }, []);

  return (
    <Layout title="Roadmap" description="">
      <main className="w-full overflow-hidden">
        <AnimateSpawn
          className="overflow-hidden bg-infinite text-white"
          variants={transitions.container}
        >
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-60 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <motion.h1
                className="tw-heading-3 md:tw-heading-2 mb-6"
                variants={transitions.item}
              >
                Roadmap
              </motion.h1>
              <motion.p
                className="tw-lead-sm md:tw-lead mb-0"
                variants={transitions.item}
              >
                The DFINITY Foundation’s contributions to the Internet Computer
                roadmap are subject to community discussion and voting. Cras
                mattis consectetur purus sit amet fermentum. Cras mattis
                consectetur purus sit amet fermentum.
              </motion.p>
            </div>
          </div>
          <div className="container-10 relative">
            <motion.img
              src="/img/whiteBlurredCircle.png"
              className="absolute pointer-events-none max-w-none w-[800px] aspect-square -right-[200px] bottom-[-400px] md:w-[1500px] md:bottom-[-680px] md:right-[-550px] object-contain object-center"
              variants={transitions.item}
            />
          </div>
        </AnimateSpawn>

        <section className="container-10 -mt-52 md:-mt-32 space-y-6 md:space-y-16 relative">
          <AnimateSpawn
            el={motion.img}
            variants={transitions.fadeIn}
            src={BlobPurple}
            alt=""
            className="absolute pointer-events-none max-w-none w-[600px] md:w-[1400px] -left-[300px] md:-left-[700px] top-[1680px] md:top-1/2 -translate-y-1/2 z-[-1000]"
            // variants={transitions.item}
          />
          {data.map((domain, index) => {
            return (
              <AnimateSpawn
                variants={transitions.item}
                className="relative bg-white-80 backdrop-blur-2xl flex flex-col md:flex-row items-stretch md:items-center rounded-xl overflow-hidden"
                key={domain.name}
              >
                {/* <div className="absolute inset-0 pointer-events-none"></div> */}
                <img
                  src={domain.image?.card}
                  className={`h-[200px] object-cover md:h-auto md:w-[400px] ${
                    index % 2 == 1 ? "md:order-1" : ""
                  }`}
                ></img>
                <div className="px-6 pt-6 pb-8 md:py-0 md:px-12 flex-1">
                  <h2 className="tw-heading-5 md:tw-heading-3 mb-3">
                    {domain.name}
                  </h2>
                  <p className="tw-paragraph-sm md:tw-lead-sm text-black-60 mb-6">
                    {domain.description}
                  </p>
                  <div className="flex gap-2 flex-col md:gap-6 md:flex-row mb-6">
                    {domain.groups.pending?.length && (
                      <div className="inline-flex items-center gap-2 text-black tw-title-navigation">
                        Pending
                        <div className="inline-flex gap-[2px]">
                          {Array.from({
                            length: domain.groups.pending?.length,
                          }).map((_, i) => (
                            <span
                              className="w-[3px] h-4 rounded-full bg-black-30 inline-block"
                              key={i}
                            ></span>
                          ))}
                        </div>
                      </div>
                    )}
                    {domain.groups.inProgress?.length && (
                      <div className="inline-flex items-center gap-2 text-black tw-title-navigation">
                        In Progress
                        <div className="inline-flex gap-[2px]">
                          {Array.from({
                            length: domain.groups.inProgress?.length,
                          }).map((_, i) => (
                            <span
                              className="w-[3px] h-4 rounded-full bg-razzmatazz inline-block"
                              key={i}
                            ></span>
                          ))}
                        </div>
                      </div>
                    )}
                    {domain.groups.deployed?.length && (
                      <div className="inline-flex items-center gap-2 text-black tw-title-navigation">
                        Deployed
                        <div className="inline-flex gap-[2px]">
                          {Array.from({
                            length: domain.groups.deployed?.length,
                          }).map((_, i) => (
                            <span
                              className="w-[3px] h-4 rounded-full bg-infinite inline-block"
                              key={i}
                            ></span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="appearance-none bg-transparent border-none link-primary p-0 inline-flex gap-2 items-center"
                    onClick={() => openOverlay(index)}
                  >
                    <OpenOverlayIcon />
                    See feature list
                  </button>
                </div>
              </AnimateSpawn>
            );
          })}
        </section>
        <section className="text-white relative py-24 md:py-40">
          <AnimateSpawn
            el={motion.img}
            variants={transitions.fadeIn}
            src={BlobGradient}
            alt=""
            className="max-w-none w-[1200px] md:w-[1200px] absolute top-[-200px] md:top-[-200px] left-1/2 -translate-x-1/2 z-[-1]"
          />
          <AnimateSpawn
            className="container-12 text-center max-w-[740px] mb-16 md:mb-8"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-4 md:tw-heading-60 mb-3 md:mb-8"
              variants={transitions.item}
            >
              Community Engagement
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-8"
              variants={transitions.item}
            >
              Vestibulum id ligula porta felis euismod semper. Cras mattis
              consectetur purus sit amet fermentum. Vestibulum id ligula porta
              felis euismod semper. Cras mattis consectetur purus sit amet
              fermentum.
            </motion.p>
            <MotionLink
              variants={transitions.item}
              className="button-outline-white"
              href="https://forum.dfinity.org"
            >
              Join the conversation
            </MotionLink>
          </AnimateSpawn>
          <AnimateSpawn
            className="container-12 text-black flex flex-col gap-2 md:flex-row md:items-start md:gap-5"
            variants={transitions.container}
          >
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">
                Community Submissions
              </h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                What isn't here that you'd like to see the DFINITY Foundation
                prioritize for the Internet Computer?
              </p>
              <Link className="link-external">Submit your suggestions</Link>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1 md:mt-30"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">Live Sessions</h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Join live sessions with the DFINITY Foundation to discuss
                upcoming contributions to the Internet Computer roadmap. Fusce
                dapibus, tellus ac cursus commodo, tortor mauris condimentum
                nibh, ut fermentum massa justo sit amet risus. Aenean eu leo
                quam.
              </p>
              <Link className="link-external">Reserve your seat</Link>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1 md:mt-10"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">Developer Grants</h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Cras mattis consectetur purus sit amet fermentum. Nullam quis
                risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus
                vel augue laoreet rutrum faucibus
              </p>
              <Link className="link-external">Apply for Grants</Link>
            </motion.div>
          </AnimateSpawn>
        </section>
        <section className="">
          <AnimateSpawn
            className="container-10 text-center text-black md:text-left"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-4 md:tw-heading-60 mb-3 md:mb-6"
              variants={transitions.item}
            >
              Completed
              <br className="md:hidden" /> Roadmap Items
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-12 md:mb-16 md:w-7/10"
              variants={transitions.item}
            >
              The DFINITY Foundation open-sourced and launched the Internet
              Computer on May 10, 2021. List of major innovations developed by
              the Foundation.
            </motion.p>
          </AnimateSpawn>
          <AnimateSpawn
            variants={transitions.container}
            className="container-12 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 relative"
          >
            <img
              src={BlobPurple}
              alt=""
              className="absolute pointer-events-none max-w-none w-[600px] md:w-[1400px] -right-[300px] md:-right-[700px] top-0 -translate-y-1/2 z-[-1000]"
            />
            {completedRoadmapItems.map((item) => (
              <motion.div
                variants={transitions.item}
                key={item.title}
                className="flex flex-col overflow-hidden rounded-xl bg-white items-start"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-[200px] w-full object-center object-cover"
                />
                <span className="-mt-4 h-8 bg-infinite text-white flex items-center gap-2 px-3 py-1 rounded-full ml-4 tw-title-navigation-on-page">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 7.99943L6.84682 12L13 5.59977L11.4617 4L6.84682 8.80045L4.53829 6.39966L3 7.99943Z"
                      fill="white"
                    />
                  </svg>
                  Deployed
                </span>
                <h3 className="tw-heading-6 md:tw-heading-5 px-6 mt-4 mb-3">
                  {item.title}
                </h3>
                <p className="tw-paragraph-sm md:tw-paragraph px-6 mb-3 text-black-60 line-clamp-3">
                  {item.description}
                </p>
                <Link
                  href={item.link}
                  className="button-outline button-small mx-6 mb-8"
                >
                  Learn more
                </Link>
              </motion.div>
            ))}
          </AnimateSpawn>
          <AnimateSpawn
            className="text-center mt-12 mb-20 md:mb-30 md:mt-16"
            variants={transitions.item}
          >
            <Link className="inline-flex gap-2 items-center  link-primary">
              <GithubIcon className="w-6" />
              See documentation
            </Link>
          </AnimateSpawn>
        </section>
        <AnimatePresence>
          {overlayOpen && (
            <Overlay onClose={closeOverlay} openAt={overlayOpenAt}></Overlay>
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
};

export default RoadmapPage;
