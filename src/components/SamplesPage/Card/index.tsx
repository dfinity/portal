import React from "react";
import styles from "./index.module.css";
import {
  DocsLink,
  ExternalLink,
  GitHubLink,
  LivePreviewLink,
  MotokoLink,
  RustLink,
  YoutubeLink,
} from "@site/src/components/Common/CardIcons";

function Index({ image, title, domain, body, links }) {
  return (
    <div className={styles.container}>
      <img src={image} className={styles.image} alt="" />
      <div className={styles.information}>
        <div className={styles.domain}>
          <span>{domain}</span>
        </div>

        <p className={styles.title}>{title}</p>

        <p className={styles.body}>{body}</p>
        <div className={styles.footer}>
          {links.motoko && <MotokoLink to={links.motoko} />}
          {links.rust && <RustLink to={links.rust} />}
          {links.livePreview && <LivePreviewLink to={links.livePreview} />}
          {links.docs && <DocsLink to={links.docs} />}
          {links.youtube && <YoutubeLink to={links.youtube} />}
          {links.github && <GitHubLink to={links.github} />}
          {links.external && <ExternalLink to={links.external} />}
        </div>
      </div>
    </div>
  );
}

export default Index;
