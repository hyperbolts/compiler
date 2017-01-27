const config = require('../config');
const gulp   = require('gulp');
const del    = require('del');

/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

gulp.task('cleanup', () => del(config.base));
