import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import transitions from "@site/static/transitions.json";
import React, { useRef } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import DarkHeroStyles from "../../Common/DarkHeroStyles";
import HomeAnimation from "./HomeAnimation";
import {
  EthEquivalentTxRate,
  TotalBlocks,
} from "./Stats";

import { QueryClient, QueryClientProvider } from "react-query";
import Link from "@docusaurus/Link";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
const queryClient = new QueryClient();

const Hero: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const fontLoaded = useFontsLoaded();

  const darkRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(darkRef);

  return (
    <section className="bg-[#1B025A]" id="home" ref={darkRef}>
      {isDark && <DarkHeroStyles bgColor="transparent" />}
      <div className="
        pt-[152px] pb-40 md:pt-52 md:pb-64 md:grid relative 
        mt-[-72px] md:mt-[-111px] text-white -mb-20">
        <HomeAnimation />
        <div className="container-8">
          <div className="relative">
            <h1
              className="
                animate-fade-up 
                uppercase tracking-[-0.03em] leading-none 
                text-[50px]
                sm:text-[76px]
                md:text-[100px] 
                lg:text-[110px] 
                text-white
                grid mb-0"
              style={{
                animationPlayState: fontLoaded ? "running" : "paused",
              }}
            >
              <span className="block sm:text-left">COMPUTE ON</span>
              <span className="block md:ml-48">BLOCKCHAIN</span>
            </h1>
            <div className="md:ml-48">
              <p className="tw-paragraph md:tw-lead-sm mt-6 md:w-7/10">
                The Internet Computer reinvents compute on blockchain,
                incorporating more than a 1000 human years of R&D effort.
                Everything is now on-chain. HTTP. Data. Compute. AI. Your Web3
                social network. Your orderbook exchange. Full stack
                decentralization has arrived on a sovereign network that extends
                the internet.
              </p>
              <div className="flex flex-col md:flex-row gap-8 mt-8 md:mt-6 md:items-center">
                <Link className={"button-white w-max"} href="/docs/current/home">
                  Start hacking
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/what-is-the-ic"
                >
                  <LinkArrowRight /> <span>What is ICP</span>
                </Link>
              </div>
            </div>
            <Link 
              href="https://dashboard.internetcomputer.org/" 
              className="block md:absolute mt-8 md:mt-0 bottom-0 -left-60 backdrop-blur-lg hover:no-underline text-white hover:text-black duration-100">
              <AnimateSpawn
                className="
                  bg-black/20 p-6 rounded-xl relative overflow-hidden min-w-80 
                  hover:bg-white trabsition-all duration-100"
                variants={transitions.container}
              >
                <span className="absolute top-6 right-6">
                  <LinkArrowUpRight />
                </span>
                <QueryClientProvider client={queryClient}>
                  <EthEquivalentTxRate />
                  <TotalBlocks />
                </QueryClientProvider>
              </AnimateSpawn>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </section>
  );
};

export default Hero;
