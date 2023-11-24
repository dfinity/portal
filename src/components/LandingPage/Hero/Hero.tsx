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

      <div className="pt-24 pb-8 md:py-30 md:grid relative">
        <div className="container-10 col-start-1 row-start-1">
          <div className="md:w-7/10 lg:w-8/10">
            <h1
              className="
                animate-fade-up 
                font-[1000] uppercase tracking-[-0.03em] leading-none 
                text-[60px]
                sm:text-[60px]
                md:text-[100px] 
                lg:text-[120px] 
                text-gradient-white 
                grid mb-0"
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
            <div className="w-full md:w-[71%] mt-4 md:mt-8">
              <ChatWidget
                aiPlaceholders={aiPlaceholders}
                fontLoaded={fontLoaded}
              />
            </div>
          </div>
        </div>
        <div className="container-12 w-full col-start-1 row-start-1 md:flex justify-end mt-8 md:mt-0">
          <div className="md:w-80 flex flex-col gap-1 text-right">
            <EthEquivalentTxRate />
            <TotalBlocks />
            <SmartContractMemory />

            <div className="backdrop-blur-lg py-3 px-6  hidden md:block">
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
