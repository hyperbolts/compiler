/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

// Path configuration for tasks. Other than base, all other
// keys can take an object or an array of objects (for multiple
// sources as destinations).
//
// Setting watch key is optional, if not present the source
// will be monitored instead.
module.exports = {

    // Base folder
    base: 'dist',

    // Bundles
    bundle: {
        src:  'src/index.jsx',
        dest: 'bundle.js'
    },

    // Copy files
    copy: [
        {
            src:  'assets/fonts/**',
            dest: 'assets/fonts'
        },
        {
            src:  'assets/public/**',
            dest: ''
        }
    ],

    // Images
    images: {
        src:  'assets/images/**',
        dest: 'assets/images'
    },

    // Modules
    modules: {
        dest: 'modules.js'
    },

    // Revision
    revision: {
        src:  'dist/**',
        dest: ''
    },

    // Styles
    styles: {
        watch: 'assets/styles/**/*.{sass,scss}',
        src:   'assets/styles/**/[^_]*.{sass,scss}',
        dest:  'assets/styles'
    }
};
