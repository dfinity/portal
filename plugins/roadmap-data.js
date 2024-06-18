const fs = require("fs");
const path = require("path");
const logger = require("@docusaurus/logger");

/** @type {import('@docusaurus/types').PluginModule} */
const RoadmapDataPlugin = async function () {
  return {
    name: "roadmap-data",
    async loadContent() {
      const jsonSrc = fs.readFileSync(
        path.resolve(__dirname, "..", "roadmap", "roadmap.json"),
        { encoding: "utf-8" }
      );

      logger.info("Loaded roadmap data");

      return JSON.parse(jsonSrc);
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("roadmap-data.json", JSON.stringify(content));
    },
  };
};

module.exports = RoadmapDataPlugin;

// RoadmapDataPlugin().then((x) => x.loadContent());
