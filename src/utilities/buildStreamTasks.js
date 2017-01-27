const chokidar     = require('chokidar');
const config       = require('../config');
const gulp         = require('gulp');
const shouldWatch  = require('./shouldWatch');
const stream       = require('event-stream');
const streamCopy   = require('../tasks/streams/copy');
const streamImages = require('../tasks/streams/images');
const streamStyles = require('../tasks/streams/styles');

/**
 * HyperBolts ϟ (https://hyperbolts.io)
 *
 * Copyright © 2015-present Pace IT Systems Ltd.
 * All rights reserved.
 *
 * @author  Pace IT Systems Ltd
 * @license MIT
 */

/**
 * Require and build stream task. Rather than each task
 * having to handle optional array of paths, each task
 * returns a function so we can merge streams here.
 *
 * @param  {string} file filename
 * @return {void}
 */
module.exports = () => {
    let task;

    // Parse stream tasks
    const tasks = [
        {
            name: 'copy',
            func: streamCopy
        },
        {
            name: 'images',
            func: streamImages
        },
        {
            name: 'styles',
            func: streamStyles
        }
    ];

    // Loop through stream tasks
    for (task of tasks) {
        const {name} = task;
        const conf   = config[name];
        const streamTasks = [];
        let pos, value;

        // If config is not an array, life is simple! Create
        // a standard gulp task and optionally monitor for
        // changes.
        if (Array.isArray(conf) === false) {
            gulp.task(task.name, task.func(conf));

            // Monitor for changes
            if (shouldWatch === true) {

                // Using set timeout to make sure file write
                // has finished. Did attempt to use awaitWriteFinish
                // but wasn't consistent
                chokidar.watch(conf.watch || conf.src)
                    .on('all', () => setTimeout(() => {
                        gulp.start([name]);
                    }, 100));
            }
        }

        // Otherwise create a task which merges streams
        // for each element of the config array. Start
        // by looping and creating a task for each
        // key.
        else {
            for (value of conf) {
                const current = streamTasks.length;

                // Add to array of tasks
                streamTasks.push(task.func(value));

                // Watch for changes
                if (shouldWatch === true) {

                    // Using set timeout to make sure file write
                    // has finished. Did attempt to use awaitWriteFinish
                    // but wasn't consistent.
                    chokidar.watch(value.watch || value.src)

                        // eslint-disable-next-line no-loop-func
                        .on('all', () => setTimeout(() => {

                            // Set stream array position (so the main task
                            // only processes the relevant source) then
                            // call task
                            pos = current;
                            gulp.start([name]);
                        }, 100));
                }
            }

            // Create main task
            gulp.task(task.name, () => {

                // If we have a position, we must have been
                // called from a watch event. Only process
                // the matching source.
                if (pos !== undefined) {
                    const output = streamTasks[pos]();

                    pos = undefined;
                    return output;
                }

                // Return merged stream
                return stream.merge(streamTasks.map((func) => func()));
            });
        }
    }
};
