export type ShowcaseProject = {
  id: string;
  description: string;
  logo: string;
  display: "Large" | "Normal";
  name: string;
  oneLiner: string;
  screenshots: string[];
  stats: string;
  tags: string[];
  video?: string;
  videoContentType?: string;
  usesInternetIdentity: boolean;
  website: string;
  github?: string;
  twitter?: string;
  youtube?: string;
  submittableId?: string;
};
