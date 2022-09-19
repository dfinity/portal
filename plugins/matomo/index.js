const path = require("path");

/** @type {import('@docusaurus/types').PluginModule} */
const matomoPlugin = async function () {
  return {
    name: "matomo",
    getClientModules() {
      const isProd = process.env.NODE_ENV === "production";

      return isProd ? [path.resolve(__dirname, "./module")] : [];
    },
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
// _paq.push(['trackPageView']);
_paq.push(['disableCookies']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="https://internetcomputer.matomo.cloud/";
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', '1']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src='//cdn.matomo.cloud/internetcomputer.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
})();`,
          },
        ],
      };
    },
  };
};

module.exports = matomoPlugin;
