const createClient = require("contentful").createClient;
const logger = require("@docusaurus/logger");
const marked = require("marked");
const fs = require("fs");
const path = require("path");
const { isValid, parse } = require("date-fns");
const { toDate, format, utcToZonedTime } = require("date-fns-tz");

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST } =
  process.env;

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const contentfulPlugin = async function () {
  return {
    name: "contentful",
    async loadContent() {
      if (!cache) {
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
            parsedDate = parse(item.fields.date, "MMMM d, yyyy", new Date());
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

        // from oldest to newest
        press.sort((a, b) => a.date.localeCompare(b.date));

        // enumerate images in ../static/img/news, with pattern press-*.webp
        const pressImageUrls = fs
          .readdirSync(path.join(__dirname, "..", "static", "img", "news"))
          .filter(
            (filename) =>
              filename.startsWith("press-") && filename.endsWith(".webp")
          )
          .map((filename) => `/img/news/${filename}`);

        // assign images to press articles, old articles keep their images, new articles get new images
        press.forEach((news, i) => {
          news.imageUrl = pressImageUrls[i % pressImageUrls.length];
        });

        // reverse the order, so that newest articles get the newest images
        press.reverse();

        const data = {
          press,
        };

        if (process.env.NODE_ENV === "development") {
          fs.writeFileSync(
            path.join(__dirname, "data", "contentful-mock.json"),
            JSON.stringify(data, null, 2)
          );
        }

        cache = data;
      }
      return cache;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("press.json", JSON.stringify(content.press, null, 2));
    },
  };
};

module.exports = contentfulPlugin;
