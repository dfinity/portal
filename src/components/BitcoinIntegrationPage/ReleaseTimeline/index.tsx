import React from "react";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { motion } from "framer-motion";
import ChromiumGA from "@site/static/img/bitcoin-integration/chromiumGA.png";
import ChromiumBeta from "@site/static/img/bitcoin-integration/chromiumBeta.png";

function Index() {
  const timelineTasks = [
    "Bug Fixes",
    "Code Audits",
    "Developer Feedback",
    "Performance Updates",
    "Operational Experience",
  ];
  const betaReleaseInformation = [
    { title: "Bitcoin integration", body: "Bitcoin Testnet" },
    {
      title: "Threshold ECDSA",
      body: "ECDSA test key, deployed on a medium-replication-factor subnet",
    },
    {
      title: "Example code & doc",
      body: "Example dApps & web-based documentation",
    },
    { title: "On-chain-tradable asset", body: "n.a." },
    {
      title: "Purpose",
      body: "Development, Bitcoin testing and threshold ECDSA canisters",
    },
    { title: "Status", body: "Experimental" },
  ];
  const gaReleaseInformation = [
    { title: "Bitcoin integration", body: "Bitcoin Mainnet" },
    {
      title: "Threshold ECDSA",
      body: "Production ECDSA key, deployed on two high-replication-factor subnets",
    },
    {
      title: "Example code & doc",
      body: "Additional video tutorials",
    },
    {
      title: "On-chain-tradable asset",
      body: "ckBTC Bitcoin (advanced wrapped Bitcoin)",
    },
    {
      title: "Purpose",
      body: "Production use of Bitcoin and threshold ECDSA canisters",
    },
    { title: "Status", body: "Production" },
  ];
  return (
    <AnimateSpawn
      variants={transitions.container}
      className="max-w-page relative mx-auto mt-20 md:mt-40 mb-20 px-6 md:mb-60 md:px-15"
    >
      <motion.p
        variants={transitions.item}
        className="tw-heading-4 md:tw-heading-2 mb-12 text-transparent bg-clip-text bg-gradient-100 from-[#3B00B9] to-[#2586B6DE] text-center"
      >
        Release Timeline
      </motion.p>
      <div className="hidden sm:flex md:w-10/12 md:ml-1/12 flex-row items-center justify-center gap-28 relative mb-12">
        <motion.svg
          variants={transitions.item}
          viewBox="0 0 1115 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 h-5 w-full top-0 z-[-10] bottom-0 my-auto"
          preserveAspectRatio="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.988281 0H1104.51L1115 10.001L1104.51 20.002H0.988281V0Z"
            fill="url(#paint0_linear_2390_42016)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2390_42016"
              x1="1111.51"
              y1="9.93399"
              x2="0.989208"
              y2="9.93399"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B00B9" />
              <stop offset="1" stopColor="#3B00B9" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </motion.svg>
        <motion.img
          variants={transitions.item}
          src={ChromiumBeta}
          alt=""
          className="h-28 "
        />
        <motion.div
          variants={transitions.item}
          className="flex flex-col bg-black-60 rounded-xl  opacity-60 backdrop-blur-md p-6 text-white tw-navigation"
        >
          {timelineTasks.map((task) => (
            <p key={task} className="mb-3 last:mb-0 tw-title-navigation">
              {task}
            </p>
          ))}
        </motion.div>
        <motion.img
          variants={transitions.item}
          src={ChromiumGA}
          alt=""
          className="h-36"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-5 md:w-10/12 mx-auto">
        <div className="sm:w-1/2 relative bg-white  rounded-xl pt-10 pb-8 px-6 lg:py-12 lg:pl-12 lg:pr-24">
          <div className="tw-lead-sm absolute top-[-18px] h-9 bg-infinite text-white rounded-full py-1 px-3">
            Summer 2022
          </div>
          <motion.img
            variants={transitions.item}
            src={ChromiumBeta}
            alt=""
            className=" sm:hidden absolute right-6 h-20 top-[-40px]"
          />
          <p className="tw-heading-5 md:tw-heading-4 mb-12">Beta Release </p>
          <div className="flex flex-col gap-6">
            {betaReleaseInformation.map((info, index) => (
              <div key={info.title}>
                <p className="mb-1 tw-heading-7-caps uppercase text-black-30">
                  {info.title}
                </p>

                {/* hack: in order to have the content pieces in the 2 cards take up the exact amount of lines we render both in all cells */}
                <p className="mb-0 tw-lead-sm md:tw-lead grid grid-cols-1">
                  {/* real content */}
                  <div className="col-start-1 row-start-1">{info.body}</div>
                  {/* counterpart content in case it's longer */}
                  <div
                    className="col-start-1 row-start-1 invisible pointer-events-none"
                    aria-hidden
                  >
                    {gaReleaseInformation[index].body}
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:hidden flex relative justify-center pt-12 pb-20">
          <svg
            viewBox="0 0 21 262"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="absolute right-0 left-0 mx-auto h-full w-5 top-[-24px] z-[-10]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 0L21 250.522L10.999 261.011L0.997994 250.522L0.998005 -8.74315e-07L21 0Z"
              fill="url(#paint0_linear_2390_42602)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2390_42602"
                x1="11.066"
                y1="430.523"
                x2="11.066"
                y2="-679.998"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3B00B9" />
                <stop offset="1" stopColor="#3B00B9" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            variants={transitions.item}
            className="flex flex-col bg-black-60 rounded-xl items-center opacity-60 backdrop-blur-md py-3 px-6 text-white tw-navigation"
          >
            {timelineTasks.map((task) => (
              <p
                key={task}
                className="mb-3 last:mb-0 tw-title-navigation-on-page"
              >
                {task}
              </p>
            ))}
          </motion.div>
        </div>
        <div className="sm:w-1/2 relative bg-infinite  text-white rounded-xl pt-10 pb-8 px-6 lg:py-12 lg:pl-12 lg:pr-24">
          <div className="tw-lead-sm absolute top-[-18px] h-9 bg-white text-black rounded-full py-1 px-3">
            2022
          </div>
          <motion.img
            variants={transitions.item}
            src={ChromiumGA}
            alt=""
            className=" sm:hidden absolute right-6 h-28 top-[-56px]"
          />
          <p className="tw-heading-5 md:tw-heading-4 mb-12">GA Release </p>
          <div className="flex flex-col gap-6">
            {gaReleaseInformation.map((info, index) => (
              <div key={info.title}>
                <p className="mb-1 tw-heading-7-caps uppercase text-white-50">
                  {info.title}
                </p>
                {/* hack: in order to have the content pieces in the 2 cards take up the exact amount of lines we render both in all cells */}
                <p className="mb-0 tw-lead-sm md:tw-lead grid grid-cols-1">
                  {/* real content */}
                  <div className="col-start-1 row-start-1">{info.body}</div>
                  {/* counterpart content in case it's longer */}
                  <div
                    className="col-start-1 row-start-1 invisible pointer-events-none"
                    aria-hidden
                  >
                    {betaReleaseInformation[index].body}
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
