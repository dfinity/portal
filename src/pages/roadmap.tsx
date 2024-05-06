import Link from "@docusaurus/Link";
import roadmapData from "@site/.docusaurus/roadmap-data/default/roadmap-data.json";

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
import { RootObject } from "../components/RoadmapPage/RoadmapTypes";
import { FormDescription } from "@site/docs/references/samples/motoko/ic-pos/src/icpos_frontend/components/ui/form";
import { theme } from "@site/tailwind.config";

const MotionLink = motion(Link);

const data = roadmapData as RootObject[];

function elementCount(milestoneElements: any[], progress: string) {
  return milestoneElements.filter((element) => element.progress === progress)
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
        className="h-2 bg-green rounded-xl"
        style={{ width: progressDone + "%" }}
      ></div>
      <div
        className="h-2 bg-white"
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

function indexToColor(index: number, total: number) {
  const hue = (index / total) * 360;
  const colors = [
    "#f15a24",
    "#fbb03b",
    "#ed1e79",
    "#4b19d6",
    "#29abe2",
    "#79d11c",
  ];
  const colorPairs = [
    [colors[0], colors[1]],
    [colors[1], colors[2]],
    [colors[2], colors[3]],
    [colors[3], colors[4]],
    [colors[4], colors[5]],
    [colors[1], colors[0]],
    [colors[2], colors[1]],
    [colors[3], colors[2]],
    [colors[4], colors[3]],
    [colors[5], colors[4]],
  ];
  const relativeIndex = index / total;
  const closestPair = colorPairs[Math.floor(relativeIndex * colorPairs.length)];
  const [color1, color2] = closestPair;

  return `linear-gradient(-315deg, ${color1}, ${color2})`;
  return `linear-gradient(-45deg, oklch(40%, .15, ${hue}), oklch(20%, .15, ${hue}))`;
}

const RoadmapPage: React.FC = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayOpenAt, setOverlayOpenAt] = useState(0);
  const [overlayAnchor, setOverlayAnchor] = useState(null);

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

  return (
    <Layout
      title="Roadmap"
      description="This roadmap shows the status of many projects across the Internet Computer stack, but not all - more to come over the next few weeks."
      editPath="https://github.com/dfinity/portal/tree/master/roadmap"
    >
      <ShareMeta image="/img/shareImages/share-roadmap.jpeg"></ShareMeta>

      <main className="w-full overflow-hidden bg-[#0a0023] text-white">
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

        <section className="container-10 -mt-52 md:-mt-32 relative">
          {data.map((theme, indexTheme) => (
            <article key={theme.name}>
              <h1 className="tw-heading-4 uppercase">{theme.name}</h1>

              <p className="tw-paragraph">{theme.description}</p>
              <section
                aria-label="milestones"
                className="flex gap-6 items-stretch overflow-x-auto scrollbar-hide mt-8 pb-8"
              >
                {theme.milestones.map(
                  (milestone, index) =>
                    milestone.elements.length > 0 && (
                      <article
                        key={milestone.name}
                        className="text-white rounded-md w-64 basis-64 shrink-0 grow-0 p-6 flex flex-col"
                        style={{
                          background: indexToColor(indexTheme, data.length),
                        }}
                        onClick={() => openOverlay(indexTheme, index)}
                      >
                        <div className="grow">
                          <h2 className="mb-0">
                            {milestone.metal == "none"
                              ? milestoneName(milestone.name)
                              : milestone.metal}
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
