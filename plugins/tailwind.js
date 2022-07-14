/** @type {import('@docusaurus/types').PluginModule} */
const tailwindPlugin = async function (context, options) {
  return {
    name: "tailwindcss",
    configurePostCss(postCssOptions) {
      postCssOptions.plugins.push(require("tailwindcss"));
      postCssOptions.plugins.push(require("autoprefixer"));
      return postCssOptions;
    },
  };
};

module.exports = tailwindPlugin;
