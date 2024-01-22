const logger = require("@docusaurus/logger");
const fetch = require("node-fetch");
const chunkedParallel = require("./utils/chunked-parallel");
const markdownToPlainText = require("./utils/markdown-to-plain-text");
const mime = require("mime");
const os = require("os");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const downloadFile = require("./utils/download-file");

// const dotenv = require("dotenv");
// const isDev = process.env.NODE_ENV === "development";
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

function transformEventBanner(eventBanner) {
  if (!eventBanner || eventBanner.length === 0) {
    return undefined;
  }

  return {
    id: eventBanner[0].id,
    url: eventBanner[0].url,
    type: eventBanner[0].type,
  };
}

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

        records.push(
          ...res.records.map((r) => ({
            id: r.id,
            eventName: r.fields["Event Name"],
            marketingText: r.fields["Marketing Text"],
            description: !!r.fields["Marketing Text"]
              ? markdownToPlainText(r.fields["Marketing Text"])
              : null,
            eventBanner: transformEventBanner(r.fields["Event Banner"]),
            eventLink: r.fields["Event Link"],
            topic: r.fields["Topic"],
            startDate: r.fields["Start date"],
            endDate: r.fields["End Date"],
            regions: r.fields["Regions"], // continent
            country: r.fields["Country"],
            city: r.fields["City"],
            type: r.fields["Type"],
            mode: r.fields["Mode"],
            status: r.fields["Status"],
          }))
        );
      } while (!!offset);

      // cut off events happened 6 months ago
      const endDatecutoff = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
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

      records.sort((a, b) => {
        return a.startDate.localeCompare(b.startDate);
      });

      if (isProd) {
        // download event banner images, resize them and convert to webp, and update the url
        await chunkedParallel(
          records
            .filter((r) => r.eventBanner)
            .map((rec) => {
              return async () => {
                const fileExt = mime.getExtension(rec.eventBanner.type);
                const tempFileName = `${rec.eventBanner.id}.${fileExt}`;
                const tempFilePath = path.join(
                  uniqueDirUnderTemp,
                  tempFileName
                );
                await downloadFile(rec.eventBanner.url, tempFilePath);

                rec.eventBanner.url = `/assets/images/events/${tempFileName}`;

                const webpFileName =
                  fileExt === "webp"
                    ? `${rec.eventBanner.id}-processed.webp`
                    : `${rec.eventBanner.id}.webp`;
                const webpFilePath = path.join(
                  uniqueDirUnderTemp,
                  webpFileName
                );
                try {
                  await sharp(tempFilePath)
                    .resize(960, 440, {
                      fit: "outside",
                      withoutEnlargement: true,
                    })
                    .toFormat("webp", {
                      quality: 90,
                    })
                    .toFile(webpFilePath);

                  rec.eventBanner.url = `/assets/images/events/${webpFileName}`;
                  rec.eventBanner.type = "image/webp";

                  fs.unlinkSync(tempFilePath);

                  return webpFileName;
                } catch (e) {
                  logger.warn("failed to convert to webp: " + tempFilePath);
                  logger.warn(e);
                  try {
                    fs.unlinkSync(webpFilePath);
                  } catch {}
                }
              };
            }),
          5
        );
      }

      const topics = new Set(); // event.topic is a string array
      const types = new Set(); // string
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

      return {
        events: records,
        topics: Array.from(topics),
        types: Array.from(types),
        regions: Array.from(regions),
        countries: Array.from(countries),
        cities: Array.from(cities),
        modes: Array.from(modes),
      };
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("airtable-events.json", JSON.stringify(content, null, 2));
    },

    async postBuild({ outDir }) {
      if (!isProd) {
        return;
      }

      // copy the images to the <output_directory>/images/events
      const destDir = path.join(outDir, "assets", "images", "events");

      // make sure the directory exists
      fs.mkdirSync(destDir, {
        recursive: true,
      });

      // copy all files from the temp directory to the destination directory
      fs.readdirSync(uniqueDirUnderTemp).forEach((f) => {
        const src = path.join(uniqueDirUnderTemp, f);
        const dest = path.join(destDir, f);
        fs.copyFileSync(src, dest);
      });

      // delete the temp directory
      fs.rmdirSync(uniqueDirUnderTemp, { recursive: true });
    },
  };
};

module.exports = airtablePlugin;
