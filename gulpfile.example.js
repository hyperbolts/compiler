const compiler = require("hyperbolts-compiler");

/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

compiler.run();

/*
 * Alternatively pass in an object to be shallow-merged
 * into the default configuration. See src/config.js
 * or documentation for options.
 *
 * compiler.run({
 *     bundle: {
 *         src: 'src/index.js',
 *         dest: 'dist/bundle.js'
 *     }
 * });
 */
