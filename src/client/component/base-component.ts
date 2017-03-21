import Vue = require("vue");
import _ = require("lodash");
import {LoDashStatic} from "lodash";
import {AppComponent} from "./app-component";

export class BaseComponent extends Vue {

  $root: AppComponent;
  lodash: LoDashStatic = _;

  async beforeCreate(): Promise<void> {
  }

  async created(): Promise<void> {
  }

  async beforeMount(): Promise<void> {
  }

  async mounted(): Promise<void> {
  }

  async beforeUpdate(): Promise<void> {
  }

  async updated(): Promise<void> {
  }

  async activated(): Promise<void>{
  }

  async deactivated(): Promise<void>{
  }

  async beforeDestroy(): Promise<void> {
  }

  async destroyed(): Promise<void> {
  }

}
