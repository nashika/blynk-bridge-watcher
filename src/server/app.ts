import sourceMapSupport = require("source-map-support");
sourceMapSupport.install();

import "reflect-metadata";
import http = require("http");

import commander = require("commander");
import _ = require("lodash");

import "./inversify.config";
import {container} from "../common/inversify.config";
import {SocketIoServerService} from "./service/socket-io-server-service";
import {app} from "./app-express";
import {NodeService} from "./service/node-server-service";

let pjson = require("../../package");

commander
  .version(pjson.version)
  .option("-p --port <n>", "set HTTP server port number.", parseInt)
  .parse(process.argv);

let port: number = _.get<number>(commander, "port");
port = port || 3000;

let debug = require('debug')('server:server');

app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error:any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



// initialize
container.get<SocketIoServerService>(SocketIoServerService).initialize(server);
container.get<NodeService>(NodeService).initialize();
