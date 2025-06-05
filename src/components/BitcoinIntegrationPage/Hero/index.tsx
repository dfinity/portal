import Link from "@docusaurus/Link";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React, { forwardRef } from "react";

const Hero = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <div ref={ref}>
      <div className="bg-infinite">
        <AnimateSpawn
          variants={transitions.container}
          className="container-10 relative text-white pt-36  md:pt-60 pb-40 "
        >
          <div className="blob blob-white blob-md md:blob-xl md:blob-white-dense md:opacity-60 right-0 translate-x-3/10 translate-y-5/10 md:translate-x-5/10 top-auto bottom-0"></div>
          <motion.h1
            variants={transitions.item}
            className="tw-heading-3 mb-2 md:tw-heading-2 md:mb-6 md:w-7/12"
          >
            Build on Bitcoin
          </motion.h1>
          <motion.p
            variants={transitions.item}
            className="tw-lead-sm md:tw-lead md:w-6/12 mb-0"
          >
            Leveraging Chain Fusion Technology, ICP canister smart contracts can
            hold a Bitcoin public key, sign transactions with it, and directly
            read and write to the Bitcoin network, including Taproot assets.
            Build incredible dapps that natively interact with the Bitcoin network.
          </motion.p>
          <motion.div variants={transitions.item} className="flex gap-4 mt-8">
            <Link
              to="/docs/references/bitcoin-how-it-works"
              className="button-white text-center mb-6 md:mb-8 whitespace-nowrap"
            >
              Build
            </Link>
            <Link
              to="https://internetcomputer.org/ecosystem?tag=Bitcoin"
              className="button-outline-white text-center mb-6 md:mb-8 whitespace-nowrap"
            >
              Explore
            </Link>
          </motion.div>
          <motion.div className="container-12 relative pointer-events-none">
            <div className="absolute w-10/12 translate-x-[5%] translate-y-[105%] bottom-1/2 xs:w-7/12 sm:w-4/12 md:w-8/12 md:bottom-0 md:translate-x-2/3 md:translate-y-1/2">
              <img
                src="/img/bitcoin-integration/btc_integration_hero.svg"
                className="w-full max-w-none"
                loading="lazy"
              />
            </div>
          </motion.div>
        </AnimateSpawn>
      </div>
    </div>
  );
});

export default Hero;
