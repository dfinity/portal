const marked = require("marked");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { isLinkExternal } = require("./utils/links");
const { createKatexParagraphRenderer } = require("./utils/marked-renderers");
const baseDir = path.resolve(__dirname, "..", "how-it-works");

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
  let html = linkRenderer.call(renderer, href, title, text);
  if (isLinkExternal(href)) {
    // this is an external link, add target="_blank"
    html = html.replace(
      /^<a /,
      `<a target="_blank" rel="noreferrer noopener" `
    );
  }
  if (href.startsWith("https://www.youtube.com/") && text.startsWith("<img ")) {
    // this is a youtube thumbnail, add class name
    html = html.replace(/^<a /, `<a class="markdown-youtube-thumbnail" `);
  }
  return html;
};

renderer.paragraph = createKatexParagraphRenderer(renderer.paragraph);

/** @type {import('@docusaurus/types').PluginModule} */
const howItWorksArticlesPlugin = async function () {
  return {
    name: "howitworks-articles",
    async loadContent() {
      const dirs = fs
        .readdirSync(baseDir, {
          withFileTypes: true,
        })
        .filter((d) => d.isDirectory());

      const subpages = [];

      for (const dir of dirs) {
        const subpageFiles = fs
          .readdirSync(path.join(baseDir, dir.name), {
            withFileTypes: true,
          })
          .filter((d) => d.isFile() && d.name.endsWith(".subpage.md"));

        subpages.push(
          ...subpageFiles.map((sp) => {
            const meta = matter(
              fs.readFileSync(path.join(baseDir, dir.name, sp.name), {
                encoding: "utf-8",
              })
            );
            return {
              title: meta.data.title,
              abstract: meta.data.abstract,
              shareImage: meta.data.shareImage,
              slug: meta.data.slug,
              content: marked.parse(meta.content, { renderer }),
              fileName: path.join("./how-it-works/", dir.name, sp.name),
            };
          })
        );
      }

      return subpages;
    },
    async contentLoaded({ content, actions }) {
      const { addRoute, createData } = actions;
      for (const article of content) {
        const module = await createData(
          `how-it-works/${article.slug}.json`,
          JSON.stringify(article)
        );
        addRoute({
          path: "/how-it-works/" + article.slug,
          component: "@site/src/components/HowItWorksPage/ArticlePage/",
          exact: true,
          modules: {
            article: module,
          },
        });
      }
    },
  };
};

module.exports = howItWorksArticlesPlugin;
