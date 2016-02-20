"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = printHelp;
/**
 * @author Toru Nagashima
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

/**
 * Print a help text.
 *
 * @param {stream.Writable} output - A writable stream to print.
 * @returns {Promise} Always a fulfilled promise.
 * @private
 */
function printHelp(output) {
    output.write("\nUsage: npm-run-all [OPTIONS] [...tasks]\n\n  Run specified tasks.\n\n  Options:\n    -h, --help                  Print this text.\n    -p, --parallel [...tasks]   Run a group of tasks in parallel.\n    -s, --sequential [...tasks] Run a group of tasks in sequencial.\n    -v, --version               Print version number.\n\n  See Also:\n    https://github.com/mysticatea/npm-run-all#readme\n");

    return Promise.resolve(null);
}