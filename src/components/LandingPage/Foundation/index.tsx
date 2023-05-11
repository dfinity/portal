import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React, { FC, ReactNode } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";

const FoundationSection: FC<{
  title: ReactNode;
  body: ReactNode;
  stats: {
    name: string;
    value: string | number;
  }[];
  cta: string;
  ctaUrl: string;
}> = ({ title, stats, body, cta, ctaUrl }) => {
  return (
    <section id="foundation">
      <AnimateSpawn
        className="md:container-12 my-20 md:my-30"
        variants={transitions.container}
      >
        <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-1/12 py-20 md:py-30 relative">
          <div className="md:w-8/10 md:mx-auto">
            <AnimateSpawn
              el={motion.h2}
              className="tw-heading-4 md:tw-heading-2 mb-6 md:mb-16 text-center"
              variants={transitions.item}
            >
              {title}
            </AnimateSpawn>
            <AnimateSpawn
              className="grid grid-cols-2 md:grid-cols-4 mb-6 md:mb-16 gap-y-8"
              variants={transitions.container}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.name}
                  className="flex flex-col gap-0 text-center border-0 odd:border-r md:border-r md:last:border-none border-solid border-black-20"
                  variants={transitions.item}
                >
                  <h4 className="tw-title-navigation text-black-30 mb-0">
                    {stat.name}
                  </h4>
                  <span className="tw-heading-3">{stat.value}</span>
                </motion.div>
              ))}
            </AnimateSpawn>

            <AnimateSpawn
              el={motion.p}
              className="tw-paragraph md:tw-lead text-center mb-6 md:mb-12"
              variants={transitions.item}
            >
              {body}
            </AnimateSpawn>

            <AnimateSpawn
              className="mb-0 text-center"
              variants={transitions.item}
            >
              <Link href={ctaUrl} className="button-outline">
                {cta}
              </Link>
            </AnimateSpawn>
          </div>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default FoundationSection;
