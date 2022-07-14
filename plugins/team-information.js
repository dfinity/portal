const createClient = require("contentful").createClient;
const logger = require("@docusaurus/logger");

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST } =
  process.env;

/** @type {import('@docusaurus/types').PluginModule} */
const teamInformationPlugin = async function () {
  return {
    name: "team-information",
    async loadContent() {
      if (
        !CONTENTFUL_SPACE_ID ||
        !CONTENTFUL_ACCESS_TOKEN ||
        !CONTENTFUL_HOST
      ) {
        logger.warn(
          "Warning: no env variables found for Contentful integration. Using mock showcase data."
        );
        return require("./data/team-information-mock.json");
      }

      const client = createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        host: CONTENTFUL_HOST,
      });
      const entries = await client.getEntries({
        content_type: "department",
      });
      return entries.items.map((department) => {
        return {
          title: department.fields.title,
          order: department.fields.order,
          members: department.fields.members
            .filter((member) => !!member.fields)
            .map((member) => ({
              name: member.fields.name,
              bio: member.fields.bio,
              title: member.fields.title,
              websites: member.fields.websites,
              photo: member.fields.photo?.fields.file?.url,
            })),
        };
      });
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};
module.exports = teamInformationPlugin;
