import React from "react";
import DocSidebarNavbarItemOriginal from "@theme-original/NavbarItem/DocSidebarNavbarItem";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

export default function DocSidebarNavbarItem(props) {
  const mobileSidebar = useNavbarMobileSidebar();

  const handleClick = (e) => {
    if (window.innerWidth <= 996) {
      mobileSidebar.toggle();
    }

    // Call the original onClick if it exists
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return <DocSidebarNavbarItemOriginal {...props} onClick={handleClick} />;
}
