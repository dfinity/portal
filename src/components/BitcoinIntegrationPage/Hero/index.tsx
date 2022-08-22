import React from "react";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import AnimateSpawn from "@site/src/components/Common/AnimateSpawn";
import { css } from "@site/src/utils/dummy-css";

const Hero = () => {
  return (
    <div className="bg-infinite overflow-hidden py-0 px-6 md:px-15">
      <style>{css`
        @media (min-width: 996px) {
          nav.navbar .navbar__item.ic0-item img {
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(303deg)
              brightness(102%) contrast(101%);
          }
          nav.navbar .navbar__item.ic0-item:hover img {
            filter: invert(39%) sepia(90%) saturate(3865%) hue-rotate(316deg)
              brightness(90%) contrast(88%);
          }

          nav.navbar {
            background-color: var(--ifm-color-primary);
            --ifm-navbar-link-color: white;
            box-shadow: none;
          }

          nav.navbar .navbar__logo img {
            content: url(/img/IC_logo_horizontal_white.svg);
          }

          nav.navbar .navbar__inner .navbar__item.dropdown .navbar__link:after {
            background-image: url("data:image/svg+xml,%3Csvg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.5 10.6669L13.1669 6.00001L14.5 7.33313L8.5 13.3331L2.5 7.33313L3.83312 6.00001L8.5 10.6669Z' fill='white' fill-opacity='0.5'/%3E%3C/svg%3E%0A");
          }

          nav.navbar .navbar__search-input {
            background-color: transparent;
            border: 1px solid white;
            color: white;
            --ifm-navbar-search-input-icon: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16px" height="16px"><path d="M11.7668 11.0239L14.6221 13.8786L13.6788 14.8219L10.8241 11.9666C9.76196 12.818 8.4408 13.2812 7.07947 13.2792C3.76747 13.2792 1.07947 10.5912 1.07947 7.27924C1.07947 3.96724 3.76747 1.27924 7.07947 1.27924C10.3915 1.27924 13.0795 3.96724 13.0795 7.27924C13.0814 8.64057 12.6183 9.96173 11.7668 11.0239ZM10.4295 10.5292C11.2755 9.65916 11.748 8.49286 11.7461 7.27924C11.7461 4.70057 9.65747 2.61257 7.07947 2.61257C4.5008 2.61257 2.4128 4.70057 2.4128 7.27924C2.4128 9.85723 4.5008 11.9459 7.07947 11.9459C8.29309 11.9478 9.45939 11.4753 10.3295 10.6292L10.4295 10.5292Z" fill="white" stroke="white" stroke-width="0.5"/></svg>');
          }

          nav.navbar .navbar__search-input::placeholder {
            color: rgb(255 255 255 / 0.6);
          }

          nav.navbar .navbar__toggle {
            color: white;
          }
        }
      `}</style>
      <AnimateSpawn
        variants={transitions.container}
        className="max-w-page relative text-white mx-auto pt-20 md:pt-40 pb-40"
      >
        <motion.h1
          variants={transitions.item}
          className="tw-heading-3 mb-2 w-5/6 md:tw-heading-2 md:mb-6 md:ml-1/12 md:w-6/12"
        >
          Bitcoin Integration
        </motion.h1>
        <motion.p
          variants={transitions.item}
          className="tw-lead-sm md:tw-lead md:ml-1/12 md:w-7/12"
        >
          The Internet Computer is cryptographically integrated with the Bitcoin
          network. It hosts powerful "canister smart contracts" that can
          create bitcoin addresses, and send and receive bitcoin, directly on the 
          Bitcoin ledger. This removes the need to use "wrapped bitcoin" from 
          insecure and centralized trusted "bridge" services in DeFi and Web3 - which 
          services have already been hacked for billions of dollars,
          can act as censors, and can get shut down.
        </motion.p>
        <svg
          viewBox="0 0 917 830"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute pointer-events-none max-w-none w-[800px] -right-[200px] bottom-[-400px] md:w-[1500px] md:bottom-[-680px] md:right-[-550px] "
        >
          <g filter="url(#filter0_f_1827_35599)">
            <path
              d="M200 350.731C200 231.99 382.911 200 501.776 200C620.641 200 717 296.259 717 415C717 533.741 620.641 630 501.776 630C382.911 630 200 469.472 200 350.731Z"
              fill="white"
              fillOpacity="0.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1827_35599"
              x="0"
              y="0"
              width="917"
              height="830"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_1827_35599"
              />
            </filter>
          </defs>
        </svg>
      </AnimateSpawn>
    </div>
  );
};

export default Hero;
