import React from "react";
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

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  resetNavBarStyle();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className="w-full overflow-hidden">
        <section>
          <div className="relative xl:container-12">
            <div className="absolute md:right-[-200px] w-[600px] md:top-[100px]">
              <img
                src="/img/home/world.webp"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="container-10 md:my-30">
            <h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-8 text-transparent bg-clip-text md:w-6/10"
              style={{
                backgroundImage:
                  "linear-gradient(108.55deg, #3B00B9 0%, #18D0B5 149.76%)",
              }}
            >
              World Computer blockchain
            </h1>
            <div className="ml-1/10 w-5/10">
              <p className="tw-lead mb-8">
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
        <section className="container-12">
          <img src="/img/home/particles.png" alt="" className="w-full" />
        </section>
        <section className="container-12">
          <div className="rounded-[32px] backdrop-blur-2xl bg-white-60">
            <div className="md:w-8/12 md:mx-auto text-black py-30">
              <h2 className="tw-heading-60 md:mb-16">Enabling True Web3</h2>
              <div className="flex justify-between mb-16">
                <div className="rounded-2xl bg-gradient-100 from-[#3B00B9] to-[#2586B6DE] flex flex-col items-center justify-center text-white h-[220px] px-12">
                  <span className="text-[24px] leading-7 font-bold tracking-[1.39px]">
                    WEB 3.0
                  </span>
                  <span className="text-[80px] leading-[85px] font-bold">
                    Own
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center text-black h-[220px] px-8">
                  <span className="tw-heading-7-caps">WEB 2.0</span>
                  <span className="tw-heading-60">Write</span>
                </div>
                <div className="flex flex-col items-center justify-center text-black-60 h-[220px] px-8">
                  <span className="text-[12px] leading-4 font-bold tracking-[0.71px]">
                    WEB 1.0
                  </span>
                  <span className="tw-heading-3">Read</span>
                </div>
              </div>
              <div className="md:w-7/10">
                <p className="mb-6 tw-lead text-black-60">
                  The{" "}
                  <span className="tw-heading-5 text-infinite">
                    Internet Computer
                  </span>{" "}
                  completely flips the script and puts the control back into the
                  hand of users. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit. Donec sed
                  odio nullam quis risus eget urna mollis.
                </p>
                <p className="mb-0">
                  <Link className="button-primary">Learn the basics</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <Dashboard />

        <section className="">
          <div className="container-10">
            <h2>On-chain efficiency comparison ( $ + CO₂ )</h2>
          </div>
        </section>

        {/* 
        <Sliders />
        <Features />
        <Showcase />
        <Foundation />
        <ICPToken />
        <StartBuilding />
        <SectionsBar /> */}
      </main>
    </Layout>
  );
}
