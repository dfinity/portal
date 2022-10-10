import React from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import transitions from "@site/static/transitions.json";

function Index() {
  return (
    <div className={styles.container}>
      <motion.p variants={transitions.item} className={styles.title}>
        Sample Code
      </motion.p>
      <motion.span variants={transitions.item} className={styles.body}>
        Get inspired! The possibilities of what to build on the IC are infinite.
        Find more sample code projects in the
        <Link to={"https://github.com/dfinity/examples"}> examples repo</Link>.
      </motion.span>
    </div>
  );
}

export default Index;
