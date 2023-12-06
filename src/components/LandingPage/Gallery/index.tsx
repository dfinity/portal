import React from "react";
import Gallery from "../../Community/Gallery";
import { communityGallery } from "../../Community/gallery-images";
import transitions from "@site/static/transitions.json";

import { motion } from "framer-motion";
import LinkArrowRight from "../../Common/Icons/LinkArrowRight";
import Link from "@docusaurus/Link";

const MotionLink = motion(Link);

const GallerySection = () => {
  return (
    <section
      id="community"
      className="
      bg-infinite
        bg-gradient-to-b from-[#1B025A] to-[#1B025A]
        bg-bottom bg-no-repeat 
        bg-[length:100%_48px]
        md:bg-[length:100%_104px]
      text-white pt-20 md:pt-40"
    >
      <Gallery gallery={communityGallery}>
        <div className="md:w-7/10">
          <motion.h2
            className="tw-heading-3 sm:tw-heading-4 md:tw-heading-60 mb-8 md:mb-6"
            variants={transitions.item}
          >
            Join, collaborate and connect
          </motion.h2>
          <motion.p
            className="tw-paragraph md:tw-lead mb-6 md:mb-10"
            variants={transitions.item}
          >
            The ICP community is currently active in around 30 countries and
            collaborates with up to 50 well-known crypto organizations and 32
            universities. Haven't joined yet? What are you waiting for?
          </motion.p>

          <p className="mb-0 flex flex-col gap-6 items-start md:flex-row md:items-center">
            <MotionLink
              href="/community"
              className="button-white"
              variants={transitions.item}
            >
              Explore ICP Community
            </MotionLink>
            <MotionLink
              className="link-white link-with-icon"
              href="#subscribe"
              variants={transitions.item}
            >
              <LinkArrowRight />
              Subscribe to the mailing list
            </MotionLink>
          </p>
        </div>
      </Gallery>
    </section>
  );
};

export default GallerySection;
