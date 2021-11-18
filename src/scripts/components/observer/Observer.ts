import { stateType } from '../../types';

export default class Observer {
  private observers: Function[];

  constructor() {
    this.observers = [];
  }

  public subscribe(fn: Function) {
    this.observers.push(fn);
  }

  public broadcast(
    keys: string[] | stateType,
    values?: (number | string | boolean)[]
  ) {
    this.observers.forEach((subscriber) => subscriber(keys, values));
  }
}
