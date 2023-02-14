import { ShowcaseProject } from "../components/ShowcasePage/ShowcaseProject";
import _showcaseProjects from "@site/showcase.json";

const showcaseProjects = _showcaseProjects as ShowcaseProject[];

/*
 * This is a custom hook that returns the showcase projects.
 * If the projectsIds parameter is null, it returns all the projects.
 */
export function useShowcaseProjects(
  projectsIds: string[] | null
): ShowcaseProject[] {
  if (!projectsIds) {
    return showcaseProjects;
  }

  return showcaseProjects.filter((project) => projectsIds.includes(project.id));
}
