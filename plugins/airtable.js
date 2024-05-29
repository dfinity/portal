const logger = require("@docusaurus/logger");
const fetch = require("node-fetch");
const markdownToPlainText = require("./utils/markdown-to-plain-text");
const os = require("os");
const fs = require("fs");
const path = require("path");
// const dotenv = require("dotenv");
// dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

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
          cache = {
            events: mockEvents,
            courses: mockCourses,
          };
          return;
        }

        // Load events
        let events = await fetchAirtableRecords({
          apiKey: AIRTABLE_KEY,
          baseId: EVENTS_BASE_ID,
          tableName: EVENTS_TABLE_NAME,
          viewId: EVENTS_VIEW_NAME,
        });

        // Process events data
        events = processEventsData(events);

        // Load courses
        let courses = await fetchAirtableRecords({
          apiKey: AIRTABLE_KEY,
          baseId: COURSES_BASE_ID,
          tableName: COURSES_TABLE_NAME,
          viewId: COURSES_VIEW_NAME,
        });

        // Process courses data
        courses = processCoursesData(courses);

        cache = {
          events,
          courses,
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

function processEventsData(records) {
  records = records.map(parseAirtableData);
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
      (filename) => filename.startsWith("event-") && filename.endsWith(".webp")
    )
    .map((filename) => `/img/events/${filename}`);

  // assign images to event articles, old articles keep their images, new articles get new images
  records.forEach((news, i) => {
    news.imageUrl = eventImageUrls[i % eventImageUrls.length];
  });

  // reverse the order, so that newest articles get the newest images
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
function processCoursesData(records) {
  return Promise.all(
    records.sort().map(async (record) => {
      const fields = record.fields;
      let image = null;
      if (
        fields["URL"] &&
        fields["URL"].includes("youtube") &&
        YOUTUBE_API_KEY
      ) {
        const url = new URL(fields["URL"]);
        const playlistId = url.searchParams.get("list");
        if (playlistId) {
          image = await getYouTubePlaylistThumbnail(playlistId);
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
        fullTags: fields["Web tag"].concat(fields["Index Tag"] || []),
        tags: fields["Web tag"] || [],
        link: fields["URL"] || "#",
        image: image,
      };
    })
  ).then((courses) =>
    courses.sort((a, b) => {
      if (a.category === "Course" && b.category !== "Course") {
        return -1;
      } else if (a.category !== "Course" && b.category === "Course") {
        return 1;
      } else {
        return 0;
      }
    })
  );
}

async function getYouTubePlaylistThumbnail(playlistId) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${YOUTUBE_API_KEY}`
  );
  return response.data.items[0].snippet.thumbnails.default.url;
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
  };
}

module.exports = airtablePlugin;
