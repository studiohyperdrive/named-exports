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

const findFiles = ({ ext = ".ts ", exclude, include }, dir) => new Promise((resolve, reject) => {
	const filePattern = exclude ? `!(${exclude}${include || ext})` : `*!(${include || ext})`;

  glob(path.join(root, dir, `**/${filePattern}`), (err, files) => {
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

const filePath = (file, dir) => {
	const relDir = dir.charAt(0) === "." ? dir : path.join(".", dir);
	const absRoot = path.resolve(root, relDir);
	const absFile = path.resolve(absRoot, file);
	const pathSegments = absFile.replace(absRoot, "").split(path.sep);

  return path.join(...pathSegments)
		.replace(/\.[a-zA-Z0-9]+$/, "")
		.replace(/\\/g, "/");
};

module.exports = {
  deleteFile,
  fileName,
  filePath,
  findFiles,
  readFile,
  writeFile,
};
