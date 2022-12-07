/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  useThemeConfig,
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
  useWindowSize,
} from "@docusaurus/theme-common";
import {
  useAnnouncementBar,
  useScrollPosition,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import Logo from "@theme/Logo";
import IconArrow from "@theme/Icon/Arrow";
import { translate } from "@docusaurus/Translate";
import DocSidebarItems from "@theme/DocSidebarItems";
import styles from "./styles.module.css";
import NavbarItem from "@theme/NavbarItem";

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive]
  );
  return isActive && showAnnouncementBar;
}

function HideableSidebarButton({ onClick }) {
  return (
    <button
      type="button"
      title={translate({
        id: "theme.docs.sidebar.collapseButtonTitle",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar",
      })}
      aria-label={translate({
        id: "theme.docs.sidebar.collapseButtonAriaLabel",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar",
      })}
      className={clsx(
        "button button--secondary button--outline",
        styles.collapseSidebarButton
      )}
      onClick={onClick}
    >
      <IconArrow className={styles.collapseSidebarButtonIcon} />
    </button>
  );
}

function getPrimaryColor(section) {
  switch (section) {
    case "developer-docs":
      return "#29abe2";
    case "concepts":
      return "#522785";
    case "references":
      return "#ed1e79";
    case "tokenomics":
      return "#f15a24";
    case "samples":
      return "#fbb03b";
    default:
      return "#29ABE2";
  }
}

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig();

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
        [styles.sidebarHidden]: isHidden,
      })}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <nav
        className={clsx("menu thin-scrollbar", styles.menu, {
          [styles.menuWithAnnouncementBar]: showAnnouncementBar,
        })}
      >
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
          <DocSidebarItems items={sidebar} activePath={path} level={1} />
        </ul>
      </nav>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  );
} // eslint-disable-next-line react/function-component-definition

const DocSidebarMobileSecondaryMenu = ({ sidebar, path }) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={(item) => {
          // Mobile sidebar should only be closed if the category has a link
          if (item.type === "category" && item.href) {
            mobileSidebar.toggle();
          }

          if (item.type === "link") {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
    </ul>
  );
};

function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

const DocSidebarDesktopMemo = React.memo(DocSidebarDesktop);
const DocSidebarMobileMemo = React.memo(DocSidebarMobile);
export default function DocSidebar(props) {
  const windowSize = useWindowSize(); // Desktop sidebar visible on hydration: need SSR rendering

  const shouldRenderSidebarDesktop =
    windowSize === "desktop" || windowSize === "ssr"; // Mobile sidebar not visible on hydration: can avoid SSR rendering

  const shouldRenderSidebarMobile = windowSize === "mobile";
  return (
    <>
      {shouldRenderSidebarDesktop && <DocSidebarDesktopMemo {...props} />}
      {shouldRenderSidebarMobile && <DocSidebarMobileMemo {...props} />}
    </>
  );
}
