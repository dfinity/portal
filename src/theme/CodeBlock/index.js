/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { isValidElement, useEffect, useState } from "react";
import clsx from "clsx";
import Highlight, { defaultProps } from "prism-react-renderer";
import copy from "copy-text-to-clipboard";
import Translate, { translate } from "@docusaurus/Translate";
import {
  useThemeConfig,
  parseCodeBlockTitle,
  parseLanguage,
  parseLines,
  ThemeClassNames,
  usePrismTheme,
} from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import { extractConfig, handleRun } from "./hljs_run.js";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import copyIcon from "@site/static/img/copyIcon.png";
import runIcon from "@site/static/img/runIcon.png";

function RunButton(props) {
  // buttons with class "run" will be run in load_moc.js when moc is loaded.
  const className = props.config.isRun ? "run-button run" : "run-button";
  return (
    <button
      type="button"
      className={className}
      aria-label="Run"
      onClick={() => handleRun(props)}
      title="Run Code"
    >
      <img src={runIcon} style={{ width: "20px", height: "20px" }} />
    </button>
  );
}

function ImmutableCodeBlock({ id, code, language, className, style }) {
  const ref = React.createRef();
  useEffect(() => {
    hljs.highlightElement(ref.current);
  }, []);
  return (
    <>
      <pre
        tabIndex={0}
        id={id}
        className={
          (clsx(className, styles.codeBlock, "thin-scrollbar"), language)
        }
        style={style}
        ref={ref}
      >
        <code className={styles.codeBlockLines}>{code}</code>
      </pre>
    </>
  );
}

export default function CodeBlock(props) {
  const children = props.children;
  const blockClassName = props.className ?? "";
  const metastring = props.metastring;
  const title = props.title;
  const languageProp = props.language;
  // const defaultCopyButton = true;
  const { prism } = useThemeConfig();
  const [showCopied, setShowCopied] = useState(false);
  const [mounted, setMounted] = useState(false); // The Prism theme on SSR is always the default theme but the site theme
  // can be in a different mode. React hydration doesn't update DOM styles
  // that come from SSR. Hence force a re-render after mounting to apply the
  // current relevant styles. There will be a flash seen of the original
  // styles seen using this current approach but that's probably ok. Fixing
  // the flash will require changing the theming approach and is not worth it
  // at this point.

  useEffect(() => {
    setMounted(true);
  }, []); // We still parse the metastring in case we want to support more syntax in the
  // future. Note that MDX doesn't strip quotes when parsing metastring:
  // "title=\"xyz\"" => title: "\"xyz\""

  const codeBlockTitle = parseCodeBlockTitle(metastring) || title;
  const prismTheme = usePrismTheme();

  // <pre> tags in markdown map to CodeBlocks and they may contain JSX children.
  // When the children is not a simple string, we just return a styled block
  // without actually highlighting.

  // The children is now guaranteed to be one/more plain strings

  const content = Array.isArray(children) ? children.join("") : children;
  const language =
    languageProp ?? parseLanguage(blockClassName) ?? prism.defaultLanguage;
  const { highlightLines, code } = parseLines(content, metastring, language);

  const handleCopyCode = () => {
    copy(code);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const CopyButton = ({ input }) => {
    let buttonClassNames;
    if (input) {
      buttonClassNames = clsx(
        styles.copyButton,
        "clean-btn",
        styles.defaultCopyButton
      );
    } else {
      buttonClassNames = clsx(styles.copyButton, "clean-btn");
    }

    return (
      <button
        type="button"
        aria-label={translate({
          id: "theme.CodeBlock.copyButtonAriaLabel",
          message: "Copy code to clipboard",
          description: "The ARIA label for copy code blocks button",
        })}
        className={buttonClassNames}
        onClick={handleCopyCode}
      >
        {showCopied ? (
          <Translate
            id="theme.CodeBlock.copied"
            description="The copied button label on code blocks"
          >
            Copied
          </Translate>
        ) : (
          <Translate
            id="theme.CodeBlock.copy"
            description="The copy button label on code blocks"
          >
            Copy
          </Translate>
        )}
      </button>
    );
  };

  if (language === "motoko") {
    if (props.hasOwnProperty("no-repl")) {
      return (
        <ImmutableCodeBlock
          id={props.name}
          code={props.children}
          language="language-motoko"
        />
      );
    }
  }

  const [dfinity_code, setCode] = useState(children);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const codejar = require("react-codejar");
  const lineNumbers = children.split("\n").length > 3;
  const editorRef = codejar.useCodeJar({
    dfinity_code,
    onUpdate: (e) => {
      setCode(e);
    },
    highlight: hljs.highlightElement,
    lineNumbers,
  });

  return (
    <>
      <Highlight
        {...defaultProps}
        key={String(mounted)}
        theme={prismTheme}
        code={code}
        language={language ?? "text"}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            className={clsx(
              styles.codeBlockContainer,
              blockClassName,
              {
                [`language-${language}`]:
                  language && !blockClassName.includes(`language-${language}`),
              },
              ThemeClassNames.common.codeBlock
            )}
          >
            {codeBlockTitle && (
              <div style={style} className={styles.codeBlockTitle}>
                {codeBlockTitle}
              </div>
            )}
            <div className={clsx(styles.codeBlockContent, language)}>
              {language === "candid" && (
                <ImmutableCodeBlock
                  code={props.children}
                  language="language-candid"
                  // added to enhance same
                  className={className}
                />
              )}
              {language === "motoko" && (
                <>
                  <ImmutableCodeBlock
                    code={dfinity_code}
                    language="language-motoko"
                  />
                </>
              )}
              {language !== "motoko" && language !== "candid" && (
                <pre
                  /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
                  tabIndex={0}
                  className={clsx(
                    className,
                    styles.codeBlock,
                    "thin-scrollbar"
                  )}
                  style={style}
                >
                  <code className={styles.codeBlockLines}>
                    {tokens.map((line, i) => {
                      if (line.length === 1 && line[0].content === "\n") {
                        line[0].content = "";
                      }
                      const lineProps = getLineProps({
                        line,
                        key: i,
                      });
                      if (highlightLines.includes(i)) {
                        lineProps.className +=
                          " docusaurus-highlight-code-line";
                      }
                      return (
                        <span key={i} {...lineProps}>
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({
                                token,
                                key,
                              })}
                            />
                          ))}
                          <br />
                        </span>
                      );
                    })}
                  </code>
                </pre>
              )}
              {language !== "motoko" ? (
                <CopyButton input={true} />
              ) : (
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    aria-label={translate({
                      id: "theme.CodeBlock.copyButtonAriaLabel",
                      message: "Copy code to clipboard",
                      description: "The ARIA label for copy code blocks button",
                    })}
                    onClick={handleCopyCode}
                    title="Copy Code"
                  >
                    <img src={copyIcon} className={styles.copyIcon} />
                  </button>
                  <RunButton
                    code={dfinity_code}
                    setOutput={setOutput}
                    setError={setError}
                    config={extractConfig(props)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Highlight>
      {(output || error) && (
        <div>
          {error && <pre style={{ color: "red" }}>{error}</pre>}
          {output && (
            <pre style={{ color: "green" }} className="language-motoko">
              <code>{output}</code>
            </pre>
          )}
        </div>
      )}
    </>
  );
}
