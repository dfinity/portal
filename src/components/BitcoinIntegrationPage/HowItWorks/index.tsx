import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { motion } from "framer-motion";
import HowItWorks from "@site/static/img/bitcoin-integration/howItWorks.png";
import RightPointer from "@site/static/img/svgIcons/rightPointer.svg";
import Link from "@docusaurus/Link";

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
          className="absolute pointer-events-none h-[600px] right-0 left-0 mx-auto top-[-180px]  md:h-auto md:right-0 md:mr-1/12 md:w-4/12 md:top-[-150px] lg:top-[-280px] z-[1000]"
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
          Two key developments make Bitcoin integration possible: direct
          integration with the Bitcoin network and a novel threshold ECDSA
          protocol.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-heading-7">
          Direct Integration with Bitcoin
        </motion.p>
        <motion.p variants={transitions.item} className="mb-4 tw-paragraph">
          Direct integration means that nodes of the Internet Computer
          communicate directly with the nodes of the Bitcoin network without
          relying on centralized bridges.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-heading-7">
          Threshold ECDSA
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-paragraph">
          Threshold ECDSA is a cryptographic protocol that enables canisters to
          securely hold and use ECDSA keys. Shares of the secret key are stored
          across many nodes, making the protocol resilient to attacks from
          malicious nodes.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-4 tw-paragraph">
          With the{" "}
          <Link
            href="https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-bitcoin-api"
            className="underline text-infinite hover:text-black hover:no-underline"
          >
            Bitcoin API
          </Link>{" "}
          and{" "}
          <Link
            href="https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key"
            className="underline text-infinite hover:text-black hover:no-underline"
          >
            ECDSA API
          </Link>
          , canisters on the Internet Computer can securely receive, hold, and
          send bitcoins, opening the possibility for Bitcoin smart contracts.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-paragraph">
          Bringing smart contracts on the Internet Computer unlocks a number of
          novel applications including decentralized exchanges, using Bitcoin to
          participate in token sales, and chain-key-Bitcoin, an advanced form of
          wrapped Bitcoin without the usual drawbacks of token wrapping.
        </motion.p>
        <motion.p
          variants={transitions.item}
          className="mb-3 mt-6 tw-heading-6"
        >
          <a
            href="https://internetcomputer.org/docs/current/developer-docs/functionality/bitcoin/"
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
