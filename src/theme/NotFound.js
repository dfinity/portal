import React, { useEffect } from "react";
import NotFound from "@theme-original/NotFound";
import { trackEvent } from "../utils/matomo";

export default function NotFoundWrapper(props) {
  useEffect(() => {
    trackEvent("404", window.location.pathname);
  }, []);
  return (
    <>
      <NotFound {...props} />
    </>
  );
}
