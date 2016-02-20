"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = runTasksInParallel;

var _runTask = require("./run-task");

var _runTask2 = _interopRequireDefault(_runTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Run npm-scripts of given names in parallel.
 *
 * If a npm-script exited with a non-zero code, this aborts other all npm-scripts.
 *
 * @param {string} tasks - A list of npm-script name to run in parallel.
 * @param {stream.Readable|null} stdin -
 *   A readable stream to send messages to stdin of child process.
 *   If this is `null`, ignores it.
 *   If this is `process.stdin`, inherits it.
 *   Otherwise, makes a pipe.
 * @param {stream.Writable|null} stdout -
 *   A writable stream to receive messages from stdout of child process.
 *   If this is `null`, cannot send.
 *   If this is `process.stdout`, inherits it.
 *   Otherwise, makes a pipe.
 * @param {stream.Writable|null} stderr -
 *   A writable stream to receive messages from stderr of child process.
 *   If this is `null`, cannot send.
 *   If this is `process.stderr`, inherits it.
 *   Otherwise, makes a pipe.
 * @param {string[]} packageConfigOptions -
 *   `--:=` style options to overwrite package configs.
 * @returns {Promise}
 *   A promise object which becomes fullfilled when all npm-scripts are completed.
 * @private
 */
function runTasksInParallel(tasks, stdin, stdout, stderr, packageConfigOptions) {
    // When one of tasks exited with non-zero, abort all tasks.
    // And wait for all tasks exit.
    var nonZeroExited = null;
    var taskPromises = tasks.map(function (task) {
        return (0, _runTask2.default)(task, stdin, stdout, stderr, packageConfigOptions);
    });
    var parallelPromise = Promise.all(taskPromises.map(function (p) {
        return p.then(function (item) {
            if (nonZeroExited == null && item.code) {
                nonZeroExited = nonZeroExited || item;
                taskPromises.forEach(function (t) {
                    t.abort();
                });
            }
        });
    }));
    parallelPromise.catch(function () {
        taskPromises.forEach(function (t) {
            t.abort();
        });
    });

    // Make fail if there are tasks that exited non-zero.
    return parallelPromise.then(function () {
        if (nonZeroExited != null) {
            throw new Error(nonZeroExited.task + ": None-Zero Exit(" + nonZeroExited.code + ");");
        }
    });
} /**
   * @author Toru Nagashima
   * @copyright 2015 Toru Nagashima. All rights reserved.
   * See LICENSE file in root directory for full license.
   */