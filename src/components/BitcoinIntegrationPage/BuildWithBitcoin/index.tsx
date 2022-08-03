import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { motion } from "framer-motion";
import { CardWithDescription } from "@site/src/components/Common/Card";

function Index() {
  const links = [
    {
      title: "BTC Integration Documentation",
      description:
        "Start building and testing Bitcoin functionality.",
      href: "/",
    },
    {
      title: "Threshold ECDSA Documentation",
      description: "Learn about threshold ECDSA signing and its functions.",
      href: "/",
    },
    {
      title: "Sample Code",
      description:
        "Deploy your first Bitcoin dapp and use threshold ECDSA signatures.",
      href: "/samples",
    },
    {
      title: "IC Wiki",
      description:
        "Take a deep dive into how Bitcoin integration works on the Internet Computer.",
      href: "https://wiki.internetcomputer.org/wiki/Bitcoin_integration",
    },
  ];
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15"
    >
      <motion.p
        variants={transitions.item}
        className="tw-heading-4 md:tw-heading-60 text-center mb-2 w-full mx-auto md:tw-heading-2 md:mb-6 md:w-8/12"
      >
        Build with Bitcoin Integration
      </motion.p>
      <motion.p
        variants={transitions.item}
        className="tw-lead-sm md:tw-lead mb-2 text-center w-5/6 mx-auto md:tw-heading-2 md:mb-6 md:w-6/12"
      >
        The efficiency and scalability of the Internet Computer opens up a whole
        new set of possible BTC applications: fund a DAO, create DeFi dapps and
        more.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-20">
        {links.map((card) => (
          <CardWithDescription
            key={card.title}
            title={card.title}
            description={card.description}
            href={card.href}
          />
        ))}
      </div>
    </AnimateSpawn>
  );
}

export default Index;
