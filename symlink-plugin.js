module.exports = function(context, options) {
  return {
    name: "symlimk-plugin",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          symlinks: false
        }
      };
    }
  };
};
