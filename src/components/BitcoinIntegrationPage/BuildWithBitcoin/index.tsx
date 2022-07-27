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
        "Cras mattis consectetur purus sit amet fermentum. Integer posuere erat a ante venenatis dapibus.",
      href: "/",
    },
    {
      title: "Threshold ECDSA Documentation",
      description:
        "Cras mattis consectetur purus sit amet fermentum. Integer posuere erat a ante venenatis dapibus.",
      href: "/",
    },
    {
      title: "Video Tutorials",
      description:
        "Cras mattis consectetur purus sit amet fermentum. Integer posuere erat a ante venenatis dapibus.",
      href: "/",
    },
    {
      title: "Blogs",
      description:
        "Cras mattis consectetur purus sit amet fermentum. Integer posuere erat a ante venenatis dapibus.",
      href: "/",
    },
  ];
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="max-w-page relative mx-auto mb-20 px-6 md:mb-40 md:px-15"
    >
      <motion.p
        variants={transitions.item}
        className="tw-heading-4 md:tw-heading-3 text-center mb-2 w-5/6 mx-auto md:tw-heading-2 md:mb-6 md:w-6/12"
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
