const browser      = require('browser-sync');
const clean        = require('gulp-clean-css');
const config       = require('../../config');
const gulp         = require('gulp');
const handleError  = require('../../utilities/handleError');
const path         = require('path');
const sass         = require('gulp-sass');
const shouldMinify = require('../../utilities/shouldMinify');
const sourcemaps   = require('gulp-sourcemaps');

/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

module.exports = paths => () => {
    let stream = gulp.src(paths.src);

    // If we are not minifying, start sourcemap
    if (shouldMinify === false) {
        stream = stream.pipe(sourcemaps.init());
    }

    // Compile
    stream = stream.pipe(sass({
        includePaths: paths.includePaths || [
            path.join(process.cwd(), 'node_modules'),
            process.cwd()
        ]
    }))
        .on('error', handleError);

    // If we are not minifying, write sourcemap
    if (shouldMinify === false) {
        stream = stream.pipe(sourcemaps.write());
    }

    // If we are minifying, run CSS through
    // minifier
    else {
        stream = stream.pipe(clean({
            level: {
                2: {
                    specialComments: false
                }
            }
        }));
    }

    // Output
    return stream.pipe(gulp.dest(
        path.resolve(config.base, paths.dest)
    ))

        // Reload browser
        .pipe(browser.reload({
            stream: true
        }));
};
