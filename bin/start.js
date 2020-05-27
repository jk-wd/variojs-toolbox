#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("node ./node_modules/variojs-toolbox/src/server/index.js", {async:true});
shell.exec("node ./node_modules/variojs-toolbox/src/socket-server/index.js", {async:true});
shell.exec("./node_modules/variojs-toolbox/node_modules/.bin/open-cli http://localhost:8080");