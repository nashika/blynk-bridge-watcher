import path = require("path");
import log4js = require("log4js");

log4js.configure({
  appenders: [
    {
      category: "system",
      type: "dateFile",
      filename: path.join(__dirname, "../../logs/system.log"),
      pattern: "-yyyyMMdd",
      backups: 365,
    },
    {
      category: "express",
      type: "dateFile",
      filename: path.join(__dirname, "../../logs/express.log"),
      pattern: "-yyyyMMdd",
      backups: 365,
    },
    {
      type: "console",
    },
  ],
});
