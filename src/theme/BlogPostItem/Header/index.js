import React from "react";
import BlogPostItemHeaderTitle from "@theme/BlogPostItem/Header/Title";
import BlogPostItemHeaderInfo from "@theme/BlogPostItem/Header/Info";
import BlogPostItemHeaderAuthors from "@theme/BlogPostItem/Header/Authors";

import { useBlogPost } from "@docusaurus/theme-common/internal";
import LinkArrowRight from "@site/src/components/Common/Icons/LinkArrowRight";
import Link from "@docusaurus/Link";

export default function BlogPostItemHeader() {
  const post = useBlogPost();

  return (
    <header>
      <Link
        className="tw-title-navigation inline-flex items-center gap-3 text-infinite hover:no-underline hover:text-black mt-10 md:mt-0"
        href="/blog/"
      >
        <LinkArrowRight className="-scale-x-100" />
        Back
      </Link>
      <BlogPostItemHeaderTitle />

      {post.metadata.authors.length > 0 && (
        <div className="tw-paragraph-sm mb-4">
          <time
            dateTime={post.metadata.date}
            itemProp="datePublished"
            className="tw-title-navigation-on-page"
          >
            {post.metadata.formattedDate}
          </time>{" "}
          by{" "}
          <span className="tw-title-navigation-on-page">
            {post.metadata.authors.map((a) => a.name).join(", ")}
          </span>
        </div>
      )}
    </header>
  );
}
