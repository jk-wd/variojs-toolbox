#! /usr/bin/env node
var shell = require("shelljs");
var path = require("path");

shell.exec(`node ${path.join(__dirname, '../src/server/')}index.js`, {async:true});
shell.exec(`node ${path.join(__dirname, '../src/socket-server/')}index.js`, {async:true});
shell.exec(`${path.join(__dirname, '../node_modules/.bin/')}open-cli http://localhost:8080`);