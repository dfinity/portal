import Layout from "@theme/Layout";
import React, { useEffect } from "react";
import ShareMeta from "../components/Common/ShareMeta";

function LiveSessionsPage(): JSX.Element {
  useEffect(() => {
    location.href = "https://dfinity.org/events-and-news";
  }, []);

  return (
    <Layout
      title="Live sessions"
      description="Join live sessions with the DFINITY Foundation to discuss upcoming contributions to the Internet Computer roadmap."
      editPath={`https://github.com/dfinity/portal/edit/master/${__filename}`}
    >
      <ShareMeta image="/img/shareImages/share-live-sessions.jpeg"></ShareMeta>

      <div className="container-12 py-20 tw-lead">
        Redirecting in a moment, please wait...
      </div>
    </Layout>
  );
}

export default LiveSessionsPage;
