import { useLocation } from "@docusaurus/router";

export function useIsDocs() {
  const location = useLocation();
  return location.pathname.startsWith("/docs/");
}
