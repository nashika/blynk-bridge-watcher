import "font-awesome/css/font-awesome.css";
import "./scss/style.scss";

import "core-js";

import "./inversify.config";
import {container} from "../common/inversify.config";
import {SocketIoClientService} from "./service/socket-io-client-service";
import Vue = require("vue");
//import VueRouter from "vue-router";
let BootstrapVue = require("bootstrap-vue").default;

//Vue.use(VueRouter);
Vue.use(BootstrapVue);

let AppComponent = container.getNamed("Newable<Component>", "app");
new (<any>AppComponent)().$mount("#app");

let socketIoClientService = container.get(SocketIoClientService);
socketIoClientService.initialize();
