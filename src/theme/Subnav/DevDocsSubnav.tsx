import React from "react";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import clsx from "clsx";
import DocSidebarNavbarItem from "@theme/NavbarItem/DocSidebarNavbarItem";
import DocNavbarItem from "@theme/NavbarItem/DocNavbarItem";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import { DevDocsBreadcrumbs } from "@site/src/components/Common/DevDocsBreadcrumbs";
import { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

const BASE_CLASS_NAME = "subnav";

export function DevDocsSubnav() {
  const items = useThemeConfig().subnav.items;

  return (
    <nav className={BASE_CLASS_NAME}>
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
              return (
                <DefaultNavbarItem
                  key={index}
                  href={item.href}
                  {...item}
                ></DefaultNavbarItem>
              );
          }
        })}
      </ul>

      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "breadcrumbs")}>
        <DevDocsBreadcrumbs />
      </ul>
    </nav>
  );
}
