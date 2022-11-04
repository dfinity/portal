import {
  useElementScroll,
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
  EasingFunction,
} from "framer-motion";
import React, { useContext, useEffect, useRef } from "react";
import { BackgroundPanelContext } from "../BackgroundPanel";
import styles from "./index.module.css";

const projects = [
  {
    name: "Ethereum",
    labelBig: "650x",
    labelSmall: "Compared to other major blockchain",
    magnitude: 650,
  },
  {
    name: "Solana",
    labelBig: "23,600x",
    labelSmall: "Compared to ICP blockchain",
    magnitude: 23600,
  },
  {
    name: "Solana",
    labelBig: "23,600x",
    labelSmall: "Compared to ICP blockchain",
    magnitude: 1,
  },
];

function getLevels(n: number): number[] {
  const zeros = Math.floor(Math.log10(n));
  const firstTwoDigits = Math.floor(n / 10 ** (zeros - 1));

  if (n === 10) {
    return [5, 10, 15, 20, 25].map((v) => v * 10 ** (zeros - 1));
  } else if (firstTwoDigits === 10) {
    return [2, 4, 6, 8, 10].map((v) => v * 10 ** (zeros - 1));
  } else if (firstTwoDigits < 30) {
    return [5, 10, 15, 20, 25].map((v) => v * 10 ** (zeros - 1));
  } else if (firstTwoDigits < 60) {
    return [10, 20, 30, 40, 50].map((v) => v * 10 ** (zeros - 1));
  } else if (firstTwoDigits < 100) {
    return [20, 40, 60, 80, 100].map((v) => v * 10 ** (zeros - 1));
  }
}

const Storage: React.FC = () => {
  const backgroundVisible = useContext(BackgroundPanelContext);

  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const reverseEasing =
    (easing: EasingFunction): EasingFunction =>
    (p) =>
      1 - easing(1 - p);

  const mirrorEasing =
    (easing: EasingFunction): EasingFunction =>
    (p) =>
      p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

  const createExpoIn =
    (power: number): EasingFunction =>
    (p) =>
      p ** power;

  const icpCost = 5;
  const solanaCost = 110000;
  const ethereumCost = 79000000;

  const easedScrollYProgress = useTransform(
    scrollYProgress,
    [0.0, 0.95, 1.0],
    [150000000, icpCost * 2.5, icpCost * 2.5],
    { ease: mirrorEasing(createExpoIn(5)) }
  );

  const icpHeight = useTransform(easedScrollYProgress, (y) => {
    return (icpCost / y) * 100;
  });
  const solanaHeight = useTransform(
    easedScrollYProgress,
    (y) => (solanaCost / y) * 100
  );
  const ethereumHeight = useTransform(
    easedScrollYProgress,
    (y) => (ethereumCost / y) * 100
  );
  const levels = useTransform(easedScrollYProgress, (y) => getLevels(y));
  const levelsHeight = useTransform(
    [levels as any, easedScrollYProgress as any],
    ([levels, y]) => {
      return (levels as number[]).map((l) => (l / (y as number)) * 100);
    }
  );
  const level1Height = useTransform(levelsHeight, (v) => v[0]);
  const level1HeightPercent = useMotionTemplate`${level1Height}%`;
  const level2Height = useTransform(levelsHeight, (v) => v[1]);
  const level2HeightPercent = useMotionTemplate`${level2Height}%`;
  const level3Height = useTransform(levelsHeight, (v) => v[2]);
  const level3HeightPercent = useMotionTemplate`${level3Height}%`;
  const level4Height = useTransform(levelsHeight, (v) => v[3]);
  const level4HeightPercent = useMotionTemplate`${level4Height}%`;
  const level5Height = useTransform(levelsHeight, (v) => v[4]);
  const level5HeightPercent = useMotionTemplate`${level5Height}%`;

  const level1Ref = useRef<HTMLSpanElement>();
  const level2Ref = useRef<HTMLSpanElement>();
  const level3Ref = useRef<HTMLSpanElement>();
  const level4Ref = useRef<HTMLSpanElement>();
  const level5Ref = useRef<HTMLSpanElement>();

  useEffect(() => {
    const format = new Intl.NumberFormat("us", { maximumFractionDigits: 0 })
      .format;

    return levels.onChange((hs) => {
      level1Ref.current.textContent = `$${format(hs[0])}`;
      level2Ref.current.textContent = `$${format(hs[1])}`;
      level3Ref.current.textContent = `$${format(hs[2])}`;
      level4Ref.current.textContent = `$${format(hs[3])}`;
      level5Ref.current.textContent = `$${format(hs[4])}`;
    });
  });

  const icpHeightPercent = useMotionTemplate`${icpHeight}%`;
  const solanaHeightPercent = useMotionTemplate`${solanaHeight}%`;
  const ethereumHeightPercent = useMotionTemplate`${ethereumHeight}%`;

  return (
    <section className=" bg-[#A4497F00]">
      <div className="h-[250vh]" ref={ref}>
        <div className="container-12 text-white md:mt-24 md:mb-40">
          <h2 className="tw-heading-4 md:tw-heading-60 md:w-6/10 md:mb-8">
            On-chain efficiency comparison
          </h2>
          <p className="tw-lead-sm md:tw-lead md:w-6/10">
            Relative cost of storing data inside smart contracts. Compared with
            US$ and CO2 Emissions.
          </p>
        </div>
        <div className="sticky top-0 lg:h-screen container-12 flex flex-col text-white overflow-hidden">
          <div
            className=" flex items-center justify-center transition-opacity"
            style={{ opacity: backgroundVisible ? 1 : 0 }}
          >
            <div className="border-0 border-b border-white-30 border-solid flex items-end justify-evenly md:justify-center h-[55vh] lg:h-[66vh] md:gap-24 w-full relative">
              <div className="absolute inset-0 z-[-1] overflow-hidden">
                <motion.div
                  className="h-px w-full absolute left-0 right-0 bg-white-20"
                  style={{
                    bottom: level1HeightPercent,
                  }}
                >
                  <span
                    ref={level1Ref}
                    className="absolute text-white-50 tw-paragraph -translate-y-full"
                  ></span>
                </motion.div>
                <motion.div
                  className="h-px w-full absolute left-0 right-0 bg-white-20"
                  style={{
                    bottom: level2HeightPercent,
                  }}
                >
                  <span
                    ref={level2Ref}
                    className="absolute text-white-50 tw-paragraph -translate-y-full"
                  ></span>
                </motion.div>
                <motion.div
                  className="h-px w-full absolute left-0 right-0 bg-white-20"
                  style={{
                    bottom: level3HeightPercent,
                  }}
                >
                  <span
                    ref={level3Ref}
                    className="absolute text-white-50 tw-paragraph -translate-y-full"
                  ></span>
                </motion.div>
                <motion.div
                  className="h-px w-full absolute left-0 right-0 bg-white-20"
                  style={{
                    bottom: level4HeightPercent,
                  }}
                >
                  <span
                    ref={level4Ref}
                    className="absolute text-white-50 tw-paragraph -translate-y-full"
                  ></span>
                </motion.div>
                <motion.div
                  className="h-px w-full absolute left-0 right-0 bg-white-20"
                  style={{
                    bottom: level5HeightPercent,
                  }}
                >
                  <span
                    ref={level5Ref}
                    className="absolute text-white-50 tw-paragraph -translate-y-full"
                  ></span>
                </motion.div>
              </div>
              <motion.div
                className={
                  "bg-yellow-600 w-1/6 relative rounded-xl border-white-30 border-2 border-solid " +
                  styles["bar-gradient"]
                }
                style={{
                  height: ethereumHeightPercent,
                }}
              >
                <div className="absolute -bottom-6 lg:-bottom-32 translate-y-full flex items-center whitespace-nowrap left-1/2 -translate-x-1/2 w-max lg:h-32">
                  <img
                    src="/img/basics/logos/logo-eth.svg"
                    alt=""
                    className="w-11"
                  />
                  <span className="hidden lg:inline tw-heading-5 pl-4">
                    $79,000,000
                  </span>
                  <span className="hidden lg:inline tw-heading-7 pl-1">
                    / GB per year
                  </span>
                </div>
              </motion.div>

              <motion.div
                className={
                  "bg-yellow-600 w-1/6 relative rounded-xl border-white-30 border-2 border-solid " +
                  styles["bar-gradient"]
                }
                style={{ height: solanaHeightPercent }}
              >
                <div className="absolute -bottom-6 lg:-bottom-32 translate-y-full flex items-center whitespace-nowrap left-1/2 -translate-x-1/2 w-max lg:h-32">
                  <img
                    src="/img/basics/logos/logo-solana.svg"
                    alt=""
                    className="w-11"
                  />
                  <span className="hidden lg:inline tw-heading-5 pl-4">
                    $110,000
                  </span>
                  <span className="hidden lg:inline tw-heading-7 pl-1">
                    / GB per year
                  </span>
                </div>
              </motion.div>

              <motion.div
                className={
                  "bg-yellow-600 w-1/6 relative rounded-xl border-white-30 border-2 border-solid " +
                  styles["bar-gradient"]
                }
                style={{ height: icpHeightPercent }}
              >
                <div className="absolute -bottom-6 lg:-bottom-32 translate-y-full flex items-center whitespace-nowrap left-1/2 -translate-x-1/2 w-max lg:h-32 border border-white lg:border-solid rounded-xl border-b-4 px-6">
                  <img
                    src="/img/basics/logos/logo-icp.svg"
                    alt=""
                    className="w-11"
                  />

                  <span className="hidden lg:inline tw-heading-60 pl-4">
                    $5
                  </span>
                  <span className="hidden lg:inline tw-heading-6 pl-1 relative top-3">
                    / GB per year
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
          <div
            className="lg:hidden mt-30 pt-8 border-0 border-t border-white-20 border-solid transition-opacity"
            style={{ opacity: backgroundVisible ? 1 : 0 }}
          >
            <div className="flex items-center whitespace-nowrap h-[70px] px-6 border-transparent border-solid border">
              <img
                src="/img/basics/logos/logo-eth.svg"
                alt=""
                className="w-8"
              />
              <span className="tw-heading-5 pl-4">$79,000,000</span>
              <span className="tw-heading-7 pl-1">/ GB per year</span>
            </div>
            <div className="flex items-center whitespace-nowrap h-[70px] px-6 border-transparent border-solid border mb-4">
              <img
                src="/img/basics/logos/logo-solana.svg"
                alt=""
                className="w-8"
              />
              <span className="tw-heading-5 pl-4">$110,000</span>
              <span className="tw-heading-7 pl-1">/ GB per year</span>
            </div>
            <div className="flex items-center whitespace-nowrap h-32 border border-white border-solid rounded-xl border-b-4 px-6">
              <img
                src="/img/basics/logos/logo-icp.svg"
                alt=""
                className="w-8"
              />

              <span className="tw-heading-60 pl-4">$5</span>
              <span className="tw-heading-6 pl-1 relative top-3">
                / GB per year
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Storage;
