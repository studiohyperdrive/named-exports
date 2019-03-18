const chalk = require("chalk");

/* eslint-disable no-console */

const log = (type) => (...args) => {
  const [message, ...logArgs] = args;

  switch (type) {
    case "error":
      return console.log(chalk.red(message), ...logArgs);
    case "success":
      return console.log(chalk.green(message), ...logArgs);
    case "warn":
      return console.log(chalk.yellow(message), ...logArgs);
    case "info":
      return console.log(chalk.blue(message), ...logArgs);
    default:
      return console.log(message, ...logArgs);
  }
};

/* eslint-enable no-console */

module.exports = {
  error: log("error"),
  success: log("success"),
  warn: log("warn"),
  info: log("info"),
  log: log(),
  construct: log,
};
