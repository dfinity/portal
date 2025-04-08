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
 * @returns {string} Error message
 */
function buildErrorMessage(message, project) {
  return `${message}\n${JSON.stringify(project, null, 2)}`;
}

function validate(value, rules, project) {
  for (const rule of rules) {
    const [predicate, errorMessage] = rule;

    // check if predicate is a function
    if (typeof predicate !== "function") {
      console.log(rules);
      throw new Error("predicate must be a function");
    }

    if (!predicate(value)) {
      return errorMessage;
    }
  }
  return null; // No errors
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

let showcase = require("../showcase.json");
const showcasePath = path.join(__dirname, "../showcase.json");

let validationPassed = false;

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function validateShowcasePlugin() {
  if (!validationPassed) {
    const ids = new UniqueValue();
    const githubs = new UniqueValue();
    const websites = new UniqueValue();

    let errorCount = 0;
    let invalidProjects = [];
    let validProjects = [];

    for (const project of showcase) {
      let isValid = true;
      let errors = [];

      try {
        // Check for required name
        const nameError = validate(
          project.name,
          [[isString, "missing project name"]],
          project
        );
        if (nameError) {
          errors.push(nameError);
          isValid = false;
        }

        // Check for required description
        const descError = validate(
          project.description,
          [
            [isString, "missing project description"],
            [
              (value) => value.length <= maximumDescriptionLength,
              `project description too long, should be <= ${maximumDescriptionLength} characters`,
            ],
          ],
          project
        );
        if (descError) {
          errors.push(descError);
          isValid = false;
        }

        // Check for website if no GitHub
        if (!project.github) {
          const websiteError = validate(
            project.website,
            [
              [isExternalUrl, "missing project website"],
              [websites.ensureUnique, "duplicate project website"],
            ],
            project
          );
          if (websiteError) {
            errors.push(websiteError);
            isValid = false;
          }
        }

        // Check for required ID
        const idError = validate(
          project.id,
          [
            [isString, "missing project id"],
            [ids.ensureUnique, "duplicate project id"],
          ],
          project
        );
        if (idError) {
          errors.push(idError);
          isValid = false;
        }

        // Check for tags
        const tagsError = validate(
          project.tags,
          [
            [isArray, "missing project tags"],
            [(value) => value.length > 0, "missing project tags"],
            [(value) => isArrayOfValues(value, tags), "invalid project tag"],
          ],
          project
        );
        if (tagsError) {
          errors.push(tagsError);
          isValid = false;
        }

        // Check oneLiner if present
        if (project.oneLiner) {
          const oneLinerError = validate(
            project.oneLiner,
            [
              [isString, "invalid project oneLiner"],
              [
                (value) => value.length <= maximumOneLinerLength,
                `project oneLiner too long, should be <= ${maximumOneLinerLength} characters`,
              ],
            ],
            project
          );
          if (oneLinerError) {
            errors.push(oneLinerError);
            isValid = false;
          }
        }

        // Check stats if present
        if (project.stats) {
          const statsError = validate(
            project.stats,
            [
              [isString, "missing project stats"],
              [
                (value) => value.length <= maximumStatsLength,
                `project stats too long should be <= ${maximumStatsLength} characters`,
              ],
            ],
            project
          );
          if (statsError) {
            errors.push(statsError);
            isValid = false;
          }
        }

        // Check logo
        const logoError = validate(
          project.logo,
          [
            [isString, "missing project logo"],
            [fileExists, "project logo file does not exist"],
            [
              (value) => fileMaxSize(value, maximumLogoSize),
              `project logo file too big, should be <= ${
                maximumLogoSize / 1024
              } kb`,
            ],
          ],
          project
        );
        if (logoError) {
          errors.push(logoError);
          isValid = false;
        }

        // Check display if present
        if (project.display) {
          const displayError = validate(
            project.display,
            [
              [
                (v) => isOneOf(v, ["Large", "Normal"]),
                "invalid project display mode",
              ],
            ],
            project
          );
          if (displayError) {
            errors.push(displayError);
            isValid = false;
          }
        }

        // Check for Large display requirements - screenshots
        if (project.display === "Large" && !project.video) {
          const screenshotsError = validate(
            project.screenshots,
            [
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
                `project screenshot file too big, should be <= ${
                  maximumScreenshotSize / 1024
                } kb`,
              ],
              [
                (value) => value.every(fileExists),
                "project screenshot file does not exist",
              ],
            ],
            project
          );
          if (screenshotsError) {
            errors.push(screenshotsError);
            isValid = false;
          }
        }

        // Check for Large display requirements - video
        if (project.display === "Large" && !project.screenshots) {
          const videoError = validate(
            project.video,
            [
              [
                isString,
                "a project with display: Large must have either a video or a screenshot",
              ],
              [isLocalVideo, "invalid project video"],
              [fileExists, "project video file does not exist"],
              [
                (value) => fileMaxSize(value, maximumVideoSize),
                `project video file too big, should be <= ${
                  maximumVideoSize / 1024 / 1024
                } mb`,
              ],
              [
                (value) => project.videoContentType === "video/mp4",
                "project video file must be of type video/mp4",
              ],
            ],
            project
          );
          if (videoError) {
            errors.push(videoError);
            isValid = false;
          }
        }

        // Check for website or GitHub
        if (!project.website && !project.github) {
          const githubError = validate(
            project.github,
            [
              [isString, "a project must have a website or a github URL"],
              [isExternalUrl, "invalid project github URL"],
              [githubs.ensureUnique, "duplicate project github URL"],
            ],
            project
          );
          if (githubError) {
            errors.push(githubError);
            isValid = false;
          }
        } else if (project.github) {
          // If GitHub is present, validate it
          const githubError = validate(
            project.github,
            [
              [isExternalUrl, "invalid project github URL"],
              [githubs.ensureUnique, "duplicate project github URL"],
            ],
            project
          );
          if (githubError) {
            errors.push(githubError);
            isValid = false;
          }
        }

        if (isValid) {
          validProjects.push(project);
        } else {
          invalidProjects.push({
            project,
            errors,
          });
          errorCount++;
        }
      } catch (e) {
        logger.error(
          `Unexpected error validating project: ${e.message}\n${JSON.stringify(
            project,
            null,
            2
          )}`
        );
        invalidProjects.push({
          project,
          errors: [e.message],
        });
        errorCount++;
      }
    }

    if (errorCount > 0) {
      logger.warn(
        `showcase.json validation found ${errorCount} project(s) with issues. These will be removed from the showcase.`
      );

      // Log details about invalid projects
      invalidProjects.forEach(({ project, errors }) => {
        logger.warn(
          `Project "${
            project.name || project.id || "unknown"
          }" failed validation:`
        );
        errors.forEach((error) => logger.warn(`  - ${error}`));
      });

      // Write the valid projects back to showcase.json
      fs.writeFileSync(showcasePath, JSON.stringify(validProjects, null, 2));

      logger.info(
        `Updated showcase.json with ${validProjects.length} valid projects.`
      );

      // Update the showcase variable to use the filtered list
      showcase = validProjects;
    } else {
      logger.info("showcase.json validation passed for all projects");
    }
  }

  validationPassed = true;

  return {
    name: "validate-showcase",
  };
};
