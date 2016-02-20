#!/usr/bin/env node

var parse = require("querystring").parse;
var conditions = process.argv.slice(2);
var query = conditions.join("&");
var expected = parse(query);

for (var env in expected) {
  if (process.env[env] !== expected[env]) {
    process.exit(1);
  }
}

process.exit(0);
