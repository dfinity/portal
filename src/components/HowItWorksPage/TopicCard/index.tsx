import transitions from "@site/static/transitions.json";
import React from "react";
import OpenOverlayIcon from "../../../../static/img/plus.svg";
import AnimateSpawn from "../../Common/AnimateSpawn";
import { WhatIsIcpTopic } from "../WhatIsIcpData";

const TopicCard: React.FC<{
  topic: WhatIsIcpTopic;
  onOpen?: () => void;
  index: number;
}> = ({ topic, onOpen, index }) => {
  return (
    <AnimateSpawn
      variants={transitions.item}
      className="relative bg-white-80 backdrop-blur-2xl flex flex-col md:flex-row items-stretch  rounded-xl overflow-hidden"
      key={topic.name}
    >
      <img
        src={topic.image?.card}
        className={`h-[200px] 
          ${topic.cardImageFit === "center" ? "object-contain" : "object-cover"}
          md:h-auto 
          md:w-[400px] ${index % 2 == 1 ? "md:order-1" : ""}`}
      ></img>
      <div className="px-6 py-8 pb-8 md:px-12 flex-1">
        <h2 className="tw-heading-5 md:tw-heading-3 mb-3">{topic.name}</h2>
        <div
          className="tw-paragraph-sm md:tw-lead-sm text-black-60"
          dangerouslySetInnerHTML={{ __html: topic.description }}
        ></div>

        {/* <button
          className="appearance-none bg-transparent border-none link-primary p-0 inline-flex gap-2 items-center"
          onClick={onOpen}
        >
          <OpenOverlayIcon />
          See feature list
        </button> */}
      </div>
    </AnimateSpawn>
  );
};

export default TopicCard;
