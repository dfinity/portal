import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";
function NoteIcon() {
  return (
    <svg viewBox="0 0 14 16" className={styles.admonitionIcon}>
      <path
        fillRule="evenodd"
        d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"
      />
    </svg>
  );
}
function TipIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.admonitionIcon}
    >
      <rect width="24" height="24" rx="12" fill="#26D76D" />
      <path
        d="M16.6663 8.48933C16.6663 11.2653 14.1663 13.1427 14.1663 15.3333H12.8383C12.839 13.9473 13.5023 12.7827 14.1503 11.658C14.759 10.6013 15.333 9.60267 15.333 8.48933C15.333 6.41733 13.6543 5.33333 11.997 5.33333C10.3423 5.33333 8.66634 6.41733 8.66634 8.48933C8.66634 9.60267 9.24034 10.6013 9.84901 11.658C10.497 12.7827 11.1597 13.9473 11.1603 15.3333H9.83301C9.83301 13.1427 7.33301 11.2647 7.33301 8.48933C7.33301 5.594 9.66501 4 11.997 4C14.3317 4 16.6663 5.596 16.6663 8.48933ZM13.9997 16.3333C13.9997 16.5173 13.8503 16.6667 13.6663 16.6667H10.333C10.149 16.6667 9.99967 16.5173 9.99967 16.3333C9.99967 16.1493 10.149 16 10.333 16H13.6663C13.8503 16 13.9997 16.1493 13.9997 16.3333ZM13.9997 17.6667C13.9997 17.8507 13.8503 18 13.6663 18H10.333C10.149 18 9.99967 17.8507 9.99967 17.6667C9.99967 17.4827 10.149 17.3333 10.333 17.3333H13.6663C13.8503 17.3333 13.9997 17.4827 13.9997 17.6667ZM12.8657 19.7727C12.739 19.9167 12.5557 20 12.3643 20H11.635C11.4437 20 11.2603 19.9167 11.1337 19.7727L10.1663 18.6667H13.833L12.8657 19.7727ZM10.4463 8.87467L9.65434 8.77267C9.82701 7.44267 10.6543 6.45733 11.9997 6.208L12.1457 6.99267C10.8477 7.23333 10.5237 8.27533 10.4463 8.87467Z"
        fill="white"
      />
    </svg>
  );
}
function DangerIcon() {
  return (
    <svg viewBox="0 0 12 16" className={styles.admonitionIcon}>
      <path
        fillRule="evenodd"
        d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"
      />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.admonitionIcon}
    >
      <rect width="24" height="24" rx="12" fill="#29ABE2" />
      <path
        d="M12 5.33333C15.676 5.33333 18.6667 8.324 18.6667 12C18.6667 15.676 15.676 18.6667 12 18.6667C8.324 18.6667 5.33333 15.676 5.33333 12C5.33333 8.324 8.324 5.33333 12 5.33333ZM12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4ZM11.9993 7.83333C12.4593 7.83333 12.8333 8.20667 12.8333 8.66667C12.8333 9.12667 12.4593 9.5 11.9993 9.5C11.5393 9.5 11.1667 9.12667 11.1667 8.66667C11.1667 8.20667 11.5393 7.83333 11.9993 7.83333ZM13.3333 16H10.6667V15.3333C10.9893 15.214 11.3333 15.1993 11.3333 14.8433V11.8653C11.3333 11.5093 10.9893 11.4533 10.6667 11.334V10.6673H12.6667V14.844C12.6667 15.2007 13.0113 15.216 13.3333 15.334V16Z"
        fill="white"
      />
    </svg>
  );
}
function CautionIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.admonitionIcon}
    >
      <rect width="24" height="24" rx="12" fill="#F68E5F" />
      <path
        d="M5.39634 17.2575L11.5617 6.25746C11.6503 6.09946 11.8177 6.00146 11.9997 6.00146C12.181 6.00146 12.349 6.09946 12.437 6.25746L18.6023 17.2575C18.645 17.3341 18.6663 17.4181 18.6663 17.5021C18.6663 17.7588 18.4603 18.0015 18.165 18.0015H5.83434C5.54101 18.0015 5.33301 17.7615 5.33301 17.5021C5.33301 17.4181 5.35367 17.3341 5.39634 17.2575ZM12.001 12.6701C11.725 12.6701 11.501 12.8941 11.501 13.1701V15.5035C11.501 15.7795 11.725 16.0035 12.001 16.0035C12.277 16.0035 12.501 15.7795 12.501 15.5035V13.1701C12.501 12.8941 12.277 12.6701 12.001 12.6701ZM11.9997 10.6701C11.6317 10.6701 11.333 10.9688 11.333 11.3368C11.333 11.7048 11.6317 12.0035 11.9997 12.0035C12.3677 12.0035 12.6663 11.7048 12.6663 11.3368C12.6663 10.9688 12.3677 10.6701 11.9997 10.6701Z"
        fill="white"
      />
    </svg>
  );
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const AdmonitionConfigs = {
  note: {
    infimaClassName: "secondary",
    iconComponent: NoteIcon,
    label: (
      <Translate
        id="theme.admonition.note"
        description="The default label used for the Note admonition (:::note)"
      >
        note
      </Translate>
    ),
  },
  tip: {
    infimaClassName: "success",
    iconComponent: TipIcon,
    label: (
      <Translate
        id="theme.admonition.tip"
        description="The default label used for the Tip admonition (:::tip)"
      >
        tip
      </Translate>
    ),
  },
  danger: {
    infimaClassName: "danger",
    iconComponent: DangerIcon,
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)"
      >
        danger
      </Translate>
    ),
  },
  info: {
    infimaClassName: "info",
    iconComponent: InfoIcon,
    label: (
      <Translate
        id="theme.admonition.info"
        description="The default label used for the Info admonition (:::info)"
      >
        info
      </Translate>
    ),
  },
  caution: {
    infimaClassName: "warning",
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)"
      >
        caution
      </Translate>
    ),
  },
};
// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: "note",
  important: "info",
  success: "tip",
  warning: "danger",
};
function getAdmonitionConfig(unsafeType) {
  const type = aliases[unsafeType] ?? unsafeType;
  const config = AdmonitionConfigs[type];
  if (config) {
    return config;
  }
  console.warn(
    `No admonition config found for admonition type "${type}". Using Info as fallback.`
  );
  return AdmonitionConfigs.info;
}
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
    rest,
  };
}
function processAdmonitionProps(props) {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(
    props.children
  );
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  };
}
export default function Admonition(props) {
  const {
    children,
    type,
    title,
    icon: iconProp,
  } = processAdmonitionProps(props);
  const typeConfig = getAdmonitionConfig(type);
  const titleLabel = title ?? typeConfig.label;
  const { iconComponent: IconComponent } = typeConfig;

  // console.log("Admonition", {
  //   type,
  //   title,
  // });

  const Icon = {
    info: InfoIcon,
    important: InfoIcon,
    tip: TipIcon,
    success: TipIcon,
    danger: DangerIcon,
    note: NoteIcon,
    secondary: NoteIcon,
    caution: CautionIcon,
    warning: CautionIcon,
  }[type];

  return (
    <div
      className={clsx(styles.admonition, {
        [styles.admonitionInfo]: type === "info",
        [styles.admonitionInfo]: type === "important",
        [styles.admonitionWarning]: type === "caution",
        [styles.admonitionWarning]: type === "warning",
        [styles.admonitionTip]: type === "tip",
        [styles.admonitionSuccess]: type === "success",
        [styles.admonitionDanger]: type === "danger",
        [styles.admonitionNote]: type === "note",
        [styles.admonitionSecondary]: type === "secondary",
      })}
    >
      {children}
      <Icon />
    </div>
  );
}
