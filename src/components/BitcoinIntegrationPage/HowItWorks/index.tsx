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
          receive bitcoin: inter-node communication between the Internet Computer
          network and the Bitcoin network, and the use of novel threshold ECDSA
          cryptography by its network protocols.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-heading-7">
          Network Integration
        </motion.p>
        <motion.p variants={transitions.item} className="mb-4 tw-paragraph">
          When the Internet Computer blockchain creates transactions for the 
          Bitcoin blockchain, its nodes directly transmit the transaction 
          to the Bitcoin network's nodes, without any need for intermediaries 
          that might censor them. Internet Computer nodes also directly 
          pull blocks from the Bitcoin network to update its current 
          UTXO set.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-heading-7">
          Threshold ECDSA
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-paragraph">
          Novel "threshold cryptography" allows the Internet Computer to distrubute
          secret key material across its nodes, and have them cooperate to
          create new bitcoin addresses, and sign Bitcoin transactions,
          using fault tolerant network protocols that are resilient to attacks
          by malicious nodes.
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
          , canisters can securely receive, hold, and send bitcoins, as though
          they were smart contracts actually hosted by the Bitcoin network itself.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-paragraph">
          This means bitcoin can be easily and securely incorporated into 
          DeFi and Web3 services on the Internet Computer, without the need to
          trust a bridging service that might get hacked, or taken down, causing
          the loss of the bitcoin involved.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-paragraph">   
          For example, DEXs (decentralized exchanges) can easily provide BTC 
          trading pairs, decentralized fundraises can accept bitcoin, and 
          a SocialFi service might allow satoshis to be sent using chat 
          messages, say.
        </motion.p>
        <motion.p variants={transitions.item} className="mb-2 tw-paragraph"> 
          Lightning Network-like services can be provided by wrapping 
          bitcoin inside fully autonomous Internet Computer smart contracts,
          such that bitcoin can be sent between users, Web3 services
          and DeFi contracts, with 1-2 second finality (whereas it takes 
          10 minutes to transfter bitcoin on the Bitcoin ledger).
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
