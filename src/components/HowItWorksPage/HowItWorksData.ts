export type HowItWorksData = HowItWorksArticle[];

export type HowItWorksArticle = {
  title: string;
  abstract?: string;
  shareImage: string;
  slug: string;
  content: string;
  fileName: string;
};

export type HowItWorksCard = {
  title: string;
  body: string;
  coverImage?: string;
  abstract?: string;
};

export type HowItWorksCardGroup = {
  title: string;
  description?: string;
  isFeatured?: boolean;
  items: HowItWorksCard[];
};

export type HowItWorksPageData = HowItWorksCardGroup[];
