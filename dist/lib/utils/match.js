"use strict";

var matchPattern = function matchPattern(input, pattern) {
  var group = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (!input || !pattern) {
    return [];
  }

  var matches = [];
  var match;

  while (match = pattern.exec(input)) {
    // eslint-disable-line no-cond-assign
    matches.push(match[group]);
  }

  return matches.filter(function (match) {
    return !!String(match).length;
  });
};

var matchExports = function matchExports(input) {
  var statementPattern = /export((\s([a-zA-Z0-9_$]+)(:|\()?)*)/g;
  var statements = matchPattern(input, statementPattern);
  return statements.map(function (statement) {
    var parts = statement.replace(/^export\s/, "").replace("abstract", "").replace(/[(){}[\]]/, "").split(/\s/);
    var keywordIndex = parts.findIndex(function (part) {
      return ["class", "type", "interface", "enum", "const", "function", "let", "var"].includes(part);
    });
    return keywordIndex >= 0 ? parts[keywordIndex + 1] : parts[1];
  });
};

module.exports = {
  matchExports: matchExports,
  matchPattern: matchPattern
};