"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = npmRunAll;

var _npmRunAll = require("../lib/npm-run-all");

var _npmRunAll2 = _interopRequireDefault(_npmRunAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var START_PROMISE = Promise.resolve(null); /**
                                            * @author Toru Nagashima
                                            * @copyright 2015 Toru Nagashima. All rights reserved.
                                            * See LICENSE file in root directory for full license.
                                            */
/* eslint no-process-env: 0 */

var OVERWRITE_OPTION = /^--([^:]+?):([^=]+?)(?:=(.+))?$/;
var CONFIG_PATTERN = /^npm_package_config_(.+)$/;

/**
 * Overwrites a specified package config.
 *
 * @param {object} config - A config object to be overwritten.
 * @param {string} packageName - A package name to overwrite.
 * @param {string} variable - A variable name to overwrite.
 * @param {string} value - A new value to overwrite.
 * @returns {void}
 */
function overwriteConfig(config, packageName, variable, value) {
    var scope = config[packageName] || (config[packageName] = {}); // eslint-disable-line no-param-reassign
    scope[variable] = value;
}

/**
 * Creates a package config object.
 * This checks `process.env` and creates the default value.
 *
 * @returns {object} Created config object.
 */
function createPackageConfig() {
    var retv = {};
    var packageName = process.env.npm_package_name;
    if (!packageName) {
        return retv;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(process.env)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var m = CONFIG_PATTERN.exec(key);
            if (m != null) {
                overwriteConfig(retv, packageName, m[1], process.env[key]);
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

    return retv;
}

/**
 * Parses arguments.
 *
 * @param {string[]} args - Arguments to parse.
 * @returns {{parallel: boolean, patterns: string[], packageConfig: object}[]} A running plan.
 */
function parse(args) {
    var packageConfig = createPackageConfig();
    var queue = [{ parallel: false, patterns: [], packageConfig: packageConfig }];

    for (var i = 0; i < args.length; ++i) {
        var arg = args[i];

        switch (arg) {
            case "-s":
            case "--sequential":
                if (queue[queue.length - 1].parallel) {
                    queue.push({ parallel: false, patterns: [], packageConfig: packageConfig });
                }
                break;

            case "-p":
            case "--parallel":
                queue.push({ parallel: true, patterns: [], packageConfig: packageConfig });
                break;

            default:
                {
                    var matched = OVERWRITE_OPTION.exec(arg);
                    if (matched) {
                        overwriteConfig(packageConfig, matched[1], matched[2], matched[3] || args[++i]);
                    } else if (arg[0] === "-") {
                        throw new Error("Invalid Option: " + arg);
                    } else {
                        queue[queue.length - 1].patterns.push(arg);
                    }
                    break;
                }
        }
    }

    return queue;
}

/**
 * Parses arguments, then run specified npm-scripts.
 *
 * @param {string[]} args - Arguments to parse.
 * @param {stream.Writable} stdout - A writable stream to print logs.
 * @param {stream.Writable} stderr - A writable stream to print errors.
 * @returns {Promise} A promise which comes to be fulfilled when all npm-scripts are completed.
 * @private
 */
function npmRunAll(args, stdout, stderr) {
    try {
        return parse(args).reduce(function (prev, group) {
            return group.patterns.length === 0 ? prev : prev.then(function () {
                return (0, _npmRunAll2.default)(group.patterns, {
                    stdout: stdout,
                    stderr: stderr,
                    stdin: process.stdin,
                    parallel: group.parallel,
                    packageConfig: group.packageConfig
                });
            });
        }, START_PROMISE);
    } catch (err) {
        return Promise.reject(err);
    }
}