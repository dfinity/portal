import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import showcaseData from "../../../showcase.json";


const selectedProjectIds = [
  'omnitynetwork',
  'onicai',
  'motdex',
  'decideai',
  'tap-protocol',
  'bioniq',
  'origyn',
  'icdevs.org',
  'chainsight',
  'oisy',
]
const projects = showcaseData.filter((p) => selectedProjectIds.includes(p.id));

const TrySomeDapps: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <section id={id} className="relative z-0 mb-20">
      <AnimateSpawn variants={transitions.item}>
        <div className="container-10 pt-20 md:pt-30">
          <div className="">
            <h2 className="tw-heading-alt-2">
              Try some Dapps
              <br />
              at the <span className="inline-block text-gradient-base text-gradient-denver">
                ICP Booth
              </span>
            </h2>
            <p className="tw-lead-sm md:tw-lead text-black-60 mb-6 md:w-6/10">
              Step into the exciting world of cross-chain collaboration with ICP!
            </p>
          </div>
        </div>
        <AnimateSpawn
          className="container-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-12"
          variants={transitions.container}
        >
          {projects?.map((p, i) => (
            <motion.article
              variants={transitions.item}
              key={p.name + i}
              className="rounded-xl bg-white p-6 md:p-8 no-underline text-black hover:no-underline hover:text-black flex flex-col relative"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="w-16 sm:w-20 mb-3 h-16 sm:h-20 ml-0 object-contain absolute left-6 top-6 sm:static"
              />
              <div className="ml-[86px] sm:ml-0 mt-4 flex-1 flex flex-col justify-between items-start">
                <div>
                  <h3 className="tw-heading-6 sm:tw-heading-5 mb-1 sm:mb-2">
                    {p.name}
                  </h3>
                  <p className="tw-paragraph-sm sm:tw-lead-sm mb-3 sm:mb-4 text-black-60 flex-1">
                    {p.description}
                  </p>
                </div>
                <Link className="button-outline mt-4" href={p.website}>
                  Try it
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimateSpawn>

        <div className="relative -mt-96 mb-10 md:mb-40">
          <AnimateSpawn
            className="mt-96 pt-20 md:pt-30 text-center flex flex-col items-center gap-6"
            variants={transitions.item}
          >
            <Link className="button-primary" href="/ecosystem">
              Check out the Ecosystem
            </Link>
          </AnimateSpawn>
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default TrySomeDapps;
