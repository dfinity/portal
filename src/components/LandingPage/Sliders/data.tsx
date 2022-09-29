import React from "react";
import RightArrow from "./RightArrow.svg";
import { SliderLink } from "./Slide";

export const slides = [
  {
    body: (
      <>
        <h3>HTTPS outcalls replace oracles</h3>
        <p>
          <SliderLink href="/https-outcalls">
            <RightArrow></RightArrow> Learn how Internet Computer does this
          </SliderLink>
        </p>
        <p>
          <SliderLink href="/docs/current/samples/http-requests-exchange-rates">
            <RightArrow></RightArrow> Sample code
          </SliderLink>
        </p>
      </>
    ),
    backgroundImageUrl: "/img/home-page-sliders/https-outcalls-background.jpeg",
    //sideImageUrl: "/img/home-page-sliders/btc-eth.png",
  },
  {
    body: (
      <>
        <h3>Extend Bitcoin, Ethereum and other blockchains</h3>
        <p>
          <SliderLink href="https://wiki.internetcomputer.org/wiki/Extend_Bitcoin,_Ethereum_and_other_blockchains">
            <RightArrow></RightArrow> Learn how Internet Computer does this
          </SliderLink>
        </p>
        {/* <p>
          <SliderLink href="/samples">
            <RightArrow></RightArrow> Sample contracts
          </SliderLink>
        </p> */}
      </>
    ),
    backgroundImageUrl: "/img/home-page-sliders/bitcoin-background.jpg",
    sideImageUrl: "/img/home-page-sliders/btc-eth.png",
  },
  {
    body: (
      <>
        <h3>Now smart contracts can serve interactive web experiences</h3>
        <p>
          <SliderLink href="https://wiki.internetcomputer.org/wiki/Web_Serving">
            <RightArrow></RightArrow> Learn about everything on-chain
          </SliderLink>
        </p>
        <p>
          <SliderLink href="https://wiki.internetcomputer.org/wiki/Replace_traditional_IT_with_a_World_Computer">
            <RightArrow></RightArrow> Learn how to ditch cloud
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
        <h3>Internet Identity is your easy and secure Web3 Authentication</h3>
        <p>
          <SliderLink href="https://identity.ic0.app/">
            <RightArrow></RightArrow> Create Internet Identity
          </SliderLink>
        </p>
        <p>
          <SliderLink href="https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7">
            <RightArrow></RightArrow> Learn how it works
          </SliderLink>
        </p>
      </>
    ),
    backgroundImageUrl: "/img/home-page-sliders/II-background.jpg",
    sideImageUrl: "/img/home-page-sliders/ii.svg",
  },
];
