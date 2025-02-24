import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";

const LearnMore: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <section id={id}>
      <AnimateSpawn
        className="md:container-12 pt-20 py-16 md:py-30"
        variants={transitions.container}
      >
        <div className="relative rounded-xl bg-[#0A0023] flex flex-col md:flex-row gap-8 justify-between items-start">
          <svg className="absolute top-16 md:top-12 -right-12 md:right-0 w-full md:w-2/3 z-1 opacity-75 mask-fade-bottom" viewBox="0 0 922 450" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M951.484 224.838C951.484 101.049 847.721 0.336914 720.385 0.336914C667.298 0.336914 609.49 27.5577 548.248 81.2233C519.295 106.595 494.187 133.733 475.336 155.556C409.142 81.8176 320.367 0.336914 231.773 0.336914C124.691 0.336914 31.3106 74.4883 7.0121 172.74C7.04511 172.658 7.07812 172.542 7.11114 172.427C7.07812 172.542 7.04511 172.641 7.0121 172.74C2.79512 189.785 0.666584 207.279 0.673356 224.838C0.673356 348.627 102.787 449.339 230.123 449.339C283.21 449.339 342.668 422.118 403.91 368.452C432.863 343.081 457.971 315.942 476.822 294.12C543.015 367.858 631.807 449.339 720.401 449.339C827.483 449.339 920.864 375.187 945.162 276.952C949.305 260.213 951.501 242.765 951.501 224.854L951.484 224.838ZM493.098 155.325C514.739 130.911 536.198 109.352 556.964 91.1608C615.729 39.6576 670.715 13.5429 720.385 13.5429C840.54 13.5429 938.279 108.328 938.279 224.838C938.279 241.18 936.314 257.506 932.419 273.386C931.791 275.219 923.785 297.14 900.973 318.451C871.342 346.134 831.18 360.182 781.593 360.199C834.927 337.022 872.234 284.958 872.234 224.838C872.234 143.11 804.109 76.6342 720.385 76.6342C687.75 76.6342 647.803 97.1529 601.599 137.646C580.817 155.87 559.77 177.296 537.551 202.9L528.836 212.903L484.184 165.147L493.098 155.342V155.325ZM414.111 227.05C396.481 247.981 371.06 276.506 341.843 302.109C287.402 349.832 252.011 359.836 231.773 359.836C155.411 359.836 93.1298 299.27 93.1298 224.838C93.1298 150.406 151.07 91.3093 227.498 90.8471C230.271 90.8471 236.938 90.8471 246.12 92.284C279.355 98.8794 316.521 130.052 337.766 149.498C354.85 165.147 385.801 197.171 414.095 227.033L414.111 227.05ZM459.06 294.351C437.403 318.765 415.96 340.324 395.194 358.515C337.254 409.292 280.172 436.133 230.123 436.133C172.1 436.133 117.692 414.095 76.8868 374.081C36.2462 334.233 13.8791 281.227 13.8791 224.838C13.8791 208.495 15.8599 192.153 19.7391 176.29C20.3994 174.391 28.4053 152.502 51.1852 131.224C80.8155 103.541 120.977 89.4935 170.565 89.477C117.23 112.653 79.9241 164.718 79.9241 224.838C79.9241 306.566 148.049 373.042 231.773 373.042C264.408 373.042 304.355 352.523 350.559 312.03C371.341 293.806 392.388 272.379 414.606 246.776L423.306 236.756C423.306 236.756 467.297 283.802 467.776 284.331L459.043 294.351H459.06ZM538.047 222.626C555.676 201.694 581.097 173.17 610.315 147.567C664.755 99.8437 700.147 89.8402 720.385 89.8402C796.747 89.8402 859.028 150.406 859.028 224.838C859.028 299.27 796.813 359.373 720.385 359.836C717.611 359.836 714.26 359.555 710.183 358.829C710.216 358.829 710.233 358.845 710.266 358.862C670.847 343.757 635.637 319.64 614.376 300.178C597.291 284.529 566.34 252.504 538.03 222.642L538.047 222.626ZM945.063 277.183C945.096 277.1 945.113 277.001 945.146 276.935C945.129 277.001 945.096 277.1 945.063 277.183Z" fill="url(#paint0_linear_777_2808)" fill-opacity="0.5" />
            <defs>
              <linearGradient id="paint0_linear_777_2808" x1="335" y1="738" x2="89.5001" y2="-13.9999" gradientUnits="userSpaceOnUse">
                <stop stop-color="#13033F" />
                <stop offset="0.24376" stop-color="#0A0123" />
                <stop offset="0.714988" stop-color="#9163BF" />
                <stop offset="0.839988" stop-color="#FFB1C5" />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative px-6 py-10 md:p-12 text-white md:w-1/2 max-w-[40rem] z-1">
            <motion.h2
              className="tw-heading-alt-2 mb-6"
              variants={transitions.item}
            >
              Learn more about the Internet Computer
            </motion.h2>
            <motion.p
              className="tw-lead-sm md:tw-lead-sm mb-12"
              variants={transitions.item}
            >
              Documents introducing the Internet Computer, the Self-Writing Internet paradigm, and technical papers.
            </motion.p>
            <div className="md:w-6/10">
              <motion.p
                className="flex flex-col sm:flex-row items-start md:items-center gap-6 md:gap-8 mb-0"
                variants={transitions.item}
              >
                <Link className="button-primary bg-[#AE9EFF] hover:bg-white text-black hover:text-black" href="/library">
                  Explore Resources
                </Link>
              </motion.p>
            </div>
          </div>
          <motion.img
            src="/img/ethdenver/teaser-decks.webp"
            alt=""
            className="relative w-4/5 md:w-1/2 max-w-lg px-8 md:px-10 self-end z-1"
            variants={transitions.item}
          />
        </div>
      </AnimateSpawn>
    </section>
  );
};

export default LearnMore;
