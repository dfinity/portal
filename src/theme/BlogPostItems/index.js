import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import slugify from "slugify";
import { tagColors } from "@site/src/utils/blog";

function Tags({ tags }) {
  return (
    <div className="inline-flex flex-wrap gap-1 absolute bottom-5 right-0">
      {tags.map((tag) => (
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
  );
}

function InfoLine({ date, formattedDate, tags }) {
  return (
    <div className="relative mb-2 flex justify-between">
      <time
        dateTime={date}
        itemProp="datePublished"
        className="tw-title-navigation-on-page text-black/70"
      >
        {formattedDate}
      </time>
      {tags && <Tags tags={tags}></Tags>}
    </div>
  );
}

function CoverImage({ url = "/img/dfinity.png", permalink }) {
  return (
    <Link href={permalink} className="flex hover:no-underline w-full">
      {url ? (
        <img
          src={url}
          alt=""
          className="mb-2 rounded-lg aspect-video object-center object-cover"
        />
      ) : (
        <div className="mb-2 rounded-lg bg-black/20 aspect-video text-white tw-title-navigation-on-page flex justify-center items-center flex-1">
          Add an image
        </div>
      )}
    </Link>
  );
}

export default function BlogPostItems({ items, withFeatured = false }) {
  const featuredPost = items[0];
  const restPosts = withFeatured ? items.slice(1) : items;

  return (
    <div className="">
      {withFeatured && (
        <div className="pb-10 mb-10 border-0 border-solid border-b border-b-black/10">
          <div className="flex flex-col">
            <CoverImage
              url={featuredPost.content.frontMatter.image}
              permalink={featuredPost.content.metadata.permalink}
            ></CoverImage>
            <InfoLine
              date={featuredPost.content.metadata.date}
              formattedDate={featuredPost.content.metadata.formattedDate}
              tags={featuredPost.content.frontMatter.tags}
            ></InfoLine>
            <Link
              href={featuredPost.content.metadata.permalink}
              className="text-black hover:text-infinite hover:no-underline"
            >
              <h2 className="tw-heading-5 mb-4">
                {featuredPost.content.frontMatter.title}
              </h2>
            </Link>
            <p className="tw-paragraph text-black/60 mb-0">
              {featuredPost.content.frontMatter.description}
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
        {restPosts.map(({ content: BlogPostContent }) => (
          <div className="flex flex-col">
            <CoverImage
              url={BlogPostContent.frontMatter.image}
              permalink={BlogPostContent.metadata.permalink}
            ></CoverImage>
            <InfoLine
              date={BlogPostContent.metadata.date}
              formattedDate={BlogPostContent.metadata.formattedDate}
              tags={BlogPostContent.frontMatter.tags}
            ></InfoLine>
            <Link
              href={BlogPostContent.metadata.permalink}
              className="text-black hover:text-infinite hover:no-underline"
            >
              <h2 className="tw-heading-6 mb-0">
                {BlogPostContent.frontMatter.title ||
                  BlogPostContent.metadata.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
