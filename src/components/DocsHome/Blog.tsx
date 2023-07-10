import React, { FC, useCallback } from "react";
import blogPosts from "@site/.docusaurus/blog-posts/default/blog-posts.json";
import clsx from "clsx";
import { tagColors } from "@site/src/utils/blog";
import slugify from "slugify";
import Link from "@docusaurus/Link";
import LinkArrowRight from "../Common/Icons/LinkArrowRight";

const MAX_POSTS = Math.min(blogPosts.length, 5);

const Blog: FC = () => {
  const [postIndex, setPostIndex] = React.useState(0);

  const nextPost = useCallback(() => {
    setPostIndex((prev) => (prev + 1) % MAX_POSTS);
  }, [postIndex]);

  const prevPost = useCallback(() => {
    setPostIndex((prev) => (prev - 1 + MAX_POSTS) % MAX_POSTS);
  }, [postIndex]);

  const post = blogPosts[postIndex];

  return (
    <div className="rounded-lg bg-white/70 flex flex-col px-0 py-0 overflow-hidden md:flex-row md:items-stretch">
      <Link
        className="w-full h-64 sm:h-[420px] order-1 md:order-2 flex md:flex-1 md:h-auto"
        href={post.permalink}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover max-w-none"
          loading="lazy"
        />
      </Link>

      <div className="order-2 md:order-1  border border-t-0 md:border-t md:border-r-0 border-white border-solid flex-1">
        <div className="flex flex-col items-start mx-6 my-10 md:mx-10 min-h-[420px]">
          <h2 className="tw-heading-6 mb-10">Dev Blog</h2>
          <div className="tw-paragraph-sm text-black/60 mb-4">
            {post.formattedDate}
          </div>
          <Link
            className="text-black hover:no-underline hover:text-black"
            href={post.permalink}
          >
            <h3 className="tw-heading-5 mb-4 line-clamp-2">{post.title}</h3>
          </Link>
          <p className="tw-paragraph mb-4 text-black/60 line-clamp-5">
            {post.description}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${slugify(tag, { lower: true })}`}
                  className={clsx(
                    "tw-title-navigation-on-page py-[2px] px-2 rounded-md hover:no-underline hover:text-white/70",
                    tagColors[tag] || "bg-infinite text-white"
                  )}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <div className="flex-1"></div>

          <div className="mt-10 flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <button
                className="bg-transparent border-none font-circular p-0 flex cursor-pointer hover:text-infinite"
                onClick={prevPost}
              >
                <LinkArrowRight className="-scale-100" />
              </button>

              <span className="tw-title-navigation relative ">
                {postIndex + 1}/{MAX_POSTS}
              </span>

              <button
                className="bg-transparent border-none font-circular p-0 flex cursor-pointer hover:text-infinite"
                onClick={nextPost}
              >
                <LinkArrowRight />
              </button>
            </div>
            <Link className="link-primary link-with-icon" href="/blog">
              View all <LinkArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
