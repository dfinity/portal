const logger = require("@docusaurus/logger");
const fetch = require("node-fetch");
const markdownToPlainText = require("./utils/markdown-to-plain-text");
const os = require("os");
const fs = require("fs");
const path = require("path");

// const dotenv = require("dotenv");
const isDev = (process.env.NODE_ENV || "development") === "development";
// dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const { AIRTABLE_KEY } = process.env;

function loadRecords({ apiKey, baseId, tableName, viewId, offset = null }) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableName}?view=${viewId}${
    offset ? `&offset=${offset}` : ""
  }`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }).then((res) => res.json());
}

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const airtablePlugin = async function () {
  const uniqueDirUnderTemp = path.join(
    os.tmpdir(),
    `airtable-${Date.now().toString()}`
  );
  fs.mkdirSync(uniqueDirUnderTemp, { recursive: true });

  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "airtable",
    async loadContent() {
      if (!cache) {
        if (!AIRTABLE_KEY) {
          logger.warn(
            "Warning: no env variables found for Airtable integration. Using mock airtable data."
          );
          return require("./data/airtable-mock");
        }

        let records = [];
        let offset = null;
        do {
          const res = await loadRecords({
            apiKey: AIRTABLE_KEY,
            baseId: "appBKNYn6DaFccnno",
            tableName: "tblCZBZ26gbGvPf7j",
            viewId: "viwx1BHC1Cj8RVG7q",
            offset,
          });
          offset = res.offset;

          records.push(...parseAirtableData(res.records));
        } while (!!offset);

        // cut off events happened 6 months ago
        const endDatecutoff = new Date(
          Date.now() - 6 * 30 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];

        records = records.filter((rec) => {
          if (!rec.startDate || new Date(rec.startDate) == "Invalid Date") {
            logger.warn("Invalid event, no start date: " + rec.eventName);
            return false;
          }

          if (!rec.endDate || new Date(rec.endDate) == "Invalid Date") {
            logger.warn("Invalid event, no end date: " + rec.eventName);
            return false;
          }

          if (rec.endDate < endDatecutoff) {
            // old event
            return false;
          }

          return true;
        });

        const topics = new Set(); // event.topic is a string array
        const types = new Set(); // string
        const websiteCategory = new Set(); // string
        const regions = new Set(); // string
        const countries = new Set(); // string
        const cities = new Set(); // string
        const modes = new Set(); // string

        for (const rec of records) {
          if (rec.topic) {
            for (const t of rec.topic) {
              topics.add(t);
            }
          }

          if (rec.websiteCategory) {
            websiteCategory.add(rec.websiteCategory);
          }

          if (rec.type) {
            types.add(rec.type);
          } else {
            logger.warn("Invalid event, no type: " + rec.eventName);
          }

          if (rec.regions) {
            regions.add(rec.regions);
          }

          if (rec.country) {
            countries.add(rec.country);
          }

          if (rec.city) {
            cities.add(rec.city);
          }

          if (rec.mode) {
            modes.add(rec.mode);
          }
        }

        // from oldest to newest
        records.sort((a, b) => b.startDate.localeCompare(a.startDate));

        // enumerate images in ../static/img/news, with pattern event-*.webp
        const eventImageUrls = fs
          .readdirSync(path.join(__dirname, "..", "static", "img", "events"))
          .filter(
            (filename) =>
              filename.startsWith("event-") && filename.endsWith(".webp")
          )
          .map((filename) => `/img/events/${filename}`);

        // assign images to event articles, old articles keep their images, new articles get new images
        records.forEach((news, i) => {
          news.imageUrl = eventImageUrls[i % eventImageUrls.length];
        });

        // reverse the order, so that newest articles get the newest images
        records.reverse();

        cache = {
          events: records,
          topics: Array.from(topics),
          types: Array.from(types),
          regions: Array.from(regions),
          countries: Array.from(countries),
          cities: Array.from(cities),
          modes: Array.from(modes),
          websiteCategory: Array.from(websiteCategory),
        };
      }
      return cache;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("airtable-events.json", JSON.stringify(content, null, 2));

      if (isDev) {
        // save mock file
        fs.writeFileSync(
          path.join(__dirname, "data", "airtable-mock.json"),
          JSON.stringify(content, null, 2)
        );
      }
    },
  };
};

function parseAirtableData(records) {
  return records.map((r) => {
    // Sanitize the event link to prevent bad links from breaking the website build
    let eventLink = "#";
    let startDate,
      endDate = new Date().toISOString();

    try {
      eventLink = new URL(r.fields["Event Link"]).toString();
    } catch (err) {
      console.warn(
        `Failed to parse event link as url. Got: ${r.fields["Event Link"]}`
      );
    }

    try {
      startDate = new Date(r.fields["Start date"]).toISOString();
    } catch (err) {
      console.warn(
        `Failed to parse start date. Got: ${r.fields["Start date"]}`
      );
    }

    try {
      endDate = new Date(r.fields["End Date"]).toISOString();
    } catch (err) {
      console.warn(`Failed to parse end date. Got: ${r.fields["End Date"]}`);
    }

    return {
      id: r.id,
      eventName: r.fields["Event Name"],
      marketingText: r.fields["Marketing Text"],
      description: !!r.fields["Marketing Text"]
        ? markdownToPlainText(r.fields["Marketing Text"])
        : null,
      eventLink,
      topic: r.fields["Topic"],
      startDate,
      endDate,
      regions: r.fields["Regions"], // continent
      country: r.fields["Country"],
      city: r.fields["City"],
      type: r.fields["Type"],
      websiteCategory: r.fields["Website Category"],
      mode: r.fields["Mode"],
      status: r.fields["Status"],
    };
  });
}

module.exports = airtablePlugin;
