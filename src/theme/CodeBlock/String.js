import React, { useState, useEffect } from "react";
import String from "@theme-original/CodeBlock/Content/String";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Container from "@theme/CodeBlock/Container";
import styles from "./styles.module.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

registerMotoko();
hljs.configure({
  ignoreUnescapedHTML: true,
  languages: ["motoko", "candid"],
});

function RunButton(props) {
  // buttons with class "run" will be run in load_moc.js when moc is loaded.
  const className = props.config.isRun ? "run-button run" : "run-button";
  return (
    <button
      type="button"
      class={className}
      aria-label="Run"
      onClick={() => handleRun(props)}
    >
      <svg
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "35px", height: "35px" }}
      >
        <g>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </g>
      </svg>
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

function extractConfig(props) {
  const name = props.name ? props.name + ".mo" : "stdin";
  var include = [];
  if (props.hasOwnProperty("include")) {
    var split = props.include.split(",");
    split.forEach((f) => include.push(f));
  }
  return {
    name,
    include,
    isRun: props.hasOwnProperty("run"),
  };
}

function saveIncluded(include) {
  var codes = {};
  include.forEach((id) => {
    const node = document.getElementById(id);
    const code = node.innerText;
    const name = id + ".mo";
    Motoko.saveFile(name, code);
    codes[name] = code;
  });
  return codes;
}

function handleRun({ code, setOutput, setError, config }) {
  if (typeof Motoko !== "undefined") {
    const codes = saveIncluded(config.include);
    const file = config.name;
    Motoko.saveFile(file, code);
    const list = config.include.map((s) => s + ".mo");
    const out = Motoko.run(list, file);
    setOutput(out.stdout);
    setError(out.stderr);
  } else {
    console.log("moc not found");
  }
}

function registerMotoko() {
  var string = {
    className: "string",
    variants: [
      {
        begin: /r(#*)"(.|\n)*?"\1(?!#)/,
      },
      {
        begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/,
      },
    ],
  };
  var number = {
    className: "number",
    variants: [
      {
        begin: "[+-]?\\b0[xX]([A-Fa-f0-9_]+)",
      },
      {
        begin: "[+-]?\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)",
      },
    ],
    relevance: 0,
  };
  hljs.registerLanguage("motoko", function (hljs) {
    return {
      name: "Motoko",
      aliases: ["mo"],
      keywords: {
        $pattern: "[a-zA-Z_]\\w*",
        keyword:
          "actor and await break case catch class" +
          " continue debug do else for func if in import" +
          " module not object or label let loop private" +
          " public return shared try throw query switch" +
          " type var while stable flexible system debug_show assert ignore from_candid to_candid",
        literal: "true false null",
        built_in:
          "Any None Null Bool Int Int8 Int16 Int32 Int64" +
          " Nat Nat8 Nat16 Nat32 Nat64 Word8 Word16 Word32 Word64" +
          " Float Char Text Blob Error Principal" +
          " async",
      },
      illegal: "</",
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.COMMENT("/\\*", "\\*/", {
          contains: ["self"],
        }),
        hljs.inherit(hljs.QUOTE_STRING_MODE, {
          begin: /b?"/,
          illegal: null,
        }),
        string,
        number,
        {
          className: "symbol",
          begin: "#" + hljs.UNDERSCORE_IDENT_RE,
        },
        {
          className: "function",
          beginKeywords: "func",
          end: "(\\(|<|=|{)",
          excludeEnd: true,
          contains: [hljs.UNDERSCORE_TITLE_MODE],
        },
        {
          className: "class",
          begin: "\\b(actor( class)?|module|object)\\b",
          keywords: "actor class module object",
          end: "(\\(|<|{)",
          contains: [hljs.UNDERSCORE_TITLE_MODE],
          illegal: "[\\w\\d]",
        },
        {
          className: "built_in",
          beginKeywords: "import type",
          end: "(;|$|=)",
          excludeEnd: true,
          contains: [
            hljs.QUOTE_STRING_MODE,
            hljs.C_LINE_COMMENT_MODE,
            hljs.COMMENT("/\\*", "\\*/", {
              contains: ["self"],
            }),
          ],
        },
      ],
    };
  });
  hljs.registerLanguage("candid", function (hljs) {
    return {
      name: "Candid",
      aliases: ["did"],
      keywords: {
        $pattern: "[a-zA-Z_]\\w*",
        keyword: "import service type",
        built_in:
          "opt vec record variant func blob principal" +
          " nat nat8 nat16 nat32 nat64 int int8 int16 int32 int64" +
          " float32 float64 bool text null reserved empty" +
          " oneway query",
      },
      illegal: "</",
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.COMMENT("/\\*", "\\*/", {
          contains: ["self"],
        }),
        hljs.inherit(hljs.QUOTE_STRING_MODE, {
          begin: /b?"/,
          illegal: null,
        }),
        string,
        number,
      ],
    };
  });
}
