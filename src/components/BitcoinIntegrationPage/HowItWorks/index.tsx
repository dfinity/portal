import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import HowItWorks from "@site/static/img/bitcoin-integration/howItWorks.webp";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";

function Index() {
  return (
    <AnimateSpawn
      el={motion.section}
      variants={transitions.container}
      className="container-10 flex gap-8 md:gap-1/10 items-center flex-col md:flex-row mb-20 md:mb-40"
    >
      <div className="md:order-2 md:flex-[4] relative z-10 max-w-xs md:max-w-none -mt-30 md:-mt-30">
        <img
          src={HowItWorks}
          alt=""
          className="aspect-[1000/2176] max-w-10/12"
        />
      </div>
      <div className="md:order-1 md:flex-[5]">
        <motion.h2
          variants={transitions.item}
          className="tw-heading-5 md:tw-heading-3 text-gradient mb-0"
        >
          Build DEXs offering BTC or BRC20 trading pairs, lending markets using
          Ordinals as collateral, or Web3 SocialFi services allowing satoshis to
          be sent via chat messages.
        </motion.h2>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
