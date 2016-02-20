'use strict';

var spawn = require('child_process').spawn,
    es    = require('event-stream');

module.exports = function childrenOfPid(pid, callback) {
  var headers = null;

  if (typeof callback !== 'function') {
    throw new Error('childrenOfPid(pid, callback) expects callback');
  }

  if (typeof pid === 'number') {
    pid = pid.toString();
  }

  es.connect(
    spawn('ps', ['-A', '-o', 'ppid,pid,stat,comm']).stdout,
    es.split(),
    es.map(function (line, cb) { //this could parse alot of unix command output
      var columns = line.trim().split(/\s+/);
      if (!headers) {
        headers = columns;
        return cb();
      }

      var row = {};
      // For each header
      var h = headers.slice();
      while (h.length) {
        row[h.shift()] = h.length ? columns.shift() : columns.join(' ');
      }

      return cb(null, row);
    }),
    es.writeArray(function (err, ps) {
      var parents = [pid],
          children = [];

      ps.forEach(function (proc) {
        if (parents.indexOf(proc.PPID) !== -1) {
          parents.push(proc.PID)
          children.push(proc)
        }
      });

      callback(null, children);
    })
  ).on('error', callback)
}
