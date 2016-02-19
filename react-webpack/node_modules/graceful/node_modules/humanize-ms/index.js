/*!
 * humanize-ms - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var ms = require('ms');

module.exports = function (t) {
  if (typeof t === 'number') return t;
  var r = ms(t);
  if (r === undefined) console.warn('ms(%s) got undefined in %s', t, __filename);
  return r;
};
