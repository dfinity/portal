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

function listFilesRecursive(dir, shouldProcessFile) {
	const results = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...listFilesRecursive(fullPath, shouldProcessFile));
		} else if (shouldProcessFile(fullPath)) {
			results.push(fullPath);
		}
	}
	return results;
}


module.exports = function constantsReplacerPlugin(context, options) {
	const constantsPath = options?.constantsPath || "site-constants.json";
	const includeBuildSubdir = options?.includeBuildSubdir || "docs/building-apps"; // only process this subtree under outDir
	const includeExtensions = options?.includeExtensions || [
		".html",
		".js",
		".css",
		".json",
		".xml",
		".txt",
	];
	const excludePaths = options?.excludePaths || [
		"/img/",
		"/fonts/",
		"/static/",
	];

	return {
		name: "constants-replacer",
		async postBuild({ outDir }) {
			const constants = readConstants(constantsPath);
			const keys = Object.keys(constants);
			if (keys.length === 0) return;
			const tokenRegex = buildTokenRegex(keys);

			const shouldProcessFile = (filePath) => {
				const rel = path.relative(outDir, filePath);
				if (!rel.startsWith(includeBuildSubdir)) return false; // outside target subtree
				if (!includeExtensions.includes(path.extname(filePath))) return false;
				return !excludePaths.some((p) => rel.includes(p));
			};

			const files = listFilesRecursive(outDir, shouldProcessFile);
			for (const file of files) {
				try {
					const content = fs.readFileSync(file, "utf8");
					if (!tokenRegex.test(content)) continue;
					const replaced = content.replace(tokenRegex, (_, key) => String(constants[key] ?? ""));
					if (replaced !== content) {
						fs.writeFileSync(file, replaced, "utf8");
					}
				} catch (err) {
					console.warn(`[constants-replacer] Failed to process ${file}:`, err.message);
				}
			}
		},
	};
};



