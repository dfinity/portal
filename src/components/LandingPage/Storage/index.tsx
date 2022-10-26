import {
  useElementScroll,
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
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
  // const ref = useRef(null);
  // const x = useElementScroll(ref);
  // console.log(x);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  // const tx = useTransform(scrollYProgress, (v) => -(1 - v) * 100 + "%");
  // const tx1 = useTransform(
  //   scrollYProgress,
  //   (v) => -Math.min(0.5, v) * 200 + "%"
  // );
  // const ts1 = useTransform(scrollYProgress, (v) => Math.min(0.5, v) * 2 + 1);
  const tx1 = useTransform(scrollYProgress, [0.0, 0.5], [0, -200]);
  const s1 = useTransform(scrollYProgress, [0.0, 0.5], [1, 25]);

  const t1 = useMotionTemplate`translateX(${tx1}%) scale(${s1})`;

  const tx2 = useTransform(scrollYProgress, [0.0, 0.5], [0, -200]);
  const s2 = useTransform(scrollYProgress, [0.0, 0.5], [1 / 25, 1]);

  const t2 = useMotionTemplate`translateX(${tx1}%) scale(${s2})`;
  const t3 = useMotionTemplate`translateX(${tx1}%) scale(${s2})`;
  // const tx1 = useTransform(scrollYProgress, v=> -Math.min(0.5,v)*100+'%');

  // const tx = useTransform(scrollYProgress, (v) => {
  //   console.log(v);
  //   return -v * 100 + "%";
  // });

  return (
    <section className=" bg-[#A4497F]">
      <div className="container-10 text-white">
        <h2 className="tw-heading-60 md:w-6/10 md:mb-8">
          On-chain efficiency comparison
        </h2>
        <p className="tw-lead md:w-6/10">
          Relative cost of storing data inside smart contracts. Compared with
          US$ and CO2 Emissions.
        </p>
      </div>
      <div className="h-[250vh]" ref={ref}>
        <div className="sticky top-0 h-screen container-12 pt-20 flex">
          {/* bg-gradient-30 from-infinite via-[#A24083] to-[#F07217] */}
          <motion.div
            className="absolute inset-0 top-20 rounded-xl border-white-30 border-2 border-solid h-[80vh] flex flex-col justify-center items-center text-white origin-bottom-right"
            style={{ transform: t1 }}
          >
            <img src="/img/home/ethereum.png" alt="" className="w-11 mb-3" />
            <span className="tw-heading-60">650x</span>
            <span className="tw-lead-sm">
              Compared to other major blockchain
            </span>
          </motion.div>

          <motion.div
            className="absolute inset-0 top-20 rounded-xl border-white-30 border-2 border-solid h-[80vh] self-end flex flex-col justify-center items-center text-white origin-bottom-right"
            style={{ transform: t2 }}
          >
            <img src="/img/home/solana.png" alt="" className="w-11 mb-3" />
            <span className="tw-heading-60">23,600x</span>
            <span className="tw-lead-sm">Compared to ICP blockchain</span>
          </motion.div>

          <motion.div
            className="absolute inset-0 top-20 rounded-xl border-white-30 border-2 border-solid h-[80vh] self-end flex flex-col justify-center items-center text-white origin-bottom-right"
            style={{ transform: t3 }}
          >
            <img src="/img/home/icp.png" alt="" className="w-11 mb-3" />
            {/* <span className="tw-heading-60">23,600x</span> */}
            {/* <span className="tw-lead-sm">Compared to ICP blockchain</span> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Storage;
