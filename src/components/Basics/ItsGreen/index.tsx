import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";

import Icon1 from "../../../../static/img/basics/icon-plant.svg";
import Icon2 from "../../../../static/img/basics/icon-iot.svg";
import Icon3 from "../../../../static/img/basics/icon-db.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import GreenBlur from "@site/static/img/basics/greenBlur.png";
import Link from "@docusaurus/Link";
import ExternalLinkIcon from "../../../../static/img/external-link.svg";
import clsx from "clsx";
import { useSpawnAnimation } from "@site/src/utils/use-spawn-animation";

const comparison = [
  {
    logo: "/img/basics/logos/logo-icp.svg",
    value: 0.008,
  },
  {
    logo: "/img/basics/logos/logo-solana.svg",
    value: 0.166,
  },
  {
    logo: "/img/basics/logos/logo-algorand.svg",
    value: 2.7,
  },
  {
    logo: "/img/basics/logos/logo-avalanche.svg",
    value: 4.76,
  },
  {
    logo: "/img/basics/logos/logo-polkadot.svg",
    value: 17.4,
  },
  {
    logo: "/img/basics/logos/logo-eth.svg",
    value: 30.0,
  },
  {
    logo: "/img/basics/logos/logo-tezos.svg",
    value: 41.45,
  },
  {
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
    <motion.div
      key={project.logo}
      className="flex gap-6 items-center"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
    >
      <img
        src={project.logo}
        alt=""
        className={clsx(isFirst ? "" : "m-[5px]")}
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
    </motion.div>
  );
};

const ItsGreen: React.FC<{ id?: string }> = ({ id }) => {
  const iconAnim = useSpawnAnimation();
  const statsAnim = useSpawnAnimation();

  return (
    <section className={styles.outerContainer} id={id}>
      <img src={GreenBlur} className={styles.BGGradient} alt="" />

      <motion.div
        ref={iconAnim.ref}
        animate={iconAnim.controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.h2 variants={transitions.item} className={styles.heading}>
          Blockchain compute that's climate friendly
        </motion.h2>
        <motion.p variants={transitions.item} className="paragraph-large mb-8">
          The unique architecture and novel cryptography of the Internet Computer blockchain allow 
          it to host smart contract software, data and computation, with levels of efficiency 
          competitive with normal software that runs on Big Tech's cloud services. 
          Meanwhile, it is currently tens of thousands of times more efficient than the next most 
          efficient blockchain. Web3 projects that incorporate Internet Computer smart contracts 
          can consequently dramatically lower their carbon footprints, and reduce climate change.
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
        <Icon1></Icon1>
        <Icon2></Icon2>
        <Icon3></Icon3>

        <motion.div
          className="space-y-3"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                delayChildren: 0,
                staggerChildren: 0.2,
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
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="tw-paragraph-sm mb-0 pt-3"
          >
            A comparison of the energy consumption per transaction between
            blockchains
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ItsGreen;
