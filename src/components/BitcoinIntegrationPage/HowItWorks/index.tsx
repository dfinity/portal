import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import HeroImg from "@site/static/img/bitcoin-integration/btc_integration_hero.svg";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";

function Index() {
  return (
    <AnimateSpawn
      el={motion.section}
      variants={transitions.container}
      className="container-10 mt-60 md:mt-48 flex gap-8 md:gap-1/10 items-center flex-col md:flex-row mb-20 md:mb-40"
    >
      <div>
        <motion.h2
          variants={transitions.item}
          className="tw-heading-5 md:tw-heading-3 text-gradient mb-0 md:w-8/12"
        >
          Become a part of the Bitcoin economy with the programming capabilities
          of ICP. Build DEXs offering BTC or BRC20 trading pairs, lending
          markets using Ordinals as collateral, or Web3 SocialFi services
          allowing satoshis to be sent via chat messages.
        </motion.h2>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
