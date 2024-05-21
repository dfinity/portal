import courses from "../../../plugins/data/courses.json";

export type CourseItem = {
  index: string;
  title: string;
  level: string | string[];
  body?: string;
  languages?: CourseLanguage[];
  contentLanguage?: string;
  contentType?: CourseContentType[];
  link?: string;
  fullTags?: string[];
  tags?: string[];
};

export type CourseLanguage =
  | "motoko"
  | "rust"
  | "javascript"
  | "typescript"
  | "other";

export type CourseContentLanguage = "english" | "spanish" | "turkish";

export type CourseLevel = "beginner" | "intermediate" | "expert";

export type CourseContentType = "video" | "text";

export const courseItems: CourseItem[] = courses;
