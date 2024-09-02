import React, { useEffect, useState } from "react";
import NotFound from "@theme-original/NotFound";
import { trackEvent } from "../utils/matomo";
import CustomNotFoundPage from "../pages/notfound";

export default function NotFoundWrapper(props) {
  useEffect(() => {
    trackEvent("404", window.location.pathname);
  }, []);
  return (
    <>
      <CustomNotFoundPage />
    </>
  );
}
