import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "@docusaurus/theme-common";
import clsx from "clsx";

export type SectionLink = {
  text: string;
  to: string;
};

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
const IntraPageNav: React.FC<{
  links: SectionLink[];
  label?: string;
  hasHome?: boolean;
}> = ({ links, label = "Scroll To Section", hasHome = true }) => {
  const [display, setDisplay] = useState(false);
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heightToHideFrom = 100;
  const windowSize = useWindowSize(); // Desktop sidebar visible on hydration: need SSR rendering
  const shouldDisplay = () => {
    const winScroll = window.scrollY;
    if (winScroll > heightToHideFrom) {
      setDisplay(true);
    } else if (winScroll < heightToHideFrom) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    if (windowSize === "ssr") {
      return;
    }

    setIsMobile(windowSize === "mobile");
    shouldDisplay();
    window.addEventListener("scroll", shouldDisplay);
    return () => window.removeEventListener("scroll", shouldDisplay);
  }, [windowSize]);

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
                {links.map(({ text, to }) => (
                  <Link
                    onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
                    key={to}
                    to={to}
                  >
                    <span>{text}</span>
                  </Link>
                ))}
                <div
                  className={styles.mobileMenuClose}
                  onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
                />
              </>
            ) : (
              <div
                onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
                className={styles.mobileMenuOpen}
              >
                {label}
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
                  {hasHome && <Link to={"/"} className={styles.dfinityLink} />}
                  {links.map(({ text, to }) => (
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
};

export default IntraPageNav;
