import React, { useEffect, useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import CustomNotFoundPage from "../pages/notfound";

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    trackEvent("404", window.location.pathname);

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
