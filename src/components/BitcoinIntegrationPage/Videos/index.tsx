import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import ExternalLinkIcon from "@site/static/img/external-link.svg";
import PlaySVG from "@site/static/img/svgIcons/play.svg";
import { ArrowIconRight } from "../../RoadmapPage/Overlay";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import { motion } from "framer-motion";
import VideoCard from "../../Common/VideoCard";

const videos = [
  {
    id: "LGegOFqP5x0",
    title: "Code Native Bitcoin I",
  },
  {
    id: "H6Wu9n9Qwa8",
    title: "Code Native Bitcoin II",
  },
  // {
  //   id: "H6Wu9n9Qwa8",
  //   title: "Code ckBTC",
  // },
];

function Index() {
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="container-10 relative mt-20 md:mt-40"
    >
      <motion.div
        className="blob blob-purple blob-sm translate-x-1/3 -translate-y-2/10 z-[-1] md:blob-lg"
        variants={transitions.fadeIn}
      ></motion.div>
      <div className="mb-12 md:mb-24">
        <h2 className="tw-heading-4 md:tw-heading-2 md:mr-5 md:w-7/10 flex-none">
          Sample Code Examples & Startup Requests 
        </h2>
        <Link
          className="link-primary link-with-icon md:mt-4"
          href="/samples"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkArrowRight /> See all
        </Link>
      </div>
      <motion.div
        variants={transitions.item}
        className="mt-6 mb-6 md:mt-20 md:mb-12"
      >
        <VideoCard
          image="https://i.ytimg.com/vi/OTAKkWAlfJE/maxresdefault.jpg"
          title="Internet Computer BUIDL Bitcoin Hackathon Powered by Encode"
          label="Demo Day"
          link={`https://www.youtube.com/playlist?list=PLfEHHr3qexv_cMqcKj6ay8cDUq0BNOGGb`}
          description={
            <>
              {" "}
              <Link
                className="link-primary link-with-icon md:mt-4"
                href="https://www.youtube.com/playlist?list=PLfEHHr3qexv_cMqcKj6ay8cDUq0BNOGGb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkArrowRight /> View playlist
              </Link>
            </>
          }
        />{" "}
      </motion.div>
    </AnimateSpawn>
  );
}

export default Index;
