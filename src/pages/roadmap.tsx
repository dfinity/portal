import Link from "@docusaurus/Link";
import roadmapData from "@site/.docusaurus/roadmap-data/default/roadmap-data.json";

export interface Root {
  categoryName: string
  categoryDescription: string
  milestones: Milestone[]
  elements: Element[]
}

export interface Milestone {
  title: string
  description: string
  metal: string
  eta: string
  notes: string
}

export interface Element {
  title: string
  overview: string
  description: string
  progress: string
  stack_rank: number
  forum: string
  proposal: string
  wiki: string
  docs: string
  eta: string
  is_community: boolean
  in_beta: boolean
  notes: string
  milestone?: string
  imported?: boolean
}


import roadmapData2 from "@site/.docusaurus/roadmap-data/default/roadmap-data2.json";

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
import { RoadmapDomain } from "../components/RoadmapPage/RoadmapTypes";
import { FormDescription } from "@site/docs/references/samples/motoko/ic-pos/src/icpos_frontend/components/ui/form";

const MotionLink = motion(Link);

const data = roadmapData as RoadmapDomain[];

const themes = roadmapData2 as Root;

function getElementsGroupedByMilestones(
  milestones: Milestone[],
  elements: Element[]
): Map<string, Element[]> {
  const milesSonesMap = new Map();

  milestones.forEach((milestone) => {
    milesSonesMap.set(milestone.metal, []);
  });

  milesSonesMap.set('Future', []);

  elements.forEach((element) => {
    const milestone = element.milestone || 'Future';
    if (milesSonesMap.has(milestone)) {
      milesSonesMap.get(milestone).push(element);
    }
  });

  return milesSonesMap;
}

const groupedElements = getElementsGroupedByMilestones(themes.milestones, themes.elements);


export const ThemeSection: React.FC<{theme: Root}> = ({
  theme,
}) => {
  return (
    <section className="space-y-6 md:space-y-16">
      <h2 className="tw-heading-4 md:tw-heading-3 mb-6">{theme.categoryName}</h2>
      <p className="tw-paragraph-sm md:tw-lead-sm mb-10">{theme.categoryDescription}</p>
      <h3>Mile Stones</h3>
      <div className="space-y-6">
        {theme.milestones.map((milestone) => (
          <div>
            <div key={milestone.title} className="space-y-2">
              <h4 className="tw-heading-5">{milestone.metal}</h4>
              <p className="tw-paragraph-sm">{milestone.title}</p>
              <p className="tw-paragraph-sm">{milestone.description}</p>
            </div>
            <div className="w-full overflow-x-auto">
              <div className="flex">
                {groupedElements.get(milestone.metal).map((element) => (
                  <div key={element.title}>
                    <h4 className="tw-heading-5">{element.title}</h4>
                    <p className="tw-paragraph-sm">{element.overview}</p>
                    <p className="tw-paragraph-sm">{element.description}</p>
                    <p className="tw-paragraph-sm">{element.progress}</p>
                    <p className="tw-paragraph-sm">{element.stack_rank}</p>
                    <p className="tw-paragraph-sm">{element.forum}</p>
                    <p className="tw-paragraph-sm">{element.proposal}</p>
                    <p className="tw-paragraph-sm">{element.wiki}</p>
                    <p className="tw-paragraph-sm">{element.docs}</p>
                    <p className="tw-paragraph-sm">{element.eta}</p>
                    <p className="tw-paragraph-sm">{element.is_community}</p>
                    <p className="tw-paragraph-sm">{element.in_beta}</p>
                    <p className="tw-paragraph-sm">{element.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

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
                This roadmap shows the status of many projects across the Internet Computer stack, but not all - more to come over the next few weeks.
              </p>
            </div>
          </div>
        </section>

        <section className="container-10 -mt-52 md:-mt-32 relative">
          <ThemeSection theme={themes} />
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
      </main>
    </Layout>
  );
};

export default RoadmapPage;
