import React from "react";
import NotFound from "@theme-original/NotFound";
import { trackEvent } from "../utils/matomo";

export default function NotFoundWrapper(props) {
  trackEvent("404", window.location.pathname);
  return (
    <>
      <NotFound {...props} />
    </>
  );
}
