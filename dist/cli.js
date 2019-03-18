#!/usr/bin/env node
"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _require = require("yargs"),
    argv = _require.argv;

var build = require("./lib/build");

var logger = require("./lib/utils/log");

var _argv$timeout = argv.timeout,
    timeout = _argv$timeout === void 0 ? 30000 : _argv$timeout,
    opts = _objectWithoutProperties(argv, ["timeout"]);

var keepAlive = setTimeout(function () {
  logger.error("Process took too long to execute.");
  process.exit(1);
}, timeout);
build(opts).then(function () {
  clearTimeout(keepAlive);
  process.exit(0);
}, function () {
  clearTimeout(keepAlive);
  process.exit(1);
});