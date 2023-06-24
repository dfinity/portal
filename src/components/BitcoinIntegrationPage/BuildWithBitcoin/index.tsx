import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { motion } from "framer-motion";
import { CardWithDescription } from "@site/src/components/Common/Card";

function Index() {
  const links = [
    {
      title: "Native Bitcoin API",
      href: "/docs/current/references/ic-interface-spec/#ic-bitcoin-api",
    },
    {
      title: "Chain-Key ECDSA API",
      href: "/docs/current/references/ic-interface-spec/#ic-ecdsa_public_key",
    },
    {
      title: "Native Bitcoin Docs",
      href: "/docs/current/developer-docs/integrations/bitcoin/bitcoin-how-it-works",
    },
    {
      title: "Chain-Key ECDSA Docs",
      href: "/docs/current/developer-docs/integrations/t-ecdsa",
    },
    {
      title: "Sample Code",
      href: "https://internetcomputer.org/samples?term=bitcoin",
    },
    {
      title: "Bitcoin integration FAQ",
      href: "/bitcoin-integration/faq",
    },
  ];
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15"
    >
      <motion.p
        variants={transitions.item}
        className="tw-heading-4 md:tw-heading-60 text-center mb-2 w-full mx-auto md:mb-6 md:w-8/12"
      >
        Code Bitcoin
      </motion.p>
      <motion.p
        variants={transitions.item}
        className="tw-lead-sm md:tw-lead mb-2 text-center w-5/6 mx-auto md:mb-6 md:w-6/12"
      >
        Directly process bitcoin on the Bitcoin ledger using ICP smart
        contracts. Add bitcoin to your ICP Web3 services or create native
        Bitcoin DeFi.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
        {links.map((card) => (
          <CardWithDescription
            key={card.title}
            title={card.title}
            description=""
            href={card.href}
          />
        ))}
      </div>
    </AnimateSpawn>
  );
}

export default Index;
