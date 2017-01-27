const browser = require('browser-sync');
const gulp    = require('gulp');

/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

module.exports = (paths) => () => gulp.src(paths.src)

    // Output
    .pipe(gulp.dest(paths.dest))

    // Reload browser
    .pipe(browser.reload({
        stream: true
    }));
