import clsx from "clsx";
import React from "react";
import Lottie from "react-lottie-player";
import styles from "./index.module.css";

import animationData from "../../../animations/host-on-chain.json";

const HostWeb = () => {
  return (
    <section className={styles.outerWrapper}>
      <div className={styles.container}>
        <h2 className={clsx("heading-2", styles.heading)}>
          What makes the Internet Computer Unique?
        </h2>
        <div className={styles.content}>
          <div className={styles.copy}>
            <h3 className="heading-3">Smart contracts serve webpages</h3>
            <p className="paragraph-large">
              You can open canister smart contracts directly in your browser
              just like regular websites.
            </p>
          </div>
          <div className={styles.illustration}>
            <Lottie
              loop
              animationData={animationData}
              play
              className={styles.animation}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostWeb;
