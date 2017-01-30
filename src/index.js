const buildStreamTasks = require('./utilities/buildStreamTasks');
const config           = require('./config');
const fs               = require('fs');
const gulp             = require('gulp');
const path             = require('path');

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
const text = fs.readFileSync(
    path.resolve(__dirname, '../header.txt')
);

// Print header
process.stdout.write(`\x1b[2m ${text} \x1b[0m`);

// Load static tasks
require('./tasks/bundle');
require('./tasks/cleanup');

// Export module
module.exports = {
    run: (overrides = {}) => {
        Object.assign(config, overrides);
        buildStreamTasks();

        // Create default task
        gulp.task('default', ['cleanup'], () => {
            gulp.start(['copy', 'images', 'styles', 'bundle']);
        });
    }
};
