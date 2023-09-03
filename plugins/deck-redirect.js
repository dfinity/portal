const fs = require("fs");
const path = require("path");
const template = require("./utils/redirect-template");

module.exports = function deckRedirectPulgin(context) {
  return {
    name: "deck-redirect",

    async postBuild() {
      const staticDir = path.join(context.siteDir, "static");
      const files = fs.readdirSync(staticDir);
      const versionedFiles = files
        .filter((file) => /^icp_version_(\d+(\.\d+)?)\.pdf$/.test(file))
        .map((file) => {
          const match = file.match(/^icp_version_(\d+)(\.\d+)?\.pdf$/);
          return {
            file,
            major: parseInt(match[1], 10),
            minor: match[2] ? parseInt(match[2].slice(1), 10) : 0,
          };
        });

      // Sort the files by major and minor version numbers in descending order
      versionedFiles.sort((a, b) => {
        if (a.major !== b.major) {
          return b.major - a.major;
        }
        return b.minor - a.minor;
      });

      // Get the file with the highest version number
      const highestVersionFile = versionedFiles[0].file;

      const destinationPath = path.join(
        context.outDir,
        "deck-main",
        "index.html"
      );

      fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

      console.log(
        `Writing redirect from ${destinationPath} to /${highestVersionFile}`,
        `Path: ${path.dirname(destinationPath)}`
      );

      fs.writeFileSync(
        destinationPath,
        template(
          {
            to: `/${highestVersionFile}`,
          },
          `
    <title>Build on the network. ICP | Internet Computer ∞</title>
    <meta name="description" content="What the World Computer does, and how it works, in 5 minutes">
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="${context.siteConfig.url}">
    <meta name="twitter:title" content="Build on the network. ICP | Internet Computer ∞">
    <meta name="twitter:description" content="What the World Computer does, and how it works, in 5 minutes">
    <meta name="twitter:image" content="${context.siteConfig.url}/img/shareImages/share-deck.jpg">

    <meta property="og:title" content="Build on the network. ICP | Internet Computer ∞" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="/deck-main" />
    <meta property="og:image" content="${context.siteConfig.url}/img/shareImages/share-deck.jpg" />
        `
        )
      );
    },
  };
};

// test
// const rootDir = path.join(__dirname, "..");
// module
//   .exports({
//     siteDir: rootDir,
//     outDir: path.join(rootDir, "build"),
//     siteConfig: {
//       url: "https://internetcomputer.org",
//     },
//   })
//   .postBuild();
