const logger = require("@docusaurus/logger");
const fs = require("fs");
const path = require("path");

const maximumLogoSize = 10 * 1024;
const maximumVideoSize = 10 * 1024 * 1024;
const maximumScreenshotSize = 200 * 1024;

const maximumOneLinerLength = 150;
const maximumStatsLength = 150;
const maximumDescriptionLength = 500;

const tags = [
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

function isString(value) {
  return typeof value === "string";
}

function isStringOrNull(value) {
  return value === null || isString(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function isArrayOfValues(value, values) {
  return isArray(value) && value.every((item) => values.includes(item));
}

function isOneOf(value, values) {
  return values.includes(value);
}

function isLocalImage(value) {
  return isString(value) && value.startsWith("/img/");
}

function isLocalVideo(value) {
  return isString(value) && value.startsWith("/img/") && value.endsWith(".mp4");
}

function isExternalUrl(value) {
  return isString(value) && value.startsWith("https://");
}

// value can be a valid URL to a local image, eg. '/img/logo.png'
// the file must exist under /static/img/
function fileExists(value) {
  const filePath = path.join(__dirname, "../static", value);
  return fs.existsSync(filePath);
}

function fileMaxSize(value, maxSize) {
  const filePath = path.join(__dirname, "../static", value);
  const stats = fs.statSync(filePath);
  return stats.size <= maxSize;
}

/**
 * @param {string} message
 * @param {import('../src/components/ShowcasePage/ShowcaseProject').ShowcaseProject} project
 * @returns {never}
 */
function fail(message) {
  throw new Error(`showcase.json validation failed: ${message}`);
}

function validate(value, rules) {
  for (const rule of rules) {
    const [predicate, errorMessage] = rule;

    // check if predicate is a function
    if (typeof predicate !== "function") {
      console.log(rules);
      throw new Error("predicate must be a function");
    }

    if (!predicate(value)) {
      fail(errorMessage);
    }
  }
}

/*

export type ShowcaseProject = {
  id: string; //
  description: string; // max 350 characters
  logo: string; // should be a local image under /img/, max size of 100kb
  display: "Large" | "Normal"; // can be null which will default to "Normal"
  name: string;
  oneLiner: string; // should be <=70 characters long
  screenshots: string[]; // if display is Large, it should have either a screenshot or a video
  stats: string; // should be <=70 characters long
  tags: string[]; // should be a subset of the tags in src/components/ShowcasePage/tags.js
  video?: string; // if not null, it should be a local mp4 video under /img/, and it should be under 10MB
  videoContentType?: string; // if not null, and video is valid, it should be "video/mp4"
  usesInternetIdentity: boolean; 
  website: string; // should be an external URL starting with https://
  github?: string; // should be an external URL starting with https://
  twitter?: string; // should be an external URL starting with https://
  youtube?: string; // should be an external URL starting with https://
  submittableId?: string; // should be any string or null
};

*/

function UniqueValue() {
  const values = {};

  this.ensureUnique = (value) => {
    if (values[value]) {
      return false;
    }
    values[value] = true;

    return true;
  };
}

const showcase = require("../showcase.json");

let validationPassed = false;

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function validateShowcasePlugin() {
  if (!validationPassed) {
    const ids = new UniqueValue();
    const githubs = new UniqueValue();
    const websites = new UniqueValue();

    let errorCount = 0;

    for (const project of showcase) {
      try {
        validate(project.name, [[isString, "missing project name"]]);

        validate(project.description, [
          [isString, "missing project description"],
          [
            (value) => value.length <= maximumDescriptionLength,
            `project description too long, should be <= ${maximumDescriptionLength} characters`,
          ],
        ]);

        !project.github &&
          validate(project.website, [
            [isExternalUrl, "missing project website"],
            [websites.ensureUnique, "duplicate project website"],
          ]);

        validate(project.id, [
          [isString, "missing project id"],
          [ids.ensureUnique, "duplicate project id"],
        ]);

        validate(project.tags, [
          [isArray, "missing project tags"],
          [(value) => value.length > 0, "missing project tags"],
          [(value) => isArrayOfValues(value, tags), "invalid project tag"],
        ]);

        project.oneLiner &&
          validate(project.oneLiner, [
            [isString, "invalid project oneLiner"],
            [
              (value) => value.length <= maximumOneLinerLength,
              `project oneLiner too long, should be <= ${maximumOneLinerLength} characters`,
            ],
          ]);

        project.stats &&
          validate(project.stats, [
            [isString, "missing project stats"],
            [
              (value) => value.length <= maximumStatsLength,
              `project stats too long should be <= ${maximumStatsLength} characters`,
            ],
          ]);

        validate(project.logo, [
          [isString, "missing project logo"],
          [fileExists, "project logo file does not exist"],
          [
            (value) => fileMaxSize(value, maximumLogoSize),
            `project logo file too big, should be <= ${maximumLogoSize / 1024
            } kb`,
          ],
        ]);

        project.display &&
          validate(project.display, [
            [
              (v) => isOneOf(v, ["Large", "Normal"]),
              "invalid project display mode",
            ],
          ]);

        project.display === "Large" &&
          !project.video &&
          validate(project.screenshots, [
            [
              (value) => value !== null && value !== undefined,
              "a project with display: Large must have either a video or a screenshot",
            ],
            [
              isArray,
              "project screenshots must be an array of paths to local images under /img/showcase/",
            ],
            [(value) => value.length > 0, "missing project screenshots"],
            [
              (value) => value.every(isLocalImage),
              "invalid project screenshot",
            ],
            [
              (value) =>
                value.every((value) =>
                  fileMaxSize(value, maximumScreenshotSize)
                ),
              `project screenshot file too big, should be <= ${maximumScreenshotSize / 1024
              } kb`,
            ],
            [
              (value) => value.every(fileExists),
              "project screenshot file does not exist",
            ],
          ]);

        project.display === "Large" &&
          !project.screenshots &&
          validate(project.video, [
            [
              isString,
              "a project with display: Large must have either a video or a screenshot",
            ],
            [isLocalVideo, "invalid project video"],
            [fileExists, "project video file does not exist"],
            [
              (value) => fileMaxSize(value, maximumVideoSize),
              `project video file too big, should be <= ${maximumVideoSize / 1024 / 1024
              } mb`,
            ],
            [
              (value) => value.videoContentType === "video/mp4",
              "project video file must be of type video/mp4",
            ],
          ]);

        (!project.website || project.github) &&
          validate(project.github, [
            [isString, "a project must have a website or a github URL"],
            [isExternalUrl, "invalid project github URL"],
            [githubs.ensureUnique, "duplicate project github URL"],
          ]);
      } catch (e) {
        logger.error(`${e.message}\n${JSON.stringify(project, null, 2)}`);
        errorCount++;
      }
    }

    if (errorCount > 0) {
      logger.error(
        `showcase.json validation failed with ${errorCount} error(s).\nTo produce a valid asset bundle, you can use https://mvw4g-yiaaa-aaaam-abnva-cai.icp0.io/`
      );
      process.exit(1);
    }

    logger.info("showcase.json validation passed");
  }

  validationPassed = true;

  return {
    name: "validate-showcase",
  };
};
