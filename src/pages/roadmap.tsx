import Link from "@docusaurus/Link";
import data from "@site/.docusaurus/roadmap-data/default/roadmap-data.json";
import completedRoadmapItems from "@site/roadmap/completed";
import BlobGradient from "@site/static/img/gradientBlurredCircle.webp";
import BlobPurple from "@site/static/img/purpleBlurredCircle.webp";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import ShareMeta from "../components/Common/ShareMeta";
import DomainCard from "../components/RoadmapPage/DomainCard";
import Overlay from "../components/RoadmapPage/Overlay";

const MotionLink = motion(Link);

const RoadmapPage: React.FC = () => {
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

  return (
    <Layout
      title="Roadmap"
      description="The DFINITY Foundation is committing R&D resources in various domains of development with the intent of making the Internet Computer blockchain more efficient, faster and easier to use. This roadmap shows the status of many projects across the Internet Computer stack."
      editPath="https://github.com/dfinity/portal/tree/master/roadmap"
    >
      <ShareMeta image="/img/shareImages/share-roadmap.jpeg"></ShareMeta>

      <main className="w-full overflow-hidden">
        <section className="overflow-hidden bg-infinite text-white">
          <DarkHeroStyles></DarkHeroStyles>
          <div className="container-10 pt-12 mb-60 md:mb-52 md:pt-36 relative">
            <div className="md:w-7/10">
              <h1 className="tw-heading-3 md:tw-heading-2 mb-6">Roadmap</h1>
              <p className="tw-lead-sm md:tw-lead mb-0">
                The DFINITY Foundation is committing R&D resources in various
                domains of development with the intent of making the Internet
                Computer blockchain more efficient, faster and easier to use.
                This roadmap shows the status of many projects across the
                Internet Computer stack, but not all - more to come over the
                next few weeks.
              </p>
            </div>
          </div>
          <div className="container-10 relative">
            <img
              alt=""
              src="/img/whiteBlurredCircle.webp"
              className="absolute pointer-events-none max-w-none w-[800px] aspect-square -right-[200px] bottom-[-400px] md:w-[1500px] md:bottom-[-680px] md:right-[-550px] object-contain object-center"
            />
          </div>
        </section>

        <section className="container-10 -mt-52 md:-mt-32 relative">
          <AnimateSpawn
            el={motion.img}
            variants={transitions.fadeIn}
            src={BlobPurple}
            alt=""
            className="absolute pointer-events-none max-w-none w-[600px] md:w-[1400px] -left-[300px] md:-left-[700px] top-[1680px] md:top-1/2 -translate-y-1/2 z-[-1000]"
            // variants={transitions.item}
          />
          <div className="space-y-6 md:space-y-16">
            {data.map((domain, index) => (
              <DomainCard
                domain={domain}
                index={index}
                key={domain.name}
                onOpen={() => openOverlay(index)}
              ></DomainCard>
            ))}
          </div>
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
              Community engagement
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-8"
              variants={transitions.item}
            ></motion.p>
            <MotionLink
              variants={transitions.item}
              className="button-outline-white"
              href="https://forum.dfinity.org/t/update-on-the-ic-roadmap-july-2022-summary/14615"
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
                Community submissions
              </h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                What features would improve your experience on the Internet
                Computer?
              </p>
              <Link
                className="link-external"
                href="https://forum.dfinity.org/t/update-on-the-ic-roadmap-july-2022-summary/14615"
              >
                Submit your suggestions
              </Link>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1 md:mt-30"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">Events and news</h3>
              <p className="tw-paragraph-sm mb-3 text-black-60">
                Join live sessions with R&D to get informed about the upcoming
                technical proposals and contributions to the Internet Computer
                roadmap.
              </p>
              <Link
                className="link-external"
                href="https://dfinity.org/events-and-news"
              >
                See events
              </Link>
            </motion.div>
            <motion.div
              variants={transitions.item}
              className="px-8 py-12 backdrop-blur-2xl bg-white-50 rounded-xl border-white border-solid border text-center flex-1 md:mt-10"
            >
              <h3 className="tw-lead-lg md:tw-title-sm">Developer grants</h3>
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
        <section className="">
          <AnimateSpawn
            className="container-10 text-center text-black md:text-left"
            variants={transitions.container}
          >
            <motion.h2
              className="tw-heading-4 md:tw-heading-60 mb-3 md:mb-6"
              variants={transitions.item}
            >
              Major roadmap achievements
              <br className="md:hidden" />
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead mb-12 md:mb-16 md:w-7/10"
              variants={transitions.item}
            >
              The Internet Computer has come a long way since its launch in May
              2021.
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
                className="flex"
                variants={transitions.item}
                key={item.title}
              >
                <Link
                  className="flex flex-col overflow-hidden rounded-xl bg-white items-start pb-8 md:pb-10 hover:no-underline text-black hover:text-black translate-y-0 hover:-translate-y-3 transition-transform"
                  href={item.link}
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
                </Link>
              </motion.div>
            ))}
          </AnimateSpawn>
          <AnimateSpawn
            className="text-center mt-12 mb-20 md:mb-30 md:mt-16"
            variants={transitions.item}
          >
            <Link
              className="inline-flex gap-2 items-center  link-primary"
              href="https://github.com/dfinity/ic"
            >
              <GithubIcon className="w-6" />
              See code
            </Link>
          </AnimateSpawn>
        </section>
        <AnimatePresence>
          {overlayOpen && (
            <Overlay
              onClose={closeOverlay}
              openAt={overlayOpenAt}
              data={data}
            ></Overlay>
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
};

export default RoadmapPage;
