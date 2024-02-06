import React from "react";
import { motion } from "framer-motion";
import AnimateSpawn from "../AnimateSpawn/index";
import transitions from "@site/static/transitions.json";
import { CardWithDescription } from "../Card/index";
import clsx from "clsx";

export const LinkCardsSection: React.FC<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
  cards: {
    label: string;
    href: string;
    description?: string;
  }[];
  className?: string;
}> = ({ title, description, actions, cards, className }) => {
  return (
    <section className={clsx("container-12 relative", className)}>
      <AnimateSpawn
        className=" relative text-white"
        variants={transitions.container}
      >
        <motion.div
          className="blob blob-purple blob-md blob-x-5 blob-y-10 z-[-1] md:blob-lg opacity-80"
          variants={transitions.fadeIn}
        ></motion.div>
        <motion.h2
          className="tw-heading-3 text-center mb-0 w-full mx-auto md:tw-heading-60 lg:w-8/12"
          variants={transitions.item}
        >
          {title}
        </motion.h2>
      </AnimateSpawn>
      <AnimateSpawn
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 md:mt-16"
        variants={transitions.container}
      >
        {cards.map((card) => (
          <CardWithDescription
            key={card.href}
            title={card.label}
            description={card.description}
            href={card.href}
          />
        ))}
      </AnimateSpawn>
    </section>
  );
};

export default LinkCardsSection;
