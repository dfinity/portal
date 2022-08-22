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
          Two key developments make it possible for Internet Computer smart 
          contracts to create bitcoin addresses and directly send and 
          receive bitcoin: inter-node communication with the Bitcoin network, 
          and the incorporation of novel threshold ECDSA cryptography into its
          network protocols.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-heading-7">
          Network Integration with Bitcoin
        </motion.p>
        <motion.p variants={transitions.item} className="mb-4 tw-paragraph">
          The nodes hosting the Internet Computer network directly communicate with the
          nodes hosting the Bitcoin network, without intermediaries.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-heading-7">
          Threshold ECDSA
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-paragraph">
          This is used by the Internet Computer to generate new bitcoin addresses
          for smart contracts on demand, and to sign new Bitcoin transactions pertaining
          to those addresses, while distributing the secret key material involved
          across many of its nodes, using protocols that are resilient
          to attacks by malicious nodes.
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
          , canister smart contracts on the Internet Computer can securely
          receive, hold, and send bitcoins, as though they were actually hosted
          on the Bitcoin network and bitcoin was a native token.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-paragraph">
          This means bitcoin can be easily and securely incorporated into 
          DeFi and Web3 services on the Internet Computer, without the need to
          trust a bridging service that might get hacked, or taken down, causing
          the loss of the bitcoin involved.
          For example, DEXs (decentralized exchanges) can easily provide BTC 
          trading pairs, decentralized fundraises can accept bitcoin, and 
          a SocialFi service might allow satoshis to be sent using chat 
          messages, say.
          Lightning Network-like services can be provided by wrapping 
          bitcoin inside fully autonomous Internet Computer smart contracts,
          such that bitcoin can be sent between users, Web3 services
          and applications, with 1-2 second finality (improving upon the Bitcoin 
          network's finality, which is 10 minutes in expectation).
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
