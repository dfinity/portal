import { useCallback } from "react";
import DocSidebarNavbarItemOriginal from "@theme-original/NavbarItem/DocSidebarNavbarItem";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

export default function DocSidebarNavbarItem(props) {
  const mobileSidebar = useNavbarMobileSidebar();
  
  const handleClick = useCallback((e) => {
    if (window.innerWidth <= 996) {
      setTimeout(() => {
        mobileSidebar.toggle();
      }, 10);
    }

    // Call the original onClick if it exists
    if (props.onClick) {
      props.onClick(e);
    }
  }, [mobileSidebar]);

  return <DocSidebarNavbarItemOriginal {...props} onClick={handleClick} />;
}