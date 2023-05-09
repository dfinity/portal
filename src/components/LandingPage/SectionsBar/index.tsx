import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "@docusaurus/theme-common";
import clsx from "clsx";

const SectionsLinks = [
  { text: "Stats", to: "#stats" },
  { text: "Community", to: "#community" },
  { text: "Dapps", to: "#dapps" },
  { text: "The Vision", to: "#vision" },
  { text: "Technology", to: "#technology" },
  { text: "Sustainable", to: "#sustainable" },
  { text: "Start Building", to: "#startBuilding" },
  { text: "Foundation", to: "#foundation" },
];
const container = {
  hidden: {
    opacity: 0,
    y: 100,
    transition: { duration: 1, opacity: { duration: 0.5 } },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, y: { duration: 0.3 } },
  },
};
export default function SectionsBar() {
  const [display, SetDisplay] = useState(false);
  const [displayMobileMenu, SetDisplayMobileMenu] = useState(false);
  const [isMobile, SetIsMobile] = useState(false);
  const heightToHideFrom = 100;
  const windowSize = useWindowSize(); // Desktop sidebar visible on hydration: need SSR rendering
  const shouldDisplay = () => {
    const winScroll = window.scrollY;
    if (winScroll > heightToHideFrom) {
      SetDisplay(true);
    } else if (winScroll < heightToHideFrom) {
      SetDisplay(false);
    }
  };

  useEffect(() => {
    SetIsMobile(windowSize === "mobile");
  }, [windowSize]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      shouldDisplay();
      window.addEventListener("scroll", shouldDisplay);
      return () => window.removeEventListener("scroll", shouldDisplay);
    }
  }, []);

  const scrollToTop: MouseEventHandler = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    location.hash = "";
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      {display && isMobile ? (
        <div className={styles.desktopContainer}>
          <div
            className={clsx(
              styles.mobileMenu,
              displayMobileMenu ? styles.borderRadius12 : styles.borderRadius50
            )}
          >
            {displayMobileMenu ? (
              <>
                {SectionsLinks.map(({ text, to }) => (
                  <Link
                    onClick={() => SetDisplayMobileMenu(!displayMobileMenu)}
                    key={to}
                    to={to}
                  >
                    <span>{text}</span>
                  </Link>
                ))}
                <div
                  className={styles.mobileMenuClose}
                  onClick={() => SetDisplayMobileMenu(!displayMobileMenu)}
                />
              </>
            ) : (
              <div
                onClick={() => SetDisplayMobileMenu(!displayMobileMenu)}
                className={styles.mobileMenuOpen}
              >
                Scroll To Section
              </div>
            )}
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {display && (
            <motion.div
              key="modal"
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <div className={styles.desktopContainer}>
                <div className={styles.grid}>
                  <Link
                    to={"#home"}
                    className={styles.dfinityLink}
                    onClick={scrollToTop}
                  />
                  {SectionsLinks.map(({ text, to }) => (
                    <Link key={to} to={to}>
                      <span>{text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
