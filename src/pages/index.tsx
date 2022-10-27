import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Features from "@site/src/components/LandingPage/Features";
import SectionsBar from "@site/src/components/LandingPage/SectionsBar";
import HeroSection from "@site/src/components/LandingPage/HeroSection";
import Dashboard from "@site/src/components/LandingPage/Dashboard";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ParticleBackground from "@site/src/components/LandingPage/ParticleBackgroundVanilla";
import ICPToken from "@site/src/components/LandingPage/ICPToken";
import Showcase from "@site/src/components/LandingPage/Showcase";
import StartBuilding from "@site/src/components/LandingPage/StartBuilding";
import Foundation from "@site/src/components/LandingPage/Foundation";
import { resetNavBarStyle } from "@site/src/utils/reset-navbar-style";
import Sliders from "../components/LandingPage/Sliders";
import Link from "@docusaurus/Link";
import ArrowRight from "@site/static/img/arrow-right.svg";
import useGlobalData from "@docusaurus/useGlobalData";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import BlobGradient from "@site/static/img/gradientBlurredCircle.png";
import ItsGreen from "../components/Basics/ItsGreen";
import Storage from "../components/LandingPage/Storage";

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

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();

  const projects = useGlobalData()["home-showcase"].default as {
    name: string;
    oneLiner: string;
    website: string;
    stats: string;
    logo: string;
  }[];

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className="w-full relative overflow-hidden">
        <BrowserOnly>
          {() => (
            <ParticleBackground
              width={document.body.clientWidth}
              height={document.body.clientHeight * 2}
              particleCount={100}
              frameRate={30}
              centerX={document.body.clientWidth * 0.8}
              centerY={document.body.clientHeight * 0.4}
              duration={12500}
            />
          )}
        </BrowserOnly>
        <section className="overflow-hidden">
          {/* <div className="relative xl:container-12">
            <div className="absolute z-[-1] -right-14 md:right-[-200px] w-[370px] md:w-[600px] md:top-[100px]">
              <img
                src="/img/home/world.webp"
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="absolute z-[-1] -right-14 md:hidden w-[370px] aspect-square bg-gradient-30 from-[#F1EEF5] to-transparent"></div>
          </div> */}
          <div className="container-10 mt-10 mb-20 md:my-30">
            <h1 className="tw-heading-3 md:tw-heading-2 mb-6 md:mb-8 text-transparent bg-clip-text gradient-text md:w-6/10">
              World Computer Blockchain
            </h1>
            <div className="md:ml-1/10 w-10/10 md:w-5/10">
              <p className="tw-lead-sm md:tw-lead mb-8">
                The Internet Computer provides World Computer functionality. Any
                online system or web3 service can be built 100% on-chain, in
                fully decentralized form, using smart contracts that serve web
                experiences, create transactions on other blockchains, and have
                20,000x greater efficiency. Powered by breakthrough Chain Key
                Crypto.
              </p>
              <p className="mb-6">
                <Link href="" className="button-primary">
                  Create your Internet Identity
                </Link>
              </p>
              <p>
                <Link className="link-primary inline-flex items-center gap-2">
                  <ArrowRight></ArrowRight>
                  Start coding
                </Link>
              </p>
            </div>
          </div>
        </section>
        {/* <section className="container-12">
          <img src="/img/home/particles.png" alt="" className="w-full" />
        </section> */}

        <section className="relative ">
          <div className="md:container-12">
            <div className="absolute h-[730px] left-0 right-0 bottom-[-200px] from-[#A4497F] to-infinite bg-gradient-to-t"></div>
            <div className="absolute h-[730px] left-0 right-0 bottom-[-200px] from-[#F1EEF5] to-transparent bg-gradient-to-b"></div>

            <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-6 md:px-0">
              <div className="md:w-8/12 md:mx-auto text-black py-20 md:py-30">
                <h2 className="tw-heading-3 md:tw-heading-60 mb-16 text-center md:text-left">
                  Enabling True Web3
                </h2>
                <div className="flex flex-col-reverse md:flex-row justify-between mb-16 gap-6 md:gep-0">
                  <div className="rounded-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6DE] flex flex-col items-center justify-center text-white py-8 md:py-0 md:h-[220px] px-12">
                    <span className="tw-heading-7-caps md:text-[24px] md:leading-7 font-bold md:tracking-[1.39px] mb-2 md:mb-4">
                      WEB 3.0
                    </span>
                    <span className="tw-heading-60 md:text-[80px] md:leading-[85px] font-bold">
                      Own
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-black pt-8 pb-12 md:py-0 md:h-[220px] px-8">
                    <span className="text-[12px] leading-4 font-bold tracking-[0.71px] md:tw-heading-7-caps mb-1 md:mb-3">
                      WEB 2.0
                    </span>
                    <span className="tw-heading-3 md:tw-heading-60">Write</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-black-60 py-6 md:py-0 md:h-[220px] px-8">
                    <span className="text-[12px] leading-4 font-bold tracking-[0.71px] mb-1 md:mb-2">
                      WEB 1.0
                    </span>
                    <span className="tw-heading-3">Read</span>
                  </div>
                </div>
                <div className="md:w-7/10">
                  <p className="mb-6 tw-lead-sm md:tw-lead text-black-60">
                    The{" "}
                    <span className="tw-heading-6 md:tw-heading-5 text-infinite">
                      Internet Computer
                    </span>{" "}
                    completely flips the script and puts the control back into
                    the hand of users. Duis mollis, est non commodo luctus, nisi
                    erat porttitor ligula, eget lacinia odio sem nec elit. Donec
                    sed odio nullam quis risus eget urna mollis.
                  </p>
                  <p className="mb-0">
                    <Link className="button-primary">Learn the basics</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#A4497F]">
          <Dashboard />
        </section>
        {/* <Storage></Storage> */}
        <section className="">
          <div className="container-10 pt-20 md:pt-30">
            <div className="md:w-5/10">
              <h2 className="tw-heading-3 md:tw-heading-2">
                <span className="grid overflow-hidden">
                  <RotatedDappsHeadline
                    interval={2500}
                    lines={["DeFi", "Gaming", "NFT"]}
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
          <div className="container-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-12">
            {projects.map((p, i) => (
              <Link
                href={p.website}
                key={p.name + i}
                className="rounded-xl border border-white border-solid backdrop-blur-2xl bg-white-60 p-6 md:p-8 no-underline text-black hover:no-underline hover:text-black"
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
              </Link>
            ))}
          </div>

          <div className="relative -mt-96 mb-40">
            <AnimateSpawn
              el={motion.img}
              variants={transitions.fadeIn}
              src={BlobGradient}
              alt=""
              className="max-w-none w-[1200px] md:w-[1200px] absolute top-[-200px] md:top-[-400px] left-1/2 -translate-x-1/2 z-[-1]"
            />

            <div className="mt-96 pt-30 text-center flex flex-col items-center gap-6">
              <Link className="button-primary">Join the web3 movement</Link>
              <Link className="link-white  inline-flex items-center gap-2">
                <ArrowRight></ArrowRight>
                Start coding
              </Link>
            </div>
          </div>
        </section>
        <div className="overflow-hidden">
          <section className="md:container-12 pt-40 md:pt-20">
            <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-1/12 pb-20 md:py-30 relative">
              <div className="-translate-y-24 sm:-translate-y-40 md:translate-y-0 md:absolute z-[-1] md:w-[500px] lg:w-[780px] md:top-[40px] lg:top-[-130px] right-0 overflow-hidden">
                <img
                  src="/img/home/dao.webp"
                  alt=""
                  className="w-full relative md:right-[-50px] lg:right-[-100px]"
                />
              </div>
              <h2 className="-mt-16 md:mt-0 text-transparent bg-clip-text gradient-text tw-heading-3 md:tw-heading-60 mb-6">
                The next Gen
                <br />
                of DAOs
              </h2>
              <p className="tw-lead-sm md:tw-lead-lg mb-3">
                No centralized power.
                <br />
                No administrative overhead.
                <br />
                No legal headache.
              </p>
              <p className="tw-heading-6 md:tw-heading-4 mb-8 md:mb-12">
                Only Code.
              </p>
              <p className="mb-0">
                <Link className="link-primary inline-flex items-center gap-2">
                  <ArrowRight></ArrowRight>
                  Give it a try
                </Link>
              </p>
            </div>
          </section>

          {/* <Features /> */}
          <ItsGreen />

          <section className="md:container-12">
            <div className="md:rounded-[32px] backdrop-blur-2xl bg-white-60 px-1/12 py-20 md:py-30 relative">
              <div className="md:w-8/10 md:mx-auto">
                <h2 className="tw-heading-4 md:tw-heading-2 mb-6 md:mb-16 text-center">
                  Blockchain's largest
                  <br />
                  R&D operation
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-6 md:mb-16 gap-y-8">
                  <div className="flex flex-col gap-0 text-center border-0 border-r border-solid border-black-20">
                    <h4 className="tw-title-navigation text-black-30 mb-0">
                      Team members
                    </h4>
                    <span className="tw-heading-3">270+</span>
                  </div>
                  <div className="flex flex-col gap-0 text-center border-0 border-r md:border-solid border-black-20">
                    <h4 className="tw-title-navigation text-black-30 mb-0">
                      Publications
                    </h4>
                    <span className="tw-heading-3">1564</span>
                  </div>
                  <div className="flex flex-col gap-0 text-center border-0 border-r border-solid border-black-20">
                    <h4 className="tw-title-navigation text-black-30 mb-0">
                      Citations
                    </h4>
                    <span className="tw-heading-3">86,347</span>
                  </div>
                  <div className="flex flex-col gap-0 text-center ">
                    <h4 className="tw-title-navigation text-black-30 mb-0">
                      Patents
                    </h4>
                    <span className="tw-heading-3">191</span>
                  </div>
                </div>

                <p className="tw-paragraph md:tw-lead text-center mb-6 md:mb-12">
                  The DFINITY Foundation is committed to realizing the most
                  disruptive vision in tech: the adoption of public blockchain
                  as a single technology stack that hosts all of humanity’s
                  systems and services.
                </p>

                <p className="mb-0 text-center">
                  <Link href="https://dfinity.org" className="button-outline">
                    GO to dfinity foundation
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
        <Sliders />
        <StartBuilding />
        {/* <Foundation /> */}

        {/* 
        <Showcase />
        <ICPToken />
        <StartBuilding />
        <SectionsBar /> */}
      </main>
    </Layout>
  );
}
