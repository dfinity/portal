const fs = require("fs");
const path = require("path");

function readConstants(constantsPath) {
	const resolvedPath = path.isAbsolute(constantsPath)
		? constantsPath
		: path.join(process.cwd(), constantsPath);
	const raw = fs.readFileSync(resolvedPath, "utf8");
	return JSON.parse(raw);
}

function buildTokenRegex(constantsKeys) {
	const escapedKeys = constantsKeys.map((k) => k.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"));
	return new RegExp(`\\\\{\\\\{(${escapedKeys.join("|")})\\\\}\\\\}`, "g");
}

module.exports = function remarkConstants(options = {}) {
	const constantsPath = options.constantsPath || "site-constants.json";
	const constants = readConstants(constantsPath);
	const keys = Object.keys(constants);
	if (keys.length === 0) return () => {};
	const tokenRegex = buildTokenRegex(keys);

	function replaceInValue(value) {
		if (typeof value !== "string" || value.length === 0) return value;
		return value.replace(tokenRegex, (_, key) => String(constants[key] ?? ""));
	}

	return function transformer(tree) {
		visitNodes(tree, (node) => {
			if (node.type === "text" || node.type === "html" || node.type === "inlineCode" || node.type === "code") {
				node.value = replaceInValue(node.value);
			}
		});
	};
};

function visitNodes(node, visitor) {
	visitor(node);
	const children = node.children || [];
	for (const child of children) visitNodes(child, visitor);
}



