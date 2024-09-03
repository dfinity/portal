import React, { useEffect, useState } from "react";
import { Link } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import ChainFusion from "../pages/chainfusion";
import CustomNotFoundPage from "../pages/notfound";

export default function NotFound() {
  const context = useDocusaurusContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (ExecutionEnvironment.canUseDOM) {
      const style = document.createElement("style");
      style.textContent = " ";
      document.head.appendChild(style);
      requestAnimationFrame(() => document.head.removeChild(style));
    }

    if (ExecutionEnvironment.canUseDOM) {
      console.log(
        "Loaded stylesheets:",
        Array.from(document.styleSheets)
          .map((sheet) => sheet.href)
          .filter(Boolean)
      );
    }
  }, []);

  if (!isClient) {
    return <div></div>;
  }

  return <CustomNotFoundPage />;
}
