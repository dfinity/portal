const fs = require("fs");
const path = require("path");


// TODO This is a temporary workaround to get the change up on the site
//      it maybe not be necessary after https://github.com/caffeinelabs/motoko/pull/6022
//      is merged

/** @type {import('@docusaurus/types').PluginModule} */
const patchSubmodules = () => ({
  name: "patch-submodules",
  async loadContent() {
    fs.copyFileSync(
      path.resolve(__dirname, "../patches/motoko-home.mdx"),
      path.resolve(__dirname, "../submodules/motoko/doc/md/1-home.mdx")
    );
  },
});

module.exports = patchSubmodules;
