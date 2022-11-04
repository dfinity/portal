import {
  useElementScroll,
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
  EasingFunction,
} from "framer-motion";
import React, { useRef } from "react";

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

const Storage: React.FC = () => {
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

  const easedScrollYProgress = useTransform(
    scrollYProgress,
    [0.0, 1.0],
    [79000000 * 2, 110000],
    { ease: mirrorEasing(createExpoIn(5)) }
  );

  const icpCost = 5;
  const solanaCost = 110000;
  const ethereumCost = 79000000;

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
        <div className="sticky top-0 h-screen container-12 flex flex-col text-white">
          <motion.div className="flex items-center justify-center overflow-hidden">
            {/* <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-200 to-transparent z-10"></div> */}
            <div className="border-b border-solid border-black flex items-end justify-evenly md:justify-center h-[80vh]  md:gap-24 w-full">
              <motion.div
                className="bg-yellow-600 w-16 relative border-black border-2 border-b-0 border-solid"
                style={{
                  height: ethereumHeightPercent,
                }}
              >
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                  Ethereum
                  <br />
                  <span className="whitespace-nowrap">
                    $79,000,000 / Gb / yr
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="bg-yellow-600 w-16 relative border-black border-2 border-b-0 border-solid"
                style={{ height: solanaHeightPercent }}
              >
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                  Solana
                  <br />
                  <span className="whitespace-nowrap">$110,000 / Gb / yr</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-yellow-600 w-16 relative border-black border-2 border-b-0 border-solid"
                style={{ height: icpHeightPercent }}
              >
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                  ICP
                  <br />
                  <span className="whitespace-nowrap">$5 / Gb / yr</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Storage;
