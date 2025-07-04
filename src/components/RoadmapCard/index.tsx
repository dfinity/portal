import transitions from "@site/static/transitions.json";
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const RoadmapCard: React.FC<{
  imgUrl: string;
  imgAlt: string;
  reverse: boolean;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
  aspectRatio?: boolean;
}> = ({
  reverse,
  imgUrl,
  imgAlt,
  children,
  className,
  contentClassName,
  imageClassName,
  aspectRatio = false,
}) => {
  return (
    <motion.article
      variants={transitions.item}
      className={clsx(
        "relative bg-white-80 backdrop-blur-2xl flex flex-col md:flex-row items-stretch md:items-center rounded-xl overflow-hidden",
        className
      )}
    >
      <img
        src={imgUrl}
        className={clsx(
          `h-[200px] object-cover md:h-auto md:w-[400px] ${
            aspectRatio ? "" : "aspect-[400/350]"
          } self-stretch object-center`,
          reverse ? "md:order-1" : "",
          imageClassName
        )}
        alt={imgAlt}
      ></img>
      <div className={clsx("px-6 pt-6 pb-8 md:p-12 flex-1", contentClassName)}>
        {children}
      </div>
    </motion.article>
  );
};

export default RoadmapCard;
