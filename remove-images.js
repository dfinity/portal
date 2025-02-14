const fs = require("fs").promises;
const path = require("path");

async function getRemovedImagesFromFile(filename = "removed-images.txt") {
  const content = await fs.readFile(filename, "utf8");
  return content.split("\n").filter((line) => line.trim() !== "");
}

async function checkPRImages({
  imagesToCheck = [], // Array of image filenames to check
  searchDirs = ["src", "docs", "blog", "community"], // Directories to search for image references
  fileExtensions = [".md", ".mdx", ".js", ".jsx", ".ts", ".tsx"], // File types to search
} = {}) {
  const usedImages = new Set();
  const imageBasenames = new Set(
    imagesToCheck.map((img) => path.basename(img))
  );

  // Search for image references in files
  async function searchForImageReferences(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          // Skip node_modules and build directories
          if (
            !entry.name.startsWith(".") &&
            entry.name !== "node_modules" &&
            entry.name !== "build"
          ) {
            await searchForImageReferences(fullPath);
          }
        } else if (
          fileExtensions.includes(path.extname(entry.name).toLowerCase())
        ) {
          const content = await fs.readFile(fullPath, "utf8");

          // Search for different image reference patterns
          const patterns = [
            // Markdown patterns
            /!\[.*?\]\((.*?)\)/g, // Basic Markdown image
            /\[.*?\]:\s*([^\s]*)/g, // Markdown reference style

            // HTML/JSX attribute patterns
            /(?:src|href|icon|logo|image|background|poster|favicon|thumbnail|avatar|banner|cover)=["'](.*?)["']/g, // Common image attributes
            /(?:src|href|icon|logo|image|background|poster|favicon|thumbnail|avatar|banner|cover)=\{["'](.*?)["']\}/g, // JSX style with quotes
            /(?:src|href|icon|logo|image|background|poster|favicon|thumbnail|avatar|banner|cover)=\{`(.*?)`\}/g, // Template literal in JSX

            // JavaScript/React patterns
            /require\(['"](.+?)['"]\)/g, // require() syntax
            /import\s+.*?\s+from\s+['"](.+?)['"]/g, // import syntax
            /import\(['"](.+?)['"]\)/g, // dynamic import
            /['"](?:\.{1,2})?\/.*?\.(?:png|jpg|jpeg|gif|svg|webp|ico)["']/g, // String literals with image extensions

            // CSS patterns
            /url\(['"]?(.+?)['"]?\)/g, // CSS url() function
            /background(?:-image)?:\s*url\(['"]?(.+?)['"]?\)/g, // CSS background-image

            // Direct path patterns
            /(?<=["'])\/img\/showcase\/[^"']+\.(?:png|jpg|jpeg|gif|svg|webp|ico)["']/g, // Direct showcase path references
            /(?<=["'])\/?static\/img\/[^"']+\.(?:png|jpg|jpeg|gif|svg|webp|ico)["']/g, // Static directory references

            // Template literal patterns
            /\$\{.*?['"](.+?\.(?:png|jpg|jpeg|gif|svg|webp|ico))['"].*?\}/g, // Template literal interpolation

            // Additional React patterns
            /(?:backgroundImage|ImageUrl|imageUrl|avatarUrl|logoUrl|iconUrl):\s*['"`](.+?)['"`]/g, // Object properties
            /(?:backgroundImage|ImageUrl|imageUrl|avatarUrl|logoUrl|iconUrl)=\{['"`](.+?)['"`]\}/g, // JSX props with specific naming

            // Path concatenation patterns
            /path\.(?:join|resolve)\(.*?['"`](.+?)['"`].*?\)/g, // Path manipulation

            // Public URL patterns
            /(?:PUBLIC_URL|publicUrl|baseUrl)\s*\+\s*['"`](.+?)['"`]/g, // Environment variable concatenation

            // Asset import patterns
            /new\s+URL\(['"`](.+?)['"`],\s*import\.meta\.url\)/g, // Vite/modern bundler imports
            /asset:\s*['"`](.+?)['"`]/g, // Asset references

            // Additional framework-specific patterns
            /@asset:\s*['"`](.+?)['"`]/g, // Framework asset notation
            /Asset\.fromModule\(require\(['"`](.+?)['"`]\)\)/g, // React Native style

            // General file path patterns with image extensions
            /['"`][^'"`\s]+\.(?:png|jpg|jpeg|gif|svg|webp|ico)['"`]/g, // Any quoted string ending with image extension
          ];

          for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(content)) !== null) {
              const imagePath = match[1];
              if (imagePath && !imagePath.startsWith("http")) {
                const basename = path.basename(imagePath);
                if (imageBasenames.has(basename)) {
                  usedImages.add(basename);
                  console.log(`Found usage of '${basename}' in ${fullPath}`);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }
  }

  // Execute the search
  console.log("Starting image reference search...");
  console.log("Checking for these images:", [...imageBasenames]);

  for (const dir of searchDirs) {
    await searchForImageReferences(dir);
  }

  // Find unused images
  const unusedImages = [...imageBasenames].filter(
    (image) => !usedImages.has(image)
  );

  console.log("\nResults:");
  console.log("------------------------");
  console.log("Used images:");
  [...usedImages].forEach((image) => console.log(`- ${image}`));
  console.log("\nUnused images:");
  unusedImages.forEach((image) => console.log(`- ${image}`));

  return {
    checked: [...imageBasenames],
    used: [...usedImages],
    unused: unusedImages,
  };
}

// Main execution
async function main() {
  try {
    // Get images from your text file
    const removedImages = await getRemovedImagesFromFile();
    console.log("Reading images from file:", removedImages);

    // Check their usage
    const results = await checkPRImages({ imagesToCheck: removedImages });

    console.log("\nSummary:");
    console.log(`Total images checked: ${results.checked.length}`);
    console.log(`Images found in use: ${results.used.length}`);
    console.log(`Images not found in use: ${results.unused.length}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script
main();
