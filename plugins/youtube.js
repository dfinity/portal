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
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${DFINITY_CHANNEL_ID}&part=snippet&order=date&maxResults=1&type=video&videoEmbeddable=true`,
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

async function pickThumbnail(thumbnails, videoId) {
  if (!thumbnails || !videoId) {
    return "";
  }

  const maxresdefaultUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  const checkImageExists = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const maxresdefaultExists = await checkImageExists(maxresdefaultUrl);

  if (maxresdefaultExists) {
    return maxresdefaultUrl;
  } else {
    const qualities = ["high", "medium", "default"];
    for (const quality of qualities) {
      if (thumbnails[quality]) {
        return thumbnails[quality].url;
      }
    }
    return "";
  }
}

let cache;

/** @type {import('@docusaurus/types').PluginModule} */
const youtubePlugin = async function () {
  return {
    name: "youtube",
    async loadContent() {
      if (!cache) {
        if (!YOUTUBE_API_KEY) {
          logger.warn(
            "Warning: no env variables found for Youtube integration. Using mock youtube data."
          );
          return require("./data/youtube-mock");
        }

        const mostRecentVideo = await getMostRecentVideo();
        const thumbnail = await pickThumbnail(
          mostRecentVideo.snippet.thumbnails,
          mostRecentVideo?.id?.videoId
        );

        cache = {
          mostRecentVideo: {
            id: mostRecentVideo.id.videoId,
            title: mostRecentVideo.snippet.title,
            description: mostRecentVideo.snippet.description,
            thumbnail: thumbnail,
            publishedAt: mostRecentVideo.snippet.publishedAt,
          },
        };
      }

      return cache;
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
