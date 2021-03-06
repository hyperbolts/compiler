const buildStreamTasks = require("./utilities/buildStreamTasks");
const config           = require("./config");
const fs               = require("fs");
const gulp             = require("gulp");
const path             = require("path");
const run              = require("run-sequence");
const shouldMinify     = require("./utilities/shouldMinify");

/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

// Retrieve header text
const text = fs.readFileSync(path.resolve(__dirname, "../header.txt"));

// Print header
process.stdout.write(`\x1b[2m${text}\x1b[0m`);

// Load static tasks
require("./tasks/bundle");
require("./tasks/cleanup");

// Export module
module.exports = {
    run: (overrides = {}) => {

        // Override config options
        Object.assign(config, overrides);

        // Build stream tasks
        buildStreamTasks();

        // Create default task
        gulp.task("default", ["cleanup"], () => {
            const steps = [
                [
                    "copy",
                    "images",
                    "styles",
                    "bundle"
                ]
            ];

            /*
             * If we are minifying, add task to
             * revision assets
             */
            if (shouldMinify === true) {
                steps.push("revision");
            }

            // Run sequence
            run(...steps);
        });
    }
};
