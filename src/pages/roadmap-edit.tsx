import roadmapData from "@site/.docusaurus/roadmap-data/default/roadmap-data.json";
import Layout from "@theme/Layout";
import React, { RefObject, useState, useEffect } from "react";
import CMS from "decap-cms-app";

const RoadmapPage: React.FC = () => {

  useEffect(() => {
      CMS.init({
        config: {
          backend: {
            name: 'git-gateway',
          },
          load_config_file: false,
          media_folder: "static/img/",
          public_folder: "/images/img/",
          collections: [
            { label: "Blog", name: "blog", folder: "_posts/blog", create: true, fields: [
            { label: "Title", name: "title", widget: "string" },
            { label: "Publish Date", name: "date", widget: "datetime" },
            { label: "Featured Image", name: "thumbnail", widget: "image" },
            { label: "Body", name: "body", widget: "markdown" },
          ]},
          ],
        },
      });
  }, []);

  return (
    <Layout
      title="Roadmap"
      description="Explore the ICP roadmap, focussing on contributions by the DFINITY Foundation. The roadmap is split into nine workstreams, each highlighting past achievements, upcoming milestones, and features that are further into the future and not yet scoped in detail."
      editPath="https://github.com/dfinity/portal/tree/master/roadmap"
    >
      <main>

      </main>
    </Layout>
  );
};

export default RoadmapPage;
