import React from "react";
import { AskAIWidget } from "@site/src/components/DocsHome/AskAIWidget";

export default function Root({ children }) {
  return (
    <>
      <AskAIWidget />
      {children}
    </>
  );
}
