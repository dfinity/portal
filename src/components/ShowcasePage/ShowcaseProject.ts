export type ShowcaseProject = {
  description: string;
  github: string;
  logo: string;
  display: "Large" | "Normal";
  name: string;
  oneLiner: string;
  screenshots: string[];
  stats: string;
  tags: string[];
  video?: string;
  videoContentType?: string;
  website: string;
  usesInternetIdentity: boolean;
} & {
  desktopGridRow?: number;
  desktopGridColumn?: string;
  mobileGridRow?: number;
  mobileGridColumn?: string;
};

export const colorRegistry: Record<string, string> = {
  default: "rgb(233, 243, 252)",
};
