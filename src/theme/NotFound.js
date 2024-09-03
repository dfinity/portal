import React, { useEffect, useState } from "react";
import { Link } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import ChainFusion from "../pages/chainfusion";
import CustomNotFoundPage from "../pages/notfound";

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (ExecutionEnvironment.canUseDOM) {
      const style = document.createElement("style");
      style.textContent = " ";
      document.head.appendChild(style);
      requestAnimationFrame(() => document.head.removeChild(style));
    }
  }, []);

  if (!isClient) {
    return <div></div>;
  }

  return <CustomNotFoundPage />;
}
