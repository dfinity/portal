import Link from "@docusaurus/Link";
import styles from "@site/src/components/DevelopersHome/SampleCode/index.module.css";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import SmallCard from "../Cards/SmallCard";

function Index() {
  return (
    <AnimateSpawn variants={transitions.container} className="mt-12 md:mt-20">
      <motion.div variants={transitions.item} className={styles.header}>
        <p>Developer Guides</p>
        <Link
          className={styles.callToAction}
          to={"/docs/current/developer-docs/setup/"}
        >
          See all developer guides
        </Link>
      </motion.div>
      <div className={styles.cards}>
        <SmallCard
          href="/docs/current/tutorials/deploy_sample_app"
          title="Set up development environment"
        >
          Install SDK, understand the project structure, acquire cycles, and
          deploy to production.
        </SmallCard>
        <SmallCard
          href="/docs/current/developer-docs/build/backend/"
          title="Build dapp backend"
        >
          Learn how to create Internet Computer Canisters using Motoko and Rust
          programming languages
        </SmallCard>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
