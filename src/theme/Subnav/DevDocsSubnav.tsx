import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import clsx from "clsx";
import DocSidebarNavbarItem from "@theme/NavbarItem/DocSidebarNavbarItem";
import DocNavbarItem from "@theme/NavbarItem/DocNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";

export function DevDocsSubnav() {
  const items = useThemeConfig().navbar.items.filter((item) => item.isSubnav);

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
    const roundingError = 4;

    if (scrollY < navbarHeight + roundingError) {
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
        roundingError
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

  return (
    <nav className={className}>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
        {items.map((item: any) => {
          switch (item.type) {
            case "docSidebar":
              return <DocSidebarNavbarItem {...item} />;
            case "doc":
              return <DocNavbarItem {...item} />;
            case "dropdown":
              return <DropdownNavbarItem {...item} />;
            default:
              return null;
          }
        })}
      </ul>
    </nav>
  );
}
