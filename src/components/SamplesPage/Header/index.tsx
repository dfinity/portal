import React from "react";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";

function Index() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Sample Code</p>
      <span className={styles.body}>
        Get inspired! The possibilities of what to build on the IC are infinite.
        All samples and further projects can be found in the
        <Link to={"/"}> examples repo</Link>.
      </span>
    </div>
  );
}

export default Index;
