import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { motion } from "framer-motion";
import HowItWorks from "@site/static/img/bitcoin-integration/howItWorks.png";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";

function Index() {
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="max-w-page relative mx-auto mt-20 lg:mt-40 mb-20 px-6 md:mb-60 md:px-15"
    >
      <div className="bg-infinite">
        <img
          src={HowItWorks}
          alt=""
          className="absolute pointer-events-none h-[600px] right-0 left-0 mx-auto top-[-180px]  md:top-[-250px] md:h-auto md:right-0 md:mr-1/12 md:w-4/12 md:top-[-150px] lg:top-[-280px] z-[1000]"
        />
      </div>
      <section className="md:ml-1/12 md:w-5/12 lg:w-4/12">
        <motion.h1
          variants={transitions.item}
          className="tw-heading-5 mb-2 w-4/6 md:w-full pt-[450px] md:pt-0 md:tw-heading-3 md:mb-6"
        >
          How It Works
        </motion.h1>
        <motion.p variants={transitions.item} className="mb-4 tw-paragraph">
          Bitcoin integration is possible via two key elements: smart contracts
          and a threshold ECDSA protocol.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-heading-7">
          Smart Contracts
        </motion.p>
        <motion.p variants={transitions.item} className="mb-4 tw-paragraph">
          Bringing smart contracts to Bitcoin unlocks a plethora of novel
          applications including Bitcoin transfers in social apps,
          decentralization sales through the NNS where tokens of a dApp can be
          acquired with Bitcoin, or chain-key-Bitcoin, an advanced form of
          wrapped Bitcoin without the usual drawbacks of token wrapping.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-heading-7">
          Threshold ECDSA
        </motion.p>
        <motion.p variants={transitions.item} className="mb-4 tw-paragraph">
          Threshold ECDSA is an innovative chain-key design whereby the BTC
          ledger holds its own private key that is not available to anyone or
          any code. Fragments of the private key are then distributed or hidden
          among replicas of the subnet, and transactions are signed by threshold
          signatures. With this design, canisters can securely receive, hold,
          and transfer Bitcoin directly on the Bitcoin network.
        </motion.p>
        <motion.p
          variants={transitions.item}
          className="mb-3 mt-6 tw-heading-6"
        >
          <a
            href="docs/current/developer-docs/functionality/bitcoin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black hover:no-underline tw-heading-6"
          >
            <RightPointer className="inline-block align-bottom w-6 h-6 mr-2"></RightPointer>
            Start building
          </a>
        </motion.p>
      </section>
    </AnimateSpawn>
  );
}

export default Index;
