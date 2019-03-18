const matchPattern = (input, pattern, group = 1) => {
  if (!input || !pattern) {
    return [];
  }

  const matches = [];
  let match;

  while (match = pattern.exec(input)) { // eslint-disable-line no-cond-assign
    matches.push(match[group]);
  }

  return matches.filter((match) => !!String(match).length);
};

const matchExports = (input) => {
  const statementPattern = /export((\s([a-zA-Z0-9_$]+)(:|\()?)*)/g;
  const statements = matchPattern(input, statementPattern);

  return statements.map((statement) => {
    const parts = statement
      .replace(/^export\s/, "")
      .replace("abstract", "")
      .replace(/[(){}[\]]/, "")
      .split(/\s/);

    const keywordIndex = parts.findIndex((part) => [
      "class",
      "type",
      "interface",
      "enum",
      "const",
      "function",
      "let",
      "var",
    ].includes(part));

    return keywordIndex >= 0 ? parts[keywordIndex + 1] : parts[1];
  });
};

module.exports = {
  matchExports,
  matchPattern,
};
