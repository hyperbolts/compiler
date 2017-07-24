/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

// Determine whether we should be chunking the output. If
// process have been run with `-c` or `--chunk` we should
// be chunking.
module.exports = process.argv.some(arg => arg === '-c' || arg === '--chunk');
