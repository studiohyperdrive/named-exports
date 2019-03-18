const { readFile } = require("./utils/file");
const { matchExports } = require("./utils/match");

module.exports.findExportablesInFile = (file) => new Promise((resolve) => {
  const contents = readFile(file);
  const matches = matchExports(contents);

  resolve(matches.reduce((exportables, match) => ({
    ...exportables,
    matches: [
      ...exportables.matches,
      match,
    ],
  }), {
    file,
    matches: []
  }));
});
