import React, { useMemo, useState } from "react";
import String from "@theme-original/CodeBlock/Content/String";
import Container from "@theme/CodeBlock/Container";
import styles from "./styles.module.css";
import { extractConfig, handleRun } from "../hljs_run.js";
import CopyButton from "@theme/CodeBlock/CopyButton";

// NOTE: String component of CodeBlock is being swizzled as a wrapped component.

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
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_552_2339)">
          <path
            d="M8 1.33333C11.676 1.33333 14.6667 4.324 14.6667 8C14.6667 11.676 11.676 14.6667 8 14.6667C4.324 14.6667 1.33333 11.676 1.33333 8C1.33333 4.324 4.324 1.33333 8 1.33333ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM6 11.3333V4.66667L12 8.09733L6 11.3333Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_552_2339">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default function StringWrapper(props) {
  const [code, _] = useState(props.children || "");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const showRunButton =
    props.className === "language-motoko" && !props.hasOwnProperty("no-repl");

  return (
    <div style={{ position: "relative" }}>
      <Container as="div">
        {showRunButton && (
          <div className={styles.buttonGroup}>
            <CopyButton className={styles.copyButton} code={code} />
            <RunButton
              code={code}
              setOutput={setOutput}
              setError={setError}
              config={extractConfig(props)}
            />
          </div>
        )}
        <String {...props} />
      </Container>
      {(output || error) && showRunButton ? (
        <Container as="div">
          {error ? <pre className="motoko-code-error">{error}</pre> : null}
          {output ? (
            <pre className="motoko-code-output">
              <code>{output}</code>
            </pre>
          ) : null}
        </Container>
      ) : null}
    </div>
  );
}
