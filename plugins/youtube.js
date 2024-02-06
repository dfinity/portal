const logger = require("@docusaurus/logger");
const fetch = require("node-fetch-retry");
const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");
const isDev = (process.env.NODE_ENV || "development") === "development";
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const { YOUTUBE_API_KEY } = process.env;

const DFINITY_CHANNEL_ID = "UCOyguKlTxoDK3HRzmGbLyAg";

async function getMostRecentVideo() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${DFINITY_CHANNEL_ID}&part=snippet&order=date&maxResults=1`,
    {
      headers: {
        Referer: "https://www.dfinity.org",
      },
      retry: 10,
      pause: 5000,
    }
  ).then((r) => r.json());

  return res.items[0];
}

// find the first key with a thumbnal at least 480 px wide
function pickThumbnail(thumbnails) {
  const keys = Object.keys(thumbnails);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (thumbnails[key].width >= 480) {
      return thumbnails[key].url;
    }
  }

  if (thumbnails.default === undefined) {
    return "";
  }

  return thumbnails.default.url;
}

/** @type {import('@docusaurus/types').PluginModule} */
const youtubePlugin = async function () {
  return {
    name: "youtube",
    async loadContent() {
      if (!YOUTUBE_API_KEY) {
        logger.warn(
          "Warning: no env variables found for Youtube integration. Using mock youtube data."
        );
        return require("./data/youtube-mock");
      }

      const mostRecentVideo = await getMostRecentVideo();
      const thumbnal = pickThumbnail(mostRecentVideo.snippet.thumbnails);

      return {
        mostRecentVideo: {
          id: mostRecentVideo.id.videoId,
          title: mostRecentVideo.snippet.title,
          description: mostRecentVideo.snippet.description,
          thumbnail: thumbnal,
          publishedAt: mostRecentVideo.snippet.publishedAt,
        },
      };
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      createData("youtube.json", JSON.stringify(content, null, 2));

      if (isDev) {
        // save mock file
        fs.writeFileSync(
          path.join(__dirname, "data", "youtube-mock.json"),
          JSON.stringify(content, null, 2)
        );
      }
    },
  };
};

module.exports = youtubePlugin;
