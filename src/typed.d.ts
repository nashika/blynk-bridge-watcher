declare module "bootstrap-vue" {
  var BootstrapVue: any;
  export = BootstrapVue;
}

declare module "blynk-library" {

  namespace Blynk {

    class TcpClient {
      constructor(params: { addr: string, port: number });
    }

    interface VirtualPinConstructor {
      new (pin: number): VirtualPin;
    }

    interface WidgetBridgeConstructor {
      new (pin: number): WidgetBridge;
    }

    class VirtualPin extends NodeJS.EventEmitter {

    }

    class WidgetBridge {
      setAuthToken(token: string): void;
      digitalWrite(pin: number, value: number): void;
      analogWrite(pin: number, value: number): void;
      virtualWrite(pin: number, value: number | string): void;
    }

    class Blynk extends NodeJS.EventEmitter {
      constructor(token: string, options: TcpClient);

      VirtualPin: VirtualPinConstructor;
      WidgetBridge: WidgetBridgeConstructor;
    }

  }

  export = Blynk;
}
