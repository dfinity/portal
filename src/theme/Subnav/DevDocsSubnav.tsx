import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import clsx from "clsx";
import DocSidebarNavbarItem from "@theme/NavbarItem/DocSidebarNavbarItem";
import DocNavbarItem from "@theme/NavbarItem/DocNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { DevDocsBreadcrumbs } from "@site/src/components/Common/DevDocsBreadcrumbs";
import { useNavbarHeight } from "@site/src/hooks/useNavbarHeight";
import { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

const BASE_CLASS_NAME = "subnav";

export function DevDocsSubnav() {
  const items = useThemeConfig().subnav.items;

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">(null);

  const isBrowser = useIsBrowser();

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

  const navbarHeight = useNavbarHeight();

  const className = useMemo(() => {
    if (!isBrowser) {
      return clsx(
        BASE_CLASS_NAME,
        styles.navbarOffset,
        styles.transitionInitial
      );
    }

    const roundingError = 4;

    if (scrollY < navbarHeight) {
      // the docusaurus navbar stays visible until the
      // user scrolls past the height of the navbar - keep the subnav
      // visible as well
      return clsx(
        BASE_CLASS_NAME,
        styles.navbarOffset,
        styles.transitionInitial
      );
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
      return clsx(BASE_CLASS_NAME, styles.navbarZero, styles.transitionMatch);
    } else if (scrollDirection === "down") {
      return clsx(BASE_CLASS_NAME, styles.navbarOffset, styles.transitionMatch);
    } else {
      return clsx(BASE_CLASS_NAME, styles.navbarZero, styles.transitionFaster);
    }
  }, [scrollY, scrollDirection]);

  return (
    <nav className={className}>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
        {items.map((item, index) => {
          switch (item.type) {
            case "docSidebar":
              return (
                <DocSidebarNavbarItem
                  key={index}
                  sidebarId={item.sidebarId}
                  {...item}
                />
              );
            case "doc":
              return <DocNavbarItem key={index} docId={item.docId} {...item} />;
            case "dropdown":
              return (
                <DropdownNavbarItem
                  key={index}
                  {...item}
                  items={item.items as LinkLikeNavbarItemProps[]}
                />
              );
            default:
              return null;
          }
        })}
      </ul>

      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "breadcrumbs")}>
        <DevDocsBreadcrumbs />
      </ul>
    </nav>
  );
}
