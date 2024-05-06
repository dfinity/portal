import Link from "@docusaurus/Link";
import roadmapData from "@site/.docusaurus/roadmap-data/default/roadmap-data.json";

import BlobPurple from "@site/static/img/purpleBlurredCircle.webp";
import GithubIcon from "@site/static/img/svgIcons/github.svg";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { AnimatePresence, motion } from "framer-motion";
import React, { RefObject, useState, useEffect } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import DarkHeroStyles from "../components/Common/DarkHeroStyles";
import ShareMeta from "../components/Common/ShareMeta";
import DomainCard from "../components/RoadmapPage/DomainCard";
import Overlay from "../components/RoadmapPage/Overlay";
import { RootObject } from "../components/RoadmapPage/RoadmapTypes";
import { FormDescription } from "@site/docs/references/samples/motoko/ic-pos/src/icpos_frontend/components/ui/form";
import { theme } from "@site/tailwind.config";

const MotionLink = motion(Link);

const data = roadmapData as RootObject[];

function elementCount(milestoneElements: any[], status: string) {
  return milestoneElements.filter((element) => element.status === status)
    .length;
}

const milestoneElementsToProgress = (milestoneElements: any[]) => {
  const elementsCount = milestoneElements.length;
  const elementsCountInProgress = elementCount(
    milestoneElements,
    "in_progress"
  );
  const elementsCountDone = elementCount(milestoneElements, "deployed");

  const progressDone = (elementsCountDone / elementsCount) * 100;
  const progressInProgress = (elementsCountInProgress / elementsCount) * 100;

  return (
    <div className="flex rounded-xl overflow-hidden p-0.5 bg-white">
      <div
        className="h-1 bg-[#1e3640] rounded-xl"
        style={{ width: progressDone + "%" }}
      ></div>
      <div
        className="h-1 bg-green rounded-xl"
        style={{ width: progressInProgress + "%" }}
      ></div>
    </div>
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

function indexToColor(index: number, total: number, relI) {
  const hueStart = -30;
  const hueRange = 200;
  const relativeIndex = index / total;
  const hue = (relativeIndex * -hueRange + hueStart) % 360;
  if (!relI) {
    return `linear-gradient(-315deg, hsl(${hue} 30% 25%), hsl(${hue + 5} 80% 25%))`;
  } else {
    return `hsl(${hue} ${30 + relI * 20}% ${25 - relI * 20}%)`;
  }
}

function scrollBy(ref: RefObject<T>, direction: 1) {
  const element = ref.current;
  element.scrollBy({ left: window.innerWidth / 4 * direction, behavior: 'smooth' });
}

function elementHasOverflown(element: HTMLElement) {
  return element.scrollWidth > element.clientWidth;
}

const RoadmapPage: React.FC = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayOpenAt, setOverlayOpenAt] = useState(0);
  const [overlayAnchor, setOverlayAnchor] = useState(null);

  const scrollRefs = new Array(data.length).fill('').map(_ => React.useRef(null));

  function openOverlay(at: number, anchor: number | null = null) {
    document.body.style.overflow = "hidden";
    setOverlayOpenAt(at);
    setOverlayAnchor(anchor);
    setOverlayOpen(true);
  }

  function closeOverlay() {
    document.body.style.overflow = "";
    setOverlayOpen(false);
  }

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      scrollRefs.forEach(ref => {
        const controls = ref.current.parentElement.querySelectorAll('[data-slidecontrol]');
        if( elementHasOverflown(ref.current) ) {
          controls.forEach((el: HTMLElement) => {
            el.classList.remove('hidden')
          });
        } else {
          controls.forEach((el: HTMLElement) => {
            el.classList.add('hidden')
          });
        }
      });
    });

    observer.observe(document.documentElement);

    return () => {
      observer.unobserve(document.documentElement);
    };
  }, []);

  return (
    <Layout
      title="Roadmap"
      description="This roadmap shows the status of many projects across the Internet Computer stack, but not all - more to come over the next few weeks."
      editPath="https://github.com/dfinity/portal/tree/master/roadmap"
    >
      <ShareMeta image="/img/shareImages/share-roadmap.jpeg"></ShareMeta>

      <main className={'w-full overflow-hidden bg-[#0a0023] text-white'}>
        <section className="">
          <DarkHeroStyles bgColor="#0a0023"></DarkHeroStyles>
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
        </section>

        <section className="container-10 -mt-52 md:-mt-32 relative  mb-40">
          {data.map((theme, indexTheme) => (
            <article key={theme.name} className="mt-20">
              <h1 className="tw-heading-3">{theme.name}</h1>
              <p className="tw-paragraph max-w-xs opacity-60">{theme.description}</p>
              
              <button data-slidecontrol onClick={
                scrollBy.bind(null, scrollRefs[indexTheme], -1)
              }>prev </button>
              <button data-slidecontrol onClick={
                scrollBy.bind(null, scrollRefs[indexTheme], 1)
              }>next </button>
              <section
                ref={scrollRefs[indexTheme]}
                data-scroll={indexTheme}
                aria-label="milestones"
                className="flex gap-6 items-stretch overflow-x-auto snap-mandatory snap-x mt-8 pb-8"
                style={{
                  scrollbarWidth: "none",
                }}
              >
                {theme.milestones.map(
                  (milestone, index) =>
                    milestone.elements.length > 0 && (
                      <article
                        key={milestone.name}
                        className="snap-always snap-start text-white rounded-md w-64 basis-64 shrink-0 grow-0 p-6 flex flex-col"
                        style={{
                          background: indexToColor(indexTheme, data.length, index / theme.milestones.length),
                        }}
                        onClick={() => openOverlay(indexTheme, index)}
                      >
                        <div className="grow">
                          <h2 className="mb-0">
                            {milestone.milestone_id == "none"
                              ? milestoneName(milestone.name)
                              : milestone.milestone_id}
                          </h2>
                          <p className="text-xs">
                            {milestone.eta != "none" ? (
                              <span>
                                <span className="opacity-35">Milestone</span>{" "}
                                {milestone.eta}
                              </span>
                            ) : (
                              <span>&nbsp;</span>
                            )}
                          </p>
                          {milestoneElementsToProgress(milestone.elements)}
                        </div>
                        <p className="mb-0 mt-5">
                          {milestoneName(milestone.name)}
                        </p>
                      </article>
                    )
                )}
              </section>
            </article>
          ))}
        </section>
        {overlayOpen && (
          <Overlay
            onClose={closeOverlay}
            openAt={overlayOpenAt}
            data={data}
            anchor={overlayAnchor}
          ></Overlay>
        )}
      </main>
    </Layout>
  );
};

export default RoadmapPage;
