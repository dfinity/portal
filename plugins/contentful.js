const createClient = require("contentful").createClient;
const logger = require("@docusaurus/logger");
const marked = require("marked");
const fs = require("fs");
const path = require("path");
const { isValid, parse } = require("date-fns");
const { toDate, format, utcToZonedTime } = require("date-fns-tz");

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST } =
  process.env;

/** @type {import('@docusaurus/types').PluginModule} */
const contentfulPlugin = async function () {
  return {
    name: "contentful",
    async loadContent() {
      if (
        !CONTENTFUL_SPACE_ID ||
        !CONTENTFUL_ACCESS_TOKEN ||
        !CONTENTFUL_HOST
      ) {
        logger.warn(
          "Warning: no env variables found for Contentful integration. Using mock conversations data."
        );
        return require("./data/contentful-mock");
      }

      const client = createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        host: CONTENTFUL_HOST,
      });

      const pressEntries = await client.getEntries({
        content_type: "press",
      });

      const press = pressEntries.items.map((item) => {
        let parsedDate = parse(item.fields.date, "MMMM y", new Date());
        if (!isValid(parsedDate))
          parsedDate = parse(item.fields.date, "MMM y", new Date());
        if (!isValid(parsedDate))
          parsedDate = parse(item.fields.date, "MMMM d y", new Date());
        if (!isValid(parsedDate))
          parsedDate = parse(item.fields.date, "MMM d y", new Date());
        if (!isValid(parsedDate))
          parsedDate = parse(item.fields.date, "d MMMM y", new Date());
        if (!isValid(parsedDate))
          parsedDate = parse(item.fields.date, "d MMM y", new Date());

        if (!isValid(parsedDate)) {
          throw new Error("Invalid date: " + item.fields.date);
        }

        const normalizedDate = format(parsedDate, "MMM d, y");

        return {
          id: item.sys.id,
          title: item.fields.title,
          details: item.fields.details,
          date: format(parsedDate, "y-MM-dd"),
          dateHuman: normalizedDate,
          press: item.fields.press,
          url: item.fields.url,
          tags: item.fields.tags || [],
        };
      });
      press.sort((a, b) => b.date.localeCompare(a.date));

      const data = {
        press,
      };

      if (process.env.NODE_ENV === "development") {
        fs.writeFileSync(
          path.join(__dirname, "data", "contentful-mock.json"),
          JSON.stringify(data, null, 2)
        );
      }

      return data;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("press.json", JSON.stringify(content.press, null, 2));
    },
  };
};

module.exports = contentfulPlugin;
