const fs = require("fs");
const path = require("path");
const glob = require("glob");

const root = process.cwd();

const readFile = (file) => {
  return fs.readFileSync(file, {
    encoding: "UTF-8"
  });
};

const writeFile = (dest, contents, {
  json = true
} = {}) => new Promise((resolve, reject) => {
  fs.writeFile(
    dest,
    (json ? JSON.stringify(contents, null, 2) : contents), {
      encoding: "UTF-8"
    },
    (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    },
  );
});

const deleteFile = (file) => new Promise((resolve, reject) => {
  if (!fs.existsSync(file)) {
    return resolve();
  }

  fs.unlink(file, (err) => {
    if (err) {
      return reject(err);
    }

    resolve();
  });
});

const findFiles = (ext, dir) => new Promise((resolve, reject) => {
  glob(path.join(root, dir, "**", `*${ext}`), (err, files) => {
    if (err) {
      return reject(err);
    }

    resolve(files);
  });
});

const fileName = (file) => {
  return path.basename(file)
    .split(".")
    .slice(0, -1)
    .join("_");
};

const filePath = (file, root) => {
  const pathSegments = file.split(path.sep);
  const rootIndex = pathSegments.indexOf(root);

  return pathSegments
    .slice(rootIndex + 1)
    .join("/")
    .replace(/\.[a-zA-Z0-9]+$/, "");
};

module.exports = {
  deleteFile,
  fileName,
  filePath,
  findFiles,
  readFile,
  writeFile,
};