import React, { useEffect, useState } from "react";
import NotFound from "@theme-original/NotFound";
import { trackEvent } from "../utils/matomo";
import CustomNotFoundPage from "../pages/notfound";

export default function NotFoundWrapper(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    trackEvent("404", window.location.pathname);

    // Simulate initialization process
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // adjust this timeout as needed

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <CustomNotFoundPage />
    </>
  );
}
