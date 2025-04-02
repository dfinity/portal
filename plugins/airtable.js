const logger = require("@docusaurus/logger");
const fetch = require("node-fetch");
const markdownToPlainText = require("./utils/markdown-to-plain-text");
const os = require("os");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const cheerio = require("cheerio");
const https = require("https");

dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const isDev = (process.env.NODE_ENV || "development") === "development";
const { AIRTABLE_KEY } = process.env;
const { YOUTUBE_API_KEY } = process.env;

// Constants for the events table
const EVENTS_BASE_ID = "appBKNYn6DaFccnno";
const EVENTS_TABLE_NAME = "tblCZBZ26gbGvPf7j";
const EVENTS_VIEW_NAME = "viwx1BHC1Cj8RVG7q";

// Constants for the courses table
const COURSES_BASE_ID = "app1LOpIHEj6dTeEx";
const COURSES_TABLE_NAME = "tblpf2akkElbGlqti";
const COURSES_VIEW_NAME = "viwDJz26NeIdJvqle";

// Constants for the ecosystem projects table
const ECOSYSTEM_BASE_ID = "appyWBGCHaZoTzKTN";
const ECOSYSTEM_TABLE_NAME = "tblGcL1MfwogVlWk9";
const ECOSYSTEM_VIEW_NAME = "viwWonHqqzyJCtvNq";

// Directory for showcase images
const SHOWCASE_IMG_DIR = path.join(__dirname, "../static/img/showcase");

async function loadRecords({
  apiKey,
  baseId,
  tableName,
  viewId,
  offset = null,
}) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableName}?view=${viewId}${
    offset ? `&offset=${offset}` : ""
  }`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return response.json();
}

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const airtablePlugin = async function () {
  const uniqueDirUnderTemp = path.join(
    os.tmpdir(),
    `airtable-${Date.now().toString()}`
  );
  fs.mkdirSync(uniqueDirUnderTemp, { recursive: true });

  // Ensure showcase image directory exists
  fs.mkdirSync(SHOWCASE_IMG_DIR, { recursive: true });

  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "airtable",
    async loadContent() {
      if (!cache) {
        if (!AIRTABLE_KEY) {
          logger.warn(
            "Warning: no env variables found for Airtable integration. Using mock airtable data."
          );
          const mockEvents = require("./data/airtable-events-mock.json");
          const mockCourses = require("./data/airtable-courses-mock.json");
          const mockEcosystem = require("./data/airtable-ecosystem-mock.json");

          cache = {
            events: mockEvents,
            courses: mockCourses,
            ecosystem: mockEcosystem,
          };
          return cache;
        }

        // Load events
        let events = await fetchAirtableRecords({
          apiKey: AIRTABLE_KEY,
          baseId: EVENTS_BASE_ID,
          tableName: EVENTS_TABLE_NAME,
          viewId: EVENTS_VIEW_NAME,
        });

        // Process events data
        events = await processEventsData(events);

        // Load courses
        let courses = await fetchAirtableRecords({
          apiKey: AIRTABLE_KEY,
          baseId: COURSES_BASE_ID,
          tableName: COURSES_TABLE_NAME,
          viewId: COURSES_VIEW_NAME,
        });

        // Process courses data
        courses = await processCoursesData(courses);

        // Load ecosystem projects
        let ecosystem = await fetchAirtableRecords({
          apiKey: AIRTABLE_KEY,
          baseId: ECOSYSTEM_BASE_ID,
          tableName: ECOSYSTEM_TABLE_NAME,
          viewId: ECOSYSTEM_VIEW_NAME,
        });

        // Process ecosystem data
        ecosystem = await processEcosystemData(ecosystem);

        cache = {
          events,
          courses,
          ecosystem,
        };
      }

      return cache;
    },

    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData(
        "airtable-events.json",
        JSON.stringify(content.events, null, 2)
      );
      createData(
        "airtable-courses.json",
        JSON.stringify(content.courses, null, 2)
      );
      createData("showcase.json", JSON.stringify(content.ecosystem, null, 2));

      if (isDev) {
        // Save mock files for development
        fs.writeFileSync(
          path.join(__dirname, "data", "airtable-events-mock.json"),
          JSON.stringify(content.events, null, 2)
        );
        fs.writeFileSync(
          path.join(__dirname, "data", "airtable-courses-mock.json"),
          JSON.stringify(content.courses, null, 2)
        );
        fs.writeFileSync(
          path.join(__dirname, "data", "airtable-ecosystem-mock.json"),
          JSON.stringify(content.ecosystem, null, 2)
        );
      }
    },
  };
};

async function fetchAirtableRecords({ apiKey, baseId, tableName, viewId }) {
  let records = [];
  let offset = null;

  do {
    const res = await loadRecords({
      apiKey,
      baseId,
      tableName,
      viewId,
      offset,
    });

    if (!res.records) {
      logger.error("No records found in Airtable response.");
      break;
    }

    offset = res.offset;
    records.push(...res.records);
  } while (offset);

  return records;
}

/**
 * Downloads an image from a URL and saves it to the local filesystem
 * @param {string} url - The URL of the image
 * @param {string} filename - The filename to save as
 * @returns {Promise<string>} - The local path to the saved image
 */
async function downloadImage(url, filename) {
  const localPath = path.join(SHOWCASE_IMG_DIR, filename);

  // Check if file already exists to avoid redundant downloads
  if (fs.existsSync(localPath)) {
    return `/img/showcase/${filename}`;
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(localPath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(`/img/showcase/${filename}`);
        });
      })
      .on("error", (err) => {
        fs.unlink(localPath, () => {}); // Delete the file if there was an error
        reject(err);
      });
  });
}

/**
 * Processes image data from Airtable and saves it locally
 * @param {Object} imageData - The image data from Airtable
 * @param {string} prefix - A prefix for the image filename
 * @returns {Promise<string>} - The local path to the saved image
 */
async function processAndDownloadImage(imageData, prefix) {
  try {
    if (!imageData || !imageData.url) {
      return null;
    }

    const fileExt = path.extname(imageData.filename) || ".png";
    const safeFilename = `${prefix}_${imageData.id}${fileExt}`.toLowerCase();

    return await downloadImage(imageData.url, safeFilename);
  } catch (error) {
    logger.warn(`Failed to download image: ${error.message}`);
    return null;
  }
}

async function processEventsData(records) {
  const endDateCutoff = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const today = new Date().toISOString().split("T")[0];

  records = await Promise.all(
    records.map(async (record) => {
      const parsedRecord = parseAirtableData(record);

      // Only fetch share image for current/future events
      let imageUrl = null;
      if (parsedRecord.endDate >= today) {
        imageUrl = await fetchShareImage(parsedRecord.eventLink);
      }

      // If no share image is found, use a default image
      if (!imageUrl) {
        imageUrl = getDefaultEventImage(parsedRecord);
      }

      return { ...parsedRecord, imageUrl };
    })
  );

  records = records.filter((rec) => {
    if (!rec.startDate || new Date(rec.startDate) == "Invalid Date") {
      logger.warn("Invalid event, no start date: " + rec.eventName);
      return false;
    }

    if (!rec.endDate || new Date(rec.endDate) == "Invalid Date") {
      logger.warn("Invalid event, no end date: " + rec.eventName);
      return false;
    }

    if (rec.endDate < endDateCutoff) {
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

  records.reverse();

  return {
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

async function processEcosystemData(records) {
  const showcaseItems = await Promise.all(
    records.map(async (record) => {
      const fields = record.fields;

      // Generate a safe ID from the product name
      const id =
        fields.id ||
        fields["Product name"]?.toLowerCase().replace(/[^a-z0-9]/g, "-") ||
        record.id;

      // Process logo image
      let logoUrl = null;
      if (fields["Logo "] && fields["Logo "].length > 0) {
        logoUrl = await processAndDownloadImage(
          fields["Logo "][0],
          `${id}_logo`
        );
      }

      // Process screenshots
      let screenshots = [];
      if (
        fields["Screenshot of your prouduct"] &&
        fields["Screenshot of your prouduct"].length > 0
      ) {
        screenshots = await Promise.all(
          fields["Screenshot of your prouduct"].map((screenshot, index) =>
            processAndDownloadImage(screenshot, `${id}_screenshot_${index}`)
          )
        );
        // Filter out null values
        screenshots = screenshots.filter(Boolean);
      }

      // Determine if it uses Internet Identity
      const usesII = fields["Use Internet Identity?"] === "Yes";

      // Map tags from Airtable to showcase format
      const validTags = [
        "SocialFi",
        "Chain Fusion",
        "Bitcoin",
        "Ethereum",
        "AI",
        "NFT",
        "Tools / Infrastructure",
        "DeFi",
        "Wallet",
        "Metaverse",
        "Gaming",
        "DAO",
        "Enterprise",
        "Analytics",
        "Creator Economy",
      ];

      const tags =
        fields["Tags"] && Array.isArray(fields["Tags"])
          ? fields["Tags"].filter((tag) => validTags.includes(tag))
          : [];

      // Extract stats if available
      const stats = fields["Stats"] || null;

      // Determine display mode (Large if has screenshots or video, Normal otherwise)
      const display = screenshots.length > 0 ? "Large" : "Normal";

      return {
        id,
        name: fields["Product name"],
        description: fields["Description"]?.substring(0, 500) || "", // Limit to 500 chars
        logo: logoUrl || "/img/showcase/default_logo.png", // Fallback to default if no logo
        display,
        website: fields["Website"] || "#",
        tags,
        stats,
        usesInternetIdentity: usesII,
        screenshots: screenshots.length > 0 ? screenshots : undefined,
        github: fields["Github"] || undefined,
        twitter: fields["Twitter"] || undefined,
        youtube: fields["YouTube"] || undefined,
        submittableId:
          fields["Submittable ID (Optional)"]?.toString() || undefined,
      };
    })
  );

  // Filter out items with missing required fields
  return showcaseItems.filter(
    (item) =>
      item.name &&
      item.description &&
      item.logo &&
      item.website &&
      item.tags.length > 0
  );
}

async function fetchShareImage(url) {
  if (!url || url === "#") return null;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    let imageUrl = $('meta[property="og:image"]').attr("content");

    if (!imageUrl) {
      imageUrl = $('meta[name="twitter:image"]').attr("content");
    }

    return imageUrl;
  } catch (error) {
    console.warn(`Failed to fetch share image from ${url}: ${error.message}`);
    return null;
  }
}

function getDefaultEventImage(event) {
  const defaultImages = [
    "/img/events/event-01.webp",
    "/img/events/event-02.webp",
    "/img/events/event-03.webp",
    "/img/events/event-04.webp",
    "/img/events/event-05.webp",
    "/img/events/event-06.webp",
    "/img/events/event-07.webp",
    "/img/events/event-08.webp",
    "/img/events/event-09.webp",
    "/img/events/event-10.webp",
    "/img/events/event-11.webp",
    "/img/events/event-12.webp",
    "/img/events/event-13.webp",
    "/img/events/event-14.webp",
    "/img/events/event-15.webp",
  ];

  const index = parseInt(event.id, 36) % defaultImages.length;
  return defaultImages[index];
}

let noneImageIndex = 0;
const noneImages = [
  "/img/education-hub/none-1.webp",
  "/img/education-hub/none-2.webp",
  "/img/education-hub/none-3.webp",
  "/img/education-hub/none-4.webp",
];

async function processCoursesData(records) {
  const courses = await Promise.all(
    records.map(async (record) => {
      const fields = record.fields;
      let image = fields["Image URL"] || null;

      // if (fields["URL"]) {
      //   try {
      //     image = await fetchOgImage(fields["URL"]);
      //   } catch (error) {
      //     logger.warn(
      //       `Failed to fetch OG image for course: ${fields["Title"]}, URL: ${fields["URL"]}`
      //     );
      //   }
      // }

      if (!image) {
        const languages =
          fields["Programming language"]?.map((language) =>
            language?.toLowerCase()
          ) || [];
        if (languages.length > 0) {
          if (languages.includes("rust") && languages.includes("typescript")) {
            image = "/img/education-hub/rust-typescript.webp";
          }
          // else if (languages.includes("rust") && languages.includes("motoko")) {
          //   image = "/img/education-hub/rust-motoko.webp";
          // }
          // else if (
          //   languages.includes("motoko") &&
          //   languages.includes("typescript")
          // ) {
          //   image = "/img/education-hub/motoko-typescript.webp";
          // }
          else if (languages.includes("rust")) {
            image = "/img/education-hub/rust.webp";
          } else if (languages.includes("motoko")) {
            image = "/img/education-hub/motoko.webp";
          } else if (languages.includes("typescript")) {
            image = "/img/education-hub/typescript.webp";
          } else {
            image = noneImages[noneImageIndex];
            noneImageIndex = (noneImageIndex + 1) % noneImages.length;
          }
        } else {
          image = noneImages[noneImageIndex];
          noneImageIndex = (noneImageIndex + 1) % noneImages.length;
        }
      }

      return {
        index: record.id,
        category: fields["Category"],
        title: fields["Title"],
        body: fields["Course Description"],
        languages: fields["Programming language"]?.map((language) =>
          language?.toLowerCase()
        ),
        level: fields["Level"]?.map((level) => level?.toLowerCase()),
        contentType: fields["Media type"]?.map((content) =>
          content?.toLowerCase()
        ),
        contentLanguages: fields["Content Language"]
          ? [fields["Content Language"].toLowerCase()]
          : [],
        fullTags: (fields["Web tag"] || []).concat(fields["Index Tag"] || []),
        tags: fields["Web tag"] || [],
        link: fields["URL"] || "#",
        image: image,
      };
    })
  );

  return courses;
}

async function fetchOgImage(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const ogImage = $('meta[property="og:image"]').attr("content");
  return ogImage || null;
}

async function getYouTubeVideoThumbnail(videoId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`,
      {
        headers: {
          Referer: "https://www.dfinity.org",
        },
      }
    );

    const json = await response.json();

    if (json.items && json.items.length > 0) {
      const thumbnails = json.items[0].snippet.thumbnails;
      return pickThumbnail(thumbnails);
    }
  } catch (error) {
    logger.error(`Failed to fetch YouTube video thumbnail: ${error.message}`);
  }

  return null;
}

function pickThumbnail(thumbnails) {
  if (!thumbnails) return null;

  if (thumbnails.maxres) return thumbnails.maxres.url;
  if (thumbnails.standard) return thumbnails.standard.url;
  if (thumbnails.high) return thumbnails.high.url;
  if (thumbnails.medium) return thumbnails.medium.url;
  return thumbnails.default ? thumbnails.default.url : null;
}

(async () => {
  const plugin = await airtablePlugin();
  const content = await plugin.loadContent();
  console.log("Loaded Airtable Data");
})();

async function getYouTubePlaylistThumbnail(playlistId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&maxResults=10&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`,
      {
        headers: {
          Referer: "https://internetcomputer.org/",
        },
      }
    );

    const json = await response.json();

    if (json.items) {
      const thumbnails = json.items
        .filter(
          (item) =>
            item.snippet.title !== "Private video" &&
            item.snippet.title !== "Deleted video"
        )
        .map((item) => item.snippet.thumbnails);

      return thumbnails.length ? pickThumbnail(thumbnails[0]) : null;
    }
  } catch (error) {
    console.error(
      `Failed to fetch YouTube playlist thumbnail: ${error.message}`
    );
  }

  return null;
}

function parseAirtableData(record) {
  // Sanitize the event link to prevent bad links from breaking the website build
  let eventLink = "#";
  let startDate, endDate;

  try {
    eventLink = new URL(record.fields["Event Link"]).toString();
  } catch (err) {
    console.warn(
      `Failed to parse event link as URL. Got: ${record.fields["Event Link"]}`
    );
  }

  try {
    startDate = new Date(record.fields["Start date"]).toISOString();
  } catch (err) {
    console.warn(
      `Failed to parse start date. Got: ${record.fields["Start date"]}`
    );
  }

  try {
    endDate = new Date(record.fields["End Date"]).toISOString();
  } catch (err) {
    console.warn(`Failed to parse end date. Got: ${record.fields["End Date"]}`);
  }

  return {
    id: record.id,
    eventName: record.fields["Event Name"],
    marketingText: record.fields["Marketing Text"],
    description: record.fields["Marketing Text"]
      ? markdownToPlainText(record.fields["Marketing Text"])
      : null,
    eventLink,
    topic: record.fields["Topic"],
    startDate,
    endDate,
    regions: record.fields["Regions"], // Continent
    country: record.fields["Country"],
    city: record.fields["City"],
    type: record.fields["Type"],
    websiteCategory: record.fields["Website Category"],
    mode: record.fields["Mode"],
    status: record.fields["Status"],
    featured: record.fields["Featured on Event Website"] || false,
  };
}

module.exports = airtablePlugin;
