import Link from "@docusaurus/Link";
import useGlobalData from "@docusaurus/useGlobalData";
import ArrowRight from "@site/static/img/arrow-right.svg";
import BlobGradient from "@site/static/img/gradientBlurredCircle.png";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";

const MotionLink = motion(Link);

const RotatedDappsHeadline: React.FC<{ lines: string[]; interval: number }> = ({
  lines,
  interval,
}) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => {
      setIndex((index + 1) % lines.length);
    }, interval);
    return () => clearInterval(handle);
  }, [index, interval]);
  return (
    <>
      {lines.map((line, i) => (
        <span
          className="transition-all col-start-1 row-start-1 duration-300"
          key={line + "_" + i}
          style={{
            opacity: i === index ? 1 : 0,
            transform: `translateY(${i === index ? 0 : 100}px)`,
          }}
        >
          <span className="text-transparent bg-clip-text gradient-text">
            {line}
          </span>
        </span>
      ))}
    </>
  );
};

export default function ShowcaseSection(): JSX.Element {
  const projects = useGlobalData()["home-showcase"].default as {
    name: string;
    oneLiner: string;
    website: string;
    stats: string;
    logo: string;
  }[];

  return (
    <section id="dapps" className="relative z-0">
      <AnimateSpawn variants={transitions.item}>
        <div className="container-10 pt-20 md:pt-30">
          <div className="md:w-5/10">
            <h2 className="tw-heading-3 md:tw-heading-2">
              <span className="grid overflow-hidden">
                <RotatedDappsHeadline
                  interval={2000}
                  lines={["DeFi", "DSocial" "Gaming", "NFT"]}
                ></RotatedDappsHeadline>
              </span>
              <span>on True Web3</span>
            </h2>
            <p className="tw-lead-sm md:tw-lead text-black-60 mb-0">
              Featuring a few web3 project teams already reinventing the
              internet on the ICP blockchain.{" "}
            </p>
          </div>
        </div>
        <AnimateSpawn
          className="container-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-12"
          variants={transitions.container}
        >
          {projects.map((p, i) => (
            <MotionLink
              variants={transitions.item}
              href={p.website}
              key={p.name + i}
              className="rounded-xl border relative border-white border-solid backdrop-blur-2xl bg-white-60 p-6 md:p-8 no-underline text-black hover:no-underline hover:text-black"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="w-16 sm:w-20 mb-3 h-16 sm:h-20 object-contain absolute left-6 top-6 sm:static"
              />
              <div className="ml-[86px] sm:ml-0">
                <h4 className="tw-heading-6 sm:tw-heading-5 mb-1 sm:mb-2">
                  {p.name}
                </h4>
                <p className="tw-paragraph-sm sm:tw-lead-sm mb-3 sm:mb-4 text-black-60">
                  {p.oneLiner}
                </p>
                <p className="mb-0">
                  <span className="rounded-full py-2 px-5 bg-[#F1EEF5] tw-paragraph-sm sm:tw-lead-sm">
                    {p.stats}
                  </span>
                </p>
              </div>
            </MotionLink>
          ))}
        </AnimateSpawn>

        <div className="relative -mt-96 mb-10 md:mb-40">
          <AnimateSpawn
            el={motion.img}
            variants={transitions.fadeIn}
            src={BlobGradient}
            alt=""
            className="max-w-none w-[800px] md:w-[1200px] absolute top-[-200px] md:top-[-400px] left-1/2 -translate-x-1/2 z-[-1]"
          />

          <AnimateSpawn
            className="mt-96 pt-20 md:pt-30 text-center flex flex-col items-center gap-6"
            variants={transitions.item}
          >
            <Link className="button-primary" href="/showcase">
              Join the web3 movement
            </Link>
            <Link
              className="link-white  inline-flex items-center gap-2"
              href="/developers"
            >
              <ArrowRight></ArrowRight>
              Start coding
            </Link>
          </AnimateSpawn>
        </div>
      </AnimateSpawn>
    </section>
  );
}
