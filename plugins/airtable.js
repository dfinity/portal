const logger = require("@docusaurus/logger");
const fetch = require("node-fetch");
const markdownToPlainText = require("./utils/markdown-to-plain-text");
const os = require("os");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const cheerio = require("cheerio");

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

// Constants for the projects table
const PROJECTS_BASE_ID = "appyWBGCHaZoTzKTN";
const PROJECTS_TABLE_NAME = "tbl7PMpN6pHpF8rMX";
const PROJECTS_VIEW_NAME = "viwIiHvahcPMYpx4M";

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
          const mockProjects = require("./data/airtable-projects-mock.json");

          cache = {
            events: mockEvents,
            courses: mockCourses,
            projects: mockProjects,
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

        // Load projects
        let projects = await fetchAirtableRecords({
          apiKey: AIRTABLE_KEY,
          baseId: PROJECTS_BASE_ID,
          tableName: PROJECTS_TABLE_NAME,
          viewId: PROJECTS_VIEW_NAME,
        });

        // Process projects data
        projects = processProjectsData(projects);

        cache = {
          events,
          courses,
          projects,
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

      // Write showcase.json to the project root
      const showcasePath = path.join(__dirname, "..", "showcase.json");
      fs.writeFileSync(showcasePath, JSON.stringify(content.projects, null, 2));
      logger.info(
        `Successfully wrote ${content.projects.length} projects to showcase.json`
      );

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
          path.join(__dirname, "data", "airtable-projects-mock.json"),
          JSON.stringify(content.projects, null, 2)
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

function processProjectsData(records) {
  return records.map((record) => {
    const fields = record.fields;

    // Extract tags (looking for tags__001 through tags__007)
    const tags = [];
    for (let i = 1; i <= 7; i++) {
      const tagKey = `tags__${String(i).padStart(3, "0")}`;
      if (fields[tagKey]) {
        tags.push(fields[tagKey]);
      }
    }

    // Extract screenshots
    const screenshots = [];
    for (let i = 1; i <= 3; i++) {
      const screenshotKey = `screenshots__${String(i).padStart(3, "0")}`;
      if (fields[screenshotKey]) {
        screenshots.push(fields[screenshotKey]);
      }
    }

    // Extract authOrigins
    const authOrigins = [];
    for (let i = 1; i <= 2; i++) {
      const authOriginKey = `authOrigins__${String(i).padStart(3, "0")}`;
      if (fields[authOriginKey]) {
        authOrigins.push(fields[authOriginKey]);
      }
    }

    // Convert usesInternetIdentity from string to boolean
    const usesInternetIdentity = fields.usesInternetIdentity === "True";

    // Build the project object in the correct format
    const project = {
      id: fields.id,
      name: fields.name,
    };

    // Add optional fields only if they exist
    if (fields.display) project.display = fields.display;
    if (fields.website) project.website = fields.website;
    if (fields.twitter) project.twitter = fields.twitter;
    if (fields.github) project.github = fields.github;
    if (fields.youtube) project.youtube = fields.youtube;
    if (fields.submittableId) project.submittableId = fields.submittableId;
    if (tags.length > 0) project.tags = tags;
    if (fields.stats) project.stats = fields.stats;
    if (fields.description) project.description = fields.description;
    if (fields.usesInternetIdentity !== undefined)
      project.usesInternetIdentity = usesInternetIdentity;
    if (authOrigins.length > 0) project.authOrigins = authOrigins;
    if (fields.logo) project.logo = fields.logo;
    if (screenshots.length > 0) project.screenshots = screenshots;
    if (fields.video) project.video = fields.video;
    if (fields.videoContentType)
      project.videoContentType = fields.videoContentType;
    if (fields.oneLiner) project.oneLiner = fields.oneLiner;

    return project;
  });
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

// For testing or direct execution
if (require.main === module) {
  (async () => {
    const plugin = await airtablePlugin();
    const content = await plugin.loadContent();
    console.log("Loaded Airtable Data");
    console.log(`Projects: ${content.projects.length}`);
  })();
}

module.exports = airtablePlugin;
