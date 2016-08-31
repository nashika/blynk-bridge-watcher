import "font-awesome/css/font-awesome.css";
import "./scss/style.scss";

import "core-js";

import {AppComponent} from "./component/app-component";

let app:AppComponent = new (<any>AppComponent)({el: "#app"});


import socketIo = require("socket.io-client");
let socket = socketIo.connect();
socket.on("server_to_client", (data:any) => {
  console.log(data);
});

setTimeout(() => {
  socket.emit("client_to_server", "TEST");
}, 3000);
