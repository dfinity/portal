import React, { useCallback, useMemo } from "react";
import Link from "@docusaurus/Link";
import RightArrowIcon from "@site/static/img/svgIcons/rightArrowIcon.svg";
import { useLocation } from "@docusaurus/router";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";

export function DevDocsBreadcrumbs() {
  const location = useLocation();
  const { withBaseUrl } = useBaseUrlUtils();

  const breadcrumbs = useMemo(() => {
    const parts = location.pathname
      .split("/")
      .filter((item) => item !== "docs" && item !== "current")
      .filter(Boolean)
      .map((part) => {
        return {
          href: withBaseUrl(`docs/current/${part}`),
          label: part.replace(/\W|\s+/g, " "),
        };
      });
    // only show the first and last breadcrumb for brevity
    if (parts.length > 1) {
      return [parts[0], parts[parts.length - 1]];
    } else {
      return [parts[0]];
    }
  }, [location]);

  /**
   * The breadcrumbs behavior is as follows:
   * 1. the breadcrumbs are only shown on mobile or tablet devices
   * 2. clicking on any breadcrumb item results in the mobile nav menu
   * eppearing
   *
   * Docusuaurus does not seem to provide an API for the navbar through
   * context or a hook. To trigger the menu to open, we must synthesize a
   * click event on the `navbar__toggle` element by hijacking the click
   * event against the breadcrum item and repurposing it for the navbar toggle
   * element.
   */
  const toggleMenu = useCallback((event: React.MouseEvent) => {
    document
      .getElementsByClassName("navbar__toggle")
      .item(0)
      ?.dispatchEvent(
        new MouseEvent(event.nativeEvent.type, event.nativeEvent)
      );
  }, []);

  return (
    <div className="flex flex-row gap-2 items-center tw-title-navigation-on-page whitespace-nowrap max-w-full">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.href}>
          <Link
            className={`${index < breadcrumbs.length - 1 ? "text-black" : ""}`}
            onClick={toggleMenu}
          >
            {item.label}
          </Link>
          {index < breadcrumbs.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
      <RightArrowIcon className="w-3 h-3 text-black opacity-50 mt-0.5" />
    </div>
  );
}
