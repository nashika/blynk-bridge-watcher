import {ClassRegistry} from "../../common/util/class-registry";
import {ServerNode} from "./server-node";

export class NodeRegistry extends ClassRegistry<ServerNode> {

  Classes:{[key:string]:typeof ServerNode} = {
    server: ServerNode,
  };

  get server():ServerNode { return <ServerNode>this.getInstance("server"); }

}

export var nodeRegistry = new NodeRegistry();
