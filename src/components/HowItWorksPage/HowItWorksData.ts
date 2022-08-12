export type HowItWorksData = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroBody: string;
  otherSessionsTitle: string;
  featured: HowItWorksArticle;
  articles: HowItWorksArticle[];
};
export type HowItWorksArticle = {
  title: string;
  description: string;
  youtubeVideo: string;
  listOfLinks: string;
  coverImage: string;
  slug: string;
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
