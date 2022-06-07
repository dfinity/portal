import React from "react";
import styles from "@site/src/components/Parallax/index.module.css";
import clsx from "clsx";

function Parallax() {
  return (
    <div className={styles.parallax}>
      <div className={styles.parallaxGroup}>
        <div className={clsx(styles.parallaxLayer, styles.parallaxLayerBack)}>
          ...
        </div>
        <div className={clsx(styles.parallaxLayer, styles.parallaxLayerBase)}>
          ...
        </div>
      </div>
    </div>
  );
}

export default Parallax;
