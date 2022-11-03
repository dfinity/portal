import Link from "@docusaurus/Link";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import RightArrow from "./RightArrow.svg";
import DocsIcon from "./Docs.svg";

const SliderCard: React.FC<{
  bgImage: string;
  children: React.ReactNode;
  className?: string;
}> = ({ bgImage, children, className }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      className={clsx(
        `
    min-w-full
    bg-right md:bg-center bg-cover 
    
    pt-12 px-10 md:px-12
    rounded-xl
    overflow-hidden
    text-white
    `,
        className
      )}
    >
      {children}
    </div>
  );
};

const SliderLink: React.FC<{
  children: React.ReactNode;
  href: string;
  icon?: ReactNode;
}> = ({
  children,
  href,
  icon = <RightArrow className="min-w-[24px]"></RightArrow>,
}) => {
  return (
    <Link
      href={href}
      className="text-white inline-flex items-start gap-2 tw-heading-7 md:tw-heading-6
      no-underline
      hover:text-white-80 hover:no-underline
      "
    >
      {icon} {children}
    </Link>
  );
};

const Sliders = () => {
  return (
    <AnimateSpawn
      className="container-12 mt-20 md:my-30"
      el={motion.section}
      variants={transitions.item}
    >
      <div className="relative">
        <div className="grid gap-5 pb-4 grid-cols-1 md:grid-cols-3">
          <SliderCard
            bgImage="/img/home-page-sliders/bitcoin-background.webp"
            className="md:col-span-3 flex items-start md:items-center justify-between min-h-[374px] lg:min-h-[420px] md:pt-0"
          >
            <div className="md:w-6/12 md:ml-1/12">
              <h3 className="tw-heading-5 mb-6 md:tw-heading-3">
                Extend Bitcoin, Ethereum and other blockchains
              </h3>
              <p className="mb-4 flex">
                <SliderLink href="https://wiki.internetcomputer.org/wiki/Extend_Bitcoin,_Ethereum_and_other_blockchains">
                  Learn about Bitcoin integration
                </SliderLink>
              </p>
              <p className="mb-0 flex gap-4 md:gap-7 flex-col md:flex-row">
                <SliderLink href="/samples">Sample contracts</SliderLink>
                <SliderLink
                  href="/docs/current/developer-docs/integrations/bitcoin/"
                  icon={<DocsIcon className="min-w-[24px]"></DocsIcon>}
                >
                  Developer Docs
                </SliderLink>
              </p>
            </div>
            <div className="hidden md:block w-4/12 mr-1/12 text-right">
              <img src="/img/home-page-sliders/btc-eth.png" alt="" />
            </div>
          </SliderCard>
          <SliderCard
            bgImage="/img/home-page-sliders/https-outcalls-background.webp"
            className="min-h-[374px] md:min-h-[550px] md:pt-16"
          >
            <div className="">
              <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                HTTPS outcalls replace oracles
              </h3>
              <p className="mb-4 flex">
                <SliderLink href="/https-outcalls">
                  Learn how ICP does this
                </SliderLink>
              </p>
              <p className="mb-0 flex">
                <SliderLink href="/docs/current/samples/http-requests-exchange-rates">
                  Sample code
                </SliderLink>
              </p>
            </div>
          </SliderCard>
          <SliderCard
            bgImage="/img/home-page-sliders/II-background.webp"
            className="min-h-[374px] md:min-h-[550px] relative  md:pt-16"
          >
            <div className=" ">
              <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                Internet Identity is your digital identity.
              </h3>
              <p className="mb-4 flex">
                <SliderLink href="https://identity.ic0.app/">
                  Create Internet Identity
                </SliderLink>
              </p>
              <p className="mb-0 flex">
                <SliderLink href="https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7">
                  Learn more
                </SliderLink>
              </p>
            </div>
            <img
              src="/img/home-page-sliders/ii.svg"
              alt=""
              className="hidden md:inline absolute bottom-0 right-0 rotate-[15deg]"
            />
          </SliderCard>
          <SliderCard
            bgImage="/img/home-page-sliders/features-background.webp"
            className="min-h-[374px] md:min-h-[550px]  md:pt-16"
          >
            <div className="flex flex-col h-full pb-12">
              <h3 className="tw-heading-5 md:tw-heading-4 mb-6">
                Super features of the Internet Computer
              </h3>
              <div className="flex-1"></div>

              <Link
                href=""
                className="text-center button-outline-white self-start md:self-center"
              >
                Check out ICP features
              </Link>
            </div>
          </SliderCard>
        </div>
      </div>
    </AnimateSpawn>
  );
};

export default Sliders;
