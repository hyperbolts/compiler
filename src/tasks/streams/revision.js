const config     = require('../../config');
const gulp       = require('gulp');
const path       = require('path');
const rev        = require('gulp-rev');
const revDelete  = require('gulp-rev-delete-original');
const revReplace = require('gulp-rev-replace');

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

    // Revision assets
    .pipe(rev())
    .pipe(revDelete())
    .pipe(revReplace())

    // Revision relative paths
    .pipe(revReplace({
        modifyUnreved: file => `..${file.substr(file.indexOf('/'))}`,
        modifyReved:   file => `..${file.substr(file.indexOf('/'))}`
    }))

    // Output
    .pipe(gulp.dest(
        path.resolve(config.base, paths.dest)
    ));
