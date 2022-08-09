import { useEffect } from "react";

export function resetNavBarStyle() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ifm-color-primary",
      "#3B00B9"
    );
    document.documentElement.style.setProperty(
      "--ifm-navbar-x-padding",
      "Max(calc((100vw - 1320px) / 2), 50px)"
    );
  }, []);
}
