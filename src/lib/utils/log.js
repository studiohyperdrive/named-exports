const chalk = require("chalk");

/* eslint-disable no-console */

class Logger {
	constructor({ silent = false } = {}) {
		this.silent = silent;
		this.error = this.instance("error");
		this.success = this.instance("success");
		this.warn = this.instance("warn");
		this.info = this.instance("info");
		this.log = this.instance();
	}

	instance(type) {
		return (...args) => {
			if (this.silent) {
				return;
			}

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
	}
}

/* eslint-enable no-console */

module.exports = Logger;
