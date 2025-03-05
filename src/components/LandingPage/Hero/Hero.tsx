import { EthEquivalentTxRate, TotalBlocks } from "./Stats";
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
                control. Build web3 social media, games, DeFi, multi-chain apps,
                secure front-ends, ledgers, enterprise apps, and AI models. TCP/IP 
                connected software. Now ICP hosts software.
              </p>
              <div className="flex flex-row flex-wrap gap-8 mt-8 md:mt-6 items-center">
                <Link
                  className={"button-white w-max"}
                  href="/docs/home"
                >
                  DEVELOP
                </Link>
                <Link
                  className="link-primary link-with-icon !text-white  hover:text-white hover:opacity-80 duration-200 ease-in-out"
                  href="/what-is-the-ic"
                >
                  <LinkArrowRight /> <span>What is ICP</span>
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
              <AnimateSpawn
                className="
                      bg-black/20 p-2 px-0 rounded-t-xl relative overflow-hidden min-w-[15rem] 
                      hover:bg-white trabsition-all duration-100"
                variants={transitions.container}
              >
                <Link
                  href="https://dfinity.org/"
                  className="
                    hover:no-underline text-white hover:text-black duration-100
                  "
                >
                  <span className="absolute top-6 right-6">
                    <LinkArrowUpRight />
                  </span>
                  <div
                    className="rounded-xl text-current py-3 px-6"
                    style={{ fontSize: "24px", fontWeight: 500 }}
                    variants={transitions.fadeIn}
                  >
                    <figure className="m-0">
                      <span className="text-3xl font-bold">1'000+</span>
                      <figcaption className="tw-paragraph text-current opacity-50 flex items-center gap-1">
                        ICP R&D effort/years
                      </figcaption>
                    </figure>
                  </div>
                </Link>

                <hr className="absolute -bottom-8 left-6 right-6 h-px my-8 border-0 opacity-20" />
              </AnimateSpawn>
              <Link
                href="https://dashboard.internetcomputer.org/"
                className="hover:no-underline text-white hover:text-black duration-100"
              >
                <AnimateSpawn
                  className="
                    bg-black/20 p-2 px-0 rounded-b-xl relative overflow-hidden min-w-[15rem] 
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
            </aside>
          </div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </section>
  );
};

export default Hero;
