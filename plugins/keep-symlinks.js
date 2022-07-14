/** @type {import('@docusaurus/types').PluginModule} */
const keepSymlinks = (context, options) => {
  return {
    name: `portal-docusaurus-plugin`,
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          symlinks: false,
        },
      };
    },
  };
};

module.exports = keepSymlinks;
