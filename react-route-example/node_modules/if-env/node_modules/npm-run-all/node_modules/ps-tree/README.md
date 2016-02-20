#ps-tree

Sometimes you cannot kill child processes like you would expect, this a feature of UNIX.

>in UNIX, a process may terminate by using the exit call, and it's parent process may wait for that event by using the wait system call. the wait system call returns the process identifier of a terminated child, so that the parent tell which of the possibly many children has terminated. If the parent terminates, however, all it's children have assigned as their new parent the init process. Thus, the children still have a parent to collect their status and execution statistics.
> (from "operating system concepts")

Solution: use `ps-tree` to get all processes that a `child_process` may have started, so that they may all be terminated.

``` js
var cp = require('child_process'),
    psTree = require('ps-tree')

var child = cp.exec("node -e 'while (true);'",function () {...})

// This will not actually kill the child it will kill the `sh` process.
child.kill();
```

wtf? it's because exec actually works like this:

``` js
function exec (cmd, cb) {
  spawn('sh', ['-c', cmd]);
  ...
}
```

`sh` starts parses the command string and starts processes, and waits for them to terminate, but `exec` returns a process object with the pid of the `sh` process.
However, since it is in `wait` mode killing it does not kill the children.

Use `ps-tree` like this:

``` js
var cp = require('child_process'),
    psTree = require('ps-tree');

var child = cp.exec("node -e 'while (true);'", function () { /*...*/ });

psTree(child.pid, function (err, children) {
  cp.spawn('kill', ['-9'].concat(children.map(function (p) { return p.PID })));
});
```

If you prefer to run **psTree** from the command line, use: `node ./bin/ps-tree.js`

[![Build Status](https://travis-ci.org/nelsonic/ps-tree.svg)](https://travis-ci.org/nelsonic/ps-tree)
[![Code Climate](https://codeclimate.com/github/nelsonic/ps-tree/badges/gpa.svg)](https://codeclimate.com/github/nelsonic/ps-tree)
[![Test Coverage](https://codeclimate.com/github/nelsonic/ps-tree/badges/coverage.svg)](https://codeclimate.com/github/nelsonic/ps-tree)
[![npm version](https://badge.fury.io/js/ps-tree.svg)](http://badge.fury.io/js/ps-tree)
[![Node.js Version][node-version-image]][node-version-url]
[![Dependency Status](https://david-dm.org/nelsonic/ps-tree.svg)](https://david-dm.org/nelsonic/ps-tree)
[node-version-image]: https://img.shields.io/node/v/listdirs.svg?style=flat
[node-version-url]: http://nodejs.org/download/
