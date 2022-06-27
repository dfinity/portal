import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./index.module.css";

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
        fill="#3B00B9"
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
      <a href="https://dfinity.org/showcase?tag=nft" className={styles.link}>
        Explore more SocialFi projects <OutgoingLink></OutgoingLink>
      </a>
    ),
    credit: (
      <a href="https://twitter.com/icpsquad" className={styles.credit}>
        @ICPSquadNFT
      </a>
    ),
  },
  {
    title: (
      <>
        Explore new user incentives in web3{" "}
        <span style={{ color: "#DA3979" }}>Social</span> dapps
      </>
    ),
    image: require("../../../../static/img/basics/export-social.png").default,
    link: (
      <a href="https://dfinity.org/showcase?tag=nft" className={styles.link}>
        Explore more DeFi projects <OutgoingLink></OutgoingLink>
      </a>
    ),
    credit: (
      <a
        href="https://dscvr.one"
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
      <a href="https://dfinity.org/showcase?tag=nft" className={styles.link}>
        Explore more Metaverse projects <OutgoingLink></OutgoingLink>
      </a>
    ),
    credit: (
      <a
        href="https://infinityswap.one"
        className={clsx(styles.credit, styles.creditWithPanel)}
      >
        © infinityswap.one
      </a>
    ),
  },
  {
    title: (
      <>
        Build the next Metaverse on the{" "}
        <span style={{ color: "#791E94" }}>Internet Computer</span>
      </>
    ),
    image: require("../../../../static/img/basics/export-metaverse.png")
      .default,
    link: (
      <a href="https://dfinity.org/showcase?tag=nft" className={styles.link}>
        Explore more NFT projects <OutgoingLink></OutgoingLink>
      </a>
    ),
    credit: (
      <a
        href="https://dfinitycommunity.com"
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

  return (
    <div className={styles.outerContainer}>
      <section className={styles.container}>
        <div className={styles.headingContainer}>
          <h2 className="heading-2">Ecosystem</h2>
          <Link href="https://dfinity.org/showcase" className="cta-link">
            Go to Ecosystem showcase
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1926_30447)">
                <path
                  d="M11.2429 8.34285L3.65709 8.34285L3.65709 6.34315H14.6568V17.3429L12.6571 17.3429L12.6571 9.75706L4.05024 18.364L2.63603 16.9498L11.2429 8.34285Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1926_30447">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        <div className={styles.categoriesContainer}>
          <div className={styles.categories}>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={clsx({
                  [styles.selected]: category === selectedCategory,
                })}
              >
                {category.title}
              </button>
            ))}
          </div>
          <div className={styles.example}>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ecosystem2;
