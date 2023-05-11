const createClient = require("contentful").createClient;
const logger = require("@docusaurus/logger");
const marked = require("marked");
const { isValid } = require("date-fns");
const { toDate, format, utcToZonedTime } = require("date-fns-tz");

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST } =
  process.env;

/** @type {import('@docusaurus/types').PluginModule} */
const liveSessionsPlugin = async function () {
  return {
    name: "conversations",
    async loadContent() {
      if (
        !CONTENTFUL_SPACE_ID ||
        !CONTENTFUL_ACCESS_TOKEN ||
        !CONTENTFUL_HOST
      ) {
        logger.warn(
          "Warning: no env variables found for Contentful integration. Using mock conversations data."
        );
        return require("./data/conversations-mock");
      }

      const client = createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        host: CONTENTFUL_HOST,
      });

      const conversations = await client.getEntries({
        content_type: "communityConversation",
        limit: 1000,
      });

      const transformed = conversations.items
        .filter((conv) => !!conv.fields)
        .map((conv) => {
          const parsedEventTime = toDate((conv.fields.startTime || "").trim(), {
            timeZone: "America/Los_Angeles",
          });
          return {
            title: conv.fields.title,
            speaker: conv.fields.speaker,
            speakerTitle: conv.fields.speakerTitle,
            description: marked.parse(conv.fields.description || ""),
            startTimeUtc: isValid(parsedEventTime)
              ? parsedEventTime.getTime()
              : null,
            tbdMonth: conv.fields.tbdMonth,
            zoomLink: conv.fields.zoomLink,
            youtubeLink: conv.fields.youtubeLink,
            deck: conv.fields.deck?.file?.url,
          };
        });

      transformed.sort((a, b) => a.startTimeUtc - b.startTimeUtc);

      return transformed;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("conversations.json", JSON.stringify(content, null, 2));
    },
  };
};

module.exports = liveSessionsPlugin;
