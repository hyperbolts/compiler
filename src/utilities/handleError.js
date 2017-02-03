const notify = require('gulp-notify');

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
 * Handle errors raised by gulp streams. Launch a notification
 * to screen, alerting user to check the console.
 *
 * @param  {...object} args args
 * @return {void}
 */
module.exports = function handleError(...args) {

    // Send notify event
    notify.onError({
        title:   'Hyperbolts ϟ',
        message: '<%= error %>'
    })(...args);

    // Stop gulp from hanging on this task
    this.emit('end');
};
