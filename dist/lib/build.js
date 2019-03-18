"use strict";

var path = require("path");

var _require = require("./utils/file"),
    deleteFile = _require.deleteFile,
    findFiles = _require.findFiles,
    writeFile = _require.writeFile;

var logger = require("./utils/log");

var _require2 = require("./exportables"),
    findExportablesInFile = _require2.findExportablesInFile;

var _require3 = require("./indexFile"),
    createIndex = _require3.createIndex;

var root = process.cwd();

var cleanIndex = function cleanIndex() {
  var clean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var ext = arguments.length > 1 ? arguments[1] : undefined;
  var dir = arguments.length > 2 ? arguments[2] : undefined;

  if (!clean) {
    return Promise.resolve();
  }

  logger.info("Cleaning index...");
  return deleteFile(path.join(root, dir, "index".concat(ext)));
};

var writeIndex = function writeIndex(index, ext, dir) {
  logger.info("Writing index...");
  return writeFile(path.join(root, dir, "index".concat(ext)), index, {
    json: false
  });
};

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$dir = _ref.dir,
      dir = _ref$dir === void 0 ? "." : _ref$dir,
      _ref$ext = _ref.ext,
      ext = _ref$ext === void 0 ? ".ts" : _ref$ext,
      _ref$clean = _ref.clean,
      clean = _ref$clean === void 0 ? true : _ref$clean;

  return cleanIndex(clean, ext, dir).then(function () {
    return findFiles(ext, dir);
  }).then(function (files) {
    logger.info("Found ".concat(files.length, " files."));
    return Promise.all(files.map(findExportablesInFile));
  }).then(function (exportables) {
    logger.info("Found ".concat(exportables.length, " matches."));
    return createIndex(exportables, dir);
  }).then(function (index) {
    return writeIndex(index, ext, dir);
  }).then(function () {
    return logger.info("Index created.");
  }).catch(function (err) {
    return logger.error(err);
  });
};