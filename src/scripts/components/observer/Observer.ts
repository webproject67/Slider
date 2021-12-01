import { stateType } from '../../types';

export default class Observer {
  private observers: Function[];

  constructor() {
    this.observers = [];
  }

  public subscribe(fn: Function) {
    this.observers.push(fn);
  }

  public broadcast(state: Partial<stateType>) {
    this.observers.forEach((subscriber) => subscriber(state));
  }
}
