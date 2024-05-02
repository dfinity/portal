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

const milestoneElementsToProgress = (milestoneElements: any[]) => {
  const elementsCount = milestoneElements.length;
  const elementsCountInProgress = milestoneElements.filter(
    (element) => element.progress === "in_progress"
  ).length;
  const elementsCountDone = milestoneElements.filter(
    (element) => element.progress === "deployed"
  ).length;

  const progressDone = (elementsCountDone / elementsCount) * 100;
  const progressInProgress = (elementsCountInProgress / elementsCount) * 100;


  return (<div className="flex">
    <div className="h-5 bg-white" style={{width: progressDone + '%'}}></div>
    <div className="h-5 bg-green" style={{width: progressInProgress + '%'}}></div>
  </div>)
}

function milestoneName(name: string) {
  let title = name;
  if (name == "orphans_past") {
    title = "Previous Tasks";
  } else if (name == "orphans_future") {
    title = "Future Tasks";
  }
  return title;
}

function indexToColor(index: number, total: number) {
  const hue = (index / total) * 360;
  return `oklch(.3, .1, ${hue})`;
}

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
                The DFINITY Foundation is committing R&D resources in various domains of development with the intent of making the Internet Computer blockchain more efficient, faster and easier to use. This roadmap shows the status of many projects across the Internet Computer stack, but not all - more to come over the next few weeks.
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
                className="flex gap-8 items-stretch overflow-x-auto scrollbar-hide mt-8 pb-8"
              >
                {theme.milestones.map((milestone, index) => (
                  milestone.elements.length > 0 && (
                    <article 
                      key={milestone.name}
                      className={`text-white rounded-md w-64 basis-64 shrink-0 grow-0 p-8`}
                      style={{
                        backgroundColor: indexToColor(indexTheme, data.length),
                      }}
                    >
                      <h2>{milestone.metal == 'none' ? milestoneName(milestone.name) : milestone.metal}</h2>
                      {milestoneElementsToProgress(milestone.elements)}
                      <p>{milestoneName(milestone.name)}</p>
                    </article>
                  )
                ))}
              </section>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default RoadmapPage;
