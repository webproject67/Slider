import Observer from './observer';

class Name extends Observer {}

const name = new Name();

describe('subscribe', () => {
  test('passed function, returned void', () => {
    const cb = () => {};
    expect(name.subscribe(cb)).toBeUndefined();
  });
});

describe('broadcast', () => {
  test('passed array, returned void', () => {
    expect(name.broadcast([], [])).toBeUndefined();
  });
});
