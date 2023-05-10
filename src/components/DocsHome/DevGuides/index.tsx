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
          href="/docs/current/developer-docs/setup/install"
          title="Set up your development environment"
        >
          Install the IC SDK, understand the project structure, and
          deploy to production.
        </SmallCard>
        <SmallCard
          href="/docs/current/developer-docs/backend/choosing-language"
          title="Build a Smart Contract backend"
        >
          Learn how to create Canister Smart Contracts with your language of choice
        </SmallCard>
        <SmallCard
          href="/docs/current/developer-docs/gas-cost"
          title="Learn how gas works"
        >
          Store 1 GB for $5 per year. Pay 1 cent for 10k transactions.
        </SmallCard>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
