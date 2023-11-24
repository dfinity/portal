import Link from "@docusaurus/Link";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import React, { useRef } from "react";
import DarkHeroStyles from "../../Common/DarkHeroStyles";
import RotatedHeadline from "../../LandingPage/PreHero/RotatedHeadline";
import InfoIcon from "../PreHero/InfoIcon";
import { ChatWidget } from "./ChatWidget";
import { DashboardIcon } from "./Dashboardicon";
import ParticleAnimation from "./ParticleAnimation";
import { EthEquivalentTxRate, SmartContractMemory, TotalBlocks } from "./Stats";

const Hero: React.FC<{
  aiPlaceholders: string[];
  headlines: string[];
  children?: React.ReactNode;
}> = ({ aiPlaceholders, headlines, children }) => {
  const fontLoaded = useFontsLoaded();

  const darkRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(darkRef);

  return (
    <section className=" bg-[#1B025A]" id="home" ref={darkRef}>
      {isDark && <DarkHeroStyles bgColor="transparent" />}

      <ParticleAnimation />

      <div className="py-30 grid relative">
        <div className="container-10 col-start-1 row-start-1">
          <div className="w-8/10">
            <h1
              className="animate-fade-up tw-heading-1 font-black uppercase tracking-[-3.6px] text-gradient-white grid"
              style={{
                animationPlayState: fontLoaded ? "running" : "paused",
              }}
            >
              <RotatedHeadline
                interval={3000}
                lines={headlines}
                start={fontLoaded}
              ></RotatedHeadline>
            </h1>
            <div className="w-[71%] mt-8">
              <ChatWidget
                aiPlaceholders={aiPlaceholders}
                fontLoaded={fontLoaded}
              />
            </div>
          </div>
        </div>
        <div className="container-12 w-full col-start-1 row-start-1 flex justify-end">
          <div className="md:w-80 flex flex-col gap-1 text-right">
            <EthEquivalentTxRate />
            <TotalBlocks />
            <SmartContractMemory />

            <div className="backdrop-blur-lg py-3 px-6">
              <Link
                href="https://dashboard.internetcomputer.org/"
                className="text-white tw-lead inline-flex gap-2 items-center justify-end hover:no-underline hover:text-white/60 transition-all"
              >
                <DashboardIcon />
                See live stats
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </section>
  );
};

export default Hero;

/*

<div className="py-30 container-12 relative">
        <div className="flex">
          <div className="flex-[7]">
            <h1
              className="animate-fade-up tw-heading-1 font-black uppercase tracking-[-3.6px] text-gradient-white grid"
              style={{
                animationPlayState: fontLoaded ? "running" : "paused",
              }}
            >
              <RotatedHeadline
                interval={3000}
                lines={headlines}
                start={fontLoaded}
              ></RotatedHeadline>
            </h1>
            <div className="w-[71%] mt-8">
              <ChatWidget
                aiPlaceholders={aiPlaceholders}
                fontLoaded={fontLoaded}
              />
            </div>
          </div>
          <div className="flex-[3] flex flex-col gap-1 text-right">
            <EthEquivalentTxRate />
            <TotalBlocks />
            <SmartContractMemory />

            <div className="backdrop-blur-lg py-3 px-6">
              <Link
                href="https://dashboard.internetcomputer.org/"
                className="text-white tw-lead inline-flex gap-2 items-center justify-end hover:no-underline hover:text-white/60 transition-all"
              >
                <DashboardIcon />
                See live stats
              </Link>
            </div>
          </div>
        </div>
      </div>
      {children}

      */
