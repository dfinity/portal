import clsx from "clsx";
import React from "react";
import CautionIcon from "./caution.svg";
import DangerIcon from "./danger.svg";
import InfoIcon from "./info.svg";
import NoteIcon from "./note.svg";
import styles from "./styles.module.css";
import TipIcon from "./tip.svg";

// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children);
  const mdxAdmonitionTitle = items.find(
    (item) =>
      React.isValidElement(item) && item.props?.mdxType === "mdxAdmonitionTitle"
  );
  const rest = <>{items.filter((item) => item !== mdxAdmonitionTitle)}</>;
  return {
    mdxAdmonitionTitle,
    rest
  };
}
function processAdmonitionProps(props) {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(
    props.children
  );
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest
  };
}
export default function Admonition(props) {
  const { children, type, title } = processAdmonitionProps(props);

  const Icon = {
    info: InfoIcon,
    important: InfoIcon,
    tip: TipIcon,
    success: TipIcon,

    danger: DangerIcon,

    note: NoteIcon,
    secondary: NoteIcon,

    caution: CautionIcon,
    warning: CautionIcon
  }[type];

  return (
    <div
      className={clsx(styles.admonition, {
        [styles.admonitionInfo]: type === "info" || type === "important",
        [styles.admonitionWarning]: type === "caution" || type === "warning",
        [styles.admonitionTip]: type === "tip" || type === "success",
        [styles.admonitionDanger]: type === "danger",
        [styles.admonitionNote]: type === "note" || type === "secondary",
        [styles.withTitle]: !!title
      })}
    >
      {title ? (
        <>
          <div className={clsx("tw-heading-7", styles.admonitionTitle)}>
            <Icon />
            {title}
          </div>
          {children}
        </>
      ) : (
        <>
          {children}
          <Icon />
        </>
      )}
    </div>
  );
}
