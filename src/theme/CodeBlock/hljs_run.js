import hljs from "highlight.js/lib/core";
import defineMotoko from "highlightjs-motoko";

registerMotoko();
hljs.configure({
  ignoreUnescapedHTML: true,
  languages: ["motoko", "candid"],
});

export function extractConfig(props) {
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

export function handleRun({ code, setOutput, setError, config }) {
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

export function registerMotoko() {
  defineMotoko(hljs);
}
