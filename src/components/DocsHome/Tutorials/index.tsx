import Link from "@docusaurus/Link";
import styles from "@site/src/components/DevelopersHome/SampleCode/index.module.css";
import transitions from "@site/static/transitions.json";
import { motion } from "framer-motion";
import React from "react";
import AnimateSpawn from "../../Common/AnimateSpawn";
import SmallCard from "../Cards/SmallCard";

function Index() {
  return (
    <AnimateSpawn variants={transitions.container} className="relative">
      <div className="blob blob-infinite blob-md blob-center-right"></div>
      <motion.div variants={transitions.item} className={styles.header}>
        <p>Tutorials</p>
        <Link
          className={styles.callToAction}
          to={"/docs/current/tutorials/deploy_sample_app"}
        >
          See all tutorials
        </Link>
      </motion.div>
      <div className={styles.cards}>
        <SmallCard
          href="/docs/current/tutorials/deploy_sample_app"
          title="Deploy your first dapp"
        >
          Install SDK, create a sample app, and deploy it to the production with
          three simple steps.
        </SmallCard>

        <SmallCard
          href="/docs/current/tutorials/create_your_first_app"
          title="Create your first app"
        >
          Create your the first app with Motoko programming language and build
          the app frontend with Vue.js
        </SmallCard>
      </div>
    </AnimateSpawn>
  );
}

export default Index;
