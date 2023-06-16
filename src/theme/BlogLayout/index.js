import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import { DocsSidebarProvider } from "@docusaurus/theme-common/internal";
import DocPageLayout from "@theme/DocPage/Layout";
import clsx from "clsx";
import React, { createContext } from "react";

export const BlogContext = createContext({ tags: [], setTags: () => {} });

export default function DocPage(props) {
  const children = props.children;

  const sidebarItems = props.sidebar.items.map(({ title, permalink }) => ({
    label: title,
    href: permalink,
  }));

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
