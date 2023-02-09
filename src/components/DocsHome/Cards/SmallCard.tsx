import styles from "./SmallCard.module.css";
import RightArrowSVG from "@site/static/img/svgIcons/rightArrowIcon.svg";
import transitions from "@site/static/transitions.json";
import clsx from "clsx";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

const SmallCard: React.FC<{
  title: string;
  children: ReactNode;
  href: string;
}> = ({ title, children, href }) => {
  return (
    <motion.a variants={transitions.item} href={href} className={styles.card}>
      <div className={styles.cardContainer}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardBody}>{children}</p>
      </div>
      <RightArrowSVG className={styles.informationIcon} />
    </motion.a>
  );
};

export default SmallCard;
