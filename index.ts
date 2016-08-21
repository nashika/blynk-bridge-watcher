import sourceMapSupport = require('source-map-support');
sourceMapSupport.install();

import path = require("path");
import fs = require("fs");

import log4js = require("log4js");
import stripJsonComments = require("strip-json-comments");

let Server = require("./lib/server");

// read config
let configText = fs.readFileSync(path.normalize(__dirname + '/./config.json'), 'utf8');
let config = JSON.parse(stripJsonComments(configText));

// initialize logger
log4js.configure(path.normalize(__dirname + "/./log4js-config.json"), {cwd: path.normalize(__dirname + "/.")});
let logger = log4js.getLogger("system");

export var server = new Server(config, logger, 0);
