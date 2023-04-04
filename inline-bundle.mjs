import { load } from "cheerio";
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

/*
  This script inlines the main bundle into some of the HTML files in the prod build output to improve load experience.
*/

// globSync("build/**/*.html").forEach((file) => {
globSync("build/index.html").forEach((file) => {
  const doc = load(readFileSync(file, "utf8"));
  doc(`link[rel="preload"][href*="main."][href$=".js"]`).each(function (
    _,
    script
  ) {
    script = doc(this);
    const src = script.attr("href");
    console.log(src);
    if (src) {
      script.remove();
      const contents = readFileSync(`build/${src}`, "utf8");
      doc("head").append(`<script>${contents}</script>`);

      // console.log(`inlined ${src}`);

      const origScript = doc(`script[src="${src}"]`);
      if (origScript) {
        origScript.remove();
        // console.log(`removed original script for ${src}`);
      }
    }
  });
  writeFileSync(file, doc.html());
});
