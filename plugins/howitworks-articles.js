const marked = require("marked");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

marked.use({ renderer: null });

const baseDir = path.resolve(__dirname, "..", "how-it-works");

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
              content: marked.parse(meta.content),
            };
          })
        );
      }

      return subpages;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData, addRoute } = actions;
      setGlobalData(content);
      content.map((article) => {
        addRoute({
          path: "/how-it-works/" + article.slug,
          component: "@site/src/components/HowItWorksPage/ArticlePage/",
          exact: true,
        });
      });
    },
  };
};

module.exports = howItWorksArticlesPlugin;
