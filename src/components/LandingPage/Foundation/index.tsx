import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";

export default function FoundationSection(): JSX.Element {
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
              The blockchain industry's
              <br />
              Skunk Works
            </AnimateSpawn>
            <AnimateSpawn
              className="grid grid-cols-2 md:grid-cols-4 mb-6 md:mb-16 gap-y-8"
              variants={transitions.container}
            >
              <motion.div
                className="flex flex-col gap-0 text-center border-0 border-r border-solid border-black-20"
                variants={transitions.item}
              >
                <h4 className="tw-title-navigation text-black-30 mb-0">
                  Team members
                </h4>
                <span className="tw-heading-3">270+</span>
              </motion.div>
              <motion.div
                className="flex flex-col gap-0 text-center border-0 border-r md:border-solid border-black-20"
                variants={transitions.item}
              >
                <h4 className="tw-title-navigation text-black-30 mb-0">
                  Publications
                </h4>
                <span className="tw-heading-3">1564</span>
              </motion.div>
              <motion.div
                className="flex flex-col gap-0 text-center border-0 border-r border-solid border-black-20"
                variants={transitions.item}
              >
                <h4 className="tw-title-navigation text-black-30 mb-0">
                  Citations
                </h4>
                <span className="tw-heading-3">86,347</span>
              </motion.div>
              <motion.div
                className="flex flex-col gap-0 text-center "
                variants={transitions.item}
              >
                <h4 className="tw-title-navigation text-black-30 mb-0">
                  Patents
                </h4>
                <span className="tw-heading-3">191</span>
              </motion.div>
            </AnimateSpawn>

            <AnimateSpawn
              el={motion.p}
              className="tw-paragraph md:tw-lead text-center mb-6 md:mb-12"
              variants={transitions.item}
            >
              The DFINITY Foundation is committed to realizing the most
              disruptive vision in tech: the adoption of public blockchain as a
              single technology stack that hosts all of humanity’s systems and
              services.
            </AnimateSpawn>

            <AnimateSpawn
              className="mb-0 text-center"
              variants={transitions.item}
            >
              <Link href="https://dfinity.org" className="button-outline">
                Visit the dfinity foundation
              </Link>
            </AnimateSpawn>
          </div>
        </div>
      </AnimateSpawn>
    </section>
  );
}
