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

declare module "@site/.docusaurus/conversations/default/conversations.json" {
  import { LiveSession } from "@site/src/components/LiveSessionsPage/LiveSession";
  const conversations: LiveSession[];
  export default conversations;
}

declare module "@site/.docusaurus/howitworks-cards/default/howitworks-cards.json" {
  import { HowItWorksPageData } from "@site/src/components/HowItWorksPage/HowItWorksData";
  const data: HowItWorksPageData;
  export default data;
}

declare module "@site/.docusaurus/roadmap-data/default/roadmap-data.json" {
  import { RoadmapDomain } from "@site/src/components/RoadmapPage/RoadmapTypes";
  const data: RoadmapDomain[];
  export default data;
}

declare module "@site/.docusaurus/what-is-the-ic-data/default/what-is-the-ic.json" {
  import { WhatIsIcpTopic } from "./src/components/HowItWorksPage/WhatIsIcpData";
  const data: WhatIsIcpTopic[];
  export default data;
}

declare module "@site/.docusaurus/home-showcase/default/home-showcase.json" {
  import { ShowcaseProject } from "./src/components/ShowcasePage/ShowcaseProject";
  const data: ShowcaseProject[];
  export default data;
}

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
