import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import clsx from "clsx";

export function DevDocsSubnav() {
  const items = useThemeConfig().navbar.items;
  // TODO - add the subnav menu items
  // console.log(items);

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">(null);

  const scrollHandler = useCallback(() => {
    const offset = document.body.getBoundingClientRect().top;
    setScrollY(-offset);
    setScrollDirection(lastScrollTop > -offset ? "down" : "up");
    setLastScrollTop(-offset);
  }, [lastScrollTop]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  const navbarHeight = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--ifm-navbar-height")
      .replace("px", "")
  );

  const className = useMemo(() => {
    if (scrollY < navbarHeight) {
      // the docusaurus navbar stays visible until the
      // user scrolls past the height of the navbar - keep the subnav
      // visible as well
      return clsx(styles.subnav, styles.navbarOffset, styles.transitionInitial);
    } else if (
      -scrollY <
      document.body.clientHeight -
        document.body.scrollTop -
        document.body.scrollHeight +
        navbarHeight +
        4 // error buffer
    ) {
      // the docusaurus navbar stays hidden when the user hits the bottom of
      // the page until the user scrolls back up past the height of
      // the navbar - keep the subnav fixed to the top
      // until the navbar is visible
      return clsx(styles.subnav, styles.navbarZero, styles.transitionMatch);
    } else if (scrollDirection === "down") {
      return clsx(styles.subnav, styles.navbarOffset, styles.transitionMatch);
    } else {
      return clsx(styles.subnav, styles.navbarZero, styles.transitionFaster);
    }
  }, [scrollY, scrollDirection]);

  return <div className={className}>I am a subnav</div>;
}
