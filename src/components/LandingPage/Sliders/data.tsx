import React from "react";
import RightArrow from "./RightArrow.svg";
import { SliderLink } from "./Slide";

export const slides = [
  {
    body: (
      <>
        <h3>Extend Bitcoin, Ethereum and other blockchains</h3>
        <p>
          <SliderLink href="/bitcoin-integration">
            <RightArrow></RightArrow> Learn about Bitcoin integration
          </SliderLink>
        </p>
        <p>
          <SliderLink href="/samples">
            <RightArrow></RightArrow> Sample contracts
          </SliderLink>
        </p>
      </>
    ),
    backgroundImageUrl: "/img/home-page-sliders/bitcoin-background.jpg",
    sideImageUrl: "/img/home-page-sliders/btc-eth.svg",
  },
  {
    body: (
      <>
        <h3>Replacing traditional IT with a World Computer</h3>
        <p>
          <SliderLink href="https://medium.com/dfinity/announcing-internet-computer-mainnet-and-a-20-year-roadmap-790e56cbe04a">
            <RightArrow></RightArrow> Read about the World Computer vision
          </SliderLink>
        </p>
        <p>
          <SliderLink href="/samples">
            <RightArrow></RightArrow> Learn more
          </SliderLink>
        </p>
      </>
    ),
    backgroundImageUrl: "/img/home-page-sliders/IT-stack-background.jpg",
    // sideImageUrl: "/img/home-page-sliders/btc-eth.svg",
  },
  {
    body: (
      <>
        <h3>
          Internet Identity is your easy and secure Web3 Authentication. Your
          digital identity.
        </h3>
        <p>
          <SliderLink href="https://identity.ic0.app/">
            <RightArrow></RightArrow> Create Internet Identity
          </SliderLink>
        </p>
        <p>
          <SliderLink href="/docs/current/developer-docs/integrations/internet-identity/integrate-identity">
            <RightArrow></RightArrow> Learn more
          </SliderLink>
        </p>
      </>
    ),
    backgroundImageUrl: "/img/home-page-sliders/II-background.jpg",
    sideImageUrl: "/img/home-page-sliders/ii.svg",
  },
];
