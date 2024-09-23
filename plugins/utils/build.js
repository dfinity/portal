const fs = require("fs");
const path = require("path");
const JsonToTS = require("json-to-ts");

const validators = {
  string: (value) => typeof value === "string",
  notEmptyString: (value) => typeof value === "string" && value.length > 0,
  url: (value) =>
    typeof value === "string" &&
    (value.startsWith("http") || value.length === 0),
  enum: (enumValues) => (value) => enumValues.includes(value),
  boolean: (value) => typeof value === "boolean",
};

// element props allow list
const elementProps = [
  {
    prop: "title",
    value: validators.notEmptyString,
  },
  {
    prop: "overview",
    value: validators.string,
  },
  {
    prop: "description",
    value: validators.string,
  },
  {
    prop: "forum",
    value: validators.url,
  },
  {
    prop: "proposal",
    value: validators.url,
  },
  {
    prop: "docs",
    value: validators.url,
  },
  {
    prop: "eta",
    value: validators.string,
  },
  {
    prop: "eta_to_render",
    value: validators.string,
  },
  {
    prop: "status",
    value: validators.enum([
      "planned",
      "in_progress",
      "deployed",
      "upcoming",
      "future",
      "",
    ]),
  },
  {
    prop: "is_community",
    value: validators.boolean,
  },
  {
    prop: "in_beta",
    value: validators.boolean,
  },
  {
    prop: "milestone_id",
    value: validators.string,
  },
  {
    prop: "imported",
    value: validators.boolean,
  },
  {
    prop: "milestone_id",
    value: validators.string,
  },
  {
    prop: "eta",
    value: validators.string,
  },
  {
    prop: "is_milestone",
    value: validators.boolean,
  },
];

console.log("starting build for:");
const entriesPath = path.join(__dirname, "..", "..", "roadmap", "entries");
const outputPath = path.join(__dirname, "..", "..", "roadmap");

const filePath = entriesPath;

const files = [
  "data-icp_as_compute_platform.json",
  "data-trusted_ai.json",
  "data-chain_fusion.json",
  "data-privacy.json",
  "data-decentralization.json",
  "data-identity.json",
  "data-digital_assets.json",
  "data-governance.json",
  "data-dx.json",
];

const filesDeployed = [
  "deployed-icp_as_compute_platform.json",
  "deployed-trusted_ai.json",
  "deployed-chain_fusion.json",
  "deployed-privacy.json",
  "deployed-decentralization.json",
  "deployed-identity.json",
  "deployed-digital_assets.json",
  "deployed-governance.json",
  "deployed-dx.json",
];

function readFiles(fileList) {
  return fileList.map((file) => {
    const data = fs.readFileSync(path.join(filePath, file), "utf8");
    return JSON.parse(data, 2);
  });
}

const data = readFiles(files);
const dataDeployed = readFiles(filesDeployed);

// validate data
[...data, ...dataDeployed].forEach((d) => {
  d.elements.forEach((e) => {
    elementProps.forEach((prop) => {
      if (e.hasOwnProperty(prop.prop) && prop.value(e[prop.prop]) === false) {
        console.error(`Invalid value for ${prop.prop} in ${e.title}`);
        process.exit(1);
      }
    });
  });
});

// make sure all dataDeployed progress fields are set to "deployed"
dataDeployed.forEach((d) => {
  d.elements.forEach((e) => {
    if (!e["is_milestone"]) {
      e.status = "deployed";
    }
  });
});

const mergedData = data.map((d, i) => {
  d.elements = [...d.elements, ...dataDeployed[i].elements];

  // remove element keys that are not in elementProps
  d.elements.forEach((e) => {
    Object.keys(e).forEach((key) => {
      if (!elementProps.find((p) => p.prop === key)) {
        delete e[key];
        console.info(`Removed key ${key} from ${e.title}`);
      }
    });
  });

  return d;
});

const projects = new Map();

mergedData.forEach((d) => {
  projects.set(d.categoryName, {
    name: d.categoryName,
    description: d.categoryDescription,
    milestones: new Map(),
  });
});

// get milestones by project
mergedData.forEach((d) => {
  const project = projects.get(d.categoryName);
  d.elements.forEach((e) => {
    if (e["is_milestone"] && e["is_milestone"] === true) {
      project.milestones.set(e.milestone_id, {
        name: e.title,
        milestone_id: e.milestone_id,
        description: e.description,
        eta: e.eta_to_render || null,
        status: e.status,
        elements: [],
      });
    }
  });

  // add orphans_past and orphans_future milestones
  project.milestones.set("orphans_past", {
    name: "orphans_past",
    description: "Orphans from the past",
    milestone_id: "Past features",
    eta: "none",
    elements: [],
  });

  project.milestones.set("orphans_future", {
    name: "orphans_future",
    description: "Orphans from the future",
    milestone_id: "Future features",
    eta: "none",
    elements: [],
  });
});

// get elements by milestone
mergedData.forEach((d) => {
  const project = projects.get(d.categoryName);
  d.elements.forEach((e) => {
    if (!e["is_milestone"]) {
      const milestone = project.milestones.get(e.milestone_id);

      if (milestone) {
        milestone.elements.push(e);
      } else if (e.status === "deployed") {
        const milestone = project.milestones.get("orphans_past");
        milestone.elements.push(e);
      } else {
        const milestone = project.milestones.get("orphans_future");
        milestone.elements.push(e);
      }
    }
  });
});

const exportObj = Array.from(projects.values());
exportObj.forEach((p) => {
  p.milestones = Array.from(p.milestones.values());
});

// Update output paths
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Write to roadmap folder
fs.writeFileSync(
  path.join(outputPath, "roadmap.json"),
  JSON.stringify(exportObj, null, 2)
);

let dts = ``;
JsonToTS(exportObj).forEach((typeInterface) => {
  dts += `${typeInterface}\n\n`;
});

console.log("Build completed!");
console.log("Check roadmap folder for the output");

fs.writeFileSync(path.join(outputPath, "roadmap.d.ts"), dts);

process.exit(0);
