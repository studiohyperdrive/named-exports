#!/usr/bin/env node
const { argv } = require("yargs");

const build = require("./lib/build");
const logger = require("./lib/utils/log");

const {
	timeout = 30000,
	...opts
} = argv;

const keepAlive = setTimeout(() => {
	logger.error("Process took too long to execute.");
	process.exit(1);
}, timeout);

build(opts)
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
