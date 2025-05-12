const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Constants for the projects table
const PROJECTS_BASE_ID = "appyWBGCHaZoTzKTN";
const PROJECTS_TABLE_NAME = "tbl7PMpN6pHpF8rMX";
const PROJECTS_VIEW_NAME = "viwIiHvahcPMYpx4M";

if (!process.env.AIRTABLE_KEY) {
  console.error("AIRTABLE_KEY environment variable is required");
  process.exit(1);
}

/**
 * Load records from Airtable API
 */
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

/**
 * Fetch all records from Airtable
 */
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
      console.error("No records found in Airtable response.");
      break;
    }

    offset = res.offset;
    records.push(...res.records);
  } while (offset);

  return records;
}

/**
 * Process projects data into the correct format
 */
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

/**
 * Main function to update showcase.json
 */
async function updateShowcase() {
  try {
    console.log("Fetching projects from Airtable...");

    // Load projects from Airtable
    const records = await fetchAirtableRecords({
      apiKey: process.env.AIRTABLE_KEY,
      baseId: PROJECTS_BASE_ID,
      tableName: PROJECTS_TABLE_NAME,
      viewId: PROJECTS_VIEW_NAME,
    });

    // Process projects data
    const projects = processProjectsData(records);

    // Write showcase.json to the project root
    const showcasePath = path.join(__dirname, "showcase.json");
    fs.writeFileSync(showcasePath, JSON.stringify(projects, null, 2));

    console.log(
      `Successfully wrote ${projects.length} projects to showcase.json`
    );
    return true;
  } catch (error) {
    console.error(`Error updating showcase.json: ${error.message}`);
    return false;
  }
}

// Run the update showcase function
updateShowcase();
