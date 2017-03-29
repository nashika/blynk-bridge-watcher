import "font-awesome/css/font-awesome.css";
import "./scss/style.scss";

import "core-js";
import "reflect-metadata";

import "./inversify.config";
import Vue = require("vue");
//import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";

//Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.component("edit-component", require("./component/element/edit-component.vue"));
Vue.component("logs-component", require("./component/element/logs-component.vue"));
Vue.component("server-node-component", require("./component/node/server-node-component.vue"));
Vue.component("board-node-component", require("./component/node/board-node-component.vue"));
Vue.component("job-node-component", require("./component/node/job-node-component.vue"));
Vue.component("bridge-node-component", require("./component/node/bridge-node-component.vue"));
Vue.component("if-action-node-component", require("./component/node/action/if-action-node-component.vue"));
Vue.component("log-action-node-component", require("./component/node/action/log-action-node-component.vue"));
Vue.component("notify-action-node-component", require("./component/node/action/notify-action-node-component.vue"));
Vue.component("read-action-node-component", require("./component/node/action/read-action-node-component.vue"));
Vue.component("write-action-node-component", require("./component/node/action/write-action-node-component.vue"));
Vue.component("log-notifier-node-component", require("./component/node/notifier/log-notifier-node-component.vue"));
Vue.component("pushbullet-notifier-node-component", require("./component/node/notifier/pushbullet-notifier-node-component.vue"));

let AppComponent = require("./component/app-component.vue");
new (<any>AppComponent)().$mount("#app");
