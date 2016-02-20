"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = spawn;

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _psTree = require("ps-tree");

var _psTree2 = _interopRequireDefault(_psTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Kills the new process and its sub processes.
 * @this ChildProcess
 */
/**
 * @author Toru Nagashima
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
/* eslint no-param-reassign: 0 */
function kill() {
    (0, _psTree2.default)(this.pid, function (err, descendent) {
        if (err) {
            return;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = descendent[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var pid = _step.value.PID;

                try {
                    process.kill(pid);
                } catch (err2) {
                    // ignore.
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    });
}

/**
 * Launches a new process with the given command.
 * This is almost same as `child_process.spawn`.
 *
 * This returns a `ChildProcess` instance.
 * `kill` method of the instance kills the new process and its sub processes.
 *
 * @param {string} command - The command to run.
 * @param {string[]} args - List of string arguments.
 * @param {object} options - Options.
 * @returns {ChildProcess} A ChildProcess instance of new process.
 * @private
 */
function spawn(command, args, options) {
    var child = _child_process2.default.spawn(command, args, options);
    child.kill = kill;

    return child;
}