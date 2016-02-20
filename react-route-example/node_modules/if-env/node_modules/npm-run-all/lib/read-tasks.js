"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readTasks;

var _path = require("path");

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } /**
                                                                                                                              * @author Toru Nagashima
                                                                                                                              * @copyright 2015 Toru Nagashima. All rights reserved.
                                                                                                                              * See LICENSE file in root directory for full license.
                                                                                                                              */

/**
 * Reads `package.json` in current directry, and gets all npm-scripts names.
 * If `package.json` has not found, throws an error.
 *
 * @returns {string[]} npm-scripts names.
 * @private
 */
function readTasks() {
  var packageJsonPath = (0, _path.join)(process.cwd(), "package.json");
  var packageJson = require(packageJsonPath);
  var scripts = packageJson && packageJson.scripts;
  if ((typeof scripts === "undefined" ? "undefined" : _typeof(scripts)) === "object" && !Array.isArray(scripts)) {
    return Object.keys(scripts);
  }
  return [];
}