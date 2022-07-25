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
