import Link from "@docusaurus/Link";
import useGlobalData from "@docusaurus/useGlobalData";
import {
  getBlockCount,
  getBlockRate,
  getBytesStored,
  getSubnetCount,
  getTransactionRate,
  getTransactionRateV3,
} from "@site/src/utils/network-stats";
import transitions from "@site/static/transitions.json";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import AnimateSpawn from "../../Common/AnimateSpawn";
import DarkHeroStyles from "../../Common/DarkHeroStyles";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import { ConstantRateCounter, SpringCounter } from "./Counters";
import InfoIcon from "./InfoIcon";
import ParticleAnimation from "./ParticleAnimation";

function formatNumber(x: number) {
  return x
    .toLocaleString("en-US", {
      maximumFractionDigits: 0,
    })
    .replace(/,/g, "\u2019");
}

function formatStateSize(x: number) {
  return (
    (x / 1000000000000).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }) + " TB"
  );
}

let lastTxRate = 0;
function transactionRateWithJitter(): Promise<number> {
  return getTransactionRate().then((rate) => {
    if (lastTxRate === rate) {
      return Math.max(0, rate + Math.random() * 40 - 20);
    }
    lastTxRate = rate;
    return rate;
  });
}

let lastUpdateTxRate = 0;
function updateRateWithJitter(): Promise<number> {
  return getTransactionRateV3("update").then((rate) => {
    if (lastUpdateTxRate === rate) {
      return Math.max(0, rate + Math.random() * 4 - 2);
    }
    lastUpdateTxRate = rate;
    return rate;
  });
}

function getEthEquivalentFigureSpacer(value) {
  const valueDigitCount = value.toString().length;
  const valueDigitCountWithApostrophes =
    valueDigitCount + Math.floor((valueDigitCount - 1) / 3);
  const scheme = `999'999'999'999'999`;
  return scheme.slice(scheme.length - valueDigitCountWithApostrophes);
}

const Numbers = () => {
  const blockInfoQuery = useQuery(["blockRate"], () =>
    Promise.all([getBlockCount(), getBlockRate()])
  );
  const finalizationRate = useQuery(["getFinalizationRate"], getBlockRate);
  const updateTxRate = useQuery(["getUpdateTxRate"], updateRateWithJitter, {
    refetchInterval: 1000,
  });
  const subnetCountQuery = useQuery(["subnetCount"], getSubnetCount);
  const transactionRateQuery = useQuery(
    ["transactionRate"],
    transactionRateWithJitter,
    {
      refetchInterval: 1000,
    }
  );
  const stateSizeQuery = useQuery(["stateSize"], getBytesStored, {
    refetchInterval: 10000,
  });

  const globalData = useGlobalData();
  const xdrPrice = globalData["xdr-price"]["default"] as number;

  return (
    <div className="grid gap-x-2/10 gap-y-24 grid-cols-1 md:grid-cols-2 mb-24">
      <AnimateSpawn className="text-left" variants={transitions.container}>
        <h3 className="tw-title-sm md:tw-title-lg mb-2">
          {blockInfoQuery.isFetched ? (
            <ConstantRateCounter
              start={blockInfoQuery.data[0]}
              ratePerSec={blockInfoQuery.data[1]}
              format={formatNumber}
              className="text-transparent bg-clip-text hero-stat-red"
            ></ConstantRateCounter>
          ) : (
            <>&nbsp;</>
          )}
        </h3>
        <div className="flex flex-col gap-3 md:gap-4">
          <p className="tw-paragraph md:tw-heading-5 mb-0">Blocks processed</p>
          <p className="text-white-60 tw-paragraph md:tw-lead-sm mb-0">
            ICP scales horizontally by transparently combining subnet
            blockchains into one unified blockchain.
            Blocks and transactions per second are unbounded.
          </p>
          <div className="tw-paragraph md:tw-lead-sm flex items-center gap-2">
            <span className="tw-lead md:text-[35px] md:leading-[30px]">
              {finalizationRate.isFetched ? (
                (finalizationRate.data * 2).toFixed(1)
              ) : (
                <>&nbsp;&nbsp;</>
              )}
            </span>{" "}
            MB/s block throughput capacity
          </div>
          <div className="tw-paragraph md:tw-lead-sm flex items-center gap-2">
            <span className="tw-lead md:text-[35px] md:leading-[30px]">
              {subnetCountQuery.isFetched ? (
                subnetCountQuery.data
              ) : (
                <>&nbsp;&nbsp;</>
              )}
            </span>{" "}
            parallel subnets
          </div>
        </div>
      </AnimateSpawn>
      <AnimateSpawn className="text-left" variants={transitions.container}>
        <h3 className="tw-title-sm md:tw-title-lg mb-2">
          {updateTxRate.isFetched ? (
            <>
              <SpringCounter
                target={updateTxRate.data * 80}
                initialTarget={updateTxRate.data * 80}
                initialValue={updateTxRate.data * 80}
                format={formatNumber}
                springConfig={[3, 1, 1]}
                className="text-transparent bg-clip-text hero-stat-blue"
              ></SpringCounter>
              <span className="col-start-1 row-start-1 invisible pointer-events-none pr-1">
                {getEthEquivalentFigureSpacer(
                  Math.floor(updateTxRate.data * 1)
                )}
              </span>
            </>
          ) : (
            <span className="col-start-1 row-start-1 invisible pointer-events-none pr-1">
              {getEthEquivalentFigureSpacer(Math.floor(5000 * 1))}
            </span>
          )}
        </h3>
        <div className="flex flex-col gap-3 md:gap-4">
          <p className="tw-paragraph md:tw-heading-5 mb-0">Ethereum equivalent Tx/s</p>
          <Link
             href="https://wiki.internetcomputer.org/wiki/Not_all_transactions_are_equal"
             title="Read more: Not all transactions are equal"
             className="text-white hover:text-white-60 hover:no-underline flex items-center ml-2"
          >
             <InfoIcon className="w-4 h-4 md:w-6 md:h-6" />
          </Link>
          <p className="text-white-60 tw-paragraph md:tw-lead-sm mb-0">
            Transactions invoke "actor" canister smart contract computations, 
            which subnet blockchains can run concurrently (yet deterministically).
          </p>
          <div className="tw-paragraph md:tw-lead-sm flex items-center gap-2">
            <span className="tw-lead md:text-[35px] md:leading-[30px]">
              $0.0000022
            </span>{" "}
            average cost/Tx
          </div>
          <div className="tw-paragraph md:tw-lead-sm flex items-center gap-1 whitespace-nowrap">
            <span className="tw-lead md:text-[35px] md:leading-[30px] inline-grid">
              {transactionRateQuery.isFetched ? (
                <>
                  <SpringCounter
                    target={transactionRateQuery.data}
                    initialTarget={transactionRateQuery.data}
                    initialValue={0}
                    format={formatNumber}
                    className="col-start-1 row-start-1"
                    springConfig={[3, 1, 1]}
                  ></SpringCounter>
              <span className="col-start-1 row-start-1 invisible pointer-events-none pr-1">
                {getEthEquivalentFigureSpacer(
                  Math.floor(updateTxRate.data * 1)
                )}
              </span>
            </>                  
              ) : (
                <>&nbsp;</>
              )}
            </span>{" "}
            ICP Tx/s{" "}
          </div>
        </div>
      </AnimateSpawn>
      <AnimateSpawn
        className="text-left md:col-span-2 md:w-4/10 md:mx-auto"
        variants={transitions.container}
      >
        <h3 className="tw-title-sm md:tw-title-lg mb-2">
          {stateSizeQuery.isFetched ? (
            <SpringCounter
              target={stateSizeQuery.data}
              initialTarget={stateSizeQuery.data}
              initialValue={0}
              format={formatStateSize}
              className="text-transparent bg-clip-text hero-stat-green"
              springConfig={[3, 1, 3]}
            ></SpringCounter>
          ) : (
            <>&nbsp;</>
          )}
        </h3>
        <div className="flex flex-col gap-3 md:gap-4">
          <p className="tw-paragraph md:tw-heading-5 mb-0">
            Smart contract memory
          </p>
          <p className="text-white-60 tw-paragraph md:tw-lead-sm mb-0">
            Canister smart contracts are bundles of WebAssembly instructions 
            and persistent memory. One smart contract can maintain gigabytes of 
            memory pages.
          </p>
          <div className="tw-paragraph md:tw-lead-sm flex items-center gap-2">
            <span className="tw-lead md:text-[35px] md:leading-[30px]">
              $
              {(
                (xdrPrice * 127000 * 3600 * 24 * 30) /
                1_000_000_000_000
              ).toFixed(2)}
            </span>{" "}
            /GB/month
          </div>
        </div>
      </AnimateSpawn>
    </div>
  );
};

export default function PreHero({}): JSX.Element {
  const [start, setStart] = useState(false);
  const [animate, setAnimate] = useState(true);

  const [bgDark, setBgDark] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setStart(true);
    setHeaderHeight(
      document.querySelector("nav.navbar").getBoundingClientRect().height
    );
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > window.innerHeight - headerHeight && bgDark) {
        setBgDark(false);
      } else if (
        window.scrollY < window.innerHeight - headerHeight &&
        !bgDark
      ) {
        setBgDark(true);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [bgDark, animate, headerHeight]);

  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["end end", "end start"],
  });

  const { scrollYProgress: completeScrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const animationStop = useTransform(completeScrollYProgress, [0, 1.0], [0, 1]);

  const blurSize = useTransform(scrollYProgress, [0.3, 0.66], [0, 50]);
  const blobOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const blur = useMotionTemplate`blur(${blurSize}px)`;

  useEffect(() => {
    const unsub = animationStop.onChange((latest) => {
      if (latest === 1.0 && animate) {
        setAnimate(false);
      } else if (latest < 1.0 && !animate) {
        setAnimate(true);
      }
    });
    return unsub;
  });

  return (
    <section className=" bg-[#1B025A]" id="home">
      {bgDark && <DarkHeroStyles bgColor="transparent" />}
      <ParticleAnimation animate={animate} blur={blur}></ParticleAnimation>

      <div
        className="overflow-hidden relative"
        style={{
          top: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        <div
          className="relative w-screen h-screen flex items-center"
          ref={headlineRef}
        >
          <motion.img
            src="/img/home/hero-blur.svg"
            alt=""
            className="absolute bottom-0 translate-y-6/10 md:translate-y-7/10 left-1/2 -translate-x-1/2 max-w-none w-[800px] md:w-full h-auto"
            style={{
              opacity: blobOpacity,
            }}
          ></motion.img>
          <div className="container-10 text-center">
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 text-white animate-scale-in"
              style={{
                animationPlayState: start ? "running" : "paused",
                opacity: blobOpacity,
              }}
            >
              World Computer
              <br />
              is our future
            </motion.h1>
          </div>

          <motion.button
            className="bg-transparent appearance-none border-none p-0 m-0 animate-fade-in left-1/2 -translate-x-1/2 bottom-[10vh] md:bottom-[5vh] absolute w-12 h-12 md:w-[70px] md:h-[70px] rounded-xl backdrop-blur-xl flex items-center justify-center"
            onClick={() => {
              document.getElementById("introduction").scrollIntoView();
            }}
            style={{
              animationPlayState: start ? "running" : "paused",
              opacity: blobOpacity,
            }}
            aria-label="Scroll down"
          >
            <svg
              width="24"
              height="38"
              viewBox="0 0 24 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 25.4247L12 36L1 25.4247M12 0L12 35.8937"
                stroke="url(#paint0_linear_127_29571)"
                strokeWidth="1.77"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_127_29571"
                  x1="11.5784"
                  y1="35.8937"
                  x2="11.5784"
                  y2="6.09638e-09"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.button>
        </div>
        <div
          className="tw-heading-5 text-white relative py-20 md:py-40 container-10"
          ref={heroRef}
          id="stats"
        >
          <Numbers></Numbers>
          <AnimateSpawn
            variants={transitions.container}
            className="container-10 bg-black-30 rounded-xl pb-30 pt-8 md:py-0 md:h-60 flex items-center relative overflow-hidden"
          >
            <div className="md:mx-1/10 flex flex-col justify-center gap-8 items-start">
              <Link
                className="button-outline-white text-center sm:text-left"
                href="https://dashboard.internetcomputer.org"
              >
                INTERNET COMPUTER DASHBOARD
              </Link>
              <Link
                href="https://wiki.internetcomputer.org/wiki/L1_comparison"
                className="link-primary-light link-with-icon"
              >
                See L1 comparison <LinkArrowUpRight />
              </Link>
            </div>
            <img
              src="/img/home/dashboard.svg"
              className="absolute right-0 bottom-0 pointer-events-none"
            ></img>
          </AnimateSpawn>
        </div>
      </div>
    </section>
  );
}
