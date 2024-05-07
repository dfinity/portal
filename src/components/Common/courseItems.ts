import courses from "../../../plugins/data/courses.json";

export type CourseItem = {
  index: string;
  title: string;
  level: CourseLevel[];
  body?: string;
  languages?: CourseLanguage[];
  contentType?: CourseContentType[];
  link?: string;
  tags?: string[];
};

export type CourseLanguage =
  | "motoko"
  | "rust"
  | "javascript"
  | "typescript"
  | "other";

export type CourseLevel = "beginner" | "intermediate" | "expert";

export type CourseContentType = "video" | "text";

export const courseItems: CourseItem[] = courses;
