import fs from "fs/promises";
import path from "path";

const filePath = path.join(".");

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
  "deployed-icp_as_compute_platform.json",
  "deployed-trusted_ai.json",
  "deployed-chain_fusion.json",
  "deployed-privacy.json",
  "deployed-decentralization.json",
  "deployed-identity.json",
  "deployed-digital_assets.json",
  "deployed-governance.json",
  "deployed-trusted_ai.json",
  "deployed-dx.json",
];

function removeUnusedFields(element) {
  const fieldsToRemove = ["wiki", "description", "stack_rank", "notes"];
  fieldsToRemove.forEach((field) => {
    if (element.hasOwnProperty(field)) {
      delete element[field];
    }
  });
  return element;
}

async function processFile(file) {
  const fullPath = path.join(filePath, file);
  console.log(`Attempting to process: ${fullPath}`);

  try {
    // Check if file exists
    await fs.access(fullPath);

    // Read the file
    const data = JSON.parse(await fs.readFile(fullPath, "utf8"));

    // Process the elements
    data.elements = data.elements.map(removeUnusedFields);

    // Write the processed data back to the file
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2));

    console.log(`Successfully processed ${file}`);
  } catch (error) {
    console.error(`Error processing ${file}: ${error.message}`);
    if (error.code === "ENOENT") {
      console.error(`File not found: ${fullPath}`);
    }
  }
}

async function main() {
  for (const file of files) {
    await processFile(file);
  }
  console.log("All files have been processed.");
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
});
