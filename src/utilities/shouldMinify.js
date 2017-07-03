/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

// Determine whether we should be minify the output. If
// process have been run with `-m` or `--minify` we should
// be minifying.
module.exports = process.argv.some(arg => arg === '-m' || arg === '--minify');
