import { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";

function setQueryParam(name, value, search) {
  const params = new URLSearchParams(search);
  if (typeof value === "undefined") {
    params.delete(name);
  } else {
    params.set(name, value);
  }
  const paramsString = params.toString();
  // react router history.replace will reset the scroll position to the top
  window.history.replaceState("", "", "?" + paramsString);
}

export function useQueryParam(name) {
  const [value, setValue] = useState(undefined);
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsInitialized(true);
    if (typeof location.search !== "string") return;
    const params = new URLSearchParams(location.search);
    if (params.has(name)) setValue(params.get(name));
    else setValue(undefined);
  }, [location.search, setIsInitialized]);

  return [
    value,
    (value) => {
      setQueryParam(name, value, location.search);
      setValue(value);
    },
    isInitialized,
  ];
}
