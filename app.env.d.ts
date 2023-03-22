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
