"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @author Toru Nagashima
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @copyright 2015 Toru Nagashima. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * See LICENSE file in root directory for full license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = matchTasks;

var _minimatch = require("minimatch");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COLON_OR_SLASH = /[:\/]/g;
var CONVERT_MAP = { ":": "/", "/": ":" };

/**
 * Swaps ":" and "/", in order to use ":" as the separator in minimatch.
 *
 * @param {string} s - A text to swap.
 * @returns {string} The text which was swapped.
 */
function swapColonAndSlash(s) {
    return s.replace(COLON_OR_SLASH, function (matched) {
        return CONVERT_MAP[matched];
    });
}

/**
 * Creates a filter from user-specified pattern text.
 *
 * The task name is the part until the first space.
 * The rest part is the arguments for this task.
 *
 * @param {string} pattern - A pattern to create filter.
 * @returns {{match: function, task: string, args: string}} The filter object of the pattern.
 */
function createFilter(pattern) {
    var trimmed = pattern.trim();
    var spacePos = trimmed.indexOf(" ");
    var task = spacePos < 0 ? trimmed : trimmed.slice(0, spacePos);
    var args = spacePos < 0 ? "" : trimmed.slice(spacePos);
    var matcher = new _minimatch.Minimatch(swapColonAndSlash(task));
    var match = matcher.match.bind(matcher);

    return { match: match, task: task, args: args };
}

/**
 * The set to remove overlapped task.
 */

var TaskSet = (function () {
    /**
     * Creates a instance.
     */

    function TaskSet() {
        _classCallCheck(this, TaskSet);

        this.result = [];
        this.sourceMap = Object.create(null);
    }

    /**
     * Adds a command (a pattern) into this set if it's not overlapped.
     * "Overlapped" is meaning that the command was added from a different source.
     *
     * @param {string} command - A pattern text to add.
     * @param {string} source - A task name to check.
     */

    _createClass(TaskSet, [{
        key: "add",
        value: function add(command, source) {
            var sourceList = this.sourceMap[command] || (this.sourceMap[command] = []);
            if (sourceList.length === 0 || sourceList.indexOf(source) !== -1) {
                this.result.push(command);
            }
            sourceList.push(source);
        }
    }]);

    return TaskSet;
})();

/**
 * Enumerates tasks which matches with given patterns.
 *
 * @param {string[]} taskList - A list of actual task names.
 * @param {string[]} patterns - Pattern texts to match.
 * @returns {string[]} Tasks which matches with the patterns.
 * @private
 */

function matchTasks(taskList, patterns) {
    var filters = patterns.map(createFilter);
    var candidates = taskList.map(swapColonAndSlash);
    var taskSet = new TaskSet();

    // Take tasks while keep the order of patterns.
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = filters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var filter = _step.value;

            var found = false;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = candidates[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var candidate = _step2.value;

                    if (filter.match(candidate)) {
                        found = true;
                        taskSet.add(swapColonAndSlash(candidate) + filter.args, filter.task);
                    }
                }

                // Built-in tasks should be allowed.
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

            if (!found && (filter.task === "restart" || filter.task === "env")) {
                taskSet.add(filter.task + filter.args, filter.task);
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

    return taskSet.result;
}