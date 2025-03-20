// Validate links for Kapa.ai

const visit = require("unist-util-visit");

function isExpectedLink(url) {
  return (
    url.startsWith("https://") ||
    url.startsWith("http://localhost") ||
    url.startsWith("http://127.0.0.1") ||
    (url.startsWith("http://") && url.includes(".localhost")) ||
    url.startsWith("chrome://") ||
    url.startsWith("mailto:") ||
    url.startsWith("/") ||
    url.startsWith("#") ||
    url.startsWith(".")
  );
}

module.exports = function validateLinks() {
  return async (ast) => {
    visit(ast, "link", (node) => {
      const url = node.url;
      if (url.startsWith("docs/")) {
        throw new Error(
          `Link requires a leading \`/\` character: \`${url}\` (plugins/remark/validate-links.js)`
        );
      }
      if (!isExpectedLink(url)) {
        console.warn(
          `Unexpected link: \`${url}\` (plugins/remark/validate-links.js)`
        );
      }
    });
  };
};
