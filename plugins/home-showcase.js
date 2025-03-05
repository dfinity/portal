const showcase = require("../showcase.json");

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const showcaseProjectsPlugin = async function () {
  return {
    name: "home-showcase",
    async loadContent() {
      if (!cache) {
        const ids = [
          "dscvr",
          "distrikt",
          "mora",
          "funded",
          "kinic",
          "cubetopia",
          "plethora",
          "taggr",
          "catalyze",
        ];

        const projects = ids
          .map((id) => showcase.find((project) => project.id === id))
          .filter((project, index) => {
            if (!project) {
              console.warn(`Project with id ${ids[index]} not found`);
              return false;
            }
            return true;
          });

        const transformed = projects.map((project) => {
          return {
            name: project.name,
            oneLiner: project.oneLiner,
            website: project.website,
            stats: project.stats,
            logo: project.logo,
          };
        });

        cache = transformed;
      }
      return cache;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("home-showcase.json", JSON.stringify(content, null, 2));
    },
  };
};

module.exports = showcaseProjectsPlugin;
