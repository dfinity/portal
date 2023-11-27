import Link from "@docusaurus/Link";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";

const IntroCards: React.FC = () => {
  return (
    <>
      <AnimateSpawn
        variants={transitions.container}
        className="container-12 mb-6"
      >
        <motion.div
          variants={transitions.item}
          className="
          relative
          md:col-span-3 flex rounded-3xl
        text-white bg-[linear-gradient(263deg,#C772EF_0%,#6A85F1_100%)]
        "
        >
          <div className="container-10 w-full">
            <div className="md:w-1/2 py-8 md:py-20 flex flex-col justify-center gap-4 md:gap-6 items-start">
              <h2 className="tw-heading-4 md:tw-heading-3 mb-0">
                What is the Internet Computer
              </h2>
              <p className="tw-lead-sm md:tw-lead mb-0 text-white/60">
                The Internet Computer adds autonomous serverless cloud
                functionality to the public internet.
              </p>
              <p className="mb-0">
                <Link className="button-white">Explore The Power of ICP</Link>
              </p>
            </div>
            <div className="w-full my-4 relative -right-6 md:absolute md:right-0 top-0 md:w-1/2">
              <img
                src="/img/home/what-is-the-ic.webp"
                alt=""
                className="h-full"
              />
            </div>
          </div>
        </motion.div>
      </AnimateSpawn>
      <div
        className="
          bg-[linear-gradient(180deg,transparent_0%,transparent_83.3%,#3B00B9_83.3%,#3B00B9_100%)]
          md:bg-[linear-gradient(180deg,transparent_0%,transparent_50%,#3B00B9_50%,#3B00B9_100%)]
        "
      >
        <AnimateSpawn
          className="container-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={transitions.container}
        >
          <motion.div
            className="rounded-3xl bg-white p-8 md:p-15 flex flex-col gap-4 md:gap-6"
            variants={transitions.item}
          >
            <h2 className="tw-heading-4 md:tw-heading-3 mb-0">
              Blockchain as a service
            </h2>
            <p className="tw-paragraph md:tw-lead-sm mb-0 flex-1">
              The future of cloud is serverless: for enterprise, government and
              Web3 applications – <strong>Build with Cloud 3.0.</strong>
            </p>
            <p className="mb-0">
              <Link className="button-outline" href="/enterprise">
                Learn about Cloud 3.0
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="rounded-3xl bg-white p-8 md:p-15 flex flex-col gap-4 md:gap-6"
            variants={transitions.item}
          >
            <h2 className="tw-heading-4 md:tw-heading-3 mb-0">
              Open Internet Services
            </h2>
            <p className="tw-paragraph md:tw-lead-sm mb-0 flex-1">
              now internet communities take full and exclusive control and
              ownership of entire internet services –{" "}
              <strong>Create your first DAO on true Web 3.0.</strong>
            </p>
            <p className="mb-0">
              <Link className="button-outline" href="/ois">
                Explore DAOs on ICP
              </Link>
            </p>
          </motion.div>
          <motion.div
            className="rounded-3xl bg-white p-8 md:p-15 flex flex-col gap-4 md:gap-6"
            variants={transitions.item}
          >
            <h2 className="tw-heading-4 md:tw-heading-3 mb-0">Your Web3 ID</h2>
            <p className="tw-paragraph md:tw-lead-sm mb-0 flex-1">
              Web2 relies on usernames and passwords for authentication –{" "}
              <strong>
                Internet Identity is the most secure authentification for Web2
                and Web3.{" "}
              </strong>{" "}
            </p>
            <p className="mb-0">
              <Link className="button-outline" href="/internet-identity">
                One ID for all services
              </Link>
            </p>
          </motion.div>
        </AnimateSpawn>
      </div>
    </>
  );
};

export default IntroCards;
