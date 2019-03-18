"use strict";

var fs = require("fs");

var path = require("path");

var glob = require("glob");

var root = process.cwd();

var readFile = function readFile(file) {
  return fs.readFileSync(file, {
    encoding: "UTF-8"
  });
};

var writeFile = function writeFile(dest, contents) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$json = _ref.json,
      json = _ref$json === void 0 ? true : _ref$json;

  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, json ? JSON.stringify(contents, null, 2) : contents, {
      encoding: "UTF-8"
    }, function (err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

var deleteFile = function deleteFile(file) {
  return new Promise(function (resolve, reject) {
    if (!fs.existsSync(file)) {
      return resolve();
    }

    fs.unlink(file, function (err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

var findFiles = function findFiles(ext, dir) {
  return new Promise(function (resolve, reject) {
    glob(path.join(root, dir, "**", "*".concat(ext)), function (err, files) {
      if (err) {
        return reject(err);
      }

      resolve(files);
    });
  });
};

var fileName = function fileName(file) {
  return path.basename(file).split(".").slice(0, -1).join("_");
};

var filePath = function filePath(file, root) {
  var pathSegments = file.split(path.sep);
  var rootIndex = pathSegments.indexOf(root);
  return pathSegments.slice(rootIndex + 1).join("/").replace(/\.[a-zA-Z0-9]+$/, "");
};

module.exports = {
  deleteFile: deleteFile,
  fileName: fileName,
  filePath: filePath,
  findFiles: findFiles,
  readFile: readFile,
  writeFile: writeFile
};