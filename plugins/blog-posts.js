const fs = require("fs");
const path = require("path");
const logger = require("@docusaurus/logger");
const {
  parseBlogFileName,
} = require("@docusaurus/plugin-content-blog/src/blogUtils");
const {
  getFileCommitDate,
  normalizeUrl,
  parseMarkdownFile,
  DEFAULT_PARSE_FRONT_MATTER
} = require("@docusaurus/utils");
const glob = require("glob");

async function postDate(frontMatter, pathName, parsedPathNameDate) {
  if (frontMatter.date) {
    if (frontMatter.date instanceof Date) {
      return frontMatter.date;
    }
    if (typeof frontMatter.date === "string") {
      return new Date(frontMatter.date);
    }

    logger.error(
      `Blog post ${pathName} date is invalid. Please use "YYYY-MM-DD" format.`
    );
  }

  if (parsedPathNameDate) {
    return parsedPathNameDate;
  }

  // fallback to git commit date
  try {
    return (await getFileCommitDate(pathName, { age: "oldest" })).date;
  } catch (err) {
    return fs.statSync(pathName).birthtime;
  }
}

function formatBlogPostDate(locale, date, calendar) {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
      calendar,
    }).format(date);
  } catch (err) {
    logger.error`Can't format blog post date "${String(date)}"`;
    throw err;
  }
}

/** @type {import('@docusaurus/types').PluginModule} */
const BlogPostsPlugin = async function (context) {
  const blogConfig = context.siteConfig.presets?.find(
    ([name, _]) => name == "classic"
  )?.[1].blog;

  const { i18n } = context;
  const { baseUrl } = context.siteConfig;

  const { path: blogPath, routeBasePath = "blog" } = blogConfig;

  const blogDir = path.join(__dirname, "..", blogPath);

  return {
    name: "blog-posts",
    getPathsToWatch() {
      return [path.join(blogDir, "**/*.{md,mdx}")];
    },
    async loadContent() {
      const posts = [];

      for (const postAbsolute of glob.globSync(
        path.join(blogDir, "**/*.{md,mdx}"),
        {
          cwd: __dirname,
        }
      )) {
        const relativePath = path.relative(blogDir, postAbsolute);

        const markdownString = fs.readFileSync(postAbsolute, 'utf-8');
        const { frontMatter, contentTitle } = await parseMarkdownFile({filePath: postAbsolute, fileContent: markdownString, parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER, removeContentTitle: true});

        let parsedFileName = parseBlogFileName(relativePath);
        const date = await postDate(frontMatter, postAbsolute, parsedFileName.date);

        const slug = frontMatter.slug ?? parsedFileName.slug;

        const permalink = normalizeUrl([baseUrl, routeBasePath, slug]);

        const title =
          frontMatter.title ?? contentTitle ?? parsedFileName.text;

        const formattedDate = formatBlogPostDate(
          i18n.currentLocale,
          date,
          i18n.localeConfigs[i18n.currentLocale].calendar
        );

        posts.push({
          date,
          formattedDate,
          tags: frontMatter.tags ?? [],
          permalink,
          title,
          description: frontMatter.description,
          image: frontMatter.image,
        });
      }

      posts.sort((a, b) => b.date.getTime() - a.date.getTime());

      return posts;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("blog-posts.json", JSON.stringify(content, null, 2));
    },
  };
};

module.exports = BlogPostsPlugin;
