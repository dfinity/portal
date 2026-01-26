import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";

const MotionLink = motion(Link);

const notFoundPages = [
  {
    title: "Lost but not forgotten!",
    description:
      "We can't find the page you requested, but let's explore some interesting corners of the Internet Computer. Try searching or go back to our homepage.",
    imageUrl: "/img/notfound/404_hero_1.webp",
  },
  {
    title: "You've stumbled upon a digital black hole",
    description:
      "Don't worry though, the page you're looking for might just be a hop, skip, or a jump away. Use search or navigate back to the homepage.",
    imageUrl: "/img/notfound/404_hero_2.webp",
  },
  {
    title: "You found an empty canister",
    description:
      "Looks like you've gotten lost in the vast expanse of the Internet Computer! Don't worry, navigate back to familiar territory by using search or return to the homepage.",
    imageUrl: "/img/notfound/404_hero_3.webp",
  },
];

function CustomNotFoundPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDark = useDarkHeaderInHero(heroRef);

  const randomIndex = Math.floor(Math.random() * notFoundPages.length);
  const { title, description, imageUrl } = notFoundPages[randomIndex];

  return (
    <Layout title={title} description={description}>
      <main
        className="text-black relative overflow-hidden mt-navbar-negative"
        style={{
          background: "linear-gradient(63deg, #3B00B9 0%, #D38ED7 100%)",
        }}
      >
        <section
          className="text-white pt-24 md:pt-40 pb-0 md:pb-40 mb-[10vw] lg:mb-3"
          ref={heroRef}
        >
          {bgDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}

          <div className="container-10 md:pt-20 pt-12 md:pb-20 pb-12 relative z-10">
            <div className="relative">
              <motion.h1 className="tw-heading-3 md:tw-heading-2 mb-6 md:w-6/10">
                {title}
              </motion.h1>
              <div className="relative md:w-[55%]">
                <motion.p
                  className="tw-lead-sm md:tw-lead mb-6"
                  variants={transitions.item}
                >
                  {description}
                </motion.p>
              </div>
              <MotionLink
                href="/"
                className="button-white"
                variants={transitions.item}
              >
                BACK TO HOME
              </MotionLink>
            </div>

            <AnimateSpawn
              variants={null}
              el={motion.section}
              className="pointer-events-none relative -z-1 "
            >
              {randomIndex === 0 && (
                <div className="md:absolute w-[120%] sm:w-[80%] md:w-2/3 bottom-0 -translate-x-[25%] sm:-translate-x-[8%] md:translate-x-[50%] translate-y-[10%] md:translate-y-[35%]">
                  <motion.img
                    src={imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}{" "}
              {randomIndex === 1 && (
                <div className="md:absolute mx-auto w-[90%] sm:w-1/2 md:w-1/3 bottom-0 md:translate-x-[200%] translate-y-[10%] md:translate-y-[25%]">
                  <motion.img
                    src={imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {randomIndex === 2 && (
                <div className="md:absolute mx-auto w-[90%] sm:w-1/2 md:w-1/3 bottom-0 md:translate-x-[200%] translate-y-[10%] md:translate-y-[25%]">
                  <motion.img
                    src={imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {randomIndex === 2 && (
                <div className="blob blob-sm md:blob-md blob-white md:blob-white-dense translate-1/6 translate-1/3 md:translate-x-2/3 -translate-y-2/3 md:opacity-50 -z-1 "></div>
              )}
            </AnimateSpawn>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default CustomNotFoundPage;
