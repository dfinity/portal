const fs = require("fs");
const path = require("path");
const marked = require("marked");
const matter = require("gray-matter");
const logger = require("@docusaurus/logger");
const { isLinkExternal } = require("./utils/links");

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

function getItems(baseDir) {
  if (!fs.existsSync(baseDir)) {
    return [];
  }

  const files = fs
    .readdirSync(baseDir, {
      withFileTypes: true,
    })
    .filter((d) => d.isFile() && d.name.endsWith(".md"));

  return files.map((file) => {
    const meta = matter(
      fs.readFileSync(path.resolve(baseDir, file.name), { encoding: "utf-8" })
    );

    return {
      name: meta.data.title,
      description: marked.parse(meta.content),
      links: Object.keys(meta.data.links)
        .filter((title) => !!meta.data.links[title])
        .map((title) => ({
          text: title,
          url: meta.data.links[title],
        })),
      is_community: meta.data.is_community,
      in_beta: meta.data.in_beta,
      eta: meta.data.eta,
    };
  });
}

/** @type {import('@docusaurus/types').PluginModule} */
const whatIsIcpDataPlugin = async function () {
  return {
    name: "what-is-the-ic-data",
    async loadContent() {
      const domains = [];

      const dirs = fs
        .readdirSync(path.resolve(__dirname, "..", "what-is-the-ic"), {
          withFileTypes: true,
        })
        .filter((d) => d.isDirectory());

      for (const dir of dirs) {
        const indexPath = path.resolve(
          __dirname,
          "..",
          "what-is-the-ic",
          dir.name,
          "index.md"
        );

        if (!fs.existsSync(indexPath)) {
          logger.warn(
            `Warning: no index.md file for what-is-the-ic topic "${dir.name}"`
          );
          continue;
        }

        const meta = matter(fs.readFileSync(indexPath, { encoding: "utf-8" }));

        const baseDir = path.resolve(
          __dirname,
          "..",
          "what-is-the-ic",
          dir.name
        );

        domains.push({
          name: meta.data.title,
          description: marked.parse(meta.content, { renderer }),
          cardImageFit: meta.data.cardImageFit,
          image: {
            card: meta.data.card,
            overlay: meta.data.overlay,
          },
        });
      }

      return domains;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("what-is-the-ic.json", JSON.stringify(content, null, 2));
    },
  };
};

module.exports = whatIsIcpDataPlugin;

// RoadmapDataPlugin().then((x) => x.loadContent());
