import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useEffect } from "react";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

const Arrow = ({ className }) => {
  return (
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.67578 12.5884L17.999 24.9116L30.3223 12.5884"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="3"
      />
    </svg>
  );
};

const Drawer: React.FC<{
  title: string;
  children?: React.ReactNode;
  startingState?: boolean;
}> = ({ title, children, startingState = false }) => {
  const [open, setOpen] = React.useState(startingState);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateHeight();

    function updateHeight() {
      if (open) {
        ref.current.style.maxHeight = ref.current.scrollHeight + "px";
      } else {
        ref.current.style.maxHeight = "0px";
      }
    }
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [open]);

  return (
    <div className="bg-white/5 rounded-xl md:rounded-[32px] px-6 md:px-1/12 py-6 md:py-12 ">
      <button
        className="w-full flex justify-between items-center bg-transparent appearance-none border-none p-0 font-circular text-white"
        onClick={() => setOpen((o) => !o)}
      >
        <h3 className="tw-heading-6 md:tw-heading-3 mb-0">{title}</h3>

        <Arrow
          className={clsx(
            "transition-transform w-6 md:w-9",
            open ? "-rotate-180" : ""
          )}
        />
      </button>
      <div
        ref={ref}
        className={clsx(
          "transition-all overflow-hidden",
          open ? "max-h-none" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Highlights: React.FC = () => {
  return (
    <section id="technology">
      <div className="container-10 text-white mb-16 md:pt-20">
        <h2 className="tw-heading-4 md:tw-heading-60">Disruption in motion</h2>
      </div>
      <div className="container-12 space-y-4 md:space-y-8">
        <Drawer title="Sovereign hardware" startingState={true}>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 pt-5 md:pt-20 order-2 md:order-1">
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                The internet runs on routing devices{" "}
              </p>
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Bitcoin runs on PoW mining rigs{" "}
              </p>
              <p className="text-white tw-lead md:tw-title-sm mb-10 md:mb-20">
                The Internet Computer runs on node machines (PoUW)
              </p>
              <p className="mb-0">
                <Link
                  href="https://wiki.internetcomputer.org/wiki/Proof_of_Useful_Work"
                  className="link-white link-with-icon"
                >
                  Wiki explanation of Proof of Useful Work{" "}
                  <LinkArrowUpRight />
                </Link>
              </p>
            </div>
            <div className="flex-1 order-1 md:order-2 mt-10 md:mt-0 aspect-[821/750]">
              <img
                src="/img/home/img-sovereign-hardware.webp"
                alt=""
                loading="lazy"
              ></img>
            </div>
          </div>
        </Drawer>
        <Drawer title="Intelligent blockchain">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 pt-10 md:pt-20 order-2 md:order-1">
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Web2 apps are updated by companies
              </p>
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Traditionally, blockchains are updated using protocol forks. 
              </p>
              <p className="text-white tw-lead md:tw-title-sm mb-10 md:mb-20">
                The Internet Computer is updated by a fully automated DAO
              </p>
              <p className="mb-0">
                <Link href="/nns" className="link-white link-with-icon">
                  <LinkArrowRight />
                  What is the NNS DAO
                </Link>
              </p>
            </div>
            <div className="flex-1 order-1 md:order-2 mt-10 md:mt-0 aspect-[821/676]">
              <img
                src="/img/home/img-intelligent-blockchain.webp"
                alt=""
                loading="lazy"
              ></img>
            </div>
          </div>
        </Drawer>
        <Drawer title="Web2 compatible">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 pt-10 md:pt-20 order-2 md:order-1">
              <ul className="tw-lead-sm md:tw-lead-lg text-white list-none checklist space-y-6">
                <li className="checklist-item-white pl-8 md:pl-12 bg-[length:24px] md:bg-[length:36px]">
                   Web experiences served by smart contracts 
                </li>
                <li className="checklist-item-white pl-8 md:pl-12 bg-[length:24px] md:bg-[length:36px]">
                  Web2 APIs processed through consensus
                </li>
                <li className="checklist-item-white pl-8 md:pl-12  bg-[length:24px] md:bg-[length:36px]">
                  Googleable smart contracts 
                </li>
              </ul>

              <p className="mt-20 mb-0">
                <Link
                  href="/capabilities"
                  className="link-white link-with-icon"
                >
                  <LinkArrowRight />
                  More ICP capabilities
                </Link>
              </p>
            </div>
            <div className="flex-1 order-1 md:order-2 mt-10 md:mt-0 aspect-[821/676]">
              <img
                src="/img/home/img-web2-compatible.webp"
                alt=""
                loading="lazy"
              ></img>
            </div>
          </div>
        </Drawer>
        <Drawer title="Multi-chain">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 pt-10 md:pt-20 order-2 md:order-1">
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Bitcoin transfers digital gold without intermediaries
              </p>
              <p className="text-white/30 tw-lead-sm md:tw-lead-lg mb-4 md:mb-6">
                Ethereum hosts unstoppable smart contract code
              </p>
              <p className="text-white tw-lead md:tw-title-sm mb-10 md:mb-20">
                The Internet Computer can execute code on any blockchain and process any asset
              </p>
              <p className="mb-0">
                <Link
                  href="/bitcoin-integration"
                  className="link-white link-with-icon"
                >
                  <LinkArrowRight />
                  Bitcoin on ICP
                </Link>
                <Link
                  href="/ethereum-integration"
                  className="link-white link-with-icon"
                >
                  <LinkArrowRight />
                  Ethereum on ICP
                </Link>
              </p>
            </div>
            <div className="flex-1 order-1 md:order-2 mt-10 md:mt-0 aspect-[821/676]">
              <img
                src="/img/home/img-multi-chain.webp"
                alt=""
                loading="lazy"
              ></img>
            </div>
          </div>
        </Drawer>
      </div>
    </section>
  );
};

export default Highlights;
