import React from "react";
import { useColorMode } from "@docusaurus/theme-common";

export default function DocsThemeToggle() {
  const { colorMode, setColorMode } = useColorMode();
  const isDocs = document.documentElement.classList.contains("docs-doc-page");

  if (!isDocs) return null;

  return (
    <button
      onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
      className="docs-theme-toggle"
      aria-label="Toggle dark mode"
    >
      {colorMode === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
