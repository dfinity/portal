import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "@docusaurus/theme-common";

const SectionsLinks = [
  { text: "Dashboard", to: "#dashboard" },
  { text: "Internet Computer", to: "#internetComputer" },
  { text: "Features", to: "#features" },
  { text: "Showcase", to: "#showcase" },
  { text: "Testimonials", to: "#testimonials" },
  { text: "Governance", to: "#governance" },
  { text: "IC World", to: "#ICWorld" },
];

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
  return (
    <div className={styles.container}>
      {display && isMobile ? (
        <div className={styles.mobileContainer}>
          {displayMobileMenu ? (
            <>
              <div
                className={styles.mobileMenuClose}
                onClick={() => SetDisplayMobileMenu(!displayMobileMenu)}
              />
              {SectionsLinks.map(({ text, to }) => (
                <Link
                  onClick={() => SetDisplayMobileMenu(!displayMobileMenu)}
                  key={to}
                  to={to}
                >
                  <span>{text}</span>
                </Link>
              ))}
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
      ) : (
        <AnimatePresence>
          {display && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles.desktopContainer}>
                <div className={styles.grid}>
                  <div className={styles.dfinityIconNav}>
                    <Link to={"#home"} className={styles.dfinityLink} />
                  </div>
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
