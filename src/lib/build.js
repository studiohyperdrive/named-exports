const path = require("path");

const {
	deleteFile,
	findFiles,
	writeFile
} = require("./utils/file");
const {
	findExportablesInFile
} = require("./exportables");
const {
	createIndex
} = require("./indexFile");

const root = process.cwd();

module.exports = ({
	dir = ".",
	ext = ".ts",
	clean = true,
	fileName = "index",
	indent = "space",
	indentSize = 2,
	ignore = "*.spec|*.test|*-test|*-spec"
} = {}, logger) => {
	const cleanIndex = (clean = true, {
		ext = ".ts",
		fileName = "index"
	} = {}, dir) => {
		if (!clean) {
			return Promise.resolve();
		}

		logger.info("Cleaning index...");

		return deleteFile(path.join(root, dir, `${fileName}${ext}`));
	};

	const writeIndex = (contents, {
		ext = ".ts",
		fileName = "index"
	} = {}, dir) => {
		logger.info("Writing index...");

		return writeFile(path.join(root, dir, `${fileName}${ext}`), contents, {
			json: false
		});
	};

	return cleanIndex(clean, {
			ext,
			fileName
		}, dir)
		.then(() => findFiles({ ext, ignore }, dir))
		.then((files) => {
			logger.info(`Found ${files.length} files.`);

			return Promise.all(files.map(findExportablesInFile));
		})
		.then((exportables) => {
			logger.info(`Found ${exportables.length} matches.`);

			return createIndex(exportables, {
				indent,
				indentSize
			}, dir);
		})
		.then((contents) => writeIndex(contents, {
			ext,
			fileName
		}, dir))
		.then(() => logger.info("Index created."))
		.catch((err) => logger.error(err));
};
