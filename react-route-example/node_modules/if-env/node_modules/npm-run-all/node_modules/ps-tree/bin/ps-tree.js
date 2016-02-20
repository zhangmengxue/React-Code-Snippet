#!/usr/bin/env node

'use strict';

require('../')(process.argv[2] || 1, function (err, data) {
  console.log(data);
});
