import React, { useEffect } from "react";
import NotFound from "@theme-original/NotFound";
import { trackEvent } from "../utils/matomo";
import NotFoundPage from "@site/docs/references/samples/motoko/ic-pos/src/icpos_frontend/pages/not-found/NotFoundPage";
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
