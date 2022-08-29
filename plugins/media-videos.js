/** @type {import('@docusaurus/types').PluginModule} */
const mediaVideosPlugin = async function () {
  return {
    name: "media-videos",
    async loadContent() {
      return require("../static/mediaVideos.json");
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData, addRoute } = actions;
      setGlobalData(content);
      content.map((video) => {
        addRoute({
          path: "/media/" + video.cleanHref,
          component: "@site/src/components/MediaPage/VideoPage/",
          exact: true,
        });
      });
    },
  };
};
module.exports = mediaVideosPlugin;
