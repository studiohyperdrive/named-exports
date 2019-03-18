const path = require("path");

const {
	deleteFile,
	findFiles,
	writeFile
} = require("./utils/file");
const logger = require("./utils/log");
const {
	findExportablesInFile
} = require("./exportables");
const {
	createIndex
} = require("./indexFile");

const root = process.cwd();

const cleanIndex = (clean = true, ext, dir) => {
	if (!clean) {
		return Promise.resolve();
	}

	logger.info("Cleaning index...");

	return deleteFile(path.join(root, dir, `index${ext}`));
};

const writeIndex = (index, ext, dir) => {
	logger.info("Writing index...");

	return writeFile(path.join(root, dir, `index${ext}`), index, {
		json: false
	});
};

module.exports = ({
	dir = ".",
	ext = ".ts",
	clean = true,
} = {}) => {
	return cleanIndex(clean, ext, dir)
		.then(() => findFiles(ext, dir))
		.then((files) => {
			logger.info(`Found ${files.length} files.`);

			return Promise.all(files.map(findExportablesInFile));
		})
		.then((exportables) => {
			logger.info(`Found ${exportables.length} matches.`);

			return createIndex(exportables, dir);
		})
		.then((index) => writeIndex(index, ext, dir))
		.then(() => logger.info("Index created."))
		.catch((err) => logger.error(err));
};
