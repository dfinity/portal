import React from "react";
import OpenOverlayIcon from "../../../../static/img/plus.svg";
import AnimateSpawn from "../../Common/AnimateSpawn/index";
import RoadmapCard from "../../RoadmapCard/index";
import { RoadmapDomain } from "../RoadmapTypes";
import transitions from "@site/static/transitions.json";

const DomainCard: React.FC<{
  domain: RoadmapDomain;
  onOpen: () => void;
  index: number;
}> = ({ domain, onOpen, index }) => {
  return (
    <AnimateSpawn variants={transitions}>
      <RoadmapCard
        reverse={index % 2 == 1}
        imgAlt={`${domain.name} roadmap`}
        imgUrl={domain.image?.card}
      >
        <h2 className="tw-heading-5 md:tw-heading-3 mb-3">{domain.name}</h2>
        <div
          className="tw-paragraph-sm md:tw-lead-sm text-black-60 mb-6"
          dangerouslySetInnerHTML={{ __html: domain.description }}
        ></div>
        <div className="flex gap-2 flex-col md:gap-6 md:flex-row mb-6">
          {domain.groups.future?.length > 0 && (
            <div className="inline-flex items-center gap-2 text-black tw-title-navigation">
              Future
              <div className="inline-flex gap-[2px]">
                {Array.from({
                  length: domain.groups.future?.length,
                }).map((_, i) => (
                  <span
                    className="w-[3px] h-4 rounded-full bg-blue inline-block"
                    key={i}
                  ></span>
                ))}
              </div>
            </div>
          )}
          {domain.groups.upcoming?.length > 0 && (
            <div className="inline-flex items-center gap-2 text-black tw-title-navigation">
              Upcoming
              <div className="inline-flex gap-[2px]">
                {Array.from({
                  length: domain.groups.upcoming?.length,
                }).map((_, i) => (
                  <span
                    className="w-[3px] h-4 rounded-full bg-black-30 inline-block"
                    key={i}
                  ></span>
                ))}
              </div>
            </div>
          )}
          {domain.groups.inProgress?.length > 0 && (
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
          {domain.groups.deployed?.length > 0 && (
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
          onClick={onOpen}
        >
          <OpenOverlayIcon />
          See feature list
        </button>
      </RoadmapCard>
    </AnimateSpawn>
  );
};

export default DomainCard;
