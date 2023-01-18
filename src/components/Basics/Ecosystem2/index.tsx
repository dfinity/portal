import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import transitions from "@site/static/transitions.json";
import LinkArrowUpRight from "../../Common/Icons/LinkArrowUpRight";

const OutgoingLink = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1926_6016)">
      <path
        d="M11.2429 8.34309L3.65709 8.34309L3.65709 6.34339H14.6568V17.3431L12.6571 17.3431L12.6571 9.75731L4.05024 18.3642L2.63603 16.95L11.2429 8.34309Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1926_6016">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const categories = [
  {
    title: (
      <>
        Mint and store <span style={{ color: "#18D0B5" }}>NFT's</span> on-chain
      </>
    ),
    image: require("../../../../static/img/basics/export-nft.png").default,
    link: (
      <a href="/ecosystem?tag=nft" className={styles.link}>
        Explore more NFT projects <OutgoingLink></OutgoingLink>
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
    image: require("../../../../static/img/basics/export-social.png").default,
    link: (
      <a href="/ecosystem?tag=social" className={styles.link}>
        Explore more SocialFi projects <OutgoingLink></OutgoingLink>
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
    image: require("../../../../static/img/basics/export-defi.png").default,
    link: (
      <a href="/ecosystem?tag=defi" className={styles.link}>
        Explore more DeFi projects <OutgoingLink></OutgoingLink>
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
    image: require("../../../../static/img/basics/export-metaverse.png")
      .default,
    link: (
      <a href="/ecosystem?tag=metaverse" className={styles.link}>
        Explore more Metaverse projects <OutgoingLink></OutgoingLink>
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
    typeof categories[0]
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
