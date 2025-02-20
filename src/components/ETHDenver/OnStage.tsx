import React, { FC } from "react";

import AnimateSpawn from "../Common/AnimateSpawn";
import TwitterIcon from "@site/static/img/ethdenver/twitter.svg";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";
import Link from "@docusaurus/Link";

const MotionLink = motion(Link);
const MeetUs: FC<{
  id: string;
}> = ({ id }) => {
  return (
    <section
      className="bg-black text-white py-12 md:pt-20 md:pb-40"
      id={id}
    >
      <AnimateSpawn
        className="container-10 relative mb-16 md:mb-20"
        variants={transitions.container}
      >
        <div className="md:w-8/10">
          <motion.h2
            className="tw-heading-alt-2 md:mb-8"
            variants={transitions.item}
          >
            See our team on stage
          </motion.h2>
          <motion.p className="tw-lead mb-8" variants={transitions.item}>
            <span className="text-white-60">
            Want to learn about the latest developments and insights on the Internet Computer? Catch these talks from DFINITY team members at ETH Denver.
            </span>
          </motion.p>
          <MotionLink
            className="link-with-icon link-white text-[#AE9EFF]"
            href="https://x.com/dfinity"
            target="_blank"
            rel="noopener noreferrer"
            variants={transitions.item}
          >
            <TwitterIcon />
              Follow us for event updates
          </MotionLink>
        </div>
      </AnimateSpawn>

      <div className="container-10">
        <AnimateSpawn
          className="flex flex-col md:flex-row gap-4"
          variants={transitions.item}
        >
          <motion.div
            variants={transitions.item}
            className="flex-1 p-6 md:p-8 order border-solid border-white-20 rounded-xl"
          >
            <time className="tw-paragraph-sm text-white-60" dateTime="2025-02-24T16:15:00">February 24, 2025, 4:15 PM – 4:35 PM</time>
            <h3 className="tw-heading-5 mb-3 text-white text-balance">
              Build cross chain Ethereum applications with ICP Chain Fusion
            </h3>

            <div className="flex flex-col md:flex-row md:gap-3 mt-4">
              <div className="w-full md:w-1/2 flex gap-3">
                <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
                  <img src="/img/ethdenver/kristofer-lund.jpg" alt="Kristofer Lund" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="tw-paragraph-sm text-white mb-0">Kristofer Lund</h4>
                  <p className="tw-paragraph-sm text-white-60">
                    Developer Evangelist in Developer Ecosystem<br />
                    DFINITY Foundation
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 pl-[3.25rem]">
                <h4 className="tw-paragraph-sm text-white mb-0">Captain Ethereum Stage</h4>
                <p className="tw-paragraph-sm text-white-60 mb-4">#BUIDLHub</p>
                <p className="tw-paragraph-sm text-white-60 mb-0">
                  National Western Complex<br />
                  4655 Humboldt Street<br />
                  Denver, CO 80216<br />
                  <Link
                    className="text-[#AE9EFF]"
                    href="https://maps.app.goo.gl/zfWULuZiTwZ2A92z6"
                    target="_blank"
                  >
                    Get directions
                  </Link>
                </p>
              </div>
            </div>
            
          </motion.div>
          <motion.div
            variants={transitions.item}
            className="flex-1 p-6 md:p-8 border border-solid border-white-20 rounded-xl"
          >
            <time className="tw-paragraph-sm text-white-60" dateTime="">March 1, 2025, 3:45 PM – 4:05 PM</time>
            <h3 className="tw-heading-5 mb-3 text-white text-balance">
              A Platform That Runs AI and Enables AI to Build
            </h3>

            <div className="flex flex-col md:flex-row md:gap-3 mt-4">
              <div className="w-full md:w-1/2 flex gap-3">
                <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
                  <img src="/img/ethdenver/lomesh-dutta.jpg" alt="Lomesh Dutta" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="tw-paragraph-sm text-white mb-0">Lomesh Dutta</h4>
                  <p className="tw-paragraph-sm text-white-60">
                    VP of Growth in Developer Ecosystem<br />
                    DFINITY Foundation
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 pl-[3.25rem]">
                <h4 className="tw-paragraph-sm text-white mb-0">Whale Pool Stage</h4>
                <p className="tw-paragraph-sm text-white-60 mb-4">Spork Castle</p>
                <p className="tw-paragraph-sm text-white-60 mb-0">
                  National Western Complex<br />
                  4655 Humboldt Street<br />
                  Denver, CO 80216<br />
                  <Link
                    className="text-[#AE9EFF]"
                    href="https://maps.app.goo.gl/zfWULuZiTwZ2A92z6"
                    target="_blank"
                  >
                    Get directions
                  </Link>
                </p>
              </div>
            </div>
            
          </motion.div>
        </AnimateSpawn>
      </div>
    </section>
  );
};

export default MeetUs;
