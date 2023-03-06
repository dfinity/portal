import LinkArrowUpRight from "@site/src/components/Common/Icons/LinkArrowUpRight";
import React from "react";
import styles from "./styles.module.css";
export default function IconExternalLink({ width = 13.5, height = 13.5 }) {
  return (
    <LinkArrowUpRight
      width={width}
      height={height}
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.iconExternalLink}
    />
  );
}
