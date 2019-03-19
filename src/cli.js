#!/usr/bin/env node
const { argv } = require("yargs");

const build = require("./lib/build");
const Logger = require("./lib/utils/log");

const {
	timeout = 30000,
	silent = false,
	...opts
} = argv;

const logger = new Logger({ silent });

const keepAlive = setTimeout(() => {
	logger.error("Process took too long to execute.");
	process.exit(1);
}, timeout);

build(opts, logger)
.then(
	() => {
		clearTimeout(keepAlive);
		process.exit(0);
	},
	() => {
		clearTimeout(keepAlive);
		process.exit(1);
	}
);
