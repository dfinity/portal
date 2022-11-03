const createClient = require("contentful").createClient;
const logger = require("@docusaurus/logger");

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST } =
  process.env;

/** @type {import('@docusaurus/types').PluginModule} */
const showcaseProjectsPlugin = async function () {
  return {
    name: "home-showcase",
    async loadContent() {
      if (
        !CONTENTFUL_SPACE_ID ||
        !CONTENTFUL_ACCESS_TOKEN ||
        !CONTENTFUL_HOST
      ) {
        logger.warn(
          "Warning: no env variables found for Contentful integration. Using mock home showcase data."
        );
        return require("./data/home-showcase-mock.json");
      }

      const client = createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        host: CONTENTFUL_HOST,
      });

      const projects = [
        await client.getEntry("29oxwV0MC8l47DnvJq0uOp"),
        await client.getEntry("3uiXoygfxuDuNvWJLuZ92h"),
        await client.getEntry("5gygJMEwb1ChaQcPfPbSYT"),
        await client.getEntry("JlK1SKZDhwS22V0WeuVku"),
        await client.getEntry("6yLENaXAtugiLxpaUmR2su"),
        await client.getEntry("6M5fcQgr1PdLEGKYQiDnOw"),
        await client.getEntry("78xMBE7r2NS9h3zpd8lPeC"),
        await client.getEntry("1FbCGq1uvM7KXi0vtmitTm"),
      ];

      const transformed = projects.map((project) => {
        return {
          name: project.fields.name,
          oneLiner: project.fields.oneLiner,
          website: project.fields.website,
          stats: project.fields.stats,
          logo: project.fields.logo?.fields.file?.url,
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
