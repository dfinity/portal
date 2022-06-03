import type { ClientModule } from "@docusaurus/types";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const MOC_VERSION = "0.6.27";

async function addPackage(name, repo, version, dir) {
  const meta_url = `https://data.jsdelivr.com/v1/package/gh/${repo}@${version}/flat`;
  const base_url = `https://cdn.jsdelivr.net/gh/${repo}@${version}`;
  const response = await fetch(meta_url);
  const json = await response.json();
  const promises = [];
  const fetchedFiles = [];
  for (const f of json.files) {
    if (f.name.startsWith(`/${dir}/`) && /\.mo$/.test(f.name)) {
      const promise = (async () => {
        const content = await (await fetch(base_url + f.name)).text();
        const stripped = name + f.name.slice(dir.length + 1);
        fetchedFiles.push(stripped);
        Motoko.saveFile(stripped, content);
      })();
      promises.push(promise);
    }
  }
  Promise.all(promises).then(() => {
    Motoko.addPackage(name, name + "/");
  });
}

if (ExecutionEnvironment.canUseDOM) {
  // As soon as the site loads in the browser, register a global event listener
  window.addEventListener("load", () => {
    if (document.getElementsByClassName("run-button").length > 0) {
      // if (document.getElementsByClassName("language-motoko").length > 0) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `/moc-interpreter-${MOC_VERSION}.js`;

      script.addEventListener("load", () => {
        addPackage("base", "dfinity/motoko-base", `moc-${MOC_VERSION}`, "src");
        console.log(`moc ${MOC_VERSION} loaded`);
        // Run code
        const btns = document.getElementsByClassName("run-button run");
        // let contains = false;
        // let btns = document.getElementsByClassName("copyButton");
        // let anyButtons = document.querySelectorAll("button");
        // anyButtons.forEach((anyButton) => {
        //   if (anyButton.className.includes("copyButton")) {
        //     contains = true;
        //     btns = [...btns, anyButton];
        //   }
        // });
        // console.log("how many buttons", btns);
        for (var i = 0; i < btns.length; i++) {
          btns[i].click();
        }
      });

      document.head.appendChild(script);
    } else {
      console.log("no motoko code, no onLoad called");
    }
  });
}

export function onRouteDidUpdate({ location, previousLocation }) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (location.pathname !== previousLocation?.pathname) {
    // if (ExecutionEnvironment.canUseEventListeners) {
    console.log("onRouteDidUpdate working");
    // }
  }
}
console.log("client module?");
// const module: ClientModule = {
//   onRouteUpdate({location, previousLocation}) {
//     // ...
//   },
//   onRouteDidUpdate({location, previousLocation}) {
//     if (location.pathname !== previousLocation?.pathname) {
//       if (ExecutionEnvironment.canUseEventListeners) {
//         console.log("onRouteDidUpdate motoko code is here, so onLoad called");
//       }
//     }
//   },
// };
// export default module;
