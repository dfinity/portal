import React from "react";
import clsx from "clsx";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
  PageMetadata,
} from "@docusaurus/theme-common";
import {
  docVersionSearchTag,
  DocsSidebarProvider,
} from "@docusaurus/theme-common/internal";
import DocPageLayout from "@theme/DocPage/Layout";
import SearchMetadata from "@theme/SearchMetadata";

export default function DocPage({ children }) {
  const sidebarItems = [
    {
      label: "All",
      href: "?",
    },
    {
      label: "New Features",
      href: "?tag=new-features",
    },
    {
      label: "Devs",
      href: "?tag=devs",
    },
    {
      label: "Security",
      href: "?tag=security",
    },
  ];

  console.log(children);
  return (
    <>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.docsPages,
          ThemeClassNames.page.docsDocPage
        )}
      >
        <DocsSidebarProvider name={"blog-sidebar"} items={sidebarItems}>
          <DocPageLayout>
            <div className="row">
              <div className="col">
                <div className="blog-post-content-layout">
                  <div
                    className={clsx(
                      ThemeClassNames.docs.docMarkdown,
                      "markdown"
                    )}
                  >
                    {children}
                  </div>
                </div>
              </div>
              <div className="col col--3"></div>
            </div>
          </DocPageLayout>
        </DocsSidebarProvider>
      </HtmlClassNameProvider>
    </>
  );
}
