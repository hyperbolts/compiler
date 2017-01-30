/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

// Determine whether we should be watching for changes. If
// process have been run with `-w` or `--watch` we should
// be monitoring.
module.exports = process.argv.some(arg => arg === '-w' || arg === '--watch');
