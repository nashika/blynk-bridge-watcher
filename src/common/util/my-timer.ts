export class MyTimer {

  private timer: any;
  private resolve: () => void;
  private reject: (err: any) => void;
  private promise: Promise<void>;

  constructor(millis: number) {
    this.promise = new Promise<void>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    this.timer = setTimeout(() => this.callback(), millis);
  }

  private callback(): void {
    this.resolve();
  }

  toPromise(): Promise<void> {
    return this.promise;
  }

  stop(): void {
    clearTimeout(this.timer);
  }

}
