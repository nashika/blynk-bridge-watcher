"use strict";
const sourceMapSupport = require('source-map-support');
sourceMapSupport.install();
const path = require("path");
const fs = require("fs");
const log4js = require("log4js");
const stripJsonComments = require("strip-json-comments");
let Server = require("./lib/server");
// read config
let configText = fs.readFileSync(path.normalize(__dirname + '/./config.json'), 'utf8');
let config = JSON.parse(stripJsonComments(configText));
// initialize logger
log4js.configure(path.normalize(__dirname + "/./log4js-config.json"), { cwd: path.normalize(__dirname + "/.") });
let logger = log4js.getLogger("system");
exports.server = new Server(config, logger, 0);
//# sourceMappingURL=index.js.map