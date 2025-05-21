import { CycleBurnRate, EthEquivalentTxRate, TotalBlocks } from "./Stats";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useRef } from "react";

import AnimateSpawn from "../../Common/AnimateSpawn";
import DarkHeroStyles from "../../Common/DarkHeroStyles";
import HomeAnimation from "./HomeAnimation";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";
import TwitterIcon from "../../Common/Icons/TwitterIcon";
import transitions from "@site/static/transitions.json";
import { useDarkHeaderInHero } from "@site/src/utils/use-dark-header-in-hero";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import MarqueeBanner from "./MarqueeBanner";

const queryClient = new QueryClient();

const Hero: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const fontLoaded = useFontsLoaded();

  const darkRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(darkRef);

  return (
    <>
      <MarqueeBanner />
      <section className="bg-[#1B025A]" id="home" ref={darkRef}>
        {isDark && <DarkHeroStyles bgColor="transparent" />}
        <div
          className="
        pt-[152px] pb-40 md:pt-52 md:pb-64 md:grid relative 
        mt-[-72px] md:mt-[-111px] text-white -mb-20"
        >
          <HomeAnimation />
          <div className="container-8">
            <div className="relative mx-auto px-0 md:pl-16 md:pr-8">
              <h1
                className="
                animate-fade-up 
                uppercase tracking-[-0.03em] leading-none 
                text-[50px]
                sm:text-[76px]
                md:text-[100px] 
                lg:text-[110px] 
                text-white
                grid mb-0 mx-auto"
                style={{
                  animationPlayState: fontLoaded ? "running" : "paused",
                }}
              >
                <span className="block sm:text-left">WORLD</span>
                <span className="block md:ml-48">COMPUTER</span>
              </h1>
              <div className="md:ml-48">
                <p className="tw-paragraph md:tw-lead-sm mt-6 md:w-full">
                  The Internet Computer hosts secure, network-resident code and
                  data. Build web apps without Big Tech and current IT.
                  Applications are immune to cyber attacks and unstoppable,
                  capable of processing tokens, and can run under exclusive DAO
                  control. Build web3 social media, games, DeFi, multi-chain
                  apps, secure front-ends, ledgers, enterprise apps, and AI
                  models. TCP/IP connected software. ICP hosts software.
                </p>
                <div className="flex flex-row flex-wrap gap-8 mt-8 md:mt-6 items-center">
                  <Link className={"button-white w-max"} href="/docs/home">
                    DEVELOP
                  </Link>

                  <Link
                    className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                    href="/library"
                  >
                    <LinkArrowRight /> <span>Guides, decks and papers</span>
                  </Link>
                </div>
              </div>
              <aside
                aria-label="Various stats"
                className="block md:absolute mt-8 md:mt-0 bottom-0 -left-[min(10vw,20rem)] backdrop-blur-lg"
              >
                <div className="hover:no-underline text-white">
                  <AnimateSpawn
                    className="
                    bg-black/20 p-2 px-0 rounded-t-xl relative overflow-hidden min-w-[18rem] 
                  "
                    variants={transitions.container}
                  >
                    <QueryClientProvider client={queryClient}>
                      <CycleBurnRate />
                      <EthEquivalentTxRate />
                      <TotalBlocks />
                    </QueryClientProvider>
                    <hr className="absolute -bottom-8 left-6 right-6 h-px my-8 border-0 opacity-20" />
                  </AnimateSpawn>
                </div>

                <AnimateSpawn
                  className="
                      bg-black/20 p-2 px-0 rounded-b-xl relative overflow-hidden min-w-[18rem] 
                      hover:bg-white trabsition-all hover:!text-black hover:no-underline text-white duration-100"
                  variants={transitions.container}
                >
                  <Link
                    className="py-3 px-6 link-primary link-with-icon !text-white hover:!text-black hover:opacity-80 duration-200 ease-in-out text-[14px] "
                    href="https://dashboard.internetcomputer.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    dashboard.internetcomputer.org{" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.2429 8.34285L3.65709 8.34285L3.65709 6.34315H14.6568V17.3429L12.6571 17.3429L12.6571 9.75706L4.05024 18.364L2.63603 16.9498L11.2429 8.34285Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </AnimateSpawn>
              </aside>
            </div>
          </div>
        </div>
        <div className="relative">{children}</div>
      </section>
    </>
  );
};

export default Hero;
