import { Asset, createClient, Entry } from "contentful";
const fs = require("fs");
const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST } =
  process.env;

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  host: CONTENTFUL_HOST,
});

interface ShowcasePage {
  projects: Entry<Project>[];
}

interface Project {
  name: string;
  oneLiner: string;
  logo: Asset;
  website: string;
  tags: string[];
  description: string;
  screenshots: Asset[];
  video: Asset;
  github: string;
  usesInternetIdentity: boolean;
  stats: string;
  display: string;
}

async function fetchProjects() {
  const showcasePage = await client.getEntry<ShowcasePage>(
    "7Gqk814Pz6tsWEgAqtt9O9"
  );

  const transformed = showcasePage.fields.projects
    .filter((p) => !!p.fields)
    .map((project) => {
      return {
        name: project.fields.name,
        oneLiner: project.fields.oneLiner,
        website: project.fields.website,
        tags: project.fields.tags,
        description: project.fields.description,
        github: project.fields.github,
        usesInternetIdentity: project.fields.usesInternetIdentity,
        stats: project.fields.stats,
        display: project.fields.display,
        logo: project.fields.logo?.fields.file?.url,
        video: project.fields.video?.fields.file?.url,
        screenshots:
          project.fields.screenshots
            ?.map((ss) => ss.fields.file?.url)
            .filter((ss) => !!ss) || [],
      };
    });

  return transformed;
}

fetchProjects().then((projects) => {
  const jsonString = JSON.stringify(projects, null, 2);
  fs.writeFileSync("./static/showcase.json", jsonString);
});
