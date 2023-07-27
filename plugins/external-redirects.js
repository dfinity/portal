const path = require("path");
const template = require("./utils/redirect-template");
const fs = require("fs");

function getDestinationPath(outDir, from) {
  if (from.endsWith(".html")) {
    // create single html file
    return path.join(outDir, from);
  } else {
    // create index.html file under the folder
    return path.join(outDir, from, "index.html");
  }
}

/*
  This plugin creates a HTML file in the build directory for each redirect.
  The original docusaurus-client-redirects does not support external redirects or redirects from URLS pointing to .html files.
*/
module.exports = function (pluginOptions) {
  const { redirects } = pluginOptions;
  return function (config) {
    return {
      name: "external-redirects",
      async postBuild() {
        for (const r of redirects) {
          let destinationPath = getDestinationPath(config.outDir, r.from);

          fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

          fs.writeFileSync(
            destinationPath,
            template({
              to: r.to,
            })
          );
        }
      },
    };
  };
};
