import Link from "@docusaurus/Link";
import ArrowRight from "@site/static/img/arrow-right.svg";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";

export default function NextGenSection(): JSX.Element {
  return (
    <AnimateSpawn
      className="md:container-12 pt-40 md:pt-20"
      el={motion.section}
      variants={transitions.container}
    >
      <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-1/12 pb-20 md:py-30 relative">
        <div className="-translate-y-24 sm:-translate-y-40 md:translate-y-0 md:absolute z-[-1] md:w-[500px] lg:w-[780px] md:top-[40px] lg:top-[-130px] right-0 overflow-hidden">
          <motion.img
            src="/img/home/dao.svg"
            alt=""
            className="w-full relative md:right-[-50px] lg:right-[-100px]"
            variants={transitions.item}
          />
        </div>
        <motion.h2
          className="-mt-16 md:mt-0 text-transparent bg-clip-text gradient-text tw-heading-3 md:tw-heading-60 mb-6"
          variants={transitions.item}
        >
          DAO crypto evolved
        </motion.h2>
        <motion.p
          className="tw-lead-sm md:tw-lead-lg mb-3"
          variants={transitions.item}
        >
          Community DAOs that can own
          <br />
          and manage a social network
          <br />
          can now democratize tech
        </motion.p>
        <motion.p
          className="tw-heading-6 md:tw-heading-4 mb-8"
          variants={transitions.item}
        >
          Corporation &rarr; algo democracy
        </motion.p>
        <motion.p className="mb-6" variants={transitions.item}>
          <Link className="button-primary" href="/sns">
            Service Nervous System Basics
          </Link>
        </motion.p>
        {/* <motion.p className="mb-0" variants={transitions.item}>
          <Link className="link-primary inline-flex items-center gap-2" href="/sns">
            <ArrowRight></ArrowRight>
            Give it a try
          </Link>
        </motion.p> */}
      </div>
    </AnimateSpawn>
  );
}
