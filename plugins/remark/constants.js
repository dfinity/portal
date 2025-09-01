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
	const includePathPrefix = options.includePathPrefix || "docs/building-apps/";
	const constants = readConstants(constantsPath);
	const keys = Object.keys(constants);
	if (keys.length === 0) return () => {};
	const tokenRegex = buildTokenRegex(keys);

	function replaceInValue(value) {
		if (typeof value !== "string" || value.length === 0) return value;
		return value.replace(tokenRegex, (_, key) => String(constants[key] ?? ""));
	}

	return function transformer(tree, file) {
		const filePath = file && (file.path || (file.history && file.history[0]));
		const isVersioned = filePath && filePath.includes("versioned_docs") && filePath.includes("/building-apps/");
		const isCurrent = filePath && filePath.includes(includePathPrefix);
		if (filePath && !(isCurrent || isVersioned)) {
			return; // skip files outside the allowed area
		}
		visitNodes(tree, (node) => {
			if (node.type === "text" || node.type === "html" || node.type === "inlineCode" || node.type === "code") {
				node.value = replaceInValue(node.value);
			}
			// Replace in MDX JSX element attributes as well
			if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
				if (Array.isArray(node.attributes)) {
					for (const attr of node.attributes) {
						if (attr && attr.type === "mdxJsxAttribute") {
							if (typeof attr.value === "string") {
								attr.value = replaceInValue(attr.value);
							} else if (attr.value && typeof attr.value.value === "string") {
								attr.value.value = replaceInValue(attr.value.value);
							}
						}
					}
				}
			}
		});
	};
};

function visitNodes(node, visitor) {
	visitor(node);
	const children = node.children || [];
	for (const child of children) visitNodes(child, visitor);
}



