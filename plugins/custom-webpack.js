/** @type {import('@docusaurus/types').PluginModule} */
const customWebpack = () => {
  return {
    name: `portal-docusaurus-plugin`,
    configureWebpack() {
      return {
        node: {
          __filename: true,
        },
        resolve: {
          symlinks: false,
        },
      };
    },
  };
};

module.exports = customWebpack;
