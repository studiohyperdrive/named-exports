#!/usr/bin/env node
import { argv } from "yargs";
import namedExport from "./src/index";
import logger from "./src/utils/log";

const {
    timeout = 30000,
    ...opts
} = argv;

const keepAlive = setTimeout(() => {
    logger.error("Process took to long to execute.");
    process.exit(1);
}, timeout);

namedExport(opts)
.then(
    () => {
        clearTimeout(keepAlive);
        process.exit(0);
    },
    () => {
        clearTimeout(keepAlive);
        process.exit(1);
    },
);
