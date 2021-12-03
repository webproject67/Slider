export default class Observer<T> {
  private observers: ((data: T) => void)[];

  constructor() {
    this.observers = [];
  }

  public subscribe(fn: (data: T) => void): void {
    this.observers.push(fn);
  }

  public broadcast(data: T): void {
    this.observers.forEach((subscriber) => subscriber(data));
  }
}
