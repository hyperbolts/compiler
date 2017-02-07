const browser     = require('browser-sync');
const config      = require('../../config');
const gulp        = require('gulp');
const handleError = require('../../utilities/handleError');
const path        = require('path');
const sass        = require('gulp-sass');
const sourcemaps  = require('gulp-sourcemaps');

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

    // Compile
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: [
            path.join(process.cwd(), 'node_modules'),
            process.cwd()
        ]
    }))
        .on('error', handleError)
    .pipe(sourcemaps.write())

    // Output
    .pipe(gulp.dest(
        path.resolve(config.base, paths.dest)
    ))

    // Reload browser
    .pipe(browser.reload({
        stream: true
    }));
