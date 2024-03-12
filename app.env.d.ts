import {
  Navbar,
  NavbarItem,
} from "@docusaurus/theme-common/src/utils/useThemeConfig";
import { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

declare module "*.png";
declare module "*.webp";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare module "@docusaurus/theme-common" {
  interface ThemeConfig {
    subnav: Omit<Navbar, "items" | "type"> & {
      items: Array<
        NavbarItem & {
          sidebarId?: string;
          docId?: string;
          readonly type?: "docSidebar" | "doc" | "dropdown";
          items?: LinkLikeNavbarItemProps[];
          href?: string;
        }
      >;
    };
  }
}
