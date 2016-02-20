"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = whichNpm;

var _which = require("which");

var _which2 = _interopRequireDefault(_which);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = Object.create(null);

/**
 * Gets a file path of `npm` command.
 *
 * @returns {Promise<string>}
 *   A promise object which becomes fullfilled when it got a file path of `npm` command.
 * @private
 */
/**
 * @author Toru Nagashima
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
function whichNpm() {
    var cwd = process.cwd();
    if (cache[cwd] == null) {
        cache[cwd] = new Promise(function (resolve, reject) {
            (0, _which2.default)("npm", function (err, npmPath) {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(npmPath);
                }
            });
        });
    }

    return cache[cwd];
}