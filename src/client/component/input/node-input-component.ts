import Component from "vue-class-component";

import BaseInputComponent from "./base-input-component";
import {NodeClientService} from "../../service/node-client-service";
import {container} from "../../../common/inversify.config";

@Component({})
export default class NodeInputComponent extends BaseInputComponent {

  protected nodeClientService: NodeClientService = container.get(NodeClientService);

}
