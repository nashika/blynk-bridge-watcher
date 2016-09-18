import path = require("path");

import express = require("express");
import {Express, Request, Response, NextFunction} from "express";
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
import log4js = require("log4js");

import {svKernel} from "./inversify.config";
import {BaseRoute} from "./routes/base-route";

import "./log4js";
import {BaseEntity} from "../common/entity/base-entity";
let logger = log4js.getLogger("system");

logger.info("Web server initialize started.");
export var app:Express = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

let expressLogger = log4js.getLogger("express");
app.use(log4js.connectLogger(expressLogger, {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
for (let node of svKernel.getAll<BaseRoute<BaseEntity>>(BaseRoute))
  node.initialize(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err:any = new Error("Not Found");
  err["status"] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

logger.info("Web server initialize finished.");
