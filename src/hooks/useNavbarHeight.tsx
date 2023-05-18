import useIsBrowser from "@docusaurus/useIsBrowser";

export function useNavbarHeight() {
  const isBrowser = useIsBrowser();

  return isBrowser
    ? parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--ifm-navbar-height")
          .replace("px", "")
      )
    : 88;
}
