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

const cleanIndex = (clean = true, ext, fileName, dir) => {
	if (!clean) {
		return Promise.resolve();
	}

	logger.info("Cleaning index...");

	return deleteFile(path.join(root, dir, `${fileName}${ext}`));
};

const writeIndex = (index, ext, fileName, dir) => {
	logger.info("Writing index...");

	return writeFile(path.join(root, dir, `${fileName}${ext}`), index, {
		json: false
	});
};

module.exports = ({
	dir = ".",
	ext = ".ts",
	clean = true,
	fileName = "index",
} = {}) => {
	return cleanIndex(clean, ext, fileName, dir)
		.then(() => findFiles(ext, dir))
		.then((files) => {
			logger.info(`Found ${files.length} files.`);

			return Promise.all(files.map(findExportablesInFile));
		})
		.then((exportables) => {
			logger.info(`Found ${exportables.length} matches.`);

			return createIndex(exportables, dir);
		})
		.then((contents) => writeIndex(contents, ext, fileName, dir))
		.then(() => logger.info("Index created."))
		.catch((err) => logger.error(err));
};
