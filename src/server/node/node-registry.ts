import {LazyClassRegistry, ILazyClassRegistryFiles} from "../../common/util/lazy-class-registry";
import {BaseEntity} from "../../common/entity/base-entity";
import {BaseNode} from "./base-node";

export class NodeRegistry extends LazyClassRegistry<BaseNode<BaseEntity>> {

  protected files:ILazyClassRegistryFiles = {
    board: {path: "./board-node", name: "BoardNode"},
    job: {path: "./job-node", name: "JobNode"},
    server: {path: "./server-node", name: "ServerNode"},
    ifAction: {path: "./action/if-action-node", name: "IfActionNode"},
    logAction: {path: "./action/if-action-node", name: "LogActionNode"},
    notifyAction: {path: "./action/notify-action-node", name: "NotifyActionNode"},
    readAction: {path: "./action/read-action-node", name: "ReadActionNode"},
    writeAction: {path: "./action/write-action-node", name: "WriteActionNode"},
    logNotifier: {path: "./notifier/log-notifier-node", name: "LogNotifierNode"},
    pushbulletNotifier: {path: "./notifier/pushbullet-notifier-node", name: "PushbulletNotifierNode"},
  };

  getClass(name: string): typeof BaseNode {
    return <typeof BaseNode>super.getClass(name);
  }

  require(path: string): any {
    return require(path);
  }

}

export var nodeRegistry = new NodeRegistry();
