const browser                  = require("browser-sync");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const config                   = require("../config");
const fs                       = require("fs");
const gulp                     = require("gulp");
const HardSourceWebpackPlugin  = require("hard-source-webpack-plugin");
const path                     = require("path");
const shouldChunk              = require("../utilities/shouldChunk");
const shouldMinify             = require("../utilities/shouldMinify");
const shouldWatch              = require("../utilities/shouldWatch");
const url                      = require("url");
const webpack                  = require("webpack");
const webpackDevMiddleware     = require("webpack-dev-middleware");

/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

// eslint-disable-next-line max-lines-per-function
gulp.task("bundle", cb => {
    const paths   = [].concat(config.bundle);
    const entries = {};
    let triggered = false;
    let conf;

    // Set default loaders
    const loaders = [
        {
            loader:  "babel-loader",
            options: JSON.stringify({
                cacheDirectory: true,
                presets:        [
                    "react",
                    "env"
                ]
            })
        }
    ];

    // Set default plugins
    const plugins = [
        new CaseSensitivePathsPlugin(),
        new HardSourceWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ];

    // Build entry points
    for (conf of paths) {
        entries[conf.dest] = [path.resolve(conf.src)];
    }

    // If we are minifying, add relevant plugins
    if (shouldMinify === true) {

        // Add plugin to define variables
        plugins.push(new webpack.DefinePlugin({
            "process.env.NODE_ENV": "\"production\"",
            "NODE_ENV":             "\"production\""
        }));

        // Add uglify plugin
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        }));
    }

    // If we are not minifying, add source map
    else {
        plugins.push(new webpack.SourceMapDevToolPlugin({
            exclude:  config.modules.dest,
            filename: "[name].map",
            columns:  false
        }));
    }

    /*
     * If we are chunking, split node modules away from
     * application code
     */
    if (shouldChunk === true) {
        const {dest} = config.modules;

        // Add plugin
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name:      dest,
            filename:  dest,
            minChunks: module => {
                const {context} = module;

                // Skip if we have no context
                if (context === null) {
                    return false;
                }

                return context.indexOf("node_modules") >= 0;
            }
        }));
    }

    // Create bundler instance
    const bundler = webpack({
        watch: shouldWatch,
        entry: entries,
        plugins,

        // Define rules
        module: {
            rules: [
                {
                    test:    /\.(js|jsx)$/u,
                    exclude: /node_modules[/\\](?!hyperbolts-).*/u,
                    loaders
                }
            ]
        },

        // Define output
        output: {
            path:     path.resolve(config.base),
            filename: "[name]"
        }

    // Handle output
    // eslint-disable-next-line max-lines-per-function
    }, (error, stats) => {

        // Skip if we have already triggered the callback
        if (triggered === true) {
            return;
        }

        // Set triggered flag
        triggered = true;

        /*
         * If we are watching for changes, launch browser with
         * support for hot loading
         */
        if (shouldWatch === true) {
            browser({
                server: {
                    baseDir:    config.base,
                    middleware: [
                        webpackDevMiddleware(bundler.compiler, {
                            publicPath: "/",
                            stats:      {
                                chunks: false,
                                colors: true
                            }
                        }),

                        /*
                         * Use root index file for any non-existant
                         * path. This allows react to take over and
                         * render the correct page client-side.
                         */
                        (request, response, next) => {
                            const parsed = url.parse(request.url);
                            const file   = `${process.cwd()}/${config.base}${parsed.pathname}`;

                            /*
                             * If a matching file or folder does not
                             * exist, use root index file
                             */
                            if (fs.existsSync(file) === false) {
                                request.url = "/index.html";
                            }

                            return next();
                        }
                    ]
                }
            });
        }

        // If we aren't watching, output stats to console
        else {
            process.stdout.write(stats.toString({
                chunks: false,
                colors: true
            }));
        }

        // Trigger task completion
        cb();
    });
});
