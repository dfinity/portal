const createClient = require("contentful").createClient;
const logger = require("@docusaurus/logger");

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST } =
  process.env;

/** @type {import('@docusaurus/types').PluginModule} */
const showcaseProjectsPlugin = async function () {
  return {
    name: "showcase-projects",
    async loadContent() {
      if (
        !CONTENTFUL_SPACE_ID ||
        !CONTENTFUL_ACCESS_TOKEN ||
        !CONTENTFUL_HOST
      ) {
        logger.warn(
          "Warning: no env variables found for Contentful integration. Using mock showcase data."
        );
        return require("./data/showcase-mock.json");
      }

      const client = createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        host: CONTENTFUL_HOST,
      });

      const showcasePage = await client.getEntry("7Gqk814Pz6tsWEgAqtt9O9");

      const transformed = showcasePage.fields.projects
        .filter((p) => !!p.fields)
        .map((project) => {
          return {
            name: project.fields.name,
            oneLiner: project.fields.oneLiner,
            website: project.fields.website,
            tags: project.fields.tags,
            description: project.fields.description,
            github: project.fields.github,
            usesInternetIdentity: project.fields.usesInternetIdentity,
            stats: project.fields.stats,
            display: project.fields.display,
            logo: project.fields.logo?.fields.file?.url,
            video: project.fields.video?.fields.file?.url,
            videoContentType: project.fields.video?.fields.file?.contentType,
            screenshots:
              project.fields.screenshots
                ?.map((ss) => ss.fields.file?.url)
                .filter((ss) => !!ss) || [],
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
