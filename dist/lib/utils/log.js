"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var chalk = require("chalk");
/* eslint-disable no-console */


var log = function log(type) {
  return function () {
    var _console, _console2, _console3, _console4, _console5;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var message = args[0],
        logArgs = args.slice(1);

    switch (type) {
      case "error":
        return (_console = console).log.apply(_console, [chalk.red(message)].concat(_toConsumableArray(logArgs)));

      case "success":
        return (_console2 = console).log.apply(_console2, [chalk.green(message)].concat(_toConsumableArray(logArgs)));

      case "warn":
        return (_console3 = console).log.apply(_console3, [chalk.yellow(message)].concat(_toConsumableArray(logArgs)));

      case "info":
        return (_console4 = console).log.apply(_console4, [chalk.blue(message)].concat(_toConsumableArray(logArgs)));

      default:
        return (_console5 = console).log.apply(_console5, [message].concat(_toConsumableArray(logArgs)));
    }
  };
};
/* eslint-enable no-console */


module.exports = {
  error: log("error"),
  success: log("success"),
  warn: log("warn"),
  info: log("info"),
  log: log(),
  construct: log
};