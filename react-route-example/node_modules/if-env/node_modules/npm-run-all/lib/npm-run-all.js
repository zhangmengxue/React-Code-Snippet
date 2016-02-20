"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = npmRunAll;

var _matchTasks = require("./match-tasks");

var _matchTasks2 = _interopRequireDefault(_matchTasks);

var _readTasks = require("./read-tasks");

var _readTasks2 = _interopRequireDefault(_readTasks);

var _runTasksInParallel = require("./run-tasks-in-parallel");

var _runTasksInParallel2 = _interopRequireDefault(_runTasksInParallel);

var _runTasksInSequencial = require("./run-tasks-in-sequencial");

var _runTasksInSequencial2 = _interopRequireDefault(_runTasksInSequencial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts a given value to an array.
 *
 * @param {string|string[]|null|undefined} x - A value to convert.
 * @returns {string[]} An array.
 */
/**
 * @author Toru Nagashima
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
function toArray(x) {
    if (x == null) {
        return [];
    }
    return Array.isArray(x) ? x : [x];
}

/**
 * Converts a given config object to an `--:=` style option array.
 *
 * @param {object|null} config -
 *   A map-like object to overwrite package configs.
 *   Keys are package names.
 *   Every value is a map-like object (Pairs of variable name and value).
 * @returns {string[]} `--:=` style options.
 */
function toOverwriteOptions(config) {
    var options = [];
    if (config == null) {
        return options;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(config)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var packageName = _step.value;

            var packageConfig = config[packageName];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(packageConfig)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var variableName = _step2.value;

                    var value = packageConfig[variableName];

                    options.push("--" + packageName + ":" + variableName + "=" + value);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
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

    return options;
}

/**
 * Runs npm-scripts which are matched with given patterns.
 *
 * @param {string|string[]} patternOrPatterns - Patterns to run.
 *   A pattern is a npm-script name or a Glob-like pattern.
 * @param {object|undefined} [options] Optional.
 * @param {boolean} options.parallel -
 *   If this is `true`, run scripts in parallel.
 *   Otherwise, run scripts in sequencial.
 *   Default is `false`.
 * @param {stream.Readable|null} options.stdin -
 *   A readable stream to send messages to stdin of child process.
 *   If this is `null`, ignores it.
 *   If this is `process.stdin`, inherits it.
 *   Otherwise, makes a pipe.
 *   Default is `null`.
 * @param {stream.Writable|null} options.stdout -
 *   A writable stream to receive messages from stdout of child process.
 *   If this is `null`, cannot send.
 *   If this is `process.stdout`, inherits it.
 *   Otherwise, makes a pipe.
 *   Default is `null`.
 * @param {stream.Writable|null} options.stderr -
 *   A writable stream to receive messages from stderr of child process.
 *   If this is `null`, cannot send.
 *   If this is `process.stderr`, inherits it.
 *   Otherwise, makes a pipe.
 *   Default is `null`.
 * @param {string[]} options.taskList -
 *   Actual name list of npm-scripts.
 *   This function search npm-script names in this list.
 *   If this is `null`, this function reads `package.json` of current directly.
 * @param {object|null} options.packageConfig -
 *   A map-like object to overwrite package configs.
 *   Keys are package names.
 *   Every value is a map-like object (Pairs of variable name and value).
 *   e.g. `{"npm-run-all": {"test": 777}}`
 *   Default is `null`.
 * @returns {Promise}
 *   A promise object which becomes fullfilled when all npm-scripts are completed.
 */
function npmRunAll(patternOrPatterns) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$parallel = _ref.parallel;
    var parallel = _ref$parallel === undefined ? false : _ref$parallel;
    var _ref$stdin = _ref.stdin;
    var stdin = _ref$stdin === undefined ? null : _ref$stdin;
    var _ref$stdout = _ref.stdout;
    var stdout = _ref$stdout === undefined ? null : _ref$stdout;
    var _ref$stderr = _ref.stderr;
    var stderr = _ref$stderr === undefined ? null : _ref$stderr;
    var _ref$taskList = _ref.taskList;
    var taskList = _ref$taskList === undefined ? null : _ref$taskList;
    var _ref$packageConfig = _ref.packageConfig;
    var packageConfig = _ref$packageConfig === undefined ? null : _ref$packageConfig;

    try {
        var patterns = toArray(patternOrPatterns);
        if (patterns.length === 0) {
            return Promise.resolve(null);
        }
        if (taskList != null && Array.isArray(taskList) === false) {
            throw new Error("Invalid options.taskList");
        }

        var tasks = (0, _matchTasks2.default)(taskList || (0, _readTasks2.default)(), patterns);
        if (tasks.length === 0) {
            throw new Error("Matched tasks not found: " + patterns.join(", "));
        }

        return parallel ? (0, _runTasksInParallel2.default)(tasks, stdin, stdout, stderr, toOverwriteOptions(packageConfig)) :
        /* else */(0, _runTasksInSequencial2.default)(tasks, stdin, stdout, stderr, toOverwriteOptions(packageConfig));
    } catch (err) {
        return Promise.reject(new Error(err.message));
    }
}