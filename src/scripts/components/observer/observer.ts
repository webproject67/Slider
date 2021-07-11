export default class Observer {
  observers: Function[];

  constructor() {
    this.observers = [];
  }

  public subscribe(fn: Function) {
    this.observers.push(fn);
  }

  public broadcast(keys: string[], values: (number | string | boolean)[]) {
    this.observers.forEach((subscriber) => subscriber(keys, values));
  }
}
