import { useLocation } from "@docusaurus/router";

const DOCS_ROOT = "/docs/";
const DOCS_HOME = DOCS_ROOT + "current/home";
export function useIsDocs() {
  const location = useLocation();
  return {
    isDocsPage: location.pathname.startsWith(DOCS_ROOT),
    currentPath: location.pathname,
    docsRoot: DOCS_ROOT,
    docsHome: DOCS_HOME,
  };
}
