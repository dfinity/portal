const createClient = require("contentful").createClient;
const logger = require("@docusaurus/logger");

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST } =
  process.env;

/** @type {import('@docusaurus/types').PluginModule} */
const howItWorksArticlesPlugin = async function () {
  return {
    name: "howitworks-articles",
    async loadContent() {
      if (
        !CONTENTFUL_SPACE_ID ||
        !CONTENTFUL_ACCESS_TOKEN ||
        !CONTENTFUL_HOST
      ) {
        logger.warn(
          "Warning: no env variables found for Contentful integration. Using mock howitworks data."
        );
        return require("./data/howitworks-mock.json");
      }

      const client = createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        host: CONTENTFUL_HOST,
      });

      const howItWorksPage = await client.getEntry("2jdlSaF3APWKTzNmBs9yad");

      return {
        metaTitle: howItWorksPage.fields.metaTitle,
        metaDescription: howItWorksPage.fields.metaDescription,
        heroTitle: howItWorksPage.fields.heroTitle,
        heroBody: howItWorksPage.fields.heroBody,
        otherSessionsTitle: howItWorksPage.fields.otherSessionsTitle,
        featured: {
          title: howItWorksPage.fields.featured.fields.title,
          description: howItWorksPage.fields.featured.fields.description,
          youtubeVideo: howItWorksPage.fields.featured.fields.youtubeVideo,
          listOfLinks: howItWorksPage.fields.featured.fields.listOfLinks,
          coverImage:
            howItWorksPage.fields.featured.fields.coverImage?.fields.file?.url,
          slug: howItWorksPage.fields.featured.fields.slug,
        },
        articles: howItWorksPage.fields.items
          .filter((a) => !!a.fields.description)
          .map((articles) => {
            return {
              title: articles.fields.title,
              description: articles.fields.description,
              youtubeVideo: articles.fields.youtubeVideo,
              listOfLinks: articles.fields.listOfLinks,
              coverImage: articles.fields.coverImage?.fields.file?.url,
              slug: articles.fields.slug,
            };
          }),
      };
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData, addRoute } = actions;
      setGlobalData(content);
      content.articles.map((article) => {
        addRoute({
          path: "/howitworks/" + article.slug,
          component: "@site/src/components/HowItWorksPage/ArticlePage/",
          exact: true,
        });
      });
    },
  };
};

module.exports = howItWorksArticlesPlugin;
