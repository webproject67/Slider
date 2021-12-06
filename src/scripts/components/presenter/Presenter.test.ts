import Presenter from './Presenter';

const state = {
  min: 0,
  max: 100,
  from: 0,
  fromPercent: 0,
  to: 100,
  toPercent: 100,
  step: 1,
  view: false,
  range: false,
  flag: true,
  progress: true,
  scale: true,
};

const main = document.createElement('div');

const presenter = new Presenter(main, state);

describe('setState', () => {
  test('passed min 10 less max, returned void', () => {
    expect(presenter.setState({ min: 10 })).toBeUndefined();
  });

  test('passed unknown, returned state min 10', () => {
    expect(presenter.getState().value.min).toBe(10);
  });
});

describe('subscribe', () => {
  test('passed function, returned void', () => {
    expect(presenter.subscribe(() => {})).toBeUndefined();
  });
});
