const marked = require("marked");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const baseDir = path.resolve(__dirname, "..", "how-it-works");

const renderer = {
  heading(text, level) {
    // h1 needs to become h3, etc.
    level = Math.min(6, level + 2);

    return `<h${level}>${text}</h${level}>`;
  },
};
marked.use({ renderer });

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
              body: marked.parse(meta.content),
              abstract: meta.data.abstract,
              coverImage: meta.data.coverImage,
            };
          }),
        });
      }

      return groups;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
      // console.log(JSON.stringify(content, null, 2));
      // process.exit();
      // content.articles.map((article) => {
      //   addRoute({
      //     path: "/how-it-works/" + article.slug,
      //     component: "@site/src/components/HowItWorksPage/ArticlePage/",
      //     exact: true,
      //   });
      // });
    },
  };
};

module.exports = howItWorksCardsPlugin;
