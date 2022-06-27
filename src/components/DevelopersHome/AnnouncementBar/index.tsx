import React from "react";
import styles from "./index.module.css";
import RightArrow from "@site/static/img/svgIcons/rightArrowIcon.svg";
function Index({ text, link }) {
  return (
    <a className={styles.container} href={link} target={"_blank"}>
      <span className={styles.text}>{text}</span>
      <RightArrow className={styles.arrow} />
    </a>
  );
}

export default Index;
