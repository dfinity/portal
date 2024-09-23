const fs = require("fs");
const path = require("path");
const logger = require("@docusaurus/logger");
const { execSync } = require("child_process");

/** @type {import('@docusaurus/types').PluginModule} */
const RoadmapDataPlugin = async function () {
  return {
    name: "roadmap-data",
    async loadContent() {
      // Run the build.js script
      try {
        logger.info("Running build.js script...");
        execSync("node build.js", {
          cwd: path.resolve(__dirname, "utils"),
          stdio: "inherit",
        });
        logger.success("build.js script completed successfully");
      } catch (error) {
        logger.error("Error running build.js script:", error.message);
        throw error;
      }

      // Now load the generated roadmap.json
      const roadmapJsonPath = path.resolve(
        __dirname,
        "..",
        "roadmap",
        "roadmap.json"
      );
      logger.info(`Attempting to load roadmap data from: ${roadmapJsonPath}`);

      try {
        const jsonSrc = fs.readFileSync(roadmapJsonPath, { encoding: "utf-8" });
        logger.info("Loaded roadmap data successfully");
        return JSON.parse(jsonSrc);
      } catch (error) {
        logger.error(`Error loading roadmap data: ${error.message}`);
        throw error;
      }
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      await createData("roadmap-data.json", JSON.stringify(content));
      logger.success("Roadmap data processed and saved");
    },
  };
};

module.exports = RoadmapDataPlugin;
