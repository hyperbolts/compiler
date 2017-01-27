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

    // Base folder (removed by cleanup task and the root
    // path served by browser when watching)
    base: 'dist',

    // Bundles
    bundle: {
        src:  'src/index.jsx',
        dest: 'dist/bundle.js'
    },

    // Copy files
    copy: [
        {
            src:  'assets/fonts/**/*.{afm,cff,eot,ffil,fon,lwfn,otf,pfb,pfm,pro,std,svg,ttf,woff,woff2,xsf}',
            dest: 'dist/assets/fonts'
        },
        {
            src:  'assets/public/**',
            dest: 'dist'
        }
    ],

    // Images
    images: {
        src:  'assets/images/**/*.{gif,ico,jpeg,jpg,png,svg}',
        dest: 'dist/assets/images'
    },

    // Styles
    styles: {
        watch: 'assets/styles/**/*.{sass,scss}',
        src:   'assets/styles/**/[^_]*.{sass,scss}',
        dest:  'dist/assets/styles'
    }
};
