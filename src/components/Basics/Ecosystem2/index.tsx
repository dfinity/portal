import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

const categories = [
  {
    title: (
      <>
        Mint and store <span style={{ color: "#18D0B5" }}>NFT's</span> on-chain
      </>
    ),
    image: "/img/basics/export-nft.webp",
    link: (
      <a href="/ecosystem?tag=NFT" className={styles.link}>
        Explore more NFT projects <LinkArrowUpRight />
      </a>
    ),
    credit: (
      <a
        href="https://twitter.com/dSquadNFT"
        target={"_blank"}
        className={styles.credit}
      >
        @dSquadNFT
      </a>
    ),
  },
  {
    title: (
      <>
        Explore new user incentives in Web3{" "}
        <span style={{ color: "#DA3979" }}>Social</span> dapps
      </>
    ),
    image: "/img/basics/export-social.webp",
    link: (
      <a href="/ecosystem?tag=SocialFi" className={styles.link}>
        Explore more SocialFi projects <LinkArrowUpRight />
      </a>
    ),
    credit: (
      <a
        href="https://dscvr.one"
        target={"_blank"}
        className={clsx(styles.credit, styles.creditToneDown)}
      >
        © dscvr.one
      </a>
    ),
  },
  {
    title: (
      <>
        Leverage unlimited scalability and supersonic transaction finality in{" "}
        <span style={{ color: "#29ABE2" }}>DeFi</span>
      </>
    ),
    image: "/img/basics/export-defi.webp",
    link: (
      <a href="/ecosystem?tag=DeFi" className={styles.link}>
        Explore more DeFi projects <LinkArrowUpRight />
      </a>
    ),
    credit: (
      <a
        href="https://infinityswap.one"
        target={"_blank"}
        className={clsx(styles.credit, styles.creditWithPanel)}
      >
        © infinityswap.one
      </a>
    ),
  },
  {
    title: (
      <>
        Build the next <span style={{ color: "#3B00B9" }}>Metaverse</span> on
        the Internet Computer
      </>
    ),
    image: "/img/basics/export-metaverse.webp",
    link: (
      <a href="/ecosystem?tag=Metaverse" className={styles.link}>
        Explore more Metaverse projects <LinkArrowUpRight />
      </a>
    ),
    credit: (
      <a
        href="https://dfinitycommunity.com"
        target={"_blank"}
        className={clsx(styles.credit, styles.creditToneDown)}
      >
        © dfinitycommunity.com
      </a>
    ),
  },
];

const Ecosystem2 = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[0]
  >(categories[0]);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);
  return (
    <div className={styles.outerContainer}>
      <motion.section
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={transitions.container}
        className={styles.container}
      >
        <motion.div
          variants={transitions.item}
          className={styles.headingContainer}
        >
          <h2 className="tw-heading-3 md:tw-heading-2 m-0">Ecosystem</h2>
          <Link href="/ecosystem" className="link-primary link-with-icon">
            Go to Ecosystem showcase
            <LinkArrowUpRight />
          </Link>
        </motion.div>
        <div className={styles.categoriesContainer}>
          <div className={styles.categories}>
            {categories.map((category, index) => (
              <motion.button
                variants={transitions.item}
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={clsx({
                  [styles.selected]: category === selectedCategory,
                })}
              >
                {category.title}
              </motion.button>
            ))}
          </div>
          <motion.div variants={transitions.item} className={styles.example}>
            {categories.map((category, index) => (
              <img
                src={category.image}
                alt=""
                key={index}
                style={{ opacity: category === selectedCategory ? 1 : 0 }}
              />
            ))}
            {selectedCategory.link}
            {selectedCategory.credit}
          </motion.div>
        </div>
        <motion.div
          variants={transitions.item}
          className={styles.mobileCategoriesContainer}
        >
          {categories.map((category, index) => (
            <div key={index} className={styles.mobileCategoryCard}>
              <h3>{category.title}</h3>
              <img src={category.image} alt="" />
              {category.link}
            </div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Ecosystem2;
