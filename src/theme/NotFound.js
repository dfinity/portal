import React, { useEffect, useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import CustomNotFoundPage from "../pages/notfound";
import { trackEvent } from "../utils/matomo";

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    trackEvent("404", window.location.pathname);
    setIsClient(true);

    if (ExecutionEnvironment.canUseDOM) {
      // style tags
      const style = document.createElement("style");
      style.textContent = `
        .subnav {
          display: none !important;
        }
        .tw-title-navigation {
          color: #3b00b9 !important;
        }
        .navbar__search-button {
          color: #3b00b9 !important;
          background-color: #f8f9fa !important;
        }
      `;
      document.head.appendChild(style);

      // Cleanup function
      return () => {
        // Reset subnav
        const subnav = document.querySelector(".subnav");
        if (subnav) {
          subnav.style.display = "";
        }

        // Reset nav
        const titleNav = document.querySelector(".tw-title-navigation");
        if (titleNav) {
          titleNav.style.color = "";
        }

        // Reset search
        const searchButton = document.querySelector(".navbar__search-button");
        if (searchButton) {
          searchButton.style.color = "";
          searchButton.style.backgroundColor = "";
        }

        // Remove the style tag
        if (style.parentNode) {
          document.head.removeChild(style);
        }
      };
    }
  }, []);

  if (!isClient) {
    return <div></div>;
  }

  return <CustomNotFoundPage />;
}
