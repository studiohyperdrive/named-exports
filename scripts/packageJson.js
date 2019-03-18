const fs = require("fs");
const path = require("path");
const root = process.cwd();

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), { encoding: "UTF-8" }));

delete packageJson.scripts;
delete packageJson.devDependencies;

fs.writeFile(
	path.join(root, "dist", "package.json"),
	JSON.stringify(packageJson, null, 2),
	{ encoding: "UTF-8" },
	(err) => {
		if (err) {
			process.exit(1);
		}

		process.exit(0);
	}
);
