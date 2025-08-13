import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import HeroImg from "@site/static/img/bitcoin-integration/btc_integration_hero.svg";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";
import VideoCard from "../../Common/VideoCard";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import VideoSlider from "../VideoSlider";

function Index() {
  return (
    <>
      <AnimateSpawn
        el={motion.section}
        variants={transitions.container}
        className="container-10 mt-48 mb-20 md:mb-40 "
      >
        <motion.h2
          variants={transitions.item}
          className="tw-heading-5 md:tw-heading-3 text-gradient mb-0 md:w-9/12"
        >
          Expand the Bitcoin ecosystem with the Internet Computer's robust programming
          capabilities. Develop the DEXs the community needs for efficient BTC and Runes
          trading. Pioneer lending platforms that unlock new value from Ordinals.
          The tools are here – now it's time to build.
        </motion.h2>
        <div className="mt-12 md:mt-20">
          <VideoSlider />
        </div>
      </AnimateSpawn>

    </>
  );
}

export default Index;
