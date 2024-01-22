const fs = require("fs");
const fetch = require("node-fetch");

/**
 * Download a file from a URL and save it to the output path
 * @param {string} url
 * @param {string} output - path to the output file that includes the file name
 */
module.exports = function downloadFile(url, output) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`unexpected response ${res.statusText}`);
      }
      return res.buffer();
    })
    .then((buffer) => {
      fs.writeFileSync(output, buffer);
    });
};
