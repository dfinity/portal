/** @type {import('@docusaurus/types').PluginModule} */
const showcaseProjectsPlugin = async function () {
  return {
    name: "home-showcase",
    async loadContent() {
      const showcase = require("../showcase.json");

      const ids = [
        "dscvr",
        "distrikt",
        "openchat",
        "sonic",
        "kinic",
        "cubetopia",
        "plethora",
        "entrepot",
      ];

      const projects = ids.map((id) =>
        showcase.find((project) => project.id === id)
      );

      const transformed = projects.map((project) => {
        return {
          name: project.name,
          oneLiner: project.oneLiner,
          website: project.website,
          stats: project.stats,
          logo: project.logo,
        };
      });

      return transformed;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};

module.exports = showcaseProjectsPlugin;
