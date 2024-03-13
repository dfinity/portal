import React from "react";
import AnimateSpawn from "../AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import clsx from "clsx";

export const TranslatedCard: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
  icon: React.ReactNode;
}> = ({ title, children, icon }) => {
  return (
    <AnimateSpawn
      className="sm:w-4/10 sm:even:self-end sm:-mt-40 lg:-mt-20 sm:first:mt-0"
      variants={transitions.container}
    >
      <motion.div className="w-30 mb-4" variants={transitions.item}>
        {icon}
      </motion.div>
      <motion.h3
        className="tw-heading-4 mb-4 md:tw-heading-3"
        variants={transitions.item}
      >
        {title}
      </motion.h3>
      {children}
    </AnimateSpawn>
  );
};

export const TranslatedCardList: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={clsx("flex flex-col gap-16 sm:gap-0", className)}>
      {children}
    </div>
  );
};
