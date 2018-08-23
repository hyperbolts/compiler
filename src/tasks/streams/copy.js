const browser = require("browser-sync");
const config  = require("../../config");
const gulp    = require("gulp");
const path    = require("path");

/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

module.exports = paths => () => gulp.src(paths.src)

    // Output
    .pipe(gulp.dest(path.resolve(config.base, paths.dest)))

    // Reload browser
    .pipe(browser.reload({
        stream: true
    }));
