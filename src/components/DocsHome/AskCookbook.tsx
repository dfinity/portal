import React from "react";
import BaseAskCookbook from "@cookbookdev/docsbot/react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const COOKBOOK_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmVhZjZhYjE3MDkyYjQzMGUyODI4MmQiLCJpYXQiOjE3MjY2NzQ2MDMsImV4cCI6MjA0MjI1MDYwM30.rcc23Yjc5d3WzfWj3z14d2GDORvlfXqitTHgjs1ItJo";

export function AskCookbook() {
  return (
    <BrowserOnly>
      {() => <BaseAskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />}
    </BrowserOnly>
  );
}
