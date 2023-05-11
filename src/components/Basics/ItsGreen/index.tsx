import React, { useRef } from "react";

import Link from "@docusaurus/Link";
import { useSpawnAnimation } from "@site/src/utils/use-spawn-animation";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import Icon3 from "../../../../static/img/basics/icon-db.svg";
import Icon2 from "../../../../static/img/basics/icon-iot.svg";
import Icon1 from "../../../../static/img/basics/icon-plant.svg";
import ExternalLinkIcon from "../../../../static/img/external-link.svg";

const comparison = [
  {
    projectName: "ICP",
    logo: "/img/basics/logos/logo-icp.svg",
    value: 0.008,
  },
  {
    projectName: "Solana",
    logo: "/img/basics/logos/logo-solana.svg",
    value: 0.166,
  },
  {
    projectName: "Algorand",

    logo: "/img/basics/logos/logo-algorand.svg",
    value: 2.7,
  },
  {
    projectName: "Avalanche",
    logo: "/img/basics/logos/logo-avalanche.svg",
    value: 4.76,
  },
  {
    projectName: "Polkadot",
    logo: "/img/basics/logos/logo-polkadot.svg",
    value: 17.4,
  },
  {
    projectName: "Ethereum",
    logo: "/img/basics/logos/logo-eth.svg",
    value: 30.0,
  },
  {
    projectName: "Tezos",
    logo: "/img/basics/logos/logo-tezos.svg",
    value: 41.45,
  },
  {
    projectName: "Cardano",
    logo: "/img/basics/logos/logo-cardano.svg",
    value: 51.59,
  },
];

const scaleMax = comparison.reduce((max, p) => Math.max(max, p.value), 0);

const ComparedProject: React.FC<{
  project: typeof comparison[0];
  isFirst: boolean;
}> = ({ project, isFirst }) => {
  const labelRef = useRef<HTMLSpanElement>();
  return (
    <motion.figure
      key={project.logo}
      className="flex gap-6 items-center mx-0"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
      aria-label={`${project.projectName} consumes ${project.value} Wh/tx`}
    >
      <img
        src={project.logo}
        alt=""
        className={clsx(isFirst ? "w-10 h-10" : "w-[30px] h-[30px] m-[5px]")}
        loading="lazy"
      ></img>
      <div className="flex items-center flex-1 pr-[72px] box-content">
        <div
          className="flex items-center min-w-[2px] "
          style={{
            width: ((project.value / scaleMax) * 100).toFixed(1) + "%",
          }}
        >
          <motion.div
            className={clsx(
              "rounded-[4px] h-2 w-full relative",
              isFirst ? "bg-white" : "bg-white-30"
            )}
            variants={{
              hidden: { width: 0 },
              show: {
                width: "100%",
              },
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            onUpdate={(value) =>
              (labelRef.current.textContent = (
                (+(value.width as string).slice(0, -1) * project.value) /
                100
              ).toFixed(3))
            }
          >
            <span
              className={clsx(
                "absolute -right-6 top-1/2 -translate-y-1/2 translate-x-full whitespace-nowrap",
                isFirst ? "tw-heading-5" : "tw-heading-7"
              )}
            >
              <span ref={labelRef}></span>
              {isFirst && <span className="pl-6">Wh/tx</span>}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.figure>
  );
};

const ItsGreen: React.FC<{ id?: string }> = ({ id }) => {
  const iconAnim = useSpawnAnimation();
  const statsAnim = useSpawnAnimation();

  return (
    <section className="container-10 relative" id={id}>
      <img
        src="/img/features/blob-bg-hero.png"
        alt=""
        className="absolute left-1/2 -translate-x-7/12 -top-[40vmax] w-[260vmax] max-w-none md:max-w-[300vmin] z-[-1]"
      />

      <motion.div
        ref={iconAnim.ref}
        animate={iconAnim.controls}
        initial="hidden"
        variants={transitions.container}
        className="text-white md:w-8/10 mt-64 md:mt-64 mb-20 md:mb-40 relative"
      >
        <motion.h2
          variants={transitions.item}
          className="tw-heading-4 md:tw-heading-60 mb-6"
        >
          Blockchain operation that's climate friendly
        </motion.h2>

        <motion.p
          variants={transitions.item}
          className="tw-paragraph md:tw-lead mb-8"
        >
          Thanks to the unique architecture and novel cryptography, the Internet
          Computer hosts smart contract software, data, and computation, with
          energy consumption levels comparable with traditional software that
          runs on Big Tech's cloud services and orders of magnitude lower than
          competing blockchains. Web3 projects that incorporate Internet
          Computer smart contracts can dramatically lower their carbon
          footprint, and help reduce climate change.
        </motion.p>
        <motion.p
          variants={transitions.item}
          className="flex flex-col gap-2 items-start mb-20"
        >
          <Link
            href="https://assets.carboncrowd.io/reports/ICF.pdf"
            className="button-outline-white mb-6"
          >
            ICP Sustainability report
          </Link>
          <Link
            href="https://medium.com/dfinity/internet-computer-footprint-assessing-ic-energy-consumption-and-sustainability-4a4dcf10707a"
            className="text-white hover:text-white-60 hover:no-underline tw-heading-6"
          >
            Get the gist on Medium
            <ExternalLinkIcon className="inline-block align-bottom ml-2"></ExternalLinkIcon>
          </Link>
        </motion.p>

        <Icon1
          aria-hidden
          className="absolute w-30 md:w-40 top-[-150px] right-[130px] md:top-[-160px] md:right-[20px]"
        ></Icon1>
        <Icon2
          aria-hidden
          className="absolute w-30 md:w-40 top-[-220px] right-0 md:top-[-240px] md:right-[-240px]"
        ></Icon2>
        <Icon3
          aria-hidden
          className="absolute w-30 md:w-40 -top-30 right-[-30px] md:top-[70px] md:right-[-180px]"
        ></Icon3>

        <motion.figure
          className="space-y-3 mx-0"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                delayChildren: 0,
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          ref={statsAnim.ref}
          animate={statsAnim.controls}
        >
          {comparison.map((p, i) => (
            <ComparedProject
              key={p.logo}
              project={p}
              isFirst={i === 0}
            ></ComparedProject>
          ))}
          <motion.figcaption
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="tw-paragraph-sm mb-0 pt-3"
          >
            A comparison of the energy consumption per transaction between
            blockchains
          </motion.figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
};

export default ItsGreen;
