import React, { useState, useEffect } from "react";
import String from "@theme-original/CodeBlock/Content/String";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Container from "@theme/CodeBlock/Container";
import styles from "./styles.module.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { extractConfig, handleRun } from "../../hljs_run.js";
import CopyButton from "@theme/CodeBlock/CopyButton";

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

function ImmutableCodeBlock({ id, code, language }) {
  const ref = React.createRef();
  useEffect(() => {
    hljs.highlightElement(ref.current);
  }, []);
  return (
    <Container as="div">
      <pre id={id} class={language} ref={ref}>
        <code>{code}</code>
      </pre>
    </Container>
  );
}

export default function StringWrapper(props) {
  if (props.className === "language-motoko" && ExecutionEnvironment.canUseDOM) {
    if (props.hasOwnProperty("no-repl")) {
      return (
        <ImmutableCodeBlock
          id={props.name}
          code={props.children}
          language="language-motoko"
        />
      );
    }
    const [code, setCode] = useState(props.children);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const codejar = require("react-codejar");
    const lineNumbers = props.children.split("\n").length > 3;
    const editorRef = codejar.useCodeJar({
      code,
      onUpdate: (e) => {
        setCode(e);
      },
      highlight: hljs.highlightElement,
      lineNumbers,
    });
    return (
      <>
        <Container as="div">
          <div className={styles.codeBlockContent}>
            <pre id={props.name} ref={editorRef} class="language-motoko">
              <code>{code}</code>
            </pre>
            <div className={styles.buttonGroup}>
              <RunButton
                code={code}
                setOutput={setOutput}
                setError={setError}
                config={extractConfig(props)}
              />
            </div>
          </div>
        </Container>
        {output || error ? (
          <Container as="div">
            {error ? <pre style={{ color: "red" }}>{error}</pre> : null}
            {output ? (
              <pre style={{ color: "green" }} class="language-motoko">
                <code>{output}</code>
              </pre>
            ) : null}
          </Container>
        ) : null}
      </>
    );
  }
  if (props.className === "language-candid") {
    return (
      <ImmutableCodeBlock code={props.children} language="language-candid" />
    );
  }
  return (
    <>
      <String {...props} />
    </>
  );
}
