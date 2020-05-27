#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("node ./node_modules/variojs-dev-tools/src/server/index.js", {async:true});
shell.exec("node ./node_modules/variojs-dev-tools/src/socket-server/index.js", {async:true});
shell.exec("./node_modules/variojs-dev-tools/node_modules/.bin/open-cli http://localhost:8080");