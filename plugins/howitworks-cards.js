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
renderer.heading = (text, level) => {
  // h1 needs to become h3, etc.
  level = Math.min(6, level + 2);
  return `<h${level}>${text}</h${level}>`;
};
renderer.paragraph = createKatexParagraphRenderer(renderer.paragraph);

/** @type {import('@docusaurus/types').PluginModule} */
const howItWorksCardsPlugin = async function () {
  return {
    name: "howitworks-cards",
    async loadContent() {
      const dirs = fs
        .readdirSync(baseDir, {
          withFileTypes: true,
        })
        .filter((d) => d.isDirectory());

      const groups = [];

      for (const dir of dirs) {
        const indexPath = path.join(baseDir, dir.name, "index.md");
        if (!fs.existsSync(indexPath)) {
          throw new Error(
            `Error: no index.md file for how it works group "${dir.name}"`
          );
        }
        const groupMeta = matter(
          fs.readFileSync(indexPath, { encoding: "utf-8" })
        );

        const cardFiles = fs
          .readdirSync(path.join(baseDir, dir.name), {
            withFileTypes: true,
          })
          .filter((d) => d.isFile() && d.name.endsWith(".card.md"));

        groups.push({
          title: groupMeta.data.title,
          description: groupMeta.content,
          isFeatured: groupMeta.data.is_featured,
          items: cardFiles.map((file) => {
            const meta = matter(
              fs.readFileSync(path.join(baseDir, dir.name, file.name), {
                encoding: "utf-8",
              })
            );
            return {
              title: meta.data.title,
              body: marked.parse(meta.content, { renderer }),
              abstract: meta.data.abstract,
              coverImage: meta.data.coverImage,
            };
          }),
        });
      }

      return groups;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("howitworks-cards.json", JSON.stringify(content));
    },
  };
};

module.exports = howItWorksCardsPlugin;
