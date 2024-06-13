import courses from "@site/.docusaurus/airtable/default/airtable-courses.json";

export type CourseItem = {
  index: string;
  title: string;
  level: string | string[];
  body?: string;
  languages?: CourseLanguage[];
  contentLanguages?: ContentLanguage[];
  contentType?: CourseContentType[];
  link?: string;
  fullTags?: string[];
  tags?: string[];
  image?: string;
  category?: string;
};

export type CourseLanguage =
  | "motoko"
  | "rust"
  | "javascript"
  | "typescript"
  | "other";

export type ContentLanguage = "english" | "spanish" | "turkish";

export type CourseLevel = "beginner" | "intermediate" | "expert";

export type CourseContentType = "video" | "text";

export const courseItems: CourseItem[] = courses;
