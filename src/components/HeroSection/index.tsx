import React from "react";
import styles from "./index.module.css";

import Link from "@docusaurus/Link";

function Index() {
  return (
    <div className={styles.section}>
      <a id="home" />
      <div className={styles.container}>
        <p className={styles.Title}>Blockchain's future</p>
        <p className={styles.Text}>
          Internet Computer is 100,000x more efficient and serves web
        </p>
        <div className={styles.actionContainer}>
          <Link
            className={styles.actionButton}
            to="/docs/current/developer-docs/quickstart/hello10mins"
          >
            BUILD REAL WEB3
          </Link>
          <Link
            className={styles.callToAction}
            to={"https://dfinity.org/showcase/"}
          >
            Explore the Internet Computer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
