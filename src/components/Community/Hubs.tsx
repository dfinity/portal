import React from "react";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

export type Hub = {
  name: string;
  location?: string;
  description: string;
  image: string;
  link: string;
  coordinates?: [number, number];
};

export const HubCard: React.FC<{
  hub: Hub;
}> = ({ hub }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl flex flex-col bg-white"
      variants={transitions.item}
    >
      <img
        src={hub.image}
        alt={hub.name}
        loading="lazy"
        className="h-[200px] object-cover"
      />
      {/* <div className="tw-title-navigation-on-page rounded-full mx-4 px-3 py-1 bg-white/60 backdrop-blur-2xl -translate-y-1/2 inline-flex gap-3 items-center self-start">
        {hub.location}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 13.9332L11.2998 10.6333C13.1223 8.8109 13.1223 5.85611 11.2998 4.03366C9.4774 2.21122 6.52261 2.21122 4.70017 4.03366C2.87772 5.85611 2.87772 8.8109 4.70017 10.6333L8 13.9332ZM8 15.8188L3.75736 11.5762C1.41421 9.23296 1.41421 5.434 3.75736 3.09086C6.10051 0.747709 9.89947 0.747709 12.2427 3.09086C14.5858 5.434 14.5858 9.23296 12.2427 11.5762L8 15.8188ZM8 8.66683C8.7364 8.66683 9.33333 8.0699 9.33333 7.3335C9.33333 6.59712 8.7364 6.00016 8 6.00016C7.2636 6.00016 6.66667 6.59712 6.66667 7.3335C6.66667 8.0699 7.2636 8.66683 8 8.66683ZM8 10.0002C6.52724 10.0002 5.33333 8.80623 5.33333 7.3335C5.33333 5.86074 6.52724 4.66683 8 4.66683C9.47273 4.66683 10.6667 5.86074 10.6667 7.3335C10.6667 8.80623 9.47273 10.0002 8 10.0002Z"
            fill="black"
          />
        </svg>
      </div> */}
      <div className="flex items-center justify-between mb-8 mx-6 mt-8 gap-4">
        <h3 className="tw-heading-6 mb-0">{hub.name}</h3>
        {/* <p className="flex-1 tw-paragraph-sm text-black/60 mx-6 mb-3">
        {hub.description}
      </p> */}
        <p className="mb-0">
          <Link className="button-round-icon" href={hub.link}>
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.60718 13.9316H9.45173V20.3247H6.60718V13.9316Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.030082 7.38579H4.86365L1.42228 4.12851L3.31864 2.19604L6.59276 5.54477V0.779785H9.43732V5.54357L12.7102 2.19484L14.6066 4.12731L11.1652 7.38458H16V10.0787H11.1351L14.5922 13.4275L12.6958 15.3154L7.9994 10.6118L3.303 15.3154L1.40663 13.4275L4.86365 10.0787H0V7.38579H0.030082Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
