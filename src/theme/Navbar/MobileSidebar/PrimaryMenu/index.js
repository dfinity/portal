import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import { useLocation } from "@docusaurus/router";
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();

  // TODO how can the order be defined for mobile?
  // Should we allow providing a different list of items?
  let items = useNavbarItems();
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs/");

  if (isDocsPage) {
    items = items.filter(
      (item) => item.position !== "right" && item.type !== "search"
    );
  } else {
    items = items.filter(
      (item) => item.position !== "left" && item.type !== "search"
    );
  }

  /*
    Menu items are transformed in docusaurus.config.js to be displayed in a 2 column grid.
    Eg. the menu items
     | A | E |
     | B | F |
     | C | G |
     | D | H |

    will are transformed to [A,E,B,F,C,G,D,H].

    This is incorrect for mobile, where the menu items should be displayed in a single column.

    This part transforms the menu items back to the correct order for mobile.
  */
  items = items.map((menu) => {
    if (menu.className?.includes("dropdown--columns-2")) {
      const mobileOrderedItems = [];
      for (let i = 0; i < menu.items.length; i += 2) {
        mobileOrderedItems.push(menu.items[i]);
      }
      for (let i = 1; i < menu.items.length; i += 2) {
        mobileOrderedItems.push(menu.items[i]);
      }
      return {
        ...menu,
        items: mobileOrderedItems,
      };
    } else {
      return menu;
    }
  });

  return (
    <ul className="menu__list">
      {items.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
    </ul>
  );
}
